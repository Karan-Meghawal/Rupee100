import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { prismaFilter } from "@/server/utils/prisma";
import { type Prisma } from "@prisma/client";
import { type DepositSchema } from "../schema";

const getRecords = async ({
  input,
}: {
  ctx: AdminContext;
  input: DepositSchema["getRecords"];
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

  const where: Prisma.DepositWhereInput = {
    status:
      status === "all" || status === "instant" || status === "admin"
        ? undefined
        : status,
    type:
      (status === "instant" && "instant") ||
      (status === "admin" && "admin") ||
      undefined,
    OR: !searchFilter
      ? undefined
      : [
          { amount: prismaFilter.number(searchFilter) },
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
        ],
  };

  const [rows, rowCount] = await Promise.all([
    prisma.deposit.findMany({
      where,
      ...(sortField && {
        orderBy: {
          // todo fix type
          [sortField]: sortField === "method" ? { name: sortOrder } : sortOrder,
        },
      }),
      skip: page * pageSize,
      take: pageSize,
      include: {
        user: {
          select: {
            userId: true,
            userName: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    }),
    prisma.deposit.count({
      where,
    }),
  ]);
  return { rows, rowCount };
};
export default getRecords;
