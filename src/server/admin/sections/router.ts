import { adminProcedure, createTRPCRouter } from "@/server/trpc";
import sectionController from "./controllers";
import { sectionSchema } from "./schema";

const commissionPolicy = adminProcedure
  .input(sectionSchema.commissionPolicy)
  .mutation(({ ctx, input }) =>
    sectionController.commissionPolicy({ ctx, input }),
  );

const contactUs = adminProcedure
  .input(sectionSchema.contactUs)
  .mutation(({ ctx, input }) => sectionController.contactUs({ ctx, input }));

const faq = adminProcedure
  .input(sectionSchema.faq)
  .mutation(({ ctx, input }) => sectionController.faq({ ctx, input }));

const getSection = adminProcedure
  .input(sectionSchema.getSection)
  .query(({ ctx, input }) => sectionController.getSection({ ctx, input }));

const privacyPolicy = adminProcedure
  .input(sectionSchema.privacyPolicy)
  .mutation(({ ctx, input }) =>
    sectionController.privacyPolicy({ ctx, input }),
  );

const refundPolicy = adminProcedure
  .input(sectionSchema.refundPolicy)
  .mutation(({ ctx, input }) => sectionController.refundPolicy({ ctx, input }));

const termsConditions = adminProcedure
  .input(sectionSchema.termsConditions)
  .mutation(({ ctx, input }) =>
    sectionController.termsConditions({ ctx, input }),
  );

const socialLinks = adminProcedure
  .input(sectionSchema.socialLinks)
  .mutation(({ ctx, input }) => sectionController.socialLinks({ ctx, input }));

const manageSectionRouter = createTRPCRouter({
  commissionPolicy,
  contactUs,
  faq,
  getSection,
  privacyPolicy,
  refundPolicy,
  termsConditions,
  socialLinks,
});
export default manageSectionRouter;
