import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type AboutUsSchema } from "../schema";

const updateFooterDescription = async ({
  input,
}: {
  ctx: AdminContext;
  input: AboutUsSchema["updateFooterDescription"];
}) => {
  await prisma.page_AboutUs.updateMany({
    data: {
      footer: input.footer,
    },
  });
  return jsonResponse("Footer section has been updated", { data: input });
};
export default updateFooterDescription;
