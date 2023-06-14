import { prisma } from "@/server/db";
import { type UserContext } from "@/server/trpc";
import { prismaFilter } from "@/server/utils/prisma";
import { type Prisma, Roi_Status } from "@prisma/client";
import { type IncomeSchema } from "../schema";

const roi = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: IncomeSchema["roi"];
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

  const {
    user: { userId },
  } = ctx;

  const where: Prisma.RoiWhereInput = {
    userId,
    OR: !searchFilter
      ? undefined
      : [
          {
            amount: prismaFilter.number(searchFilter),
          },
          {
            createdAt: prismaFilter.date(searchFilter),
          },
          {
            status: prismaFilter.enum(searchFilter, Roi_Status),
          },
          {
            transactionId: prismaFilter.id(searchFilter),
          },
        ],
  };

  const [rows, rowCount] = await Promise.all([
    prisma.roi.findMany({
      where,
      ...(sortField && {
        orderBy: {
          [sortField]: sortOrder,
        },
      }),
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.roi.count({
      where,
    }),
  ]);

  return { rows, rowCount };
};
export default roi;
