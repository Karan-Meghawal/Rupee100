import { type WithdrawMethod as WithdrawMethodModel } from "@prisma/client";
import { prisma } from "../db";
import { ClientError, NotFoundError } from "../utils/errors";

export default class WithdrawMethod {
  public readonly row: WithdrawMethodModel;
  public readonly id: string;

  private constructor(row: WithdrawMethodModel) {
    this.row = row;
    this.id = row.id;
  }

  public static async isId(id: string) {
    const row = await prisma.withdrawMethod.findFirst({
      where: {
        id,
      },
    });
    return !!row;
  }

  public static async getInstance(id: string, error?: string) {
    const text = error ?? `Withdraw Method not exists for id ${id}`;
    const row = await prisma.withdrawMethod.findFirst({
      where: {
        id,
      },
    });
    if (!row) throw NotFoundError(text);
    return new this(row);
  }

  calcCharge(amount: number) {
    const { charge, chargeType } = this.row;
    return chargeType === "fixed" ? charge : (amount * charge) / 100;
  }

  validateStatus() {
    if (this.row.status !== "active")
      throw ClientError("Withdraw Method is currently unavailable");
  }
}
