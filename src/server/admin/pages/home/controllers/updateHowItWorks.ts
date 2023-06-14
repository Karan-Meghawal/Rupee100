import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import APP_PATH from "@/route";
import { type HomeSchema } from "../schema";

const updateHowItWorks = async ({
  input,
  ctx,
}: {
  ctx: AdminContext;
  input: HomeSchema["updateHowItWorks"];
}) => {
  checkPermission();
  const { id, description, heading, image } = input;

  let message: string;

  if (id) {
    await prisma.page_Home.updateMany({
      data: {
        howItWork: {
          updateMany: {
            where: {
              id,
            },
            data: {
              description,
              heading,
              image,
            },
          },
        },
      },
    });

    message = "Section has been updated";
  } else {
    await prisma.page_Home.updateMany({
      data: {
        howItWork: {
          push: [{ description, heading, image }],
        },
      },
    });

    message = "Section has been added";
  }

  await ctx.revalidateSSG?.(APP_PATH.home);

  return jsonResponse(message);
};
export default updateHowItWorks;
