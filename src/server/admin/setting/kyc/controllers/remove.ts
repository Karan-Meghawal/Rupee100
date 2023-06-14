import { type AdminContext } from "@/server/trpc";
import { prisma } from "@/server/db";
import { jsonResponse } from "@/server/utils/fns";
import { type KycSchema } from "../schema";

const remove = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: KycSchema["remove"];
}) => {
  const id = input;
  await prisma.kycForm.delete({
    where: {
      id,
    },
  });
  return jsonResponse("Kyc Form Record has been deleted");
};

export default remove;
