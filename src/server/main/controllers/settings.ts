import { prisma } from "@/server/db";

const settings = async () => prisma.setting.findFirst();
export default settings;
