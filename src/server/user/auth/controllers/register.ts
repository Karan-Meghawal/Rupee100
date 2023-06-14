import { prisma } from "@/server/db";
import Email from "@/server/services/Email";
import Otp from "@/server/services/Otp";
import Setting from "@/server/services/Setting";
import User from "@/server/services/User";
import { ClientError } from "@/server/utils/errors";
import { jsonResponse } from "@/server/utils/fns";
import { type AuthSchema } from "../schema";

/**
 * -
 * @public
 * @controller
 * @auth
 * @register
 */
const register = async ({ input }: { input: AuthSchema["register"] }) => {
  // check registration status allowed or not
  await Setting.checkRegistrationStatus();

  const {
    referralId,
    placementId: optionalPlacementId,
    placementSide,
    userName,
    firstName,
    lastName,
    mobileNumber,
    email,
    password,
    step,
    otp: otpStr,
  } = input;
  const otp = typeof otpStr === "string" ? Number(otpStr) : undefined;

  // check if referralId is a valid user id
  const userId = await User.createUserId();
  const referralUser = await User.getInstance(referralId, {
    error: "Referral Id doesn't exist",
  });

  // check if username already exists
  const isUserName = await User.isUserName(userName);
  if (isUserName) throw ClientError(`Username already exists with ${userName}`);

  // check registration limit per email
  await Setting.checkEmailRegistrationLimit(email);

  let placementId: number;
  if (optionalPlacementId) {
    if (referralId !== optionalPlacementId) {
      // check if placementId is under the tree of the referralId
      const isChild = await referralUser.isChild(optionalPlacementId);
      if (!isChild)
        throw ClientError("Invalid combination of Referral And Placement");
    }
    placementId = optionalPlacementId;
  } else {
    // get placement side under the referralId untill the user id $placementSide is not empty
    placementId = await referralUser.getPlacementIdForRegistration(
      placementSide,
    );
  }

  // check if placement is a valid user id and placement side is available for registration
  const placementUser = await User.getInstance(placementId);
  placementUser.checkPlacementAvailability(placementSide);

  // send registration otp
  if (step === 1) {
    const newOtp = await Otp.getNewOtp(email, "register");
    void Email.sendRegisterVerificationMail({ email, otp: newOtp });
    return jsonResponse("Otp has been sent", { email });
  }

  // validate otp
  if (!otp) throw ClientError("Otp is required");
  await Otp.validateOtp({
    otp,
    email,
    purpose: "register",
  });

  const { rgt: placementRgt } = placementUser.row;
  const lft = placementRgt;
  const rgt = placementRgt + 1;

  await prisma.$transaction(async (prismaTx) => {
    // update lft and rgt by 2 after new user ids
    await prismaTx.user.updateMany({
      where: { lft: { gte: lft } },
      data: { lft: { increment: 2 } },
    });
    await prismaTx.user.updateMany({
      where: { rgt: { gte: lft } },
      data: { rgt: { increment: 2 } },
    });

    // create user
    await User.createUser(
      {
        email,
        firstName,
        lastName,
        lft,
        rgt,
        contact: {
          mobileNumber,
        },
        password,
        placement: {
          connect: {
            userId: placementId,
          },
        },
        placementSide,
        referral: {
          connect: {
            userId: referralId,
          },
        },
        userId,
        userName,
      },
      prismaTx,
    );

    // update left and right id of placement user
    await placementUser.updateLeftRightId({
      childId: userId,
      placement: placementSide,
      prismaTx,
    });

    // add referral income to referral id
    await referralUser.addReferralIncome(userId, prismaTx);

    //  update left and right count and check for pair and pair income
    const user = await User.getInstance(userId, { prismaTx });
    await user.updateParentsLeftRightCount(prismaTx);

    // delete otp
    await Otp.deleteOtp({ email, otp, purpose: "register" }, prismaTx);
  });

  // send registration success email
  void Email.sendRegistrationSuccessEmail({ email, userId });

  return jsonResponse("Registration Successful", { userId });
};
export default register;
