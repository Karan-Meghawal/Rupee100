import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import KycForm from "@/server/services/KycForm";
import { type UserSchema } from "../schema";

const updateProfile = async ({
  input,
}: {
  ctx: AdminContext;
  input: UserSchema["updateProfile"];
}) => {
  const { kyc, userId } = input;

  await KycForm.validateKycData(kyc);

  await prisma.user.update({
    where: {
      userId,
    },
    data: {
      kycData: kyc,
    },
  });
  return jsonResponse("User Profile has been updated", { data: kyc });
};
export default updateProfile;
