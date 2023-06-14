import { adminProcedure, createTRPCRouter } from "@/server/trpc";
import Controller from "./controllers";
import Schema from "./schema";

const getRecords = adminProcedure
  .input(Schema.getRecords)
  .query(({ ctx, input }) => Controller.getRecords({ ctx, input }));

const getRecord = adminProcedure
  .input(Schema.getRecord)
  .query(({ ctx, input }) => Controller.getRecord({ ctx, input }));

const create = adminProcedure
  .input(Schema.create)
  .mutation(({ ctx, input }) => Controller.create({ ctx, input }));

const updateStatus = adminProcedure
  .input(Schema.updateStatus)
  .mutation(({ ctx, input }) => Controller.updateStatus({ ctx, input }));

const remove = adminProcedure
  .input(Schema.remove)
  .mutation(({ ctx, input }) => Controller.remove({ ctx, input }));

const manualDepositMethodRouter = createTRPCRouter({
  getRecords,
  getRecord,
  create,
  updateStatus,
  remove,
});

export default manualDepositMethodRouter;
