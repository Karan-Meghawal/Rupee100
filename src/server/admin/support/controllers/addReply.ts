import Ticket from "@/server/services/Ticket";
import { type AdminContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { prisma } from "@/server/db";
import { type SupportSchema } from "../schema";

const addReply = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: SupportSchema["addReply"];
}) => {
  const {
    admin: { userId },
  } = ctx;

  const { id, files, message } = input;
  const ticket = await Ticket.validateTicketId(id);
  Ticket.checkCloseStatus(ticket.status);

  await Ticket.addReply({
    message,
    files,
    user: {
      connect: {
        userId,
      },
    },
    ticket: {
      connect: {
        id,
      },
    },
  });

  if (ticket.status === "pending") {
    await prisma.ticket.update({
      where: {
        id,      },
      data: {
        status: "active",
      },
    });
  }

  return jsonResponse("Reply has been added");
};

export default addReply;
