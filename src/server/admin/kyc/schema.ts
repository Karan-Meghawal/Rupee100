import zodSchemas from "@/server/utils/schema";
import { Prisma, UserKyc_Status } from "@prisma/client";
import { literal, nativeEnum, object, string, type TypeOf } from "zod";

const getRecords = object({
  status: nativeEnum(UserKyc_Status).or(literal("all")),
  table: zodSchemas.table(
    nativeEnum({
      ...Prisma.UserKycScalarFieldEnum,
      "user.email": "user.email",
    }),
  ),
});
const getRecord = string().nonempty("Id is required");
const approve = string().nonempty("Id is required");
const reject = object({
  id: string().nonempty("Id is required"),
  message: string().nonempty("Message is required").max(1000),
});

export type KycSchema = {
  approve: TypeOf<typeof approve>;
  getRecord: TypeOf<typeof getRecord>;
  getRecords: TypeOf<typeof getRecords>;
  reject: TypeOf<typeof reject>;
};

const kycSchema = {
  approve,
  getRecord,
  getRecords,
  reject,
};
export default kycSchema;
