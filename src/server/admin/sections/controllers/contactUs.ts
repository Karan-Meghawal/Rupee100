import APP_PATH from "@/route";
import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type SectionSchema } from "../schema";

const contactUs = async ({
  ctx,
  input,
}: {
  input: SectionSchema["contactUs"];
  ctx: AdminContext;
}) => {
  checkPermission();
  await prisma.section.updateMany({
    data: {
      contactUs: input,
    },
  });

  // revalidate
  await ctx.revalidateSSG?.(APP_PATH.contactUs);

  return jsonResponse("Contact Us has been updated", { data: input });
};
export default contactUs;
