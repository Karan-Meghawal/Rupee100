import { type UserContext } from "@/server/trpc";
import { prisma } from "@/server/db";
import { jsonResponse } from "@/server/utils/fns";
import { type ProfileSchema } from "../schema";

const expireToken = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: ProfileSchema["expireToken"];
}) => {
  const {
    user: { userId },
  } = ctx;

  const id = input;
  await prisma.loginSession.update({
    where: {
      id,
      userId,
    },
    data: {
      status: "expired",
    },
  });
  return jsonResponse("Login Session has been removed");
};

export default expireToken;
