import User from "@/server/services/User";
import Otp from "@/server/services/Otp";
import { prisma } from "@/server/db";
import Email from "@/server/services/Email";
import { jsonResponse } from "@/server/utils/fns";
import { type AuthSchema } from "../schema";

/**
 * -
 * @public
 * @controller
 * @auth
 * @resetPassword
 */
const resetPassword = async ({
  input,
}: {
  input: AuthSchema["resetPassword"];
}) => {
  const { userId, otp: otpStr, password } = input;
  const otp = Number(otpStr);

  // get user instance by user id
  const user = await User.getInstance(userId);
  const { email } = user.row;
  const displayName = user.getDisplayName();

  // validate otp
  await Otp.validateOtp({
    otp,
    email,
    purpose: "resetPassword",
  });

  await prisma.$transaction(async (prismaTx) => {
    // update password
    await user.updatePassword(password, prismaTx);

    // expire all login sessions
    await user.removeAllSessions();

    // delete otp
    await Otp.deleteOtp({ email, otp, purpose: "resetPassword" }, prismaTx);
  });

  void Email.sendResetPasswordSuccessEmail(email, displayName);
  return jsonResponse("Password has been reset");
};

export default resetPassword;
