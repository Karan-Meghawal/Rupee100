import { prisma } from "@/server/db";
import { type UserContext } from "@/server/trpc";
import { type PlanSchema } from "../schema";

const getTransaction = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: PlanSchema["getTransaction"];
}) => {
  const id = input;
  const record = await prisma.planHistory.findUnique({
    where: { transactionId: id },
  });
  return record;
};
export default getTransaction;
