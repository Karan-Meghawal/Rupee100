import User from "@/server/services/User";
import { type AdminContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type UserSchema } from "../schema";

const login = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: UserSchema["login"];
}) => {
  const userId = input;
  const user = await User.getInstance(userId);

  // delete login session if exceeds limit
  await user.checkLoginSessionLimit();

  // create token
  const token = user.createSessionToken(false);
  const session = await user.createLoginSession({
    ip: ctx.ip,
    remember: false,
    token,
    agent: "user",
    userAgent: ctx.userAgent,
  });

  return jsonResponse("Login Successful", {
    Authorization: token,
    user: user.toJSON(),
    sessionId: session.id,
  });
};
export default login;
