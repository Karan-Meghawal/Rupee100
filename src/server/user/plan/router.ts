import { createTRPCRouter, userProcedure } from "@/server/trpc";
import planController from "./controllers";
import planSchema from "./schema";

const getRecords = userProcedure
  .input(planSchema.getRecords)
  .query(({ ctx, input }) => planController.getRecords({ ctx, input }));

const getHistory = userProcedure
  .input(planSchema.getHistory)
  .query(({ ctx, input }) => planController.getHistory({ ctx, input }));

const getTransaction = userProcedure
  .input(planSchema.getTransaction)
  .query(({ ctx, input }) => planController.getTransaction({ ctx, input }));

const purchase = userProcedure
  .input(planSchema.purchase)
  .mutation(({ ctx, input }) => planController.purchase({ ctx, input }));

const planRouter = createTRPCRouter({
  getRecords,
  getHistory,
  purchase,
  getTransaction,
});

export default planRouter;
