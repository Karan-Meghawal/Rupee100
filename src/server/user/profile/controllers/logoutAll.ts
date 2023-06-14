import { type UserContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type ProfileSchema } from "../schema";

const logoutAll = async ({
  ctx,
}: {
  ctx: UserContext;
  input: ProfileSchema["logoutAll"];
}) => {
  const { user, sessionId } = ctx;
  await user.removeSessionsExceptCurrent(sessionId);
  return jsonResponse("All Login Sessions have been removed");
};
export default logoutAll;
