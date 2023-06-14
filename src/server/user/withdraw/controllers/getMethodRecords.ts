import { prisma } from "@/server/db";
import { type UserContext } from "@/server/trpc";
import { type WithdrawSchema } from "../schema";

const getMethodRecords = async ({
  ctx,
}: {
  ctx: UserContext;
  input: WithdrawSchema["getMethodRecords"];
}) => {
  const {
    user: { userId },
  } = ctx;

  const methods = await prisma.withdrawMethod.findMany({
    where: {
      status: "active",
    },
  });

  const userMethods = await prisma.userWithdrawMethod.findMany({
    where: {
      userId,
    },
  });

  return {
    methods,
    userMethods,
  };
};
export default getMethodRecords;
