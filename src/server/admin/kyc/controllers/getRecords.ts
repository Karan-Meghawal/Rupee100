import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { prismaFilter } from "@/server/utils/prisma";
import { UserKyc_Status, type Prisma } from "@prisma/client";
import { type KycSchema } from "../schema";

const getRecords = async ({
  input,
}: {
  ctx: AdminContext;
  input: KycSchema["getRecords"];
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

  const where: Prisma.UserKycWhereInput = {
    status: status === "all" ? undefined : status,
    OR: [
      { userId: prismaFilter.number(searchFilter) },
      {
        user: {
          OR: [
            { firstName: prismaFilter.string(searchFilter) },
            {
              lastName: prismaFilter.string(searchFilter),
            },
            {
              email: prismaFilter.string(searchFilter),
            },
          ],
        },
      },
      {
        createdAt: prismaFilter.date(searchFilter),
      },
      {
        updatedAt: prismaFilter.date(searchFilter),
      },
      {
        status: prismaFilter.enum(searchFilter, UserKyc_Status),
      },
    ],
  };

  const [rows, rowCount] = await Promise.all([
    prisma.userKyc.findMany({
      where,
      include: {
        user: {
          select: {
            userId: true,
            userName: true,
            avatar: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      ...(sortField && {
        // todo fix with type
        orderBy: {
          [sortField === "user.email" ? "user" : sortField]:
            sortField === "user.email" ? { email: "asc" } : sortOrder,
        },
      }),
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.userKyc.count({
      where,
    }),
  ]);
  return { rows, rowCount };
};
export default getRecords;
