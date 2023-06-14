import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type DashboardSchema } from "../schema";

const updateNotice = async ({
  input,
}: {
  ctx: AdminContext;
  input: DashboardSchema["updateNotice"];
}) => {
  const { notice } = input;

  await prisma.setting.updateMany({
    data: {
      notice,
    },
  });
  return jsonResponse("Notice has been updated", { notice });
};
export default updateNotice;
