import { createTRPCRouter, userProcedure } from "@/server/trpc";
import Controller from "./controllers";
import Schema from "./schema";

const getMethodData = userProcedure
  .input(Schema.getMethodData)
  .query(({ ctx, input }) => Controller.getMethodData({ ctx, input }));

const createMethod = userProcedure
  .input(Schema.createMethod)
  .mutation(({ ctx, input }) => Controller.createMethod({ ctx, input }));

const getDataForPayment = userProcedure
  .input(Schema.getDataForPayment)
  .query(({ ctx, input }) => Controller.getDataForPayment({ ctx, input }));

const getMethodRecords = userProcedure
  .input(Schema.getMethodRecords)
  .query(({ ctx, input }) => Controller.getMethodRecords({ ctx, input }));

const getRecord = userProcedure
  .input(Schema.getRecord)
  .query(({ ctx, input }) => Controller.getRecord({ ctx, input }));
  
const getRecords = userProcedure
  .input(Schema.getRecords)
  .query(({ ctx, input }) => Controller.getRecords({ ctx, input }));

const getUserMethodRecords = userProcedure
  .input(Schema.getUserMethodRecords)
  .query(({ ctx, input }) => Controller.getUserMethodRecords({ ctx, input }));

const payment = userProcedure
  .input(Schema.payment)
  .mutation(({ ctx, input }) => Controller.payment({ ctx, input }));

const removeMethod = userProcedure
  .input(Schema.removeMethod)
  .mutation(({ ctx, input }) => Controller.removeMethod({ ctx, input }));

const withdrawRouter = createTRPCRouter({
  createMethod,
  getMethodData,
  getDataForPayment,
  getMethodRecords,
  getRecord,
  getRecords,
  getUserMethodRecords,
  payment,
  removeMethod,
});
export default withdrawRouter;
