import { prisma } from "@/server/db";
import KycForm from "@/server/services/KycForm";
import Setting from "@/server/services/Setting";
import { type UserContext } from "@/server/trpc";
import { ClientError } from "@/server/utils/errors";
import { jsonResponse, prismaJsonToRecord } from "@/server/utils/fns";
import type { ProfileSchema } from "../schema";

const verifyKyc = async ({
  ctx,
}: {
  ctx: UserContext;
  input: ProfileSchema["verifyKyc"];
}) => {
  const { user } = ctx;
  const {
    userId,
    row: { contact, kyc },
  } = user;

  if (kyc === "pending")
    return jsonResponse("Kyc has been sent for verification", { kyc });
  if (kyc === "verified") return jsonResponse("Kyc has been approved", { kyc });

  const userData = prismaJsonToRecord(user.row.kycData);

  const { kycVerification, contactDetails } = await Setting.getConfiguration();
  if (!kycVerification) throw ClientError("Kyc Verification not available");

  await KycForm.validateKycData(
    userData,
    "Please fill your profile details to verify kyc",
  );

  if (
    contactDetails &&
    (!contact.address ||
      !contact.city ||
      !contact.country ||
      !contact.mobileNumber ||
      !contact.pinCode ||
      !contact.state)
  )
    throw ClientError("Please fill your contact details to verify kyc");

  await prisma.$transaction([
    prisma.userKyc.create({
      data: {
        userId,
        status: "pending",
      },
    }),
    prisma.user.update({
      where: {
        userId,
      },
      data: {
        kyc: "pending",
      },
    }),
  ]);

  return jsonResponse("Kyc has been sent for verification", {
    kyc: "pending" as const,
  });
};
export default verifyKyc;
