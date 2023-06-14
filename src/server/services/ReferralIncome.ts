import { type Prisma } from "@prisma/client";
import { type PrismaTransaction } from "../db";

export default class ReferralIncome {
  static async createIncome(
    data: Prisma.ReferralIncomeCreateInput,
    prismaTx: PrismaTransaction,
  ) {
    await prismaTx.referralIncome.create({ data });
  }
}
