import { type UserContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import Otp from "@/server/services/Otp";
import Email from "@/server/services/Email";
import { ClientError } from "@/server/utils/errors";
import { prisma } from "@/server/db";
import { type ProfileSchema } from "../schema";

const TwoFA = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: ProfileSchema["twoFA"];
}) => {
  const { user } = ctx;
  const { status, step, otp: otpStr } = input;
  const otp = typeof otpStr === "string" ? Number(otpStr) : undefined;

  const { userId, twoFA, email } = user.row;

  const message = twoFA
    ? "Two Authentication has been disabled."
    : "Two Authentication has been enabled.";

  // send response if the current status and to do status is same
  if (twoFA !== status) return jsonResponse(message);

  // send Email
  if (step === 1) {
    const newOtp = await Otp.getNewOtp(email, "twoFA");
    void Email.sendTwoFAMail(email, newOtp, twoFA);
    return jsonResponse("Please verify the otp to continue", { email });
  }

  // validate otp
  if (!otp) throw ClientError("Otp is required");
  await Otp.validateOtp({
    otp,
    email,
    purpose: "twoFA",
  });

  await prisma.$transaction(async (prismaTx) => {
    // update twoFA
    await prismaTx.user.update({
      where: { userId },
      data: {
        twoFA: !twoFA,
      },
    });

    // delete otp
    await Otp.deleteOtp({ email, otp, purpose: "twoFA" }, prismaTx);
  });

  return jsonResponse(message);
};

export default TwoFA;
