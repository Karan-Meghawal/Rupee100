import { adminProcedure, createTRPCRouter } from "@/server/trpc";
import kycController from "./controllers";
import kycSchema from "./schema";

const create = adminProcedure
  .input(kycSchema.create)
  .mutation(({ ctx, input }) => kycController.create({ ctx, input }));

const remove = adminProcedure
  .input(kycSchema.remove)
  .mutation(({ ctx, input }) => kycController.remove({ ctx, input }));

const records = adminProcedure
  .input(kycSchema.records)
  .query(({ ctx, input }) => kycController.records({ ctx, input }));

const kycRouter = createTRPCRouter({
  create,
  remove,
  records,
});

export default kycRouter;
