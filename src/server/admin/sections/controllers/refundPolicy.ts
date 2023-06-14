import APP_PATH from "@/route";
import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type SectionSchema } from "../schema";

const refundPolicy = async ({
  ctx,
  input,
}: {
  input: SectionSchema["refundPolicy"];
  ctx: AdminContext;
}) => {
  checkPermission();
  await prisma.section.updateMany({
    data: {
      refundPolicy: input,
    },
  });

  // revalidate
  await ctx.revalidateSSG?.(APP_PATH.refundPolicy);

  return jsonResponse("Refund Policy has been updated", { data: input });
};
export default refundPolicy;
