import { prisma } from "@/server/db";
import { type UserContext } from "@/server/trpc";
import { User_Status, type Prisma } from "@prisma/client";
import { prismaFilter } from "@/server/utils/prisma";
import { type TotalTeamSchema } from "../schema";

const getRecords = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: TotalTeamSchema["getRecords"];
}) => {
  const { user } = ctx;
  const {
    row: { lft, rgt },
  } = user;

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
    lft: {
      gte: lft,
    },
    rgt: {
      lte: rgt,
    },
    OR: [
      { firstName: prismaFilter.string(searchFilter) },
      {
        lastName: prismaFilter.string(searchFilter),
      },
      {
        email: prismaFilter.string(searchFilter),
      },
      {
        userName: prismaFilter.string(searchFilter),
      },
      {
        status: prismaFilter.enum(searchFilter, User_Status),
      },
      {
        createdAt: prismaFilter.date(searchFilter),
      },
    ],
  };

  const [rows, rowCount] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        avatar: true,
        firstName: true,
        lastName: true,
        email: true,
        userName: true,
        userId: true,
        createdAt: true,
        kyc: true,
        status: true,
      },
      ...(sortField && {
        orderBy: {
          [sortField]: sortOrder,
        },
      }),
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.user.count({
      where,
    }),
  ]);

  return { rows, rowCount };
};

export default getRecords;
