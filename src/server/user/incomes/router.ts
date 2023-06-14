import { createTRPCRouter, userProcedure } from "@/server/trpc";
import incomeController from "./controllers";
import incomeSchema from "./schema";

const referralIncome = userProcedure
  .input(incomeSchema.referralIncome)
  .query(({ ctx, input }) => incomeController.referralIncome({ ctx, input }));

const getReferralIncomeSummary = userProcedure
  .input(incomeSchema.getReferralIncomeSummary)
  .query(({ ctx, input }) => incomeController.getReferralIncomeSummary({ ctx, input }));

const roi = userProcedure
  .input(incomeSchema.roi)
  .query(({ ctx, input }) => incomeController.roi({ ctx, input }));

const incomeRouter = createTRPCRouter({
  getReferralIncomeSummary,
  referralIncome,
  roi,
});
export default incomeRouter;
