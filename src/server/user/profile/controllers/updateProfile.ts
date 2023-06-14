import { prisma } from "@/server/db";
import KycForm from "@/server/services/KycForm";
import { type UserContext } from "@/server/trpc";
import { ClientError } from "@/server/utils/errors";
import { jsonResponse, prismaJsonToRecord } from "@/server/utils/fns";
import { type ProfileSchema } from "../schema";

const updateProfile = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: ProfileSchema["updateProfile"];
}) => {
  const { user } = ctx;
  const { userId, kycData: userKycData, kyc: kycStatus } = user.row;
  const { firstName, lastName, kyc } = input;
  const kycData = await KycForm.validateKycData(kyc);

  kycData.forEach(({ id, required, label }) => {
    const userVal = kyc[id];
    if (!userVal) throw ClientError(`Missing ${label} from kyc details`);
    if (kycStatus === "verified" && required) {
      const userCurVal = prismaJsonToRecord(userKycData)?.[id];
      kyc[id] = userCurVal ?? userVal;
    }
  });

  await prisma.user.update({
    data: {
      firstName,
      lastName,
      kycData: kyc,
    },
    where: {
      userId,
    },
  });

  return jsonResponse("Profile has been updated", { data: user.toJSON() });
};

export default updateProfile;
