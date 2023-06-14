import { KycForm_FileExtensions, KycForm_InputType } from "@prisma/client";
import {
  array,
  boolean,
  discriminatedUnion,
  literal,
  nativeEnum,
  object,
  string,
  undefined,
  type TypeOf,
} from "zod";

const create = discriminatedUnion("inputType", [
  object({
    inputType: literal(KycForm_InputType.dropdown),
    dropdownOptions: array(
      object({ option: string().nonempty("Option is required") }),
    ).min(1, "Minimal 1 dropdown option is required"),
  }),
  object({
    inputType: literal(KycForm_InputType.file),
    fileExtensions: array(nativeEnum(KycForm_FileExtensions)).min(
      1,
      "Minimum 1 File Extension is required",
    ),
  }),
  object({
    inputType: literal(KycForm_InputType.date),
  }),
  object({
    inputType: literal(KycForm_InputType.input),
  }),
  object({
    inputType: literal(KycForm_InputType.textarea),
  }),
]).and(
  object({
    id: string().optional(),
    label: string().nonempty("Label is required"),
    required: boolean(),
    inputType: nativeEnum(KycForm_InputType),
  }),
);

const remove = string().nonempty("Id is required");
const records = undefined();

export type KycSchema = {
  create: TypeOf<typeof create>;
  remove: TypeOf<typeof remove>;
  records: TypeOf<typeof records>;
};

const kycSchema = {
  create,
  remove,
  records,
};
export default kycSchema;
