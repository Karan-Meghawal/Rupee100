import zodSchemas from "@/server/utils/schema";
import { Prisma } from "@prisma/client";
import {
  date,
  object,
  record,
  string,
  undefined,
  type TypeOf,
  coerce,
  nativeEnum,
} from "zod";

const createMethod = object({
  id: string().nonempty("Id is required"),
  details: record(
    string(),
    string().or(date().transform((val) => val.toISOString())),
  ),
});
const getDataForPayment = string().nonempty("Id is required");
const getMethodData = string().nonempty("Id is required");
const getMethodRecords = undefined();
const getRecord = string().nonempty("Id is required");
const getRecords = zodSchemas.table(
  nativeEnum({ ...Prisma.WithdrawScalarFieldEnum, method: "method" }),
);
const getUserMethodRecords = undefined();
const payment = object({
  id: string().nonempty("Id is required"),
  amount: string()
    .transform(Number)
    .pipe(coerce.number().gt(0))
    .or(coerce.number().gt(0)),
});
const removeMethod = string().nonempty("Id is required");

export type WithdrawSchema = {
  createMethod: TypeOf<typeof createMethod>;
  getDataForPayment: TypeOf<typeof getDataForPayment>;
  getMethodData: TypeOf<typeof getMethodData>;
  getMethodRecords: TypeOf<typeof getMethodRecords>;
  getRecord: TypeOf<typeof getRecord>;
  getRecords: TypeOf<typeof getRecords>;
  getUserMethodRecords: TypeOf<typeof getUserMethodRecords>;
  payment: TypeOf<typeof payment>;
  removeMethod: TypeOf<typeof removeMethod>;
};

const withdrawSchema = {
  createMethod,
  getDataForPayment,
  getMethodData,
  getMethodRecords,
  getRecord,
  getRecords,
  getUserMethodRecords,
  payment,
  removeMethod,
};
export default withdrawSchema;
