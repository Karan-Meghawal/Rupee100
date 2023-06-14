import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import homeController from "./controllers";
import mainSchema from "./schema";

const contactUs = publicProcedure
  .input(mainSchema.contactUs)
  .mutation((input) => homeController.contactUs(input));

const faq = publicProcedure
  .input(mainSchema.faq)
  .query(() => homeController.faq());

const sections = publicProcedure
  .input(mainSchema.sections)
  .query(() => homeController.section());

const pageHome = publicProcedure
  .input(mainSchema.pageHome)
  .query(() => homeController.pageHome());

const pageAboutUs = publicProcedure
  .input(mainSchema.pageAboutUs)
  .query(() => homeController.pageAboutUs());

const plan = publicProcedure
  .input(mainSchema.plan)
  .query(() => homeController.plan());

const socialLinks = publicProcedure
  .input(mainSchema.socialLinks)
  .query(() => homeController.socialLinks());

const configuration = publicProcedure
  .input(mainSchema.configuration)
  .query(() => homeController.configuration());

const getKycData = publicProcedure
  .input(mainSchema.getKycData)
  .query(() => homeController.getKycData());

const mainRouter = createTRPCRouter({
  pageAboutUs,
  pageHome,
  configuration,
  contactUs,
  faq,
  sections,
  plan,
  socialLinks,
  getKycData,
});
export default mainRouter;
