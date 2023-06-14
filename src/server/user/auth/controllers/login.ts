import Email from "@/server/services/Email";
import Otp from "@/server/services/Otp";
import User from "@/server/services/User";
import { type Context } from "@/server/trpc";
import { ClientError } from "@/server/utils/errors";
import { jsonResponse } from "@/server/utils/fns";
import { prisma } from "@/server/db";
import { type AuthSchema } from "../schema";

/**
 * -
 * @public
 * @controller
 * @auth
 * @login
 */
const login = async ({
  input,
  ctx,
}: {
  input: AuthSchema["login"];
  ctx: Context;
}) => {
  const { userId: userIdTxt, step, password, remember, otp: otpStr } = input;

  const otp = typeof otpStr === "string" ? Number(otpStr) : undefined;

  // get user instance either by user id or user name
  const user = await User.getInstanceByIdUserName(userIdTxt);

  // validate password
  await user.validatePassword(password);

  // validate status
  user.validateStatus();

  const { twoFA, email } = user.row;
  if (twoFA) {
    // send 2 FA Email
    if (step === 1) {
      const newOtp = await Otp.getNewOtp(email, "login");
      void Email.sendLoginVerificationMail(email, newOtp);
      return jsonResponse("Otp has been sent", { email });
    }

    // validate otp
    if (!otp) throw ClientError("Otp is required");
    await Otp.validateOtp({
      otp,
      email,
      purpose: "login",
    });

    // todo change to prismaTx from prisma
    // delete otp
    await Otp.deleteOtp({ email, otp, purpose: "login" }, prisma);
  }

  // delete login session if exceeds limit
  await user.checkLoginSessionLimit();

  // create token
  const token = user.createSessionToken(remember);
  const session = await user.createLoginSession({
    ip: ctx.ip,
    remember,
    token,
    agent: "user",
    userAgent: ctx.userAgent,
  });

  return jsonResponse("Login Successful", {
    Authorization: token,
    user: user.toJSON(),
    sessionId: session.id,
  });
};

export default login;
