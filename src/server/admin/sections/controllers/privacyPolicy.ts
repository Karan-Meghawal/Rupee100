import APP_PATH from "@/route";
import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type SectionSchema } from "../schema";

const privacyPolicy = async ({
  ctx,
  input,
}: {
  input: SectionSchema["privacyPolicy"];
  ctx: AdminContext;
}) => {
  checkPermission();
  await prisma.section.updateMany({
    data: {
      privacyPolicy: input,
    },
  });

  // revalidate
  await ctx.revalidateSSG?.(APP_PATH.privacyPolicy);

  return jsonResponse("Privacy Policy has been updated", { data: input });
};
export default privacyPolicy;
