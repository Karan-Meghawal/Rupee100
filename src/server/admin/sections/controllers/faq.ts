import APP_PATH from "@/route";
import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type SectionSchema } from "../schema";

const faq = async ({
  ctx,
  input,
}: {
  input: SectionSchema["faq"];
  ctx: AdminContext;
}) => {
  checkPermission();
  await prisma.section.updateMany({
    data: {
      faq: input,
    },
  });

  // revalidate
  await ctx.revalidateSSG?.(APP_PATH.faq);

  return jsonResponse("Faq has been updated", { data: input });
};
export default faq;
