import APP_PATH from "@/route";
import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type AboutUsSchema } from "../schema";

const updateHero = async ({
  input,
  ctx,
}: {
  ctx: AdminContext;
  input: AboutUsSchema["updateHero"];
}) => {
  checkPermission();

  await prisma.page_AboutUs.updateMany({
    data: {
      hero: input,
    },
  });

  await ctx.revalidateSSG?.(APP_PATH.aboutUs);

  return jsonResponse("Hero Section has been updated", {
    data: input,
  });
};
export default updateHero;
