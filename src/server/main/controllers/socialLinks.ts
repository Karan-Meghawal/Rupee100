import { prisma } from "@/server/db";

const socialLinks = async () => {
  const data = await prisma.section.findFirst({
    select: {
      socialLinks: true,
    },
  });
  return data?.socialLinks;
};
export default socialLinks;
