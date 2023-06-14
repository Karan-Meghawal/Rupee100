import { prisma } from "@/server/db";
import { type UserContext } from "@/server/trpc";
import { type Prisma, User_Status } from "@prisma/client";
import { prismaFilter } from "@/server/utils/prisma";
import { type MyReferralSchema } from "../schema";

const getRecords = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: MyReferralSchema["getRecords"];
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

  const where: Prisma.UserWhereInput = {
    referralId: userId,
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
        userId: prismaFilter.number(searchFilter),
      },
      {
        createdAt: prismaFilter.date(searchFilter),
      },
      {
        status: prismaFilter.enum(searchFilter, User_Status),
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
