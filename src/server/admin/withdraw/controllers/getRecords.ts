import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { Withdraw_Status, type Prisma } from "@prisma/client";
import { prismaFilter } from "@/server/utils/prisma";
import { type WithdrawSchema } from "../schema";

const getRecords = async ({
  input,
}: {
  ctx: AdminContext;
  input: WithdrawSchema["getRecords"];
}) => {
  const { status, table } = input;
  const {
    paginationModel: { page, pageSize },
    sortModel,
    searchFilter,
  } = table;
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
    status: status === "all" || status === "admin" ? undefined : status,
    actionBy: status === "admin" ? "admin" : undefined,
    OR: [
      {
        user: {
          OR: [
            { userName: prismaFilter.string(searchFilter) },
            {
              userId: prismaFilter.number(searchFilter),
            },
          ],
        },
      },
      {
        method: {
          is: {
            OR: [{ name: prismaFilter.string(searchFilter) }],
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
        status: prismaFilter.enum(searchFilter, Withdraw_Status),
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
    prisma.withdraw.findMany({
      where,
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
          // todo fix type
          [sortField === "method.name" ? "method" : sortField]:
            sortField === "method.name" ? { name: sortOrder } : sortOrder,
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
