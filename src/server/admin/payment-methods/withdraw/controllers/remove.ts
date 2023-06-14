import { prisma } from "@/server/db";
import WithdrawMethod from "@/server/services/WithdrawMethod";
import { type AdminContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type WithdrawSchema } from "../schema";

const remove = async ({
  input,
}: {
  ctx: AdminContext;
  input: WithdrawSchema["remove"];
}) => {
  const id = input;
  const gateway = await WithdrawMethod.getInstance(id);
  await prisma.withdrawMethod.update({
    where: {
      id,
    },
    data: {
      status: "deleted",
    },
  });
  return jsonResponse(`Withdraw Method ${gateway.row.name} has been deleted`);
};
export default remove;
