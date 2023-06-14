import zodSchemas from "@/server/utils/schema";
import { Prisma } from "@prisma/client";
import { nativeEnum, type TypeOf } from "zod";

const getRecords = zodSchemas.table(nativeEnum(Prisma.UserScalarFieldEnum));

export type MyReferralSchema = {
  getRecords: TypeOf<typeof getRecords>;
};

const myReferralSchema = { getRecords };
export default myReferralSchema;
