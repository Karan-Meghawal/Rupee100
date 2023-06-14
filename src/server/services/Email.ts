import { type TransferPayment, type User, type Withdraw } from "@prisma/client";
import nodemailer from "nodemailer";
import EMails from "../email";
import EmailDocument from "../email/EmailDocument";
import { type HomeSchema } from "../main/schema";
import { NotFoundError } from "../utils/errors";
import Setting from "./Setting";

const sendMail = async ({
  email,
  subject,
  body,
}: {
  email: string;
  subject: string;
  body: string;
}) => {
  const setting = await Setting.getInstance();
  const { mail, appName } = setting.row;
  if (!mail) throw NotFoundError("Email setting have not configured");

  const { encryption, host, password, port, userName } = mail;

  const transporter = nodemailer.createTransport({
    port,
    host,
    auth: {
      user: userName,
      pass: password,
    },
    secure: encryption === "ssl",
  });
  const html = await EmailDocument(body);
  const mailOptions = {
    from: `${appName} ${userName}`,
    subject,
    html,
    to: email,
  };

  return transporter.sendMail(mailOptions);
};

export default class Email {
  //  ============================ Public Static Methods ============================

  public static async sendChangePasswordSuccessEmail(
    email: string,
    userId: number,
  ) {
    try {
      const body = EMails.ChangePasswordSuccess(userId);
      const subject = "Password Changed";
      return await sendMail({ email, subject, body });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
    return undefined;
  }

  public static async sendChangePasswordVerificationMail({
    displayName,
    email,
    otp,
  }: {
    displayName: string;
    email: string;
    otp: number;
  }) {
    try {
      const subject = "Change Password";
      const body = EMails.ChangePasswordVerification(displayName, otp);
      return await sendMail({ email, subject, body });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
    return undefined;
  }

  public static async sendContactUsMail(data: HomeSchema["contactUs"]) {
    try {
      const body = EMails.ContactUs(data);
      const subject = "Contact Us";
      const { email } = data;
      return await sendMail({ email, subject, body });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
    return undefined;
  }

  public static async sendLoginVerificationMail(email: string, otp: number) {
    try {
      const subject = "Login Verification";
      const body = EMails.LoginVerification(otp);
      return await sendMail({ email, subject, body });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
    return undefined;
  }

  public static async sendRegisterVerificationMail({
    email,
    otp,
  }: {
    email: string;
    otp: number;
  }) {
    try {
      const subject = "Registration Verification";
      const body = await EMails.RegistrationVerification(otp);
      return await sendMail({ email, subject, body });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
    return undefined;
  }

  public static async sendRegistrationSuccessEmail({
    email,
    userId,
  }: {
    email: string;
    userId: number;
  }) {
    try {
      const { registrationSuccess } = await Setting.getEmailPreferences();
      if (!registrationSuccess) return null;

      const subject = "Registration Successful";
      const body = await EMails.RegistrationSuccessful(userId);
      return await sendMail({ email, subject, body });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
    return undefined;
  }

  public static async sendResetPasswordSuccessEmail(
    email: string,
    displayName: string,
  ) {
    try {
      const subject = "Password Reset Successful";
      const body = EMails.ResetPasswordSuccess(displayName);
      return await sendMail({ email, subject, body });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
    return undefined;
  }

  public static async sendResetPasswordVerificationEmail(
    email: string,
    otp: number,
  ) {
    try {
      const subject = "Reset Password";
      const body = EMails.ResetPasswordVerification(otp);
      return await sendMail({ email, subject, body });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
    return undefined;
  }

  // FA -> Factor Authentication
  public static async sendTwoFAMail(
    email: string,
    otp: number,
    twoFA: boolean,
  ) {
    try {
      const body = EMails.TwoFA(otp, twoFA);
      const subject = "Two Factor Authentication";
      return await sendMail({ email, subject, body });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
    return undefined;
  }

  public static async sendTestMail(email: string) {
    const body = EMails.EmailTesting();
    const subject = "Email Testing";
    return sendMail({ email, subject, body });
  }

  public static async sendWithdrawEmail({
    withdraw,
    methodName,
    userName,
    email,
  }: {
    withdraw: Withdraw;
    methodName: string;
    userName: string;
    email: string;
  }) {
    try {
      const { paymentWithdraw } = await Setting.getEmailPreferences();
      if (!paymentWithdraw) return null;

      const body = await EMails.Withdraw({ withdraw, userName, methodName });
      if (!body) return null;

      const subject = "Payment Withdraw";
      return await sendMail({ email, subject, body });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
    return undefined;
  }

  public static async sendTransferPaymentEmail({
    user,
    agent,
    transaction,
  }: {
    user: User;
    agent: User;
    transaction: TransferPayment;
  }) {
    try {
      const { paymentTransfer } = await Setting.getEmailPreferences();
      if (!paymentTransfer) return null;

      const body = await EMails.TransferPayment({ user, agent, transaction });
      if (!body) return null;

      const subject = "Payment Transfer";
      return await sendMail({ email: user.email, subject, body });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
    return undefined;
  }
}
