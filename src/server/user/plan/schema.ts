import zodSchemas from "@/server/utils/schema";
import { Prisma } from "@prisma/client";
import {
  nativeEnum,
  number,
  object,
  string,
  undefined,
  type TypeOf,
} from "zod";

const getTransaction = string().nonempty("Id is required");
const getRecords = undefined();
const getHistory = zodSchemas.table(
  nativeEnum(Prisma.PlanHistoryScalarFieldEnum),
);
const purchase = object({
  id: string().nonempty("Id is required"),
  investment: number().positive(),
});

export type PlanSchema = {
  getTransaction: TypeOf<typeof getTransaction>;
  getRecords: TypeOf<typeof getRecords>;
  getHistory: TypeOf<typeof getHistory>;
  purchase: TypeOf<typeof purchase>;
};

const planSchema = { getRecords, getHistory, purchase, getTransaction };
export default planSchema;
