import { createTRPCRouter, userProcedure } from "@/server/trpc";
import depositController from "./controllers";
import instantDepositRouter from "./instant-deposit/router";
import manualDepositRouter from "./manual-deposit/router";
import depositSchema from "./schema";

const manualDeposit = manualDepositRouter;
const instantDeposit = instantDepositRouter;

const getRecords = userProcedure
  .input(depositSchema.getRecords)
  .query(({ ctx, input }) => depositController.getRecords({ ctx, input }));
const getRecord = userProcedure
  .input(depositSchema.getRecord)
  .query(({ ctx, input }) => depositController.getRecord({ ctx, input }));

const depositRouter = createTRPCRouter({
  getRecords,
  getRecord,
  manualDeposit,
  instantDeposit,
});
export default depositRouter;
