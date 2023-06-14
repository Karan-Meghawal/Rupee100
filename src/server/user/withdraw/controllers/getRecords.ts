import { prisma } from "@/server/db";
import { type UserContext } from "@/server/trpc";
import { prismaFilter } from "@/server/utils/prisma";
import { Withdraw_Status, type Prisma } from "@prisma/client";
import { type WithdrawSchema } from "../schema";

const getRecords = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: WithdrawSchema["getRecords"];
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

  const where: Prisma.WithdrawWhereInput = {
    userId,
    OR: [
      {
        method: {
          is: {
            name: prismaFilter.string(searchFilter),
          },
        },
      },
      {
        transactionId: prismaFilter.id(searchFilter),
      },
      {
        amount: prismaFilter.number(searchFilter),
      },
      {
        charge: prismaFilter.number(searchFilter),
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
        status: prismaFilter.enum(searchFilter, Withdraw_Status),
      },
    ],
  };

  const [rows, rowCount] = await Promise.all([
    prisma.withdraw.findMany({
      where,
      ...(sortField && {
        orderBy: {
          [sortField]:
            sortField === "method"
              ? {
                  name: "desc",
                }
              : sortOrder,
        },
      }),
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.withdraw.count({
      where,
    }),
  ]);

  return { rows, rowCount };
};

export default getRecords;
