import User from "@/server/services/User";
import { type AuthSchema } from "../schema";

/**
 * -
 * @public
 * @controller
 * @auth
 * @getNewUser
 */
const getNewUser = async ({ input }: { input: AuthSchema["getNewUser"] }) => {
  const user = await User.getInstance(input);
  const {
    row: { referralId, placementId, placementSide, userName, email, createdAt },
  } = user;  
  return { referralId, placementId, placementSide, userName, email, createdAt };
};

export default getNewUser;
