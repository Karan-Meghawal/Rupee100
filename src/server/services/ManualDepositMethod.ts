import { type ManualDepositMethod as ManualDepositMethodModel } from "@prisma/client";
import { prisma } from "../db";
import { NotFoundError } from "../utils/errors";

export default class ManualDepositMethod {
  public readonly id: string;
  public readonly row: ManualDepositMethodModel;

  private constructor(row: ManualDepositMethodModel) {
    this.row = row;
    this.id = row.id;
  }

  public static async getInstance(id: string, error?: string) {
    const row = await prisma.manualDepositMethod.findUnique({
      where: {
        id,
      },
    });
    if (!row)
      throw NotFoundError(error ?? `Deposit Method not found for id ${id}`);
    return new this(row);
  }

  calCharge(amount: number) {
    const { charge, chargeType } = this.row;
    return chargeType === "fixed" ? amount : (amount * charge) / 100;
  }
}
