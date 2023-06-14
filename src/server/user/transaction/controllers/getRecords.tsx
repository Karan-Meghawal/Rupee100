import { prisma } from "@/server/db";
import { type UserContext } from "@/server/trpc";
import { prismaFilter } from "@/server/utils/prisma";
import { Transaction_Status, type Prisma } from "@prisma/client";
import { type TransactionSchema } from "../schema";

const getRecords = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: TransactionSchema["getRecords"];
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

  const where: Prisma.TransactionWhereInput = {
    userId,
    OR: [
      {
        id: prismaFilter.id(searchFilter),
      },
      { description: prismaFilter.string(searchFilter) },
      { charge: prismaFilter.number(searchFilter) },
      { amount: prismaFilter.number(searchFilter) },
      { netAmount: prismaFilter.number(searchFilter) },
      {
        status: prismaFilter.enum<Transaction_Status>(
          searchFilter,
          Transaction_Status,
        ),
      },
      {
        createdAt: prismaFilter.date(searchFilter),
      },
      {
        updatedAt: prismaFilter.date(searchFilter),
      },
    ],
  };

  const [rows, rowCount] = await Promise.all([
    prisma.transaction.findMany({
      where,
      ...(sortField && {
        orderBy: {
          [sortField]: sortOrder,
        },
      }),
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.transaction.count({
      where,
    }),
  ]);

  return { rows, rowCount };
};

export default getRecords;
