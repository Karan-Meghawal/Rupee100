import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { type WithdrawSchema } from "../schema";

const getRecords = async ({}: {
  ctx: AdminContext;
  input: WithdrawSchema["getRecords"];
}) =>
  prisma.withdrawMethod.findMany({
    where: {
      status: {
        not: "deleted",
      },
    },
  });

export default getRecords;
