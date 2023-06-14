import { adminProcedure, createTRPCRouter } from "@/server/trpc";
import dashboardController from "./controllers";
import dashboardSchema from "./schema";

const getNotice = adminProcedure
  .input(dashboardSchema.getNotice)
  .query(({ ctx, input }) => dashboardController.getNotice({ ctx, input }));

const updateNotice = adminProcedure
  .input(dashboardSchema.updateNotice)
  .mutation(({ ctx, input }) =>
    dashboardController.updateNotice({ ctx, input }),
  );

const getSummary = adminProcedure
  .input(dashboardSchema.getNotice)
  .query(({ ctx, input }) => dashboardController.getSummary({ ctx, input }));

const dashboardRouter = createTRPCRouter({
  getNotice,
  getSummary,
  updateNotice,
});
export default dashboardRouter;
