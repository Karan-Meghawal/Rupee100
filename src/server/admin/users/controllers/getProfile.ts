import { type AdminContext } from "@/server/trpc";
import User from "@/server/services/User";
import { type UserSchema } from "../schema";

const getProfile = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: UserSchema["getProfile"];
}) => {
  const userId = input;
  const user = await User.getInstance(userId);
  return user.toJSON();
};

export default getProfile;
