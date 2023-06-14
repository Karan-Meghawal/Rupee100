import {
  InstantDepositMethod_Status,
  InstantDepositMethod_chargeType,
} from "@prisma/client";
import {
  coerce,
  nativeEnum,
  object,
  record,
  string,
  undefined,
  type TypeOf,
} from "zod";

const create = object({
  id: string().optional(),
  uniqueId: string().nonempty("Id is required"),
  status: nativeEnum(InstantDepositMethod_Status),
  details: record(string(), string().nonempty("Required")),
  charge: string().transform(Number).or(coerce.number()),
  chargeType: nativeEnum(InstantDepositMethod_chargeType),
});
const getCreateRecords = undefined();
const getRecords = undefined();
const remove = string().nonempty("Id is required");
const updateStatus = object({
  id: string().nonempty("Id is required"),
  status: nativeEnum(InstantDepositMethod_Status),
});

export type InstantDepositSchema = {
  create: TypeOf<typeof create>;
  getCreateRecords: TypeOf<typeof getCreateRecords>;
  getRecords: TypeOf<typeof getRecords>;
  remove: TypeOf<typeof remove>;
  updateStatus: TypeOf<typeof updateStatus>;
};

const instantDepositSchema = {
  create,
  getCreateRecords,
  getRecords,
  remove,
  updateStatus,
};
export default instantDepositSchema;
