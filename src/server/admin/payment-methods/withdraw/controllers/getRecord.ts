import WithdrawMethod from "@/server/services/WithdrawMethod";
import { type AdminContext } from "@/server/trpc";
import { type WithdrawSchema } from "../schema";

const getRecord = async ({
  input,
}: {
  ctx: AdminContext;
  input: WithdrawSchema["getRecord"];
}) => {
  const id = input;
  const method = await WithdrawMethod.getInstance(id);

  return method.row;
};

export default getRecord;
