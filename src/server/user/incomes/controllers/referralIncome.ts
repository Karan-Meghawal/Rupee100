import { type UserContext } from "@/server/trpc";
import { prisma } from "@/server/db";
import { ReferralIncome_Status, type Prisma } from "@prisma/client";
import { prismaFilter } from "@/server/utils/prisma";
import { type IncomeSchema } from "../schema";

const referralIncome = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: IncomeSchema["referralIncome"];
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

  const where: Prisma.ReferralIncomeWhereInput = {
    referralId: userId,
    OR: [
      {
        user: {
          OR: [
            { firstName: prismaFilter.string(searchFilter) },
            {
              lastName: prismaFilter.string(searchFilter),
            },
          ],
        },
      },
      { amount: prismaFilter.number(searchFilter) },
      {
        transactionId: prismaFilter.id(searchFilter),
      },
      {
        createdAt: prismaFilter.date(searchFilter),
      },
      {
        status: prismaFilter.enum(searchFilter, ReferralIncome_Status),
      },
      {
        user: {
          OR: [{ email: "" }, { firstName: "" }],
        },
      },
      {
        user: {
          AND: [{ email: "" }, { firstName: "" }],
        },
      },
      {
        user: {
          email: "",
          firstName: "",
        },
      },
    ],
  };

  const [rows, rowCount] = await Promise.all([
    prisma.referralIncome.findMany({
      where,
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
