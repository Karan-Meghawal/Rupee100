import { prisma } from "@/server/db";
import Setting from "@/server/services/Setting";
import User from "@/server/services/User";
import { type AdminContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type UserSchema } from "../schema";

const deposit = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: UserSchema["deposit"];
}) => {
  const {
    admin: { row: adminRow },
  } = ctx;

  const { amount, message, userId } = input;

  // validate user
  await User.getInstance(userId);

  const amountText = await Setting.fCurrency(amount);

  const netAmount = amount;
  const charge = 0;

  await prisma.$transaction(async (prismaTx) => {
    // create transaction
    const transaction = await prismaTx.transaction.create({
      data: {
        amount,
        category: "deposit",
        charge,
        description: "deposit by admin",
        netAmount,
        status: "credit",
        userId,
      },
    });

    // create deposit
    await prismaTx.deposit.create({
      data: {
        amount,
        charge,
        chargeType: "fixed",
        method: {
          logo: adminRow.avatar ?? "",
          name: adminRow.userName,
        },
        netAmount,
        status: "credit",
        transactionId: transaction.id,
        type: "admin",
        userId,
        message,
      },
    });
  });

  return jsonResponse(`${amountText} has been credit to ${userId}`);
};
export default deposit;
