import { adminProcedure, createTRPCRouter } from "@/server/trpc";
import planController from "./controllers";
import planSchema from "./schema";

const create = adminProcedure
  .input(planSchema.create)
  .mutation(({ ctx, input }) => planController.create({ ctx, input }));

const getRecord = adminProcedure
  .input(planSchema.getRecord)
  .query(({ ctx, input }) => planController.getRecord({ ctx, input }));

const getRecords = adminProcedure
  .input(planSchema.getRecords)
  .query(({ ctx, input }) => planController.getRecords({ ctx, input }));

const remove = adminProcedure
  .input(planSchema.remove)
  .mutation(({ ctx, input }) => planController.remove({ ctx, input }));

const markPopular = adminProcedure
  .input(planSchema.markPopular)
  .mutation(({ ctx, input }) => planController.markPopular({ ctx, input }));

const planRouter = createTRPCRouter({
  create,
  getRecord,
  getRecords,
  remove,
  markPopular,
});
export default planRouter;
