import { Plan_Status } from "@prisma/client";
import {
  coerce,
  nativeEnum,
  object,
  string,
  undefined,
  type TypeOf,
} from "zod";

const create = object({
  id: string().optional(),
  name: string()
    .nonempty("Name is required")
    .max(20, "Maximum 20 characters are allowed"),
  description: string()
    .nonempty("Description is required")
    .max(50, "Maximum 50 characters are allowed"),
  minInvestment: string()
    .transform(Number)
    .pipe(coerce.number().gt(0))
    .or(coerce.number().gt(0)),
  maxInvestment: string()
    .transform(Number)
    .pipe(coerce.number().gt(0))
    .or(coerce.number().gt(0)),
  minRoi: string()
    .transform(Number)
    .pipe(coerce.number().gt(0))
    .or(coerce.number().gt(0)),
  maxRoi: string()
    .transform(Number)
    .pipe(coerce.number().gt(0))
    .or(coerce.number().gt(0)),
  referralIncome: string()
    .transform(Number)
    .pipe(coerce.number().gt(0))
    .or(coerce.number().gt(0)),
  validity: string()
    .transform(Number)
    .pipe(coerce.number().min(1))
    .or(coerce.number().min(1)),
  status: nativeEnum(Plan_Status),
})
  .refine((data) => data.minRoi < data.maxRoi, {
    message: "Max. Roi should be greater than Min. Roi",
    path: ["maxRoi"],
  })
  .refine((data) => data.minInvestment < data.maxInvestment, {
    message: "Max. Investment should be greater than Min. Investment",
    path: ["maxInvestment"],
  });

const getRecord = string().nonempty("Id is required");
const getRecords = undefined();
const remove = string().nonempty("Id is required");
const markPopular = string().nonempty("Id is required");

export type PlanSchema = {
  create: TypeOf<typeof create>;
  getRecord: TypeOf<typeof getRecord>;
  getRecords: TypeOf<typeof getRecords>;
  remove: TypeOf<typeof remove>;
  markPopular: TypeOf<typeof markPopular>;
};
const planSchema = { create, getRecord, getRecords, remove, markPopular };
export default planSchema;
