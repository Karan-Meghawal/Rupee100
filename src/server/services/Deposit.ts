/* eslint-disable no-underscore-dangle */
import { type Deposit as DepositRow } from "@prisma/client";
import { prisma } from "../db";
import { NotFoundError } from "../utils/errors";

export default class Deposit {
  public readonly id: string;
  public readonly row: DepositRow;

  private constructor(row: DepositRow) {
    this.row = row;
    this.id = row.id;
  }

  public static async getInstance(id: string, error?: string) {
    const row = await prisma.deposit.findUnique({
      where: {
        transactionId: id,
      },
    });
    if (!row) throw NotFoundError(error ?? `No deposit record found for ${id}`);
    return new this(row);
  }

  // todo currency
  // eslint-disable-next-line class-methods-use-this
  get currency() {
    return "USD";
  }

  public static async getInstanceByCoinbaseId(id: string, error?: string) {
    const row = await prisma.deposit.findFirst({
      where: {
        coinbaseId: id,
      },
    });
    if (!row) throw NotFoundError(error ?? `No deposit record found for ${id}`);
    return new this(row);
  }

  public static async getInstanceByCoingateId(id: string, error?: string) {
    const row = await prisma.deposit.findFirst({
      where: {
        coingateId: id,
      },
    });
    if (!row) throw NotFoundError(error ?? `No deposit record found for ${id}`);
    return new this(row);
  }

  verifyUser(userId: number, error?: string) {
    if (this.row.userId !== userId)
      throw NotFoundError(error ?? `No deposit record found for ${this.id}`);
  }

  public static async isCoinbaseId(id: string) {
    const row = await prisma.deposit.findFirst({
      where: {
        coinbaseId: id,
      },
    });
    return row;
  }


  public static async getDepositInReviewCount() {
    const count = await prisma.deposit.count({
      where: {
        status: "review",
      },
    });
    return count;
  }

  public static async getDepositInReview() {
    const review = await prisma.deposit.aggregate({
      where: {
        status: "review",
      },
      _sum: {
        netAmount: true,
      },
    });
    return review._sum.netAmount ?? 0;
  }

  public static async getTotalDeposit() {
    const deposit = await prisma.deposit.aggregate({
      _sum: {
        netAmount: true,
      },
      where: {
        status: {
          in: ["approved", "credit"],
        },
      },
    });
    return deposit._sum.netAmount ?? 0;
  }
}
