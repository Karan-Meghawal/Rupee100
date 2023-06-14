import Deposit from "@/server/services/Deposit";
import { type AdminContext } from "@/server/trpc";
import { type DepositSchema } from "../schema";

const getRecord = async ({
  input,
}: {
  ctx: AdminContext;
  input: DepositSchema["getRecord"];
}) => {
  const id = input;
  const record = await Deposit.getInstance(id);
  return record.row;
};
export default getRecord;
