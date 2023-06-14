import { createTRPCRouter, publicProcedure } from "../trpc";
import configurationRouter from "./configuration/router";
import dashboardRouter from "./dashboard/router";
import depositRouter from "./deposit/router";
import networkRouter from "./genealogy/router";
import kycRouter from "./kyc/router";
import authRouter from "./login/router";
import paymentMethodRouter from "./payment-methods/router";
import planRouter from "./plan/router";
import profileRouter from "./profile/router";
import reportRouter from "./reports/router";
import settingRouter from "./setting/router";
import supportRouter from "./support/router";
import usersRouter from "./users/router";
import withdrawRouter from "./withdraw/router";
import manageSectionRouter from "./sections/router";
import faqRouter from "./faq/router";
import pagesRouter from "./pages/router";

const adminRouter = createTRPCRouter({
  hello: publicProcedure.query(() => "Hello to admin Api"),
  auth: authRouter,
  configuration: configurationRouter,
  dashboard: dashboardRouter,
  deposit: depositRouter,
  kyc: kycRouter,
  network: networkRouter,
  paymentMethod: paymentMethodRouter,
  plan: planRouter,
  profile: profileRouter,
  report: reportRouter,
  setting: settingRouter,
  support: supportRouter,
  users: usersRouter,
  withdraw: withdrawRouter,
  section: manageSectionRouter,
  faq: faqRouter,
  pages: pagesRouter,
});

export default adminRouter;
