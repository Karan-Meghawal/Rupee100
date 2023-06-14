import { type Prisma } from "@prisma/client";
import { type PrismaTransaction } from "../db";
import Setting from "./Setting";

export default class TransferPayment {
  public static async getConfig() {
    const setting = await Setting.getInstance();
    return setting.row.transferPayment;
  }

  public static async createPayment(
    data: Prisma.TransferPaymentCreateInput,
    prismaTx: PrismaTransaction,
  ) {
    return prismaTx.transferPayment.create({ data });
  }

  public static async calculateCharge(amount: number) {
    const config = await this.getConfig();
    const { charge, type } = config;
    if (type === "fixed") return amount;
    return (amount * charge) / 100;
  }
}
