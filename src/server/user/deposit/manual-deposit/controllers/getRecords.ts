import { type UserContext } from "@/server/trpc";
import { prisma } from "@/server/db";
import { type ManualDepositSchema } from "../schema";

const getRecords = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: ManualDepositSchema["getRecords"];
}) => {
  const records = await prisma.manualDepositMethod.findMany({
    where: {
      status: "active",
    },
  });
  return records;
};
export default getRecords;
