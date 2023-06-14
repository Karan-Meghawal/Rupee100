import { createTRPCRouter, userProcedure } from "@/server/trpc";
import manualDepositController from "./controllers";
import manualDepositSchema from "./schema";

const getRecords = userProcedure
  .input(manualDepositSchema.getRecords)
  .query(({ ctx, input }) =>
    manualDepositController.getRecords({ ctx, input }),
  );

const createPayment = userProcedure
  .input(manualDepositSchema.createPayment)
  .mutation(({ ctx, input }) =>
    manualDepositController.createPayment({ ctx, input }),
  );

const manualDepositRouter = createTRPCRouter({
  getRecords,
  createPayment,
});
export default manualDepositRouter;
