import User from "@/server/services/User";
import Otp from "@/server/services/Otp";
import Email from "@/server/services/Email";
import { jsonResponse } from "@/server/utils/fns";
import { type AuthSchema } from "../schema";

/**
 * -
 * @public
 * @controller
 * @auth
 * @forgotPassword
 */
const forgotPassword = async ({
  input,
}: {
  input: AuthSchema["forgotPassword"];
}) => {
  const { userId: userIdTxt } = input;

  // get user instance either by user id or user name
  const user = await User.getInstanceByIdUserName(userIdTxt);
  
  const { email, userId } = user.row;
  const otp = await Otp.getNewOtp(email, "resetPassword");
  void Email.sendResetPasswordVerificationEmail(email, otp);
  return jsonResponse("Otp has been sent", { email, userId });
};

export default forgotPassword;
