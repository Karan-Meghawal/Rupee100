import { type AdminContext } from "@/server/trpc";
import User from "@/server/services/User";
import Setting from "@/server/services/Setting";
import { jsonResponse } from "@/server/utils/fns";
import { prisma } from "@/server/db";
import { type UserSchema } from "../schema";

const withdraw = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: UserSchema["withdraw"];
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
        category: "withdraw",
        charge,
        description: "withdraw by admin",
        netAmount,
        status: "debit",
        userId,
      },
    });

    // create deposit
    await prismaTx.withdraw.create({
      data: {
        actionBy: "admin",
        method: {
          charge,
          chargeType: "fixed",
          logo: adminRow.avatar ?? "",
          name: adminRow.userName,
        },
        amount,
        charge,
        netAmount,
        status: "success",
        transactionId: transaction.id,
        userId,
        message,
      },
    });
  });

  return jsonResponse(`${amountText} has been withdraw from ${userId}`);
};
export default withdraw;
