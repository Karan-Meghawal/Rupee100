import { prisma } from "@/server/db";
import InstantDepositMethod from "@/server/services/InstantDepositMethod";
import { type AdminContext } from "@/server/trpc";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type InstantDepositSchema } from "../schema";

const remove = async ({
  input,
}: {
  ctx: AdminContext;
  input: InstantDepositSchema["remove"];
}) => {
  checkPermission();
  const id = input;
  const method = await InstantDepositMethod.getInstance(id);

  await prisma.instantDepositMethod.delete({
    where: { id },
  });
  return jsonResponse(`${method.row.name} has been deleted`);
};
export default remove;
