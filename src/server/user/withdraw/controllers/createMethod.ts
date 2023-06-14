import { prisma } from "@/server/db";
import UserWithdrawMethod from "@/server/services/UserWithdrawMethod";
import WithdrawMethod from "@/server/services/WithdrawMethod";
import { type UserContext } from "@/server/trpc";
import { ClientError } from "@/server/utils/errors";
import { jsonResponse } from "@/server/utils/fns";
import { type WithdrawSchema } from "../schema";

const createMethod = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: WithdrawSchema["createMethod"];
}) => {
  const { user } = ctx;
  const { userId } = user;

  const { id, details } = input;
  const method = await WithdrawMethod.getInstance(id);
  const methodRow = method.row;

  const isValid = UserWithdrawMethod.isFormDataValid(
    methodRow.details,
    details,
  );
  if (!isValid) throw ClientError("Invalid form data received");

  let message: string;
  const isUserMethod = await UserWithdrawMethod.isId(userId, id);
  if (isUserMethod) {
    await prisma.userWithdrawMethod.update({
      where: {
        userId_methodId: {
          userId,
          methodId: id,
        },
      },
      data: {
        details,
      },
    });
    message = `Withdraw Method ${methodRow.name} has been updated`;
  } else {
    await prisma.userWithdrawMethod.create({
      data: {
        userId,
        methodId: id,
        details,
      },
    });
    message = `Withdraw Method ${methodRow.name} has been created`;
  }
  return jsonResponse(message);
};

export default createMethod;
