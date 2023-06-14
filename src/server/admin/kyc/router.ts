import { adminProcedure, createTRPCRouter } from "@/server/trpc";
import kycController from "./controllers";
import kycSchema from "./schema";

const approve = adminProcedure
  .input(kycSchema.approve)
  .mutation(({ ctx, input }) => kycController.approve({ ctx, input }));

const getRecord = adminProcedure
  .input(kycSchema.getRecord)
  .query(({ ctx, input }) => kycController.getRecord({ ctx, input }));

const getRecords = adminProcedure
  .input(kycSchema.getRecords)
  .query(({ ctx, input }) => kycController.getRecords({ ctx, input }));

const reject = adminProcedure
  .input(kycSchema.reject)
  .mutation(({ ctx, input }) => kycController.reject({ ctx, input }));

const kycRouter = createTRPCRouter({
  approve,
  getRecord,
  getRecords,
  reject,
});
export default kycRouter;
