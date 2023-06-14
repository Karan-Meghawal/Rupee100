import zodSchemas from "@/server/utils/schema";
import { Prisma } from "@prisma/client";
import {
  coerce,
  nativeEnum,
  number,
  object,
  string,
  undefined,
  type TypeOf,
} from "zod";

const transfer = object({
  receiverId: number(),
  amount: string()
    .transform(Number)
    .pipe(coerce.number().gt(0))
    .or(coerce.number().gt(0)),
});

const getRecords = zodSchemas.table(
  nativeEnum(Prisma.TransferPaymentScalarFieldEnum),
);
const getConfig = undefined();
const searchUser = string().optional();
const getWallet = undefined();

export type TransferPaymentSchema = {
  transfer: TypeOf<typeof transfer>;
  getRecords: TypeOf<typeof getRecords>;
  getConfig: TypeOf<typeof getConfig>;
  searchUser: TypeOf<typeof searchUser>;
  getWallet: TypeOf<typeof getWallet>;
};

const transferPaymentSchema = {
  transfer,
  getRecords,
  getConfig,
  searchUser,
  getWallet,
};

export default transferPaymentSchema;
