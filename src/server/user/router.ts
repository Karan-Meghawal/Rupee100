import { createTRPCRouter, publicProcedure } from "../trpc";
import analyticsRouter from "./analytics/router";
import authRouter from "./auth/router";
import dashboardRouter from "./dashboard/router";
import depositRouter from "./deposit/router";
import incomeRouter from "./incomes/router";
import myReferralRouter from "./my-referral/router";
import networkRouter from "./network/router";
import planRouter from "./plan/router";
import profileRouter from "./profile/router";
import supportRouter from "./support/router";
import totalTeamRouter from "./total-team/router";
import transactionRouter from "./transaction/router";
import transferPaymentRouter from "./transfer-payment/router";
import withdrawRouter from "./withdraw/router";

const userRouter = createTRPCRouter({
  hello: publicProcedure.query(() => "Hello to user Api"),
  auth: authRouter,
  support: supportRouter,
  profile: profileRouter,
  transferPayment: transferPaymentRouter,
  plan: planRouter,
  withdraw: withdrawRouter,
  transaction: transactionRouter,
  network: networkRouter,
  myReferral: myReferralRouter,
  incomes: incomeRouter,
  deposit: depositRouter,
  dashboard: dashboardRouter,
  analytics: analyticsRouter,
  totalTeam: totalTeamRouter,
});

export default userRouter;
