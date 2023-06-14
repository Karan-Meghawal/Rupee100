import { type UserContext } from "@/server/trpc";
import { prisma } from "@/server/db";
import { type InstantDepositSchema } from "../schema";

const getRecords = async ({}: {
  ctx: UserContext;
  input: InstantDepositSchema["getRecords"];
}) => {
  const records = await prisma.instantDepositMethod.findMany({
    where: {
      status: "active",
    },
  });
  return records;
};
export default getRecords;
