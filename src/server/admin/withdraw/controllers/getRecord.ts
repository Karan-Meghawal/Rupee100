import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { NotFoundError } from "@/server/utils/errors";
import { type WithdrawSchema } from "../schema";

const getRecord = async ({
  input,
}: {
  ctx: AdminContext;
  input: WithdrawSchema["getRecord"];
}) => {
  const id = input;

  const data = await prisma.withdraw.findUnique({
    where: {
      transactionId: id,
    },
  });
  if (!data) throw NotFoundError(`Withdraw Record not found for id ${id}`);
  return data;
};
export default getRecord;
