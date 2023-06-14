import zodSchemas from "@/server/utils/schema";
import { Deposit_Status, Prisma } from "@prisma/client";
import { literal, nativeEnum, object, string, type TypeOf } from "zod";

const getRecords = object({
  status: nativeEnum(Deposit_Status)
    .or(literal("all"))
    .or(literal("instant"))
    .or(literal("admin")),
  table: zodSchemas.table(
    nativeEnum({ ...Prisma.DepositScalarFieldEnum, method: "method" }),
  ),
});

const getRecord = string().nonempty("Id is required");
const approve = object({
  id: string().nonempty("Id is required"),
  message: string().optional(),
});
const reject = object({
  id: string().nonempty("Id is required"),
  message: string().nonempty("Message is required").max(1000),
});

export type DepositSchema = {
  getRecords: TypeOf<typeof getRecords>;
  getRecord: TypeOf<typeof getRecord>;
  approve: TypeOf<typeof approve>;
  reject: TypeOf<typeof reject>;
};

const depositSchema = { getRecords, getRecord, approve, reject };
export default depositSchema;
