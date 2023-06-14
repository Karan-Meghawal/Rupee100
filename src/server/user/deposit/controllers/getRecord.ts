import Deposit from "@/server/services/Deposit";
import { type UserContext } from "@/server/trpc";
import { type DepositSchema } from "../schema";

const getRecord = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: DepositSchema["getRecord"];
}) => {
  const {
    user: { userId },
  } = ctx;

  const id = input;
  const deposit = await Deposit.getInstance(id);
  deposit.verifyUser(userId);
  return deposit.row;
};
export default getRecord;
