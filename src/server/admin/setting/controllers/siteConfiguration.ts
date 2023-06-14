import { prisma } from "@/server/db";
import { jsonResponse } from "@/server/utils/fns";
import { type SettingSchema } from "../schema";

const siteConfiguration = async ({
  input,
}: {
  input: SettingSchema["siteConfiguration"];
}) => {
  await prisma.setting.updateMany({
    data: {
      configuration: input,
    },
  });
  return jsonResponse("Site Configuration has been updated", { data: input });
};
export default siteConfiguration;
