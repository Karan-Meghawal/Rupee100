import TransferPayment from "@/server/services/TransferPayment";
import { type UserContext } from "@/server/trpc";
import { type TransferPaymentSchema } from "../schema";

const getConfig = async ({}: {
  ctx: UserContext;
  input: TransferPaymentSchema["getConfig"];
}) => {
  const setting = await TransferPayment.getConfig();
  return setting;
};

export default getConfig;
