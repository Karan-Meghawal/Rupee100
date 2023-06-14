import { prisma } from "@/server/db";

const sections = async () => {
  const row = await prisma.section.findFirst();
  return row;
};
export default sections;
