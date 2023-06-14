import zodSchemas from "@/server/utils/schema";
import { Prisma, User_Status } from "@prisma/client";
import {
  coerce,
  date,
  literal,
  nativeEnum,
  number,
  object,
  record,
  string,
  type TypeOf,
} from "zod";

const deposit = object({
  userId: number(),
  message: string().nonempty("Message is required").max(1000),
  amount: string()
    .transform(Number)
    .pipe(coerce.number().gt(0).max(99999))
    .or(coerce.number().gt(0).max(99999)),
});
const withdraw = object({
  userId: number(),
  message: string().nonempty("Message is required").max(1000),
  amount: string()
    .transform(Number)
    .pipe(coerce.number().gt(0).max(99999))
    .or(coerce.number().gt(0).max(99999)),
});

const getProfile = number();

const getRecords = object({
  status: nativeEnum(User_Status).or(literal("all")),
  table: zodSchemas.table(nativeEnum(Prisma.UserScalarFieldEnum)),
});
const login = number();
const updateProfile = object({
  firstName: string(),
  lastName: string(),
  userId: number(),
  kyc: record(
    string(),
    string().or(date().transform((val) => val.toISOString())),
  ),
});
const updateStatus = object({
  userId: number(),
  status: nativeEnum(User_Status),
});

export type UserSchema = {
  deposit: TypeOf<typeof deposit>;
  getProfile: TypeOf<typeof getProfile>;
  getRecords: TypeOf<typeof getRecords>;
  login: TypeOf<typeof login>;
  updateProfile: TypeOf<typeof updateProfile>;
  updateStatus: TypeOf<typeof updateStatus>;
  withdraw: TypeOf<typeof withdraw>;
};

const userSchema = {
  deposit,
  getProfile,
  getRecords,
  login,
  updateProfile,
  updateStatus,
  withdraw,
};
export default userSchema;
