import changePassword from "./changePassword";
import expireToken from "./expireToken";
import getSession from "./getSession";
import getWallet from "./getWallet";
import loginSessions from "./loginSessions";
import logoutAll from "./logoutAll";
import twoFA from "./twoFA";
import updateAvatar from "./updateAvatar";
import updateContact from "./updateContact";
import updateProfile from "./updateProfile";
import verifyKyc from "./verifyKyc";
import getLastKyc from "./getLastKyc";

const profileController = {
  getSession,
  updateProfile,
  getWallet,
  updateAvatar,
  changePassword,
  updateContact,
  verifyKyc,
  expireToken,
  logoutAll,
  twoFA,
  loginSessions,
  getLastKyc,
};
export default profileController;
