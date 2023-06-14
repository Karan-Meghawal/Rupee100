import { createTRPCRouter, userProcedure } from "@/server/trpc";
import dashboardController from "./controllers";
import dashboardSchema from "./schema";

const getSummary = userProcedure
  .input(dashboardSchema.getSummary)
  .query(({ ctx, input }) => dashboardController.getSummary({ ctx, input }));

const getNotice = userProcedure
  .input(dashboardSchema.getNotice)
  .query(({ ctx, input }) => dashboardController.getNotice({ ctx, input }));

const dashboardRouter = createTRPCRouter({
  getSummary,
  getNotice,
});

export default dashboardRouter;
