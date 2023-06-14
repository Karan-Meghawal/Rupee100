import zodSchemas from "@/server/utils/schema";
import { Prisma } from "@prisma/client";
import { array, nativeEnum, object, string, union, type TypeOf } from "zod";

const createTicket = union([
  object({
    id: string().nonempty("Id is required"),
  }),
  object({
    id: string().optional(),
    subject: string()
      .min(4, "Subject should be at least 4 characters")
      .max(100, "Subject should be at most 100 characters"),
  }),
]).and(
  object({
    message: string()
      .min(4, "Message should be at least 4 characters")
      .max(1000, "Message should be at most 1000 characters"),
    files: array(string()),
  }),
);

const getRecords = zodSchemas.table(nativeEnum(Prisma.TicketScalarFieldEnum));
const getTicket = zodSchemas.objectId("Ticket Id is invalid");

const closeTicket = zodSchemas.objectId("Ticket Id is invalid");

export type SupportSchema = {
  getRecords: TypeOf<typeof getRecords>;
  getTicket: TypeOf<typeof getTicket>;
  createTicket: TypeOf<typeof createTicket>;
  closeTicket: TypeOf<typeof closeTicket>;
};

const supportSchema = {
  getRecords,
  getTicket,
  createTicket,
  closeTicket,
};

export default supportSchema;
