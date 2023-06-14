import { isAfter, subHours } from "date-fns";
import { prisma } from "./db";
import Plan from "./services/Plan";
import User from "./services/User";

const handleCron = async () => {
  // validate plans expiration
  await prisma.$transaction(async (prismaTx) => {
    const records = await prismaTx.planHistory.findMany({
      where: {
        status: "active",
      },
    });

    // eslint-disable-next-line no-restricted-syntax
    for await (const record of records) {
      const { id, userId, investment, planId } = record;

      const isExpired = isAfter(new Date(), record.validTill);
      if (isExpired) {
        // update plan history
        await prismaTx.planHistory.update({
          where: {
            id,
          },
          data: {
            status: "expired",
            expiredAt: new Date(),
          },
        });

        // update user column of plan
        await prismaTx.user.update({
          where: {
            userId,
          },
          data: {
            planId: undefined,
          },
        });
      } else {
        // add roi income
        const plan = await Plan.getInstance(planId);
        const user = await User.getInstance(userId);
        await user.addRoiIncome({
          investment,
          plan,
          prismaTx,
        });
      }
    }

    // expire pending deposits after 1 hour
    const currentTimeLessOneHour = subHours(new Date(), 1);
    await prisma.deposit.updateMany({
      where: {
        createdAt: {
          lt: currentTimeLessOneHour,
        },
        status: "pending",
      },
      data: {
        status: "failed",
      },
    });

    await prisma.transaction.updateMany({
      where: {
        createdAt: {
          lt: currentTimeLessOneHour,
        },
        status: "pending",
        category: "deposit",
      },
      data: {
        status: "failed",
      },
    });
  });
};

export default handleCron;
