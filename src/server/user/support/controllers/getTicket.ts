import { prisma } from "@/server/db";
import { type UserContext } from "@/server/trpc";
import { ClientError } from "@/server/utils/errors";
import { type SupportSchema } from "../schema";

const getTicket = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: SupportSchema["getTicket"];
}) => {
  const {
    user: { userId },
  } = ctx;
  const ticketId = input;
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
      userId,
    },
    include: {
      messages: {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (!ticket) throw ClientError(`Ticket not found for id ${ticketId}`);
  return ticket;
};

export default getTicket;
