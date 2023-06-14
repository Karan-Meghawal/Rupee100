import { prisma } from "@/server/db";
import { type UserContext } from "@/server/trpc";
import { TransferPayment_Action, type Prisma } from "@prisma/client";
import { prismaFilter } from "@/server/utils/prisma";
import { type TransferPaymentSchema } from "../schema";

const getRecords = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: TransferPaymentSchema["getRecords"];
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

  const where: Prisma.TransferPaymentWhereInput = {
    userId,
    OR: [
      {
        agent: {
          userName: prismaFilter.string(searchFilter),
        },
      },
      {
        transactionId: prismaFilter.id(searchFilter),
      },
      {
        amount: prismaFilter.number(searchFilter),
      },
      {
        charge: prismaFilter.number(searchFilter),
      },
      {
        netAmount: prismaFilter.number(searchFilter),
      },
      {
        action: prismaFilter.enum(searchFilter, TransferPayment_Action),
      },
      {
        createdAt: prismaFilter.date(searchFilter),
      },
    ],
  };

  const [rows, rowCount] = await Promise.all([
    prisma.transferPayment.findMany({
      where,
      include: {
        agent: {
          select: {
            userId: true,
            userName: true,
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
    prisma.transferPayment.count({
      where,
    }),
  ]);

  return { rows, rowCount };
};

export default getRecords;
