import ManualDepositMethod from "@/server/services/ManualDepositMethod";
import { type AdminContext } from "@/server/trpc";
import { type ManualDepositMethodSchema } from "../schema";

const getRecord = async ({
  input,
}: {
  ctx: AdminContext;
  input: ManualDepositMethodSchema["getRecord"];
}) => {
  const id = input;
  const method = await ManualDepositMethod.getInstance(id);

  return method.row;
};

export default getRecord;
