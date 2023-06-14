import checkPlacementId from "./checkPlacementId";
import checkPlacementSide from "./checkPlacementSide";
import checkReferralId from "./checkReferralId";
import checkUserName from "./checkUserName";
import forgotPassword from "./forgotPassword";
import getNewUser from "./getNewUser";
import login from "./login";
import register from "./register";
import resetPassword from "./resetPassword";

const authController = {
  register,
  login,
  forgotPassword,
  resetPassword,
  checkReferralId,
  checkPlacementId,
  checkUserName,
  checkPlacementSide,
  getNewUser,
};
export default authController;
