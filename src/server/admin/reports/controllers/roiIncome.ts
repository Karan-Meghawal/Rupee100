import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { prismaFilter } from "@/server/utils/prisma";
import { Roi_Status, type Prisma } from "@prisma/client";
import { type ReportSchema } from "../schema";

const roiIncome = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: ReportSchema["roiIncome"];
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

  const where: Prisma.RoiWhereInput = {
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
      include: {
        user: true,
      },
    }),
    prisma.roi.count({
      where,
    }),
  ]);

  return { rows, rowCount };
};
export default roiIncome;
