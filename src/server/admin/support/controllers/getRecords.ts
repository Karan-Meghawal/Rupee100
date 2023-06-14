import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { Ticket_Status, type Prisma } from "@prisma/client";
import { prismaFilter } from "@/server/utils/prisma";
import { type SupportSchema } from "../schema";

const getRecords = async ({
  input,
}: {
  ctx: AdminContext;
  input: SupportSchema["getRecords"];
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

  const where: Prisma.TicketWhereInput = {
    status: status === "all" ? undefined : status,
    OR: [
      {
        user: {
          OR: [
            { userName: prismaFilter.string(searchFilter) },
            { userId: prismaFilter.number(searchFilter) },
          ],
        },
      },
      {
        id: prismaFilter.id(searchFilter),
      },
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
      include: {
        user: {
          select: {
            avatar: true,
            userName: true,
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
    prisma.ticket.count({
      where,
    }),
  ]);
  return { rows, rowCount };
};

export default getRecords;
