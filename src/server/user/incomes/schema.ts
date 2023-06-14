import zodSchemas from "@/server/utils/schema";
import { Prisma } from "@prisma/client";
import { nativeEnum, undefined, type TypeOf } from "zod";

const referralIncome = zodSchemas.table(
  nativeEnum(Prisma.ReferralIncomeScalarFieldEnum),
);
const roi = zodSchemas.table(nativeEnum(Prisma.RoiScalarFieldEnum));
const getReferralIncomeSummary = undefined();

export type IncomeSchema = {
  getReferralIncomeSummary: TypeOf<typeof getReferralIncomeSummary>;
  referralIncome: TypeOf<typeof referralIncome>;
  roi: TypeOf<typeof roi>;
};

const incomeSchema = {
  getReferralIncomeSummary,
  referralIncome,
  roi,
};
export default incomeSchema;
