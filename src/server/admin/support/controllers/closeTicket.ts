import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { handlePrismaException, jsonResponse } from "@/server/utils/fns";
import { type SupportSchema } from "../schema";

const closeTicket = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: SupportSchema["closeTicket"];
}) => {
  const ticketId = input;

  try {
    await prisma.ticket.update({
      where: {
        id: ticketId,
        status: {
          notIn: ["closed"],
        },
      },
      data: {
        status: "closed",
        closedBy: "admin",
      },
    });
  } catch (error) {
    handlePrismaException(error);
  }

  return jsonResponse("Ticket has been closed");
};

export default closeTicket;
