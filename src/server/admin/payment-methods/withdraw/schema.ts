import {
  WithdrawMethod_ChargeType,
  WithdrawMethod_FileExtensions,
  WithdrawMethod_InputType,
  WithdrawMethod_Status,
} from "@prisma/client";
import {
  array,
  boolean,
  coerce,
  discriminatedUnion,
  literal,
  nativeEnum,
  object,
  string,
  undefined,
  type TypeOf,
  number,
} from "zod";

const getRecords = undefined();
const getRecord = string().nonempty("Id is required");
const createDetail = discriminatedUnion("inputType", [
  object({
    inputType: literal(WithdrawMethod_InputType.dropdown),
    dropdownOptions: array(
      object({ option: string().nonempty("Option is required") }),
    ).min(1, "Minimal 1 dropdown option is required"),
  }),
  object({
    inputType: literal(WithdrawMethod_InputType.file),
    fileExtensions: array(nativeEnum(WithdrawMethod_FileExtensions)).min(
      1,
      "Minimum 1 File Extension is required",
    ),
  }),
  object({
    inputType: literal(WithdrawMethod_InputType.date),
  }),
  object({
    inputType: literal(WithdrawMethod_InputType.input),
  }),
  object({
    inputType: literal(WithdrawMethod_InputType.textarea),
  }),
]).and(
  object({
    name: string().optional(),
    label: string().nonempty("Label is required"),
    required: boolean(),
  }),
);

const create = object({
  id: string().optional(),
  logo: string().nonempty("Logo is required"),
  name: string().nonempty("Name is required"),
  processingTime: string().nonempty("Processing time is required"),
  minWithdraw: string()
    .transform(Number)
    .pipe(number().min(1, "Minimum Withdraw is required"))
    .or(coerce.number().min(1, "Minimum Withdraw is required")),
  maxWithdraw: string()
    .transform(Number)
    .pipe(number().min(1, "Maximum Withdraw is required"))
    .or(coerce.number().min(1, "Maximum Withdraw is required")),
  charge: string().transform(Number).pipe(coerce.number()).or(coerce.number()),
  chargeType: nativeEnum(WithdrawMethod_ChargeType),
  status: nativeEnum(WithdrawMethod_Status),
  details: array(createDetail).min(1, "Minimum 1 detail is required"),
}).refine((data) => data.minWithdraw < data.maxWithdraw, {
  message: "Max. Withdraw should be greater the Min. Withdraw",
  path: ["maxWithdraw"],
});

const updateStatus = object({
  id: string().nonempty("Id is required"),
  status: nativeEnum(WithdrawMethod_Status),
});
const remove = string().nonempty("Id is required");

export type WithdrawSchema = {
  getRecords: TypeOf<typeof getRecords>;
  getRecord: TypeOf<typeof getRecord>;
  create: TypeOf<typeof create>;
  createDetail: TypeOf<typeof createDetail>;
  updateStatus: TypeOf<typeof updateStatus>;
  remove: TypeOf<typeof remove>;
};

const withdrawSchema = {
  getRecords,
  getRecord,
  create,
  updateStatus,
  remove,
  createDetail,
};

export default withdrawSchema;
