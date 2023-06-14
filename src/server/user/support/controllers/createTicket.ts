import Ticket from "@/server/services/Ticket";
import { type UserContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type SupportSchema } from "../schema";

const createTicket = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: SupportSchema["createTicket"];
}) => {
  const {
    user: { userId },
  } = ctx;
  const { files, message, id } = input;

  if (id) {
    await Ticket.validateTicketId(id, userId);
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
    return jsonResponse("Reply has been added");
  }

  if ("subject" in input) {
    const { subject } = input;
    await Ticket.createTicket({
      subject,
      user: {
        connect: {
          userId,
        },
      },
      messages: {
        create: {
          message,
          userId,
          files,
        },
      },
    });
  }

  return jsonResponse("Ticket has been created");
};

export default createTicket;
