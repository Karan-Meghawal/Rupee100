import { prisma } from "@/server/db";
import Email from "@/server/services/Email";
import Setting from "@/server/services/Setting";
import Transaction from "@/server/services/Transaction";
import UserWithdrawMethod from "@/server/services/UserWithdrawMethod";
import { type UserContext } from "@/server/trpc";
import { ClientError } from "@/server/utils/errors";
import { jsonResponse, prismaJsonToRecord } from "@/server/utils/fns";
import { type Withdraw_Details } from "@prisma/client";
import WithdrawMethod from "@/server/services/WithdrawMethod";
import { type WithdrawSchema } from "../schema";

const payment = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: WithdrawSchema["payment"];
}) => {
  const { user } = ctx;
  const {
    userId,
    row: { userName, email },
  } = user;

  const { amount, id: methodId } = input;
  const userMethodInstance = await UserWithdrawMethod.getInstance(
    userId,
    methodId,
  );
  const { row: userMethod, methodRow: method } = userMethodInstance;
  userMethodInstance.validateWithdrawData();

  if (amount < method.minWithdraw)
    throw ClientError(`Min Withdraw is ${method.minWithdraw}`);

  if (amount > method.maxWithdraw)
    throw ClientError(`Max Withdraw is ${method.maxWithdraw}`);

  const wallet = await user.getWallet();
  const amountText = await Setting.fCurrency(amount);
  const walletText = await Setting.fCurrency(wallet);
  if (wallet < amount) {
    throw ClientError(
      `Insufficient amount to withdraw. You have only ${walletText} in your wallet`,
    );
  }

  const methodInstance = await WithdrawMethod.getInstance(method.id);
  methodInstance.validateStatus();

  const charge = methodInstance.calcCharge(amount);
  const netAmount = amount - charge;

  const withdraw = await prisma.$transaction(async (prismaTx) => {
    // create transaction
    const transaction = await Transaction.createTransaction(
      {
        amount,
        category: "withdraw",
        charge,
        description: "withdraw",
        netAmount,
        status: "pending",
        user: {
          connect: {
            userId,
          },
        },
      },
      prismaTx,
    );
    const { id: transactionId } = transaction;

    // create withdraw
    const details: Withdraw_Details[] = method.details.map((detail) => ({
      name: detail.name,
      label: detail.label,
      inputType: detail.inputType,
      value: prismaJsonToRecord(userMethod.details)?.[detail.name] ?? "",
    }));

    const withdraw = await UserWithdrawMethod.create({
      actionBy: "user",
      amount,
      charge,
      method: {
        charge: method.charge,
        chargeType: method.chargeType,
        logo: method.logo,
        name: method.name,
      },
      netAmount,
      status: "pending",
      transactionId,
      user: {
        connect: {
          userId,
        },
      },
      details,
    });
    return withdraw;
  });

  void Email.sendWithdrawEmail({
    withdraw,
    methodName: method.name,
    userName,
    email,
  });
  return jsonResponse(`Withdraw of ${amountText} is in pending`);
};

export default payment;
