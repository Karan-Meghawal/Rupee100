import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { ReferralIncome_Status, type Prisma } from "@prisma/client";
import { prismaFilter } from "@/server/utils/prisma";
import { type ReportSchema } from "../schema";

const referralIncome = async ({
  input,
}: {
  ctx: AdminContext;
  input: ReportSchema["referralIncome"];
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

  const where: Prisma.ReferralIncomeWhereInput = {
    OR: [
      {
        user: {
          OR: [
            {
              userName: prismaFilter.string(searchFilter),
            },
            {
              userId: prismaFilter.number(searchFilter),
            },
          ],
        },
      },
      {
        amount: prismaFilter.number(searchFilter),
      },
      {
        createdAt: prismaFilter.date(searchFilter),
      },
      {
        status: prismaFilter.enum(searchFilter, ReferralIncome_Status),
      },
    ],
  };

  const [rows, rowCount] = await Promise.all([
    prisma.referralIncome.findMany({
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
          [sortField]: sortOrder,
        },
      }),
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.referralIncome.count({
      where,
    }),
  ]);
  return { rows, rowCount };
};
export default referralIncome;
