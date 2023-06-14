import {
  type Prisma,
  type Transaction as TransactionModel,
} from "@prisma/client";
import { type PrismaTransaction } from "../db";

export default class Transaction {
  //  ============================ Properties ============================

  public readonly id: string;
  public readonly row: TransactionModel;

  //  ============================ Constructor ============================

  private constructor(id: string, row: TransactionModel) {
    this.id = id;
    this.row = row;
  }

  //  ============================ Public Static Methods ============================

  public static async createTransaction(
    data: Prisma.TransactionCreateInput,
    prismaTx: PrismaTransaction,
  ) {
    return prismaTx.transaction.create({ data });
  }
}
