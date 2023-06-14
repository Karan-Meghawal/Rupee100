import { prisma } from "@/server/db";
import Withdraw from "@/server/services/Withdraw";
import { type AdminContext } from "@/server/trpc";
import { ClientError } from "@/server/utils/errors";
import { jsonResponse } from "@/server/utils/fns";
import { type WithdrawSchema } from "../schema";

const approve = async ({
  input,
}: {
  ctx: AdminContext;
  input: WithdrawSchema["approve"];
}) => {
  const { id, message } = input;
  const withdraw = await Withdraw.getInstance(id);
  if (withdraw.row.status !== "pending")
    throw ClientError("Withdraw has processed already");

  await prisma.$transaction([
    prisma.withdraw.update({
      where: {
        transactionId: id,
      },
      data: {
        message,
        status: "success",
      },
    }),
    prisma.transaction.update({
      where: {
        id,
      },
      data: {
        status: "debit",
      },
    }),
  ]);
  return jsonResponse("Withdraw has been approved");
};
export default approve;
