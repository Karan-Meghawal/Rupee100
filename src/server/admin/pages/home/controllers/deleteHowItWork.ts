import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type HomeSchema } from "../schema";

const deleteHowItWork = async ({
  input,
}: {
  ctx: AdminContext;
  input: HomeSchema["deleteService"];
}) => {
  checkPermission();
  const id = input;
  await prisma.page_Home.updateMany({
    data: {
      howItWork: {
        deleteMany: {
          where: {
            id,
          },
        },
      },
    },
  });

  return jsonResponse("How It Work has been deleted");
};
export default deleteHowItWork;
