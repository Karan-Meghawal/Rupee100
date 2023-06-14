import { createTRPCRouter, userProcedure } from "@/server/trpc";
import supportController from "./controllers";
import supportSchema from "./schema";

const getRecords = userProcedure
  .input(supportSchema.getRecords)
  .query(({ ctx, input }) => supportController.getRecords({ ctx, input }));

const getTicket = userProcedure
  .input(supportSchema.getTicket)
  .query(({ ctx, input }) => supportController.getTicket({ ctx, input }));

const createTicket = userProcedure
  .input(supportSchema.createTicket)
  .mutation(({ ctx, input }) => supportController.createTicket({ ctx, input }));

const closeTicket = userProcedure
  .input(supportSchema.closeTicket)
  .mutation(({ ctx, input }) => supportController.closeTicket({ ctx, input }));

const supportRouter = createTRPCRouter({
  getRecords,
  getTicket,
  createTicket,
  closeTicket,
});
export default supportRouter;
