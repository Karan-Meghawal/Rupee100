import User from "@/server/services/User";
import { type AuthSchema } from "../schema";

/**
 * -
 * @public
 * @controller
 * @auth
 * @checkPlacementSide
 */
const checkPlacementSide = async ({
  input,
}: {
  input: AuthSchema["checkPlacementSide"];
}) => {
  try {
    const userId = input;
    const user = await User.getInstance(userId);
    const { leftId, rightId } = user.row;
    return { leftId, rightId, success: true };
  } catch (error) {
    const leftId = undefined;
    const rightId = undefined;
    return { leftId, rightId, success: false };
  }
};

export default checkPlacementSide;
