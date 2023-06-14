import {
  type WithdrawMethod_Details,
  type Prisma,
  type UserWithdrawMethod as UserWithdrawMethodModel,
  type WithdrawMethod as WithdrawMethodModel,
} from "@prisma/client";
import { prisma } from "../db";
import { ClientError, NotFoundError } from "../utils/errors";
import { prismaJsonToRecord } from "../utils/fns";

export default class UserWithdrawMethod {
  public readonly userId: number;
  public readonly methodId: string;
  public readonly row: UserWithdrawMethodModel;
  public readonly methodRow: WithdrawMethodModel;

  private constructor(
    row: UserWithdrawMethodModel & {
      method: WithdrawMethodModel;
    },
  ) {
    const { method, ...rowData } = row;
    this.row = rowData;
    this.methodRow = method;
    this.userId = row.userId;
    this.methodId = row.methodId;
  }

  get details() {
    return prismaJsonToRecord(this.row.details);
  }

  static async isId(userId: number, id: string) {
    const row = await prisma.userWithdrawMethod.findUnique({
      where: {
        userId_methodId: {
          userId,
          methodId: id,
        },
      },
    });
    return !!row;
  }

  static async getInstance(userId: number, id: string) {
    const row = await prisma.userWithdrawMethod.findUnique({
      where: {
        userId_methodId: {
          userId,
          methodId: id,
        },
      },
      include: {
        method: true,
      },
    });
    if (!row) throw NotFoundError("Withdraw Method not exists");

    return new this(row);
  }

  isUserDataValid() {
    const userDetails = this.details;
    if (!userDetails) return false;
    return this.methodRow.details.every((detail) => detail.name in userDetails);
  }

  static isFormDataValid(
    methodDetails: WithdrawMethod_Details[],
    userDetails: Record<string, string>,
  ) {
    return methodDetails.every((detail) => detail.name in userDetails);
  }

  validateWithdrawData() {
    const isUserDataValid = this.isUserDataValid();
    if (!isUserDataValid)
      throw ClientError("You need to update details to withdraw");
  }

  public static async create(data: Prisma.WithdrawCreateInput) {
    return prisma.withdraw.create({
      data,
    });
  }
}
