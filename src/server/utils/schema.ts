import {
  type EnumLike,
  type ZodNativeEnum,
  array,
  number,
  object,
  string,
  z,
} from "zod";
import { OTP_LENGTH, MIN_PASSWORD_LENGTH } from "../config";
import { isObjectId } from "./fns";

const objectId = (message: string) =>
  string().refine(isObjectId, {
    message,
  });

const otp = string().length(OTP_LENGTH, `Otp must be ${OTP_LENGTH} characters`);

const password = (name: string) =>
  string()
    .nonempty(`${name} is required`)
    .min(
      MIN_PASSWORD_LENGTH,
      `${name} must be at least ${MIN_PASSWORD_LENGTH} characters`,
    )
    .max(20, `${name} must be at most 20 characters`);

const table = <T extends EnumLike>(field: ZodNativeEnum<T>) =>
  object({
    paginationModel: object({
      page: number(),
      pageSize: number(),
    }),
    sortModel: array(
      object({
        field,
        sort: z.enum(["asc", "desc"] as const).nullish(),
      }),
    ).max(1),
    searchFilter: string(),
  });

const zodSchemas = {
  objectId,
  otp,
  password,
  table,
};
export default zodSchemas;
