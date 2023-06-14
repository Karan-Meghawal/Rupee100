/* eslint-disable no-restricted-syntax */
import { prisma } from "@/server/db";
import { addDays, eachDayOfInterval } from "date-fns";

const withdrawAnalytics = async (startDate: Date, endDate: Date) => {
  const intervalDays = eachDayOfInterval({ start: startDate, end: endDate });

  const values: number[] = [];
  const categories: string[] = [];

  for (const day of intervalDays) {
    const withdraws = await prisma.withdraw.aggregate({
      where: {
        createdAt: {
          gte: day,
          lt: addDays(day, 1),
        },
        status: {
          in: ["success"],
        },
      },
      _sum: {
        netAmount: true
      },
    });
    // eslint-disable-next-line no-underscore-dangle
    values.push(withdraws._sum.netAmount ?? 0);
    categories.push(day.toISOString());
  }

  return {
    values,
    categories,
  };
};
export default withdrawAnalytics;
