import { prisma } from "@/server/db";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type SettingSchema } from "../schema";

const favicon = async ({ input }: { input: SettingSchema["favicon"] }) => {
  checkPermission();
  await prisma.setting.updateMany({
    data: {
      favicon: input.favicon,
    },
  });
  return jsonResponse("Favicon has been updated", {
    favicon: input.favicon,
  });
};
export default favicon;
