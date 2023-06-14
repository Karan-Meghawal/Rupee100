import { adminProcedure, createTRPCRouter } from "@/server/trpc";
import aboutUsController from "./controllers";
import aboutUsSchema from "./schema";

const getRecord = adminProcedure
  .input(aboutUsSchema.getRecord)
  .query(({ ctx, input }) => aboutUsController.getRecord({ ctx, input }));

const updateHero = adminProcedure
  .input(aboutUsSchema.updateHero)
  .mutation(({ ctx, input }) => aboutUsController.updateHero({ ctx, input }));

const updateOurMission = adminProcedure
  .input(aboutUsSchema.updateOurMission)
  .mutation(({ ctx, input }) =>
    aboutUsController.updateOurMission({ ctx, input }),
  );

const updateFooterDescription = adminProcedure
  .input(aboutUsSchema.updateFooterDescription)
  .mutation(({ ctx, input }) =>
    aboutUsController.updateFooterDescription({ ctx, input }),
  );

const aboutUsRouter = createTRPCRouter({
  getRecord,
  updateHero,
  updateOurMission,
  updateFooterDescription,
});
export default aboutUsRouter;
