import { prisma } from "@/server/db";
import { type UserContext } from "@/server/trpc";
import { prismaFilter } from "@/server/utils/prisma";
import {
  Deposit_ChargeType,
  Deposit_Status,
  type Prisma,
} from "@prisma/client";
import { type DepositSchema } from "../schema";

const getRecords = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: DepositSchema["getRecords"];
}) => {
  const {
    user: { userId },
  } = ctx;

  const {
    paginationModel: { page, pageSize },
    sortModel,
    searchFilter,
  } = input;

  let sortField: string | null = null;
  let sortOrder: "desc" | "asc" = "asc";

  if (sortModel.length && sortModel[0]) {
    const { field, sort } = sortModel[0]!;
    if (sort) {
      sortField = field;
      sortOrder = sort;
    }
  }

  const where: Prisma.DepositWhereInput = {
    userId,
    OR: [
      { transactionId: prismaFilter.id(searchFilter) },
      {
        amount: prismaFilter.number(searchFilter),
      },
      {
        charge: prismaFilter.number(searchFilter),
      },
      {
        chargeType: prismaFilter.enum(searchFilter, Deposit_ChargeType),
      },
      {
        netAmount: prismaFilter.number(searchFilter),
      },
      {
        createdAt: prismaFilter.date(searchFilter),
      },
      {
        updatedAt: prismaFilter.date(searchFilter),
      },
      {
        status: prismaFilter.enum(searchFilter, Deposit_Status),
      },
      {
        method: {
          is: {
            name: prismaFilter.string(searchFilter),
          },
        },
      },
    ],
  };

  const [rows, rowCount] = await Promise.all([
    prisma.deposit.findMany({
      where,
      ...(sortField && {
        orderBy: {
          [sortField]: sortOrder,
        },
      }),
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.deposit.count({
      where,
    }),
  ]);
  return { rows, rowCount };
};
export default getRecords;
