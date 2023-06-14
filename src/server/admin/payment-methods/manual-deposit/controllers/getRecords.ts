import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { type ManualDepositMethodSchema } from "../schema";

const getRecords = async ({}: {
  ctx: AdminContext;
  input: ManualDepositMethodSchema["getRecords"];
}) => prisma.manualDepositMethod.findMany();

export default getRecords;
