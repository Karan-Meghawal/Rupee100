import { adminProcedure, createTRPCRouter } from "@/server/trpc";
import withdrawController from "./controllers";
import withdrawSchema from "./schema";

const approve = adminProcedure
  .input(withdrawSchema.approve)
  .mutation(({ ctx, input }) => withdrawController.approve({ ctx, input }));

const getRecord = adminProcedure
  .input(withdrawSchema.getRecord)
  .query(({ ctx, input }) => withdrawController.getRecord({ ctx, input }));

const getRecords = adminProcedure
  .input(withdrawSchema.getRecords)
  .query(({ ctx, input }) => withdrawController.getRecords({ ctx, input }));

const reject = adminProcedure
  .input(withdrawSchema.reject)
  .mutation(({ ctx, input }) => withdrawController.reject({ ctx, input }));

const withdrawRouter = createTRPCRouter({
  approve,
  getRecord,
  getRecords,
  reject,
});
export default withdrawRouter;
