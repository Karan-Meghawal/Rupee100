import { prisma } from "@/server/db";

const plan = async () =>
  prisma.plan.findMany({
    where: {
      status: "active",
    },
    orderBy: {
      minInvestment: "asc",
    },
  });
export default plan;
