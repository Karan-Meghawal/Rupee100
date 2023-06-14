import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { type Prisma } from "@prisma/client";
import { prismaFilter } from "@/server/utils/prisma";
import { type ReportSchema } from "../schema";

const topSponsors = async ({
  input,
}: {
  ctx: AdminContext;
  input: ReportSchema["topSponsors"];
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

  const where: Prisma.UserWhereInput = {
    ReferralIncome: {
      every: {
        status: "credit",
      },
    },
    OR: [
      {
        userName: prismaFilter.string(searchFilter),
      },
      {
        email: prismaFilter.string(searchFilter),
      },
      {
        firstName: prismaFilter.string(searchFilter),
      },
      {
        lastName: prismaFilter.string(searchFilter),
      },
      {
        userId: prismaFilter.number(searchFilter),
      },
      {
        createdAt: prismaFilter.date(searchFilter),
      },
    ],
  };

  const [rows, rowCount] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
        userId: true,
        userName: true,
        avatar: true,
        createdAt: true,
        email: true,
        firstName: true,
        lastName: true,
        _count: {
          select: {
            ReferralIncome: {
              where: {
                status: "credit",
              },
            },
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
    prisma.user.count({
      where,
    }),
  ]);

  return { rows, rowCount };
};
export default topSponsors;
