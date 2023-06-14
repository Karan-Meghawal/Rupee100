import { type AdminContext } from "@/server/trpc";
import UserKyc from "@/server/services/UserKyc";
import { ClientError } from "@/server/utils/errors";
import { jsonResponse } from "@/server/utils/fns";
import { prisma } from "@/server/db";
import { type KycSchema } from "../schema";

const approve = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: KycSchema["approve"];
}) => {
  const id = input;
  const kyc = await UserKyc.getInstance(id);
  const {
    row: { status, userId },
  } = kyc;
  if (status !== "pending")
    throw ClientError("This Kyc has been processed already");

  await prisma.$transaction(async (prismaTx) => {
    await prismaTx.userKyc.update({
      where: {
        id,
      },
      data: {
        status: "verified",
      },
    });

    await prismaTx.user.update({
      where: {
        userId,
      },
      data: {
        kyc: "verified",
      },
    });
  });

  return jsonResponse("Kyc has been verified");
};
export default approve;
