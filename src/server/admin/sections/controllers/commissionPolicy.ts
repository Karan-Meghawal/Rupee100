import APP_PATH from "@/route";
import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type SectionSchema } from "../schema";

const commissionPolicy = async ({
  ctx,
  input,
}: {
  input: SectionSchema["commissionPolicy"];
  ctx: AdminContext;
}) => {
  checkPermission();

  await prisma.section.updateMany({
    data: {
      commissionPolicy: input,
    },
  });

  // revalidate
  await ctx.revalidateSSG?.(APP_PATH.commissionPolicy);

  return jsonResponse("Commission Policy has been updated", { data: input });
};
export default commissionPolicy;
