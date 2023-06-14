import User from "@/server/services/User";
import { type AuthSchema } from "../schema";

/**
 * -
 * @public
 * @controller
 * @auth
 * @checkUserName
 */
const checkUserName = async ({
  input,
}: {
  input: AuthSchema["checkUserName"];
}) => {
  const userName = await User.isUserName(input);
  return !userName;
};

export default checkUserName;
