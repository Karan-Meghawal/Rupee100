import { prisma } from "@/server/db";
import { type UserContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type ProfileSchema } from "../schema";

const updateAvatar = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: ProfileSchema["updateAvatar"];
}) => {
  const { avatar } = input;
  const {
    user: { userId },
  } = ctx;
  await prisma.user.update({
    where: { userId },
    data: {
      avatar,
    },
  });
  return jsonResponse("Profile has been updated");
};
export default updateAvatar;
