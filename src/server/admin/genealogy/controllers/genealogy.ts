import { prisma } from "@/server/db";
import { type UserContext } from "@/server/trpc";
import { randomInt } from "crypto";
import { type NetworkSchema } from "../schema";

const genealogy = async ({
  input,
  ctx,
}: {
  ctx: UserContext;
  input: NetworkSchema["genealogy"];
}) => {
  const { user } = ctx;
  const { lft, rgt, userId } = user.row;

  const users = await prisma.user.findMany({
    where: {
      lft: {
        gte: lft,
      },
      rgt: {
        lte: rgt,
      },
    },
    select: {
      userId: true,
      placementId: true,
      leftCount: true,
      rightCount: true,
      referralId: true,
      firstName: true,
      lastName: true,
      email: true,
      userName: true,
      avatar: true,
      status: true,
      kyc: true,
      leftId: true,
      rightId: true,
      placementSide: true,
      createdAt: true,
    },
  });

  const rows = users.map((usr) => ({
    ...usr,
    avatar: usr.avatar ?? `/avatars/avatar_${randomInt(1, 202)}.jpg`,
    id: usr.userId,
    parentId: usr.userId === userId ? null : usr.placementId,
    isValid: true,
  }));

  return rows;
};

export default genealogy;
