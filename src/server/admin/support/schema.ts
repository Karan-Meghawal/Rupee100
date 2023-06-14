import zodSchemas from "@/server/utils/schema";
import { Prisma, Ticket_Status } from "@prisma/client";
import { array, literal, nativeEnum, object, string, type TypeOf } from "zod";

const addReply = object({
  id: string().nonempty("Id is required"),
  message: string()
    .min(4, "Message should be at least 4 characters")
    .max(1000, "Message should be at most 1000 characters"),
  files: array(string()),
});
const getTicket = string().nonempty("Id is required");
const getRecords = object({
  status: nativeEnum(Ticket_Status).or(literal("all")),
  table: zodSchemas.table(nativeEnum(Prisma.TicketScalarFieldEnum)),
});
const closeTicket = string().nonempty("Id is required");

export type SupportSchema = {
  addReply: TypeOf<typeof addReply>;
  getTicket: TypeOf<typeof getTicket>;
  getRecords: TypeOf<typeof getRecords>;
  closeTicket: TypeOf<typeof closeTicket>;
};

const supportSchema = { addReply, getTicket, getRecords, closeTicket };
export default supportSchema;
