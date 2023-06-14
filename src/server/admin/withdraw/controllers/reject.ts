import { prisma } from "@/server/db";
import Withdraw from "@/server/services/Withdraw";
import { type AdminContext } from "@/server/trpc";
import { ClientError } from "@/server/utils/errors";
import { jsonResponse } from "@/server/utils/fns";
import { type WithdrawSchema } from "../schema";

const reject = async ({
  input,
}: {
  ctx: AdminContext;
  input: WithdrawSchema["reject"];
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
        status: "rejected",
      },
    }),

    prisma.transaction.update({
      where: {
        id,
      },
      data: {
        status: "failed",
      },
    }),
  ]);

  return jsonResponse("Withdraw has been rejected");
};
export default reject;
