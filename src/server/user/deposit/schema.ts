import zodSchemas from "@/server/utils/schema";
import { Prisma } from "@prisma/client";
import { nativeEnum, string, type TypeOf } from "zod";

const getRecords = zodSchemas.table(nativeEnum(Prisma.DepositScalarFieldEnum));
const getRecord = string().nonempty("Id is required");

export type DepositSchema = {
  getRecords: TypeOf<typeof getRecords>;
  getRecord: TypeOf<typeof getRecord>;
};
const depositSchema = {
  getRecords,
  getRecord,
};
export default depositSchema;
