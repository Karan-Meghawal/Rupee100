import zodSchemas from "@/server/utils/schema";
import { Prisma } from "@prisma/client";
import { date, literal, nativeEnum, object, type TypeOf } from "zod";

const analytics = object({
  event: literal("registration").or(literal("deposit")).or(literal("withdraw")),
  startDate: date(),
  endDate: date(),
});

const referralIncome = zodSchemas.table(
  nativeEnum(Prisma.ReferralIncomeScalarFieldEnum),
);
const roiIncome = zodSchemas.table(nativeEnum(Prisma.RoiScalarFieldEnum));
const topEarners = zodSchemas.table(
  nativeEnum({ ...Prisma.UserScalarFieldEnum, earning: "earning" }),
);
const topSponsors = zodSchemas.table(
  nativeEnum({ ...Prisma.UserScalarFieldEnum, referrals: "referrals" }),
);
const transactions = zodSchemas.table(
  nativeEnum(Prisma.TransactionScalarFieldEnum),
);

export type ReportSchema = {
  analytics: TypeOf<typeof analytics>;
  referralIncome: TypeOf<typeof referralIncome>;
  roiIncome: TypeOf<typeof roiIncome>;
  topEarners: TypeOf<typeof topEarners>;
  topSponsors: TypeOf<typeof topSponsors>;
  transactions: TypeOf<typeof transactions>;
};

const reportSchema = {
  analytics,
  referralIncome,
  roiIncome,
  topEarners,
  topSponsors,
  transactions,
};
export default reportSchema;
