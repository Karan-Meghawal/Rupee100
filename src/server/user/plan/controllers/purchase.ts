import { prisma } from "@/server/db";
import Plan from "@/server/services/Plan";
import Setting from "@/server/services/Setting";
import User from "@/server/services/User";
import { type UserContext } from "@/server/trpc";
import { ClientError } from "@/server/utils/errors";
import { jsonResponse } from "@/server/utils/fns";
import { addDays } from "date-fns";
import { type PlanSchema } from "../schema";

const purchase = async ({
  input,
  ctx,
}: {
  input: PlanSchema["purchase"];
  ctx: UserContext;
}) => {
  const { user } = ctx;
  const { id: planId, investment } = input;
  const { userId } = user;

  // throw error if purchase plan id is user current plan id
  if (user.row.planId === planId)
    throw ClientError("This plan is already active");

  const plan = await Plan.getInstance(planId);
  plan.validateStatus();

  const { fCurrency } = await Setting.getInstance();
  const { minInvestment, maxInvestment } = plan.row;

  if (investment < minInvestment)
    throw ClientError(
      `Min Investment is ${fCurrency(minInvestment)}. provided ${investment}`,
    );

  if (investment > maxInvestment)
    throw ClientError(
      `Max Investment is ${fCurrency(maxInvestment)}. provided ${investment}`,
    );

  const userWallet = await user.getWallet();
  if (investment > userWallet)
    throw ClientError(
      `You have only ${fCurrency(
        userWallet,
      )} in your wallet. Requested ${fCurrency(investment)}`,
    );

  const {
    row: { name: planName, validity },
  } = plan;

  const isFirstTimePurchase = !user.row.planId;

  await prisma.$transaction(async (prismaTx) => {
    const amount = investment;
    const charge = 0;
    const netAmount = amount + charge;
    const description = `${planName} plan purchased`;

    // create transaction
    const transaction = await prismaTx.transaction.create({
      data: {
        amount,
        category: "planPurchased",
        charge,
        description,
        netAmount,
        status: "debit",
        userId,
      },
    });
    const transactionId = transaction.id;

    // expire all active user plans
    await prismaTx.planHistory.updateMany({
      where: {
        userId,
        status: "active",
      },
      data: {
        status: "expired",
        expiredAt: new Date(),
      },
    });

    // create plan history
    const validTill = addDays(new Date(), validity);
    await prismaTx.planHistory.create({
      data: {
        userId,
        investment,
        transactionId,
        validity,
        validTill,
        planId,
        planName: plan.row.name,
      },
    });

    // update user plan
    await prismaTx.user.update({
      data: {
        planId,
      },
      where: {
        userId,
      },
    });

    // add roi
    await user.addRoiIncome({
      plan,
      prismaTx,
      investment,
    });

    // add referral income
    if (isFirstTimePurchase) {
      const { referralId } = user.row;
      if (referralId) {
        const referralUser = await User.getInstance(referralId);
        await referralUser.updatePendingReferralIncome(
          userId,
          investment,
          prismaTx,
        );
      }
    }
  });

  return jsonResponse(`Successfully invested in ${planName} plan`, {
    planId,
  });
};
export default purchase;
