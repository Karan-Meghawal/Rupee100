import { adminProcedure, createTRPCRouter } from "@/server/trpc";
import reportSchema from "./schema";
import reportController from "./controllers";

const analytics = adminProcedure
  .input(reportSchema.analytics)
  .query(({ ctx, input }) => reportController.analytics({ ctx, input }));

const roiIncome = adminProcedure
  .input(reportSchema.roiIncome)
  .query(({ ctx, input }) => reportController.roiIncome({ ctx, input }));

const referralIncome = adminProcedure
  .input(reportSchema.referralIncome)
  .query(({ ctx, input }) => reportController.referralIncome({ ctx, input }));

const topEarners = adminProcedure
  .input(reportSchema.topEarners)
  .query(({ ctx, input }) => reportController.topEarners({ ctx, input }));

const topSponsors = adminProcedure
  .input(reportSchema.topSponsors)
  .query(({ ctx, input }) => reportController.topSponsors({ ctx, input }));

const transactions = adminProcedure
  .input(reportSchema.transactions)
  .query(({ ctx, input }) => reportController.transactions({ ctx, input }));

const reportRouter = createTRPCRouter({
  analytics,
  referralIncome,
  roiIncome,
  topEarners,
  topSponsors,
  transactions,
});
export default reportRouter;
