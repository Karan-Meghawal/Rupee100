import { prisma } from "@/server/db";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type SettingSchema } from "../schema";

const fullLogo = async ({ input }: { input: SettingSchema["fullLogo"] }) => {
  checkPermission();
  await prisma.setting.updateMany({
    data: {
      fullLogo: input.fullLogo,
    },
  });
  return jsonResponse("Full Logo has been updated", {
    fullLogo: input.fullLogo,
  });
};
export default fullLogo;
