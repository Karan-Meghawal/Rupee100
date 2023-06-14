import User from "@/server/services/User";
import { type AuthSchema } from "../schema";

/**
 * -
 * @public
 * @controller
 * @auth
 * @checkPlacementId
 */
const checkPlacementId = async ({
  input,
}: {
  input: AuthSchema["checkPlacementId"];
}) => {
  try {
    const user = await User.getInstance(input);
    return { success: true, userName: user.row.userName };
  } catch (error) {
    return { success: false, userName: "" };
  }
};

export default checkPlacementId;
