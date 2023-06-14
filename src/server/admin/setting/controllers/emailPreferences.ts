import { prisma } from "@/server/db";
import { jsonResponse } from "@/server/utils/fns";
import { type SettingSchema } from "../schema";

const emailPreferences = async ({
  input,
}: {
  input: SettingSchema["emailPreferences"];
}) => {
  await prisma.setting.updateMany({
    data: {
      emailPreferences: input,
    },
  });
  return jsonResponse("Email Preferences has been updated", { data: input });
};

export default emailPreferences;
