import { type UserKyc as KycModel } from "@prisma/client";
import { prisma } from "../db";
import { NotFoundError } from "../utils/errors";

export default class UserKyc {
  public readonly row: KycModel;
  public readonly id: string;

  private constructor(row: KycModel) {
    this.row = row;
    this.id = row.id;
  }

  public static async getInstance(id: string, error?: string) {
    const row = await prisma.userKyc.findUnique({
      where: {
        id,
      },
    });
    if (!row)
      throw NotFoundError(error ?? `Kyc Request Not Found with id ${id}`);
    return new this(row);
  }

  public static async getPendingRequestCount() {
    const requests = await prisma.userKyc.count({
      where: {
        status: "pending",
      },
    });
    return requests;
  }
}
