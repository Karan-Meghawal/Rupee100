import { prisma } from "@/server/db";
import Deposit from "@/server/services/Deposit";
import { type AdminContext } from "@/server/trpc";
import { ClientError, NotFoundError } from "@/server/utils/errors";
import { jsonResponse } from "@/server/utils/fns";
import { type DepositSchema } from "../schema";

const reject = async ({
  input,
}: {
  ctx: AdminContext;
  input: DepositSchema["reject"];
}) => {
  const { message, id } = input;
  const deposit = await Deposit.getInstance(id);

  const { status, type } = deposit.row;

  if (type !== "manual")
    throw NotFoundError("This request can not be processed");
  if (status !== "review")
    throw ClientError("Deposit has been processed already");

  await prisma.$transaction(async (prismaTx) => {
    await prismaTx.deposit.update({
      where: {
        transactionId: id,
      },
      data: {
        status: "rejected",
        message,
      },
    });
    
    await prismaTx.transaction.update({
      where: {
        id,
      },
      data: {
        status: "failed",
      },
    });
  });

  return jsonResponse("Deposit has been rejected");
};
export default reject;
