import { prisma } from "@/server/db";
import Plan from "@/server/services/Plan";
import { type AdminContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type PlanSchema } from "../schema";

const remove = async ({
  input,
}: {
  ctx: AdminContext;
  input: PlanSchema["remove"];
}) => {
  const id = input;
  const {
    row: { name },
  } = await Plan.getInstance(id);

  await prisma.$transaction(async (prismaTx) => {
    // expire user plans
    await prismaTx.planHistory.updateMany({
      where: {
        status: "active",
        planId: id,
      },
      data: {
        status: "expired",
        expiredAt: new Date(),
      },
    });

    // update user plan id
    await prismaTx.user.updateMany({
      where: {
        planId: id,
      },
      data: {
        planId: undefined,
      },
    });

    await prismaTx.plan.delete({
      where: {
        id,
      },
    });
  });

  return jsonResponse(`Plan ${name} has been deleted`);
};
export default remove;
