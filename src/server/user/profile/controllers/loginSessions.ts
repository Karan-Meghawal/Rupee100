import { prisma } from "@/server/db";
import { type UserContext } from "@/server/trpc";
import { type Prisma } from "@prisma/client";
import { prismaFilter } from "@/server/utils/prisma";
import { type ProfileSchema } from "../schema";

const loginSessions = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: ProfileSchema["loginSessions"];
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

  const where: Prisma.LoginSessionWhereInput = {
    userId,
    OR: [
      { createdAt: prismaFilter.date(searchFilter) },
      {
        os: prismaFilter.string(searchFilter),
      },
      {
        browser: prismaFilter.string(searchFilter),
      },
      {
        agent: prismaFilter.string(searchFilter),
      },
      {
        browser: prismaFilter.string(searchFilter),
      },
      {
        city: prismaFilter.string(searchFilter),
      },
      {
        country: prismaFilter.string(searchFilter),
      },
      {
        ip: prismaFilter.string(searchFilter),
      },
    ],
  };

  const [rows, rowCount] = await Promise.all([
    prisma.loginSession.findMany({
      where,
      ...(sortField && {
        orderBy: {
          [sortField]: sortOrder,
        },
      }),
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.loginSession.count({
      where,
    }),
  ]);

  return { rows, rowCount };
};
export default loginSessions;
