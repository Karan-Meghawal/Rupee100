import { adminProcedure, createTRPCRouter } from "@/server/trpc";
import settingController from "./controllers";
import kycRouter from "./kyc/router";
import settingSchema from "./schema";

const emailSetting = adminProcedure
  .input(settingSchema.emailSetting)
  .mutation(({ input }) => settingController.emailSetting({ input }));

const sendTestEmail = adminProcedure
  .input(settingSchema.sendTestEmail)
  .mutation(({ input }) => settingController.sendTestEmail({ input }));

const emailPreferences = adminProcedure
  .input(settingSchema.emailPreferences)
  .mutation(({ input }) => settingController.emailPreferences({ input }));

const kyc = kycRouter;

const logo = adminProcedure
  .input(settingSchema.logo)
  .mutation(({ input }) => settingController.logo({ input }));

const fullLogo = adminProcedure
  .input(settingSchema.fullLogo)
  .mutation(({ input }) => settingController.fullLogo({ input }));

const favicon = adminProcedure
  .input(settingSchema.favicon)
  .mutation(({ input }) => settingController.favicon({ input }));

const siteSetting = adminProcedure
  .input(settingSchema.siteSetting)
  .mutation(({ input }) => settingController.siteSetting({ input }));

const siteConfiguration = adminProcedure
  .input(settingSchema.siteConfiguration)
  .mutation(({ input }) => settingController.siteConfiguration({ input }));

const getSetting = adminProcedure
  .input(settingSchema.getSetting)
  .query(({ input }) => settingController.getSetting({ input }));

const settingRouter = createTRPCRouter({
  emailSetting,
  sendTestEmail,
  emailPreferences,
  kyc,
  logo,
  fullLogo,
  favicon,
  siteSetting,
  siteConfiguration,
  getSetting,
});
export default settingRouter;
