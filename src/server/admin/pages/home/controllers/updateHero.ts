import APP_PATH from "@/route";
import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type HomeSchema } from "../schema";

const updateHero = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: HomeSchema["updateHero"];
}) => {
  checkPermission();
  await prisma.page_Home.updateMany({
    data: {
      hero: input,
    },
  });

  await ctx.revalidateSSG?.(APP_PATH.home);

  return jsonResponse("Hero Section has been updated", { data: input });
};
export default updateHero;
