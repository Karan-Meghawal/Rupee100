import { createTRPCRouter, userProcedure } from "@/server/trpc";
import instantDepositController from "./controllers";
import instantDepositSchema from "./schema";

const getRecords = userProcedure
  .input(instantDepositSchema.getRecords)
  .query(({ ctx, input }) =>
    instantDepositController.getRecords({ ctx, input }),
  );

const createTxn = userProcedure
  .input(instantDepositSchema.createTxn)
  .mutation(({ ctx, input }) =>
    instantDepositController.createTxn({ ctx, input }),
  );

const instantDepositRouter = createTRPCRouter({
  createTxn,
  getRecords,
});
export default instantDepositRouter;
