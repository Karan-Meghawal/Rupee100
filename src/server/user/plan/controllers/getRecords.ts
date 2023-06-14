import { type UserContext } from "@/server/trpc";
import { prisma } from "@/server/db";
import { type PlanSchema } from "../schema";

const getRecords = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: PlanSchema["getRecords"];
}) =>
  prisma.plan.findMany({
    where: {
      status: "active",
    },
    orderBy: {
      minInvestment: "asc",
    },
  });
export default getRecords;
