import User from "@/server/services/User";
import { type AuthSchema } from "../schema";

/**
 * -
 * @public
 * @controller
 * @auth
 * @checkReferralId
 */
const checkReferralId = async ({
  input,
}: {
  input: AuthSchema["checkReferralId"];
}) => {
  try {
    const user = await User.getInstance(input);
    return { success: true, userName: user.row.userName };
  } catch (error) {
    return { success: false, userName: "" };
  }
};

export default checkReferralId;
