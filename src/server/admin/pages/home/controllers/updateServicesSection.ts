import APP_PATH from "@/route";
import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type HomeSchema } from "../schema";

const updateServicesSection = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: HomeSchema["updateServicesSection"];
}) => {
  checkPermission();
  await prisma.page_Home.updateMany({
    data: {
      servicesSection: input,
    },
  });

  await ctx.revalidateSSG?.(APP_PATH.home);

  return jsonResponse("Services section has been updated", {
    data: input,
  });
};
export default updateServicesSection;
