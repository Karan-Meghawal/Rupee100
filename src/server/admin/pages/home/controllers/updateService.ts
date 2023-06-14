import APP_PATH from "@/route";
import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type HomeSchema } from "../schema";

const updateService = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: HomeSchema["updateService"];
}) => {
  checkPermission();

  const { id, description, heading, icon } = input;

  let message: string;


  if (id) {
    await prisma.page_Home.updateMany({
      data: {
        services: {
          updateMany: {
            where: {
              id,
            },
            data: {
              description,
              heading,
              icon,
            },
          },
        },
      },
    });

    message = "Service has been updated";
  } else {
    await prisma.page_Home.updateMany({
      data: {
        services: {
          push: [{ description, heading, icon }],
        },
      },
    });

    message = "Service has been created";
  }

  await ctx.revalidateSSG?.(APP_PATH.home);

  return jsonResponse(message);
};
export default updateService;
