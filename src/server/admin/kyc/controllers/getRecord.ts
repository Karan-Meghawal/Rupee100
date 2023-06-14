import { type AdminContext } from "@/server/trpc";
import UserKyc from "@/server/services/UserKyc";
import User from "@/server/services/User";
import { type KycSchema } from "../schema";

const getRecord = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: KycSchema["getRecord"];
}) => {
  const id = input;
  const kyc = await UserKyc.getInstance(id);
  const {
    row: { userId },
  } = kyc;
  const user = await User.getInstance(userId);

  return {
    kyc: kyc.row,
    user: user.toJSON(),
  };
};
export default getRecord;
