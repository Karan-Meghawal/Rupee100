import { generateRandomFloat } from "@/utils/fns";
import { type Plan as PlanModel } from "@prisma/client";
import { prisma } from "../db";
import { ClientError, NotFoundError } from "../utils/errors";

export default class Plan {
  public readonly row: PlanModel;
  public readonly id: string;

  private constructor(row: PlanModel) {
    this.row = row;
    this.id = row.id;
  }

  public static async getInstance(id: string, error?: string) {
    const text = error ?? `Plan not exist for id ${id}`;
    const row = await prisma.plan.findUnique({
      where: {
        id,
      },
    });
    if (!row) throw NotFoundError(text);
    return new this(row);
  }

  public validateStatus() {
    if (this.row.status !== "active")
      throw ClientError("Plan is currently unavailable");
  }

  public getReferralIncome(investment: number) {
    const { referralIncome } = this.row;
    const income = (investment * referralIncome) / 100;
    return Number(income.toFixed(2));
  }

  getRandomRoi() {
    const { minRoi, maxRoi } = this.row;
    const random = generateRandomFloat(minRoi, maxRoi);
    return Number(random.toFixed(2));
  }
}
