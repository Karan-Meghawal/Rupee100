import { env } from "@/env.mjs";
import { prisma } from "@/server/db";
import { type SettingSchema } from "../schema";

const getSetting = async ({
  input,
}: {
  input: SettingSchema["getSetting"];
}) => {
  const setting = await prisma.setting.findFirst();
  if (env.RESTRICTION && setting?.mail?.password)
    setting.mail.password = "Not allowed in demo";
  return setting;
};

export default getSetting;
