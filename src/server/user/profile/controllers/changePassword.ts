import { type UserContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import Otp from "@/server/services/Otp";
import Email from "@/server/services/Email";
import { ClientError } from "@/server/utils/errors";
import { prisma } from "@/server/db";
import { type ProfileSchema } from "../schema";

const changePassword = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: ProfileSchema["changePassword"];
}) => {
  const { user, sessionId } = ctx;
  const { email, userId } = user.row;
  const { password, currentPassword, step, otp: otpStr } = input;
  const otp = typeof otpStr === "string" ? Number(otpStr) : undefined;

  // validate password
  await user.validatePassword(currentPassword, "Current Password is incorrect");

  // send Email
  if (step === 1) {
    const newOtp = await Otp.getNewOtp(email, "changePassword");
    void Email.sendChangePasswordVerificationMail({
      email,
      otp: newOtp,
      displayName: user.getDisplayName(),
    });
    return jsonResponse("Otp has been sent", { email });
  }

  // validate otp
  if (!otp) throw ClientError("Otp is required");
  await Otp.validateOtp({
    otp,
    email,
    purpose: "changePassword",
  });

  await prisma.$transaction(async (prismaTx) => {
    // update password
    await user.updatePassword(password, prismaTx);

    // expire others login sessions except current one
    await user.removeSessionsExceptCurrent(sessionId, prismaTx);

    // delete otp
    await Otp.deleteOtp({ email, otp, purpose: "changePassword" }, prismaTx);
  });

  void Email.sendChangePasswordSuccessEmail(email, userId);
  return jsonResponse("Password has been updated");
};

export default changePassword;
