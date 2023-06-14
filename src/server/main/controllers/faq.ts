import { prisma } from "@/server/db";

const faq = async () => prisma.faq.findMany();
export default faq;
