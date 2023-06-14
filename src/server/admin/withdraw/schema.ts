import zodSchemas from "@/server/utils/schema";
import { Prisma, Withdraw_Status } from "@prisma/client";
import { literal, nativeEnum, object, string, type TypeOf } from "zod";

const approve = object({
  id: string().nonempty("Id is required"),
  message: string().max(1000),
});
const getRecord = string().nonempty("Id is required");
const getRecords = object({
  status: nativeEnum(Withdraw_Status).or(literal("all")).or(literal("admin")),
  table: zodSchemas.table(
    nativeEnum({
      ...Prisma.WithdrawScalarFieldEnum,
      "method.name": "method.name",
    }),
  ),
});
const reject = object({
  id: string().nonempty("Id is required"),
  message: string().nonempty("Message is required").max(1000),
});

export type WithdrawSchema = {
  approve: TypeOf<typeof approve>;
  getRecord: TypeOf<typeof getRecord>;
  getRecords: TypeOf<typeof getRecords>;
  reject: TypeOf<typeof reject>;
};
const withdrawSchema = { approve, getRecord, getRecords, reject };
export default withdrawSchema;
