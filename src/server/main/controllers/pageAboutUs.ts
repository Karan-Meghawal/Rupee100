import { prisma } from "@/server/db";

const pageAboutUs = async () => prisma.page_AboutUs.findFirst();
export default pageAboutUs;
