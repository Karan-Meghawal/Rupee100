import { prisma } from "@/server/db";
import { type UserContext } from "@/server/trpc";
import { prismaFilter } from "@/server/utils/prisma";
import { type TransferPaymentSchema } from "../schema";

const searchUser = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: TransferPaymentSchema["searchUser"];
}) => {
  const {
    user: { userId },
  } = ctx;

  const select = {
    userName: true,
    userId: true,
    firstName: true,
    lastName: true,
    avatar: true,
  };

  const search = input;
  if (search) {
    return prisma.user.findMany({
      where: {
        OR: [
          {
            userName: prismaFilter.string(search),
          },
          {
            userId: prismaFilter.number(search),
          },
          {
            firstName: prismaFilter.string(search),
          },
          {
            lastName: prismaFilter.string(search),
          },
        ],
      },
      select,
    });
  }

  const lists = await prisma.transferPayment.findMany({
    distinct: ["agentId"],
    where: {
      userId,
      action: "transferred",
    },
    select: {
      agent: {
        select,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return lists.map((list) => list.agent);
};
export default searchUser;
