/* eslint-disable no-underscore-dangle */
import { type Withdraw as WithdrawModel } from "@prisma/client";
import { prisma } from "../db";
import { NotFoundError } from "../utils/errors";

export default class Withdraw {
  public readonly row: WithdrawModel;
  public readonly id: string;

  private constructor(row: WithdrawModel) {
    this.row = row;
    this.id = row.id;
  }

  static async isId(id: string) {
    const row = await prisma.withdraw.findUnique({
      where: {
        id,
      },
    });
    return !!row;
  }

  static async getInstance(id: string, error?: string) {
    const text = error ?? `Withdraw record not found for id ${id}`;
    const row = await prisma.withdraw.findUnique({
      where: {
        transactionId: id,
      },
    });
    if (!row) throw NotFoundError(text);
    return new this(row);
  }

  validateUser(userId: number) {
    const isOwner = this.row.userId === userId;
    if (!isOwner) return NotFoundError("Withdraw record not found");
    return null;
  }

  public static async getPendingWithdrawCount() {
    const users = await prisma.withdraw.count({
      where: {
        status: "pending",
      },
    });
    return users;
  }

  public static async getPendingWithdraw() {
    const withdraw = await prisma.withdraw.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: "pending",
      },
    });
    return withdraw._sum.amount ?? 0;
  }

  public static async getTotalWithdraw() {
    const withdraw = await prisma.withdraw.aggregate({
      where: {
        status: "success",
      },
      _sum: {
        amount: true,
      },
    });
    return withdraw._sum.amount ?? 0;
  }
}
