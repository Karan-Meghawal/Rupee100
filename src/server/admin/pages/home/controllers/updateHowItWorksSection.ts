import APP_PATH from "@/route";
import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type HomeSchema } from "../schema";

const updateHowItWorksSection = async ({
  input,
  ctx,
}: {
  ctx: AdminContext;
  input: HomeSchema["updateHowItWorksSection"];
}) => {
  checkPermission();

  await prisma.page_Home.updateMany({
    data: {
      howItWorkSection: input,
    },
  });

  await ctx.revalidateSSG?.(APP_PATH.home);

  return jsonResponse("How It Works Section has been updated", {
    data: input,
  });
};
export default updateHowItWorksSection;
