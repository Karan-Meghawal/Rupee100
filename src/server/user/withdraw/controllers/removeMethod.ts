import { prisma } from "@/server/db";
import UserWithdrawMethod from "@/server/services/UserWithdrawMethod";
import { type UserContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type WithdrawSchema } from "../schema";

const removeMethod = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: WithdrawSchema["removeMethod"];
}) => {
  const {
    user: { userId },
  } = ctx;
  const id = input;
  await UserWithdrawMethod.getInstance(userId, id);

  await prisma.userWithdrawMethod.delete({
    where: {
      userId_methodId: {
        userId,
        methodId: id,
      },
    },
  });
  return jsonResponse("Withdraw Method has been removed");
};

export default removeMethod;
