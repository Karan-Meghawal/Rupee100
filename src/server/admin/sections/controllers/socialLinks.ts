import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type SectionSchema } from "../schema";

const socialLinks = async ({
  input,
}: {
  input: SectionSchema["socialLinks"];
  ctx: AdminContext;
}) => {
  await prisma.section.updateMany({
    data: {
      socialLinks: input,
    },
  });
  return jsonResponse("Social Links has been updated", { data: input });
};
export default socialLinks;
