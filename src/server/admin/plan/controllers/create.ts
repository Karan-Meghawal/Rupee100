import APP_PATH from "@/route";
import { prisma } from "@/server/db";
import Plan from "@/server/services/Plan";
import { type AdminContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type Prisma } from "@prisma/client";
import { type PlanSchema } from "../schema";

const create = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: PlanSchema["create"];
}) => {
  const {
    id,
    maxInvestment,
    maxRoi,
    minInvestment,
    minRoi,
    name,
    referralIncome,
    status,
    validity,
    description,
  } = input;

  const createData: Prisma.PlanCreateInput = {
    description,
    name,
    maxInvestment,
    maxRoi,
    minInvestment,
    minRoi,
    referralIncome,
    status,
    validity,
  };

  let message: string;

  if (id) {
    await Plan.getInstance(id);
    await prisma.plan.update({
      where: {
        id,
      },
      data: createData,
    });

    message = "Plan has been updated";
  } else {
    await prisma.plan.create({
      data: createData,
    });
    message = "Plan has been created";
  }

  await ctx.revalidateSSG?.(APP_PATH.home);
  await ctx.revalidateSSG?.(APP_PATH.plans);

  return jsonResponse(message);
};

export default create;
