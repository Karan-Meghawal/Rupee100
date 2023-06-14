import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type HomeSchema } from "../schema";

const deleteService = async ({
  input,
}: {
  ctx: AdminContext;
  input: HomeSchema["deleteService"];
}) => {
  checkPermission();
  const id = input;
  await prisma.page_Home.updateMany({
    data: {
      services: {
        deleteMany: {
          where: {
            id,
          },
        },
      },
    },
  });

  return jsonResponse("Service has been deleted");
};
export default deleteService;
