import { prisma } from "@/server/db";
import ManualDepositMethod from "@/server/services/ManualDepositMethod";
import { type AdminContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type ManualDepositMethodSchema } from "../schema";

const remove = async ({
  input,
}: {
  ctx: AdminContext;
  input: ManualDepositMethodSchema["remove"];
}) => {
  const id = input;
  const method = await ManualDepositMethod.getInstance(id);
  await prisma.manualDepositMethod.delete({
    where: {
      id,
    },
  });
  return jsonResponse(`Deposit Method ${method.row.name} has been deleted`);
};
export default remove;
