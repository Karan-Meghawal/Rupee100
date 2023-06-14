import { adminProcedure, createTRPCRouter } from "@/server/trpc";
import instantDepositSchema from "./schema";
import instantDepositController from "./controllers";

const create = adminProcedure
  .input(instantDepositSchema.create)
  .mutation(({ ctx, input }) => instantDepositController.create({ ctx, input }));

const getCreateRecords = adminProcedure
  .input(instantDepositSchema.getCreateRecords)
  .query(({ ctx, input }) =>
    instantDepositController.getCreateRecords({ ctx, input }),
  );

const getRecords = adminProcedure
  .input(instantDepositSchema.getRecords)
  .query(({ ctx, input }) =>
    instantDepositController.getRecords({ ctx, input }),
  );

const remove = adminProcedure
  .input(instantDepositSchema.remove)
  .mutation(({ ctx, input }) => instantDepositController.remove({ ctx, input }));

const updateStatus = adminProcedure
  .input(instantDepositSchema.updateStatus)
  .mutation(({ ctx, input }) =>
    instantDepositController.updateStatus({ ctx, input }),
  );

const instantDepositRouter = createTRPCRouter({
  create,
  getCreateRecords,
  getRecords,
  remove,
  updateStatus,
});
export default instantDepositRouter;
