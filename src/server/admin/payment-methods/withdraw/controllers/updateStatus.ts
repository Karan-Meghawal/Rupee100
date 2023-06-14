import { prisma } from "@/server/db";
import WithdrawMethod from "@/server/services/WithdrawMethod";
import { type AdminContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type WithdrawMethod_Status } from "@prisma/client";
import { type WithdrawSchema } from "../schema";

const updateStatus = async ({
  input,
}: {
  ctx: AdminContext;
  input: WithdrawSchema["updateStatus"];
}) => {
  const { id, status } = input;
  const method = await WithdrawMethod.getInstance(id);

  const newStatus: WithdrawMethod_Status =
    method.row.status === "active" ? "inactive" : "active";

  if (method.row.status === status) {
    await prisma.withdrawMethod.update({
      where: { id },
      data: {
        status: newStatus,
      },
    });
  }
  return jsonResponse("Withdraw Method Status has been updated", { newStatus });
};
export default updateStatus;
