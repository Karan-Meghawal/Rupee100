import { prisma } from "@/server/db";
import WithdrawMethod from "@/server/services/WithdrawMethod";
import { type UserContext } from "@/server/trpc";
import { type WithdrawSchema } from "../schema";

const getMethodData = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: WithdrawSchema["getMethodData"];
}) => {
  const {
    user: { userId },
  } = ctx;

  const id = input;
  const method = (await WithdrawMethod.getInstance(id)).row;
  const userMethod = await prisma.userWithdrawMethod.findUnique({
    where: {
      userId_methodId: {
        userId,
        methodId: id,
      },
    },
  });
  return { method, userMethod };
};

export default getMethodData;
