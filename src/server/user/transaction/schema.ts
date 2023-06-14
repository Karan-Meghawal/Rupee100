import zodSchemas from "@/server/utils/schema";
import { Prisma } from "@prisma/client";
import { nativeEnum, type TypeOf } from "zod";

const getRecords = zodSchemas.table(
  nativeEnum(Prisma.TransactionScalarFieldEnum),
);

export type TransactionSchema = {
  getRecords: TypeOf<typeof getRecords>;
};

const transactionSchema = {
  getRecords,
};
export default transactionSchema;
