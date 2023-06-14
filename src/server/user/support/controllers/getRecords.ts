import { prisma } from "@/server/db";
import { type UserContext } from "@/server/trpc";
import { Ticket_Status, type Prisma } from "@prisma/client";
import { prismaFilter } from "@/server/utils/prisma";
import { type SupportSchema } from "../schema";

const getRecords = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: SupportSchema["getRecords"];
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

  const where: Prisma.TicketWhereInput = {
    userId,
    OR: [
      { id: prismaFilter.id(searchFilter) },
      {
        subject: prismaFilter.string(searchFilter),
      },
      {
        createdAt: prismaFilter.date(searchFilter),
      },
      {
        updatedAt: prismaFilter.date(searchFilter),
      },
      {
        status: prismaFilter.enum(searchFilter, Ticket_Status),
      },
    ],
  };

  const [rows, rowCount] = await Promise.all([
    prisma.ticket.findMany({
      where,
      ...(sortField && {
        orderBy: {
          [sortField]: sortOrder,
        },
      }),
      skip: page * pageSize,
      take: pageSize,
    }),
    prisma.ticket.count({
      where,
    }),
  ]);

  return { rows, rowCount };
};

export default getRecords;
