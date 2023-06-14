import { prisma } from "@/server/db";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type SettingSchema } from "../schema";

const logo = async ({ input }: { input: SettingSchema["logo"] }) => {
  checkPermission();
  await prisma.setting.updateMany({
    data: {
      logo: input.logo,
    },
  });
  return jsonResponse("Logo has been updated", { logo: input.logo });
};
export default logo;
