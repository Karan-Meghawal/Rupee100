import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { prismaFilter } from "@/server/utils/prisma";
import {
  Transaction_Category,
  Transaction_Status,
  type Prisma,
} from "@prisma/client";
import { type ReportSchema } from "../schema";

const transactions = async ({
  input,
}: {
  ctx: AdminContext;
  input: ReportSchema["transactions"];
}) => {
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
    OR: [
      { amount: prismaFilter.number(searchFilter) },
      {
        category: prismaFilter.enum(searchFilter, Transaction_Category),
      },
      {
        createdAt: prismaFilter.date(searchFilter),
      },
      {
        updatedAt: prismaFilter.date(searchFilter),
      },
      {
        description: prismaFilter.string(searchFilter),
      },
      {
        status: prismaFilter.enum(searchFilter, Transaction_Status),
      },
      {
        charge: prismaFilter.number(searchFilter),
      },
      {
        netAmount: prismaFilter.number(searchFilter),
      },
      {
        userId: prismaFilter.number(searchFilter),
      },
    ],
  };

  const [rows, rowCount] = await Promise.all([
    prisma.transaction.findMany({
      include: {
        user: {
          select: {
            userName: true,
            userId: true,
            avatar: true,
          },
        },
      },
      ...(sortField && {
        orderBy: {
          [sortField]: sortOrder,
        },
      }),
      skip: page * pageSize,
      take: pageSize,
      where,
    }),
    prisma.transaction.count({
      where,
    }),
  ]);

  return { rows, rowCount };
};
export default transactions;
