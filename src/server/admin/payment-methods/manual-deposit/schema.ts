import {
  ManualDepositMethod_ChargeType,
  ManualDepositMethod_Detail_Type,
  ManualDepositMethod_Status,
} from "@prisma/client";
import {
  array,
  coerce,
  nativeEnum,
  number,
  object,
  string,
  undefined,
  type TypeOf,
} from "zod";

const getRecords = undefined();
const getRecord = string().nonempty("Id is required");
const create = object({
  id: string().optional(),
  logo: string().nonempty("Logo is required"),
  name: string().nonempty("Name is required"),
  processingTime: string().nonempty("Processing Time is required"),
  minDeposit: string()
    .transform(Number)
    .pipe(number().gt(0))
    .or(coerce.number().gt(0)),
  maxDeposit: string()
    .transform(Number)
    .pipe(number().gt(0))
    .or(coerce.number().gt(0)),
  charge: string().transform(Number).pipe(number()).or(coerce.number()),
  chargeType: nativeEnum(ManualDepositMethod_ChargeType),
  status: nativeEnum(ManualDepositMethod_Status),
  details: array(
    object({
      label: string().nonempty("Label is required"),
      value: string().nonempty("Value is required"),
      type: nativeEnum(ManualDepositMethod_Detail_Type),
    }),
  ).min(1, "Minimum 1 detail is required"),
}).refine((data) => data.minDeposit < data.maxDeposit, {
  message: "Max. Deposit must be greater than Min. Deposit",
  path: ["maxDeposit"],
});

const createDetail = undefined();
const updateStatus = object({
  id: string().nonempty("Id is required"),
  status: nativeEnum(ManualDepositMethod_Status),
});
const remove = string().nonempty("Id is required");

export type ManualDepositMethodSchema = {
  getRecords: TypeOf<typeof getRecords>;
  getRecord: TypeOf<typeof getRecord>;
  create: TypeOf<typeof create>;
  createDetail: TypeOf<typeof createDetail>;
  updateStatus: TypeOf<typeof updateStatus>;
  remove: TypeOf<typeof remove>;
};

const manualDepositMethodSchema = {
  getRecords,
  getRecord,
  create,
  updateStatus,
  remove,
};
export default manualDepositMethodSchema;
