import {
  type TransferPayment as TransferPaymentModel,
  type User,
} from "@prisma/client";
import Setting from "../services/Setting";

const TransferPayment = async ({
  user,
  agent,
  transaction,
}: {
  user: User;
  agent: User;
  transaction: TransferPaymentModel;
}) => {
  const { amount, netAmount, action } = transaction;
  const amountText = await Setting.fCurrency(amount);
  const netAmountText = await Setting.fCurrency(netAmount);

  let message: string;
  let title: string;

  if (action === "transferred") {
    message = `You have transferred ${netAmountText} to ${agent.userName} (${agent.userId})`;
    title = "Payment Transfer";
  } else {
    message = `You have received ${amountText} from ${agent.userName} (${agent.userId})`;
    title = "Payment Received";
  }

  return `<p style="font-size:36px;line-height:42px;margin:30px 0;color:#1d1c1d;font-weight:700;padding:0">${title}</p>
<p style="font-size:20px;line-height:28px;margin:16px 0;margin-bottom:30px">Hello ${user.userName}, ${message}</p>`;
};
export default TransferPayment;
