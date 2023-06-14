/* eslint-disable no-restricted-syntax */
import { prisma } from "@/server/db";
import { addDays, eachDayOfInterval } from "date-fns";

const registrationAnalytics = async (startDate: Date, endDate: Date) => {
  const intervalDays = eachDayOfInterval({ start: startDate, end: endDate });

  const values: number[] = [];
  const categories: string[] = [];

  for (const day of intervalDays) {
    const registration = await prisma.user.count({
      where: {
        createdAt: {
          gte: day,
          lt: addDays(day, 1),
        },
      },
    });
    values.push(registration);
    categories.push(day.toISOString());
  }

  return {
    values,
    categories,
  };
};
export default registrationAnalytics;
