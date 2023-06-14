import { type PlanHistory as PlanHistoryModel } from "@prisma/client";
import { type PrismaTransaction } from "../db";
import { ServerError } from "../utils/errors";

export default class PlanHistory {
  public readonly row: PlanHistoryModel;

  private constructor(row: PlanHistoryModel) {
    this.row = row;
  }

  public static async getActivePlanHistory(
    userId: number,
    prismaTx: PrismaTransaction,
  ) {
    const row = await prismaTx.planHistory.findFirst({
      where: {
        userId,
        status: "active",
      },
    });
    if (!row) throw ServerError(`User ${userId} is not premium`);
    return new this(row);
  }

  get id() {
    return this.row.id;
  }

  get userId() {
    return this.row.userId;
  }

  get transactionId() {
    return this.row.transactionId;
  }

  public async updateRoiIncome(amount: number, prismaTx: PrismaTransaction) {
    await prismaTx.planHistory.update({
      where: {
        userId: this.userId,
        transactionId: this.transactionId,
      },
      data: {
        roiIncome: {
          increment: amount,
        },
      },
    });
  }

  public async updateReferralIncome(
    amount: number,
    prismaTx: PrismaTransaction,
  ) {
    await prismaTx.planHistory.update({
      where: {
        userId: this.userId,
        transactionId: this.transactionId,
      },
      data: {
        referralIncome: {
          increment: amount,
        },
      },
    });
  }
}
