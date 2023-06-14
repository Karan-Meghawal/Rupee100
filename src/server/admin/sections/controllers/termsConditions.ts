import APP_PATH from "@/route";
import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type SectionSchema } from "../schema";

const termsConditions = async ({
  ctx,
  input,
}: {
  input: SectionSchema["termsConditions"];
  ctx: AdminContext;
}) => {
  checkPermission();
  await prisma.section.updateMany({
    data: {
      termsAndConditions: input,
    },
  });

  // revalidate
  await ctx.revalidateSSG?.(APP_PATH.termsAndConditions);

  return jsonResponse("Terms And Conditions has been updated", { data: input });
};
export default termsConditions;
