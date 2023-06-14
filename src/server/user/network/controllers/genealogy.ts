import { prisma } from "@/server/db";
import { type UserContext } from "@/server/trpc";
import { randomInt, randomUUID } from "crypto";
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
  type User = (typeof rows)[number];

  rows.forEach((row) => {
    const { leftId, rightId, userId: usrId } = row;
    if (!leftId) {
      rows.push({
        id: randomUUID(),
        parentId: usrId,
        userName: "Join Member",
        userId: "Click Here",
        avatar: "/images/add-button.png",
        placementSide: "left",
        isValid: false,
      } as unknown as User);
    }
    if (!rightId) {
      rows.push({
        id: randomUUID(),
        parentId: usrId,
        userName: "Join Member",
        userId: "Click Here",
        avatar: "/images/add-button.png",
        placementSide: "right",
        isValid: false,
      } as unknown as User);
    }
  });

  rows.sort((a, b) => {
    if (a.placementSide < b.placementSide) {
      return -1;
    }
    if (a.placementSide > b.placementSide) {
      return 1;
    }
    return 0;
  });

  return rows;
};

export default genealogy;
