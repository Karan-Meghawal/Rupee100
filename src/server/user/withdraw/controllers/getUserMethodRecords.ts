import { prisma } from "@/server/db";
import { type UserContext } from "@/server/trpc";
import { type WithdrawSchema } from "../schema";

const getUserMethodRecords = async ({
  ctx,
}: {
  ctx: UserContext;
  input: WithdrawSchema["getUserMethodRecords"];
}) => {
  const {
    user: { userId },
  } = ctx;

  const list = await prisma.userWithdrawMethod.findMany({
    where: {
      userId,
      method: {
        status: "active",
      },
    },
    include: {
      method: true,
    },
  });
  return list.map((record) => record.method);
};

export default getUserMethodRecords;
