import { prisma } from "@/server/db";
import User from "@/server/services/User";
import { type AdminContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type User_Status } from "@prisma/client";
import { type UserSchema } from "../schema";

const updateStatus = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: UserSchema["updateStatus"];
}) => {
  const { userId, status } = input;
  const user = await User.getInstance(userId);

  const newStatus: User_Status = status === "active" ? "blocked" : "active";

  if (user.row.status === status) {
    await prisma.user.update({
      where: {
        userId,
      },
      data: {
        status: newStatus,
      },
    });
  }

  return jsonResponse(`User has been ${newStatus}`, {
    newStatus,
  });
};
export default updateStatus;
