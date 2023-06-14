import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { User_Status, type Prisma, User_PlacementSide } from "@prisma/client";
import { prismaFilter } from "@/server/utils/prisma";
import { type UserSchema } from "../schema";

const getRecords = async ({
  input,
}: {
  ctx: AdminContext;
  input: UserSchema["getRecords"];
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

  const where: Prisma.UserWhereInput = {
    ...(status !== "all" && {
      status,
    }),
    OR: [
      { email: prismaFilter.string(searchFilter) },
      {
        userName: prismaFilter.string(searchFilter),
      },
      {
        firstName: prismaFilter.string(searchFilter),
      },
      {
        lastName: prismaFilter.string(searchFilter),
      },
      {
        status: prismaFilter.enum(searchFilter, User_Status),
      },
      {
        userId: prismaFilter.number(searchFilter),
      },
      {
        referral: {
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
        placement: {
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
        placementSide: prismaFilter.enum(searchFilter, User_PlacementSide),
      },
      {
        createdAt: prismaFilter.date(searchFilter),
      },
    ],
  };

  const [rows, rowCount] = await Promise.all([
    prisma.user.findMany({
      where,
      include: {
        referral: {
          select: {
            userName: true,
            avatar: true,
            userId: true,
          },
        },
        placement: {
          select: {
            userName: true,
            avatar: true,
            userId: true,
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
    prisma.user.count({
      where,
    }),
  ]);

  return { rows, rowCount };
};

export default getRecords;
