import { prisma } from "@/server/db";
import { jsonResponse } from "@/server/utils/fns";
import { type SettingSchema } from "../schema";

const siteSetting = async ({
  input,
}: {
  input: SettingSchema["siteSetting"];
}) => {
  await prisma.setting.updateMany({
    data: input,
  });
  return jsonResponse("Site Settings have been updated", { data: input });
};
export default siteSetting;
