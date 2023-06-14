import { prisma } from "@/server/db";
import Deposit from "@/server/services/Deposit";
import { type AdminContext } from "@/server/trpc";
import { ClientError, NotFoundError } from "@/server/utils/errors";
import { jsonResponse } from "@/server/utils/fns";
import { type DepositSchema } from "../schema";

const approve = async ({
  input,
}: {
  ctx: AdminContext;
  input: DepositSchema["approve"];
}) => {
  const { message, id } = input;
  const deposit = await Deposit.getInstance(id);

  const { status, type } = deposit.row;

  if (type !== "manual")
    throw NotFoundError("This request can not be processed");
  if (status !== "review")
    throw ClientError("Deposit has been processed already");

  await prisma.$transaction([
    prisma.transaction.update({
      where: {
        id,
      },
      data: {
        status: "credit",
      },
    }),
    prisma.deposit.update({
      where: {
        transactionId: id,
      },
      data: {
        status: "approved",
        message,
      },
    }),
  ]);

  return jsonResponse("Deposit has been approve");
};
export default approve;
