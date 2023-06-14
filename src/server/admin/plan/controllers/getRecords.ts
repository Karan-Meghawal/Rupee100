import { type AdminContext } from "@/server/trpc";
import { prisma } from "@/server/db";
import { type PlanSchema } from "../schema";

const getRecords = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: PlanSchema["getRecords"];
}) => prisma.plan.findMany();
export default getRecords;
