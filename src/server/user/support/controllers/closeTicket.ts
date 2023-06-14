import { type UserContext } from "@/server/trpc";
import { handlePrismaException, jsonResponse } from "@/server/utils/fns";
import { prisma } from "@/server/db";
import { type SupportSchema } from "../schema";

const closeTicket = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: SupportSchema["closeTicket"];
}) => {
  const {
    user: { userId },
  } = ctx;
  const ticketId = input;

  try {
    await prisma.ticket.update({
      where: {
        id: ticketId,
        userId,
        status: {
          notIn: ["closed"],
        },
      },
      data: {
        status: "closed",
        closedBy: "user",
      },
    });
  } catch (error) {
    handlePrismaException(error);
  }

  return jsonResponse("Ticket has been closed");
};

export default closeTicket;
