import { prisma } from "@/server/db";
import { type UserContext } from "@/server/trpc";
import { prismaFilter } from "@/server/utils/prisma";
import { PlanHistory_Status, type Prisma } from "@prisma/client";
import { type PlanSchema } from "../schema";

const getHistory = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: PlanSchema["getHistory"];
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

  const where: Prisma.PlanHistoryWhereInput = {
    userId,
    OR: !searchFilter
      ? undefined
      : [
          {
            planName: prismaFilter.string(searchFilter),
          },
          {
            investment: prismaFilter.number(searchFilter),
          },
          {
            validity: prismaFilter.number(searchFilter),
          },
          {
            validTill: prismaFilter.date(searchFilter),
          },
          {
            createdAt: prismaFilter.date(searchFilter),
          },
          {
            status: prismaFilter.enum(searchFilter, PlanHistory_Status),
          },
        ],
  };

  const [rows, rowCount] = await Promise.all([
    prisma.planHistory.findMany({
      where,
      ...(sortField && {
        orderBy: {
          [sortField]: sortOrder,
        },
      }),
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.planHistory.count({
      where,
    }),
  ]);

  return { rows, rowCount };
};
export default getHistory;
