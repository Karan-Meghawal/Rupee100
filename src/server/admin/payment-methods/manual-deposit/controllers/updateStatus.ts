import { prisma } from "@/server/db";
import ManualDepositMethod from "@/server/services/ManualDepositMethod";
import { type AdminContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type ManualDepositMethod_Status } from "@prisma/client";
import { type ManualDepositMethodSchema } from "../schema";

const updateStatus = async ({
  input,
}: {
  ctx: AdminContext;
  input: ManualDepositMethodSchema["updateStatus"];
}) => {
  const { id, status } = input;
  const method = await ManualDepositMethod.getInstance(id);

  const newStatus: ManualDepositMethod_Status =
    method.row.status === "active" ? "inactive" : "active";

  if (method.row.status === status) {
    await prisma.manualDepositMethod.update({
      where: { id },
      data: {
        status: newStatus,
      },
    });
  }
  return jsonResponse("Deposit Method Status has been updated", { newStatus });
};
export default updateStatus;
