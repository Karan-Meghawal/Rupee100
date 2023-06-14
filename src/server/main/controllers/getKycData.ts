import { prisma } from "@/server/db";

const getKycData = async () => prisma.kycForm.findMany();
export default getKycData;
