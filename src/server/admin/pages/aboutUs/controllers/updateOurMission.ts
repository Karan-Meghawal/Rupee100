import APP_PATH from "@/route";
import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type AboutUsSchema } from "../schema";

const updateOurMission = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: AboutUsSchema["updateOurMission"];
}) => {
  checkPermission();
  await prisma.page_AboutUs.updateMany({
    data: {
      ourMission: input,
    },
  });

  await ctx.revalidateSSG?.(APP_PATH.aboutUs);

  return jsonResponse("Our Mission has been updated", { data: input });
};
export default updateOurMission;
