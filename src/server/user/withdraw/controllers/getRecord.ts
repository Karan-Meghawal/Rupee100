import { prisma } from "@/server/db";
import Withdraw from "@/server/services/Withdraw";
import { type UserContext } from "@/server/trpc";
import { type WithdrawSchema } from "../schema";

const getRecord = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: WithdrawSchema["getRecord"];
}) => {
  const { user } = ctx;
  const { userId } = user;

  const id = input;
  const record = await Withdraw.getInstance(id);
  record.validateUser(userId);

  const data = await prisma.withdraw.findUnique({
    where: {
      transactionId: id,
    },
  });

  return data;
};

export default getRecord;
