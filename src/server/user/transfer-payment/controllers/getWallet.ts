import { type UserContext } from "@/server/trpc";
import { type TransferPaymentSchema } from "../schema";

const getWallet = async ({
  ctx,
}: {
  ctx: UserContext;
  input: TransferPaymentSchema["getWallet"];
}) => {
  const { user } = ctx;
  const receivedAmount = await user.getReceivedAmount();
  const transferredAmount = await user.getTransferredAmount();
  const wallet = await user.getWallet();

  return {
    receivedAmount,
    transferredAmount,
    wallet,
  };
};

export default getWallet;
