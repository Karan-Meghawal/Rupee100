import UserWithdrawMethod from "@/server/services/UserWithdrawMethod";
import { type UserContext } from "@/server/trpc";
import { type WithdrawSchema } from "../schema";

const getDataForPayment = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: WithdrawSchema["getDataForPayment"];
}) => {
  const id = input;
  const { user } = ctx;
  const { userId } = user;

  const method = await UserWithdrawMethod.getInstance(userId, id);
  const { methodRow, details } = method;
  const isUpdated = method.isUserDataValid();

  const wallet = await user.getWallet();
  return { data: { method: methodRow, details }, wallet, isUpdated };
};
export default getDataForPayment;
