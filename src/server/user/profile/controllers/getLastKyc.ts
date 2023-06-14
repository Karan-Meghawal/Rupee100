import { prisma } from "@/server/db";
import { type UserContext } from "@/server/trpc";
import { type ProfileSchema } from "../schema";

const getLastKyc = async ({
  ctx,
}: {
  ctx: UserContext;
  input: ProfileSchema["getLastKyc"];
}) => {
  const {
    user: { userId },
  } = ctx;

  const data = await prisma.userKyc.findFirst({
    where: {
      userId,
      status:"rejected"
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return data;
};
export default getLastKyc;
