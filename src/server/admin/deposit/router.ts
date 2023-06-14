import { adminProcedure, createTRPCRouter } from "@/server/trpc";
import depositController from "./controllers";
import depositSchema from "./schema";

const getRecord = adminProcedure
  .input(depositSchema.getRecord)
  .query(({ ctx, input }) => depositController.getRecord({ ctx, input }));

const getRecords = adminProcedure
  .input(depositSchema.getRecords)
  .query(({ ctx, input }) => depositController.getRecords({ ctx, input }));

const reject = adminProcedure
  .input(depositSchema.reject)
  .mutation(({ ctx, input }) => depositController.reject({ ctx, input }));

const approve = adminProcedure
  .input(depositSchema.approve)
  .mutation(({ ctx, input }) => depositController.approve({ ctx, input }));

const depositRouter = createTRPCRouter({
  getRecord,
  getRecords,
  reject,
  approve,
});
export default depositRouter;
