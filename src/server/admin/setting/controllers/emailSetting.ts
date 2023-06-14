import { prisma } from "@/server/db";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type SettingSchema } from "../schema";

const emailSetting = async ({
  input,
}: {
  input: SettingSchema["emailSetting"];
}) => {
  checkPermission();

  await prisma.setting.updateMany({
    data: {
      mail: input,
    },
  });
  return jsonResponse("Mail Setting has been updated", { data: input });
};

export default emailSetting;
