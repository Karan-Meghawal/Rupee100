import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { type InstantDepositSchema } from "../schema";

const getRecords = async ({}: {
  ctx: AdminContext;
  input: InstantDepositSchema["getRecords"];
}) => {
  const records = await prisma.instantDepositMethod.findMany();
  return records;
};
export default getRecords;
