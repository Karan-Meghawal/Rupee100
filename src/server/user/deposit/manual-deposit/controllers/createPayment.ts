import { type UserContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import ManualDepositMethod from "@/server/services/ManualDepositMethod";
import { prisma } from "@/server/db";
import Setting from "@/server/services/Setting";
import { type ManualDepositSchema } from "../schema";

const createPayment = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: ManualDepositSchema["createPayment"];
}) => {
  const {
    user: { userId },
  } = ctx;

  const { id, amount, paymentImage, transactionDate, transactionId } = input;

  const method = await ManualDepositMethod.getInstance(id);
  const charge = method.calCharge(amount);
  const netAmount = amount + charge;

  const { chargeType, details, logo, name } = method.row;

  await prisma.$transaction(async (prismaTx) => {
    // create transaction
    const { id: dbTransactionId } = await prismaTx.transaction.create({
      data: {
        amount,
        category: "deposit",
        charge,
        description: "deposit",
        netAmount,
        status: "review",
        userId,
      },
    });

    // create deposit
    await prismaTx.deposit.create({
      data: {
        amount,
        charge,
        chargeType,
        details: {
          method: details,
          user: {
            amount,
            paymentImage,
            transactionDate,
            transactionId,
          },
        },
        method: {
          logo,
          name,
        },
        netAmount,
        status: "review",
        type: "manual",
        userId,
        transactionId: dbTransactionId,
      },
    });
  });

  const amountText = await Setting.fCurrency(netAmount);
  return jsonResponse(`Deposit of ${amountText} is in pending`);
};
export default createPayment;
