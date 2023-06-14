/* eslint-disable no-restricted-syntax */
import { prisma } from "@/server/db";
import { type UserContext } from "@/server/trpc";
import { addDays, eachDayOfInterval } from "date-fns";
import { type AnalyticsSchema } from "../schema";

const joining = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: AnalyticsSchema["joining"];
}) => {
  const { user } = ctx;
  const { startDate, endDate } = input;

  const {
    row: { userId, lft, rgt },
  } = user;

  const intervalDays = eachDayOfInterval({ start: startDate, end: endDate });

  const team: number[] = [];
  const referral: number[] = [];
  const categories: string[] = [];

  for (const day of intervalDays) {
    // user
    const myReferral = await prisma.user.count({
      where: {
        referralId: userId,
        createdAt: {
          gte: day,
          lt: addDays(day, 1),
        },
      },
    });
    referral.push(myReferral);

    // team
    const teamReferral = await prisma.user.count({
      where: {
        lft: {
          gt: lft,
        },
        rgt: {
          lt: rgt,
        },
        createdAt: {
          gte: day,
          lt: addDays(day, 1),
        },
      },
    });
    team.push(teamReferral);

    categories.push(day.toISOString());
  }

  return {
    team,
    referral,
    categories,
  };
};
export default joining;
