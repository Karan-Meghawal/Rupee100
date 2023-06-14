import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { ClientError } from "@/server/utils/errors";
import { type SupportSchema } from "../schema";

const getTicket = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: SupportSchema["getTicket"];
}) => {
  const id = input;
  const ticket = await prisma.ticket.findUnique({
    where: {
      id,
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
  if (!ticket) throw ClientError(`Ticket not found for id ${id}`);
  return ticket;
};
export default getTicket;
