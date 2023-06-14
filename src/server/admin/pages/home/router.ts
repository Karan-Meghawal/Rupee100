import { adminProcedure, createTRPCRouter } from "@/server/trpc";
import homeController from "./controllers";
import homeSchema from "./schema";

const getRecord = adminProcedure
  .input(homeSchema.getRecord)
  .query(({ ctx, input }) => homeController.getRecord({ ctx, input }));

const updateHero = adminProcedure
  .input(homeSchema.updateHero)
  .mutation(({ ctx, input }) => homeController.updateHero({ ctx, input }));

const updateHowItWorks = adminProcedure
  .input(homeSchema.updateHowItWorks)
  .mutation(({ ctx, input }) =>
    homeController.updateHowItWorks({ ctx, input }),
  );

const updateService = adminProcedure
  .input(homeSchema.updateService)
  .mutation(({ ctx, input }) => homeController.updateService({ ctx, input }));

const deleteService = adminProcedure
  .input(homeSchema.deleteService)
  .mutation(({ ctx, input }) => homeController.deleteService({ ctx, input }));

const deleteHowItWork = adminProcedure
  .input(homeSchema.deleteHowItWork)
  .mutation(({ ctx, input }) => homeController.deleteHowItWork({ ctx, input }));

const updateServicesSection = adminProcedure
  .input(homeSchema.updateServicesSection)
  .mutation(({ ctx, input }) =>
    homeController.updateServicesSection({ ctx, input }),
  );

const updateHowItWorksSection = adminProcedure
  .input(homeSchema.updateHowItWorksSection)
  .mutation(({ ctx, input }) =>
    homeController.updateHowItWorksSection({ ctx, input }),
  );

const homeRouter = createTRPCRouter({
  getRecord,
  updateHero,
  updateHowItWorks,
  updateService,
  deleteService,
  deleteHowItWork,
  updateServicesSection,
  updateHowItWorksSection,
});
export default homeRouter;
