import { prisma } from "@/server/db";
import InstantDepositMethod from "@/server/services/InstantDepositMethod";
import { type AdminContext } from "@/server/trpc";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type InstantDepositMethod_Status } from "@prisma/client";
import { type InstantDepositSchema } from "../schema";

const updateStatus = async ({
  input,
}: {
  ctx: AdminContext;
  input: InstantDepositSchema["updateStatus"];
}) => {
  checkPermission();
  const { id, status } = input;
  const method = await InstantDepositMethod.getInstance(id);

  const newStatus: InstantDepositMethod_Status =
    status === "active" ? "inactive" : "active";

  if (method.row.status === status) {
    await prisma.instantDepositMethod.update({
      where: {
        id,
      },
      data: {
        status: newStatus,
      },
    });
  }

  return jsonResponse(
    `${method.row.name} status has been updated to ${newStatus}`,
    { newStatus },
  );
};
export default updateStatus;
