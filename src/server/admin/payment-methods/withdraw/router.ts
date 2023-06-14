import { adminProcedure, createTRPCRouter } from "@/server/trpc";
import withdrawSchema from "./schema";
import withdrawController from "./controllers";

const getRecords = adminProcedure
  .input(withdrawSchema.getRecords)
  .query(({ ctx, input }) => withdrawController.getRecords({ ctx, input }));

const getRecord = adminProcedure
  .input(withdrawSchema.getRecord)
  .query(({ ctx, input }) => withdrawController.getRecord({ ctx, input }));

const create = adminProcedure
  .input(withdrawSchema.create)
  .mutation(({ ctx, input }) => withdrawController.create({ ctx, input }));

const updateStatus = adminProcedure
  .input(withdrawSchema.updateStatus)
  .mutation(({ ctx, input }) =>
    withdrawController.updateStatus({ ctx, input }),
  );

const remove = adminProcedure
  .input(withdrawSchema.remove)
  .mutation(({ ctx, input }) => withdrawController.remove({ ctx, input }));

const withdrawRouter = createTRPCRouter({
  getRecords,
  getRecord,
  create,
  updateStatus,
  remove,
});
export default withdrawRouter;
