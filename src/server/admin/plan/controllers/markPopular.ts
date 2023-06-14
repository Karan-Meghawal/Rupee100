import { prisma } from "@/server/db";
import Plan from "@/server/services/Plan";
import { type AdminContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type PlanSchema } from "../schema";

const markPopular = async ({
  input,
}: {
  ctx: AdminContext;
  input: PlanSchema["markPopular"];
}) => {
  const id = input;
  const plan = await Plan.getInstance(id);
  if (!plan.row.isPopular) {
    await prisma.plan.updateMany({
      where: {
        isPopular: true,
      },
      data: {
        isPopular: false,
      },
    });

    await prisma.plan.update({
      where: {
        id,
      },
      data: {
        isPopular: true,
      },
    });
  }

  return jsonResponse(`${plan.row.name} has been marked as popular`);
};
export default markPopular;
