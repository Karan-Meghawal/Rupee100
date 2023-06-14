import { adminProcedure, createTRPCRouter } from "@/server/trpc";
import faqController from "./controllers";
import faqSchema from "./schema";

const create = adminProcedure
  .input(faqSchema.create)
  .mutation(({ ctx, input }) => faqController.create({ ctx, input }));

const remove = adminProcedure
  .input(faqSchema.remove)
  .mutation(({ ctx, input }) => faqController.remove({ ctx, input }));

const records = adminProcedure
  .input(faqSchema.records)
  .query(({ ctx, input }) => faqController.records({ ctx, input }));

const faqRouter = createTRPCRouter({
  create,
  remove,
  records,
});

export default faqRouter;
