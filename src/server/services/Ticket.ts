import { type Prisma, type Ticket as TicketModel } from "@prisma/client";
import { prisma } from "../db";
import { ClientError } from "../utils/errors";
import { validateObjectid } from "../utils/fns";

export default class Ticket {
  // ============================ Properties ============================

  public readonly id: string;
  public readonly row: TicketModel;

  // ============================ Constructors ============================

  constructor(row: TicketModel) {
    this.row = row;
    this.id = row.id;
  }

  // ============================ Public Static Methods ============================

  public static async addReply(data: Prisma.TicketMessagesCreateInput) {
    return prisma.ticketMessages.create({ data });
  }

  public static async createTicket(data: Prisma.TicketCreateInput) {
    return prisma.ticket.create({ data });
  }

  public static async isTicketId(
    id: string,
    userId?: number,
  ): Promise<boolean> {
    validateObjectid(id);

    const row = await prisma.ticket.findUnique({
      where: { id, userId },
    });

    return !!row;
  }

  public static async validateTicketId(id: string, userId?: number) {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id,
        userId,
      },
    });
    if (!ticket) throw ClientError(`Ticket doesn't exist with id ${id}`);
    return ticket;
  }

  static checkCloseStatus(status: TicketModel["status"]) {
    if (status === "closed") throw ClientError("This ticket has been closed");
    return undefined;
  }

  static async getActiveTickets() {
    const count = await prisma.ticket.count({
      where: {
        status: "active",
      },
    });
    return count;
  }

  static async getClosedTickets() {
    const count = await prisma.ticket.count({
      where: {
        status: "closed",
      },
    });
    return count;
  }

  static async getPendingTickets() {
    const count = await prisma.ticket.count({
      where: {
        status: "pending",
      },
    });
    return count;
  }

  static async getAllTickets() {
    const count = await prisma.ticket.count();
    return count;
  }
}
