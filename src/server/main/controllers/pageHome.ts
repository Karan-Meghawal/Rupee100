import { prisma } from "@/server/db";

const pageHome = async () => prisma.page_Home.findFirst();
export default pageHome;
