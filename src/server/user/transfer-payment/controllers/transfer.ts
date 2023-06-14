import { prisma } from "@/server/db";
import Email from "@/server/services/Email";
import Setting from "@/server/services/Setting";
import Transaction from "@/server/services/Transaction";
import TransferPayment from "@/server/services/TransferPayment";
import User from "@/server/services/User";
import { type UserContext } from "@/server/trpc";
import { ClientError } from "@/server/utils/errors";
import { jsonResponse } from "@/server/utils/fns";
import { type TransferPaymentSchema } from "../schema";

const transfer = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: TransferPaymentSchema["transfer"];
}) => {
  const { user } = ctx;
  const { userId } = user;
  const { amount, receiverId } = input;

  // check if receiver exists
  const agent = await User.getInstance(receiverId);

  // check if receiver id is user id
  if (receiverId === userId)
    throw ClientError("You can't transfer payment to your own account");

  // check if wallet has sufficient amount
  const wallet = await user.getWallet();
  const charge = await TransferPayment.calculateCharge(amount);
  const netAmount = amount + charge;

  const amountText = await Setting.fCurrency(netAmount);

  if (wallet < netAmount) {
    const walletText = await Setting.fCurrency(wallet);
    throw ClientError(
      `Insufficient amount to transfer. You have only ${walletText} in your wallet`,
    );
  }

  const transaction = await prisma.$transaction(async (prismaTx) => {
    // @userId add to transactions
    const { id: senderTransactionId } = await Transaction.createTransaction(
      {
        amount,
        category: "transferred",
        charge,
        description: `Transferred - ${receiverId}`,
        netAmount,
        status: "debit",
        user: {
          connect: {
            userId,
          },
        },
      },
      prismaTx,
    );

    // @transferred create transfer payment record
    await TransferPayment.createPayment(
      {
        amount,
        charge,
        netAmount,
        transactionId: senderTransactionId,
        agent: {
          connect: {
            userId: receiverId,
          },
        },
        user: {
          connect: {
            userId,
          },
        },
        action: "transferred",
      },
      prismaTx,
    );

    // @receiverId add to transactions
    const { id: receiverTransactionId } = await Transaction.createTransaction(
      {
        amount: netAmount,
        category: "received",
        charge,
        description: `Received - ${userId}`,
        netAmount: amount,
        status: "credit",
        user: {
          connect: {
            userId: receiverId,
          },
        },
      },
      prismaTx,
    );

    // @received create transfer payment record
    const transaction = await TransferPayment.createPayment(
      {
        amount: netAmount,
        charge,
        netAmount: amount,
        transactionId: receiverTransactionId,
        agent: {
          connect: {
            userId,
          },
        },
        user: {
          connect: {
            userId: receiverId,
          },
        },
        action: "received",
      },
      prismaTx,
    );

    return transaction;
  });

  try {
    // e-mail for user
    void Email.sendTransferPaymentEmail({
      user: user.row,
      agent: agent.row,
      transaction,
    });

    // e-mail for agent
    void Email.sendTransferPaymentEmail({
      user: agent.row,
      agent: user.row,
      transaction,
    });
  } catch (error) {
    console.log(error);
  }

  return jsonResponse(`${amountText} has been transferred to ${receiverId}`);
};

export default transfer;
