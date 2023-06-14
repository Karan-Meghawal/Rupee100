import { adminProcedure, createTRPCRouter } from "@/server/trpc";
import supportSchema from "./schema";
import supportController from "./controllers";

const getRecords = adminProcedure
  .input(supportSchema.getRecords)
  .query(({ ctx, input }) => supportController.getRecords({ ctx, input }));

const getTicket = adminProcedure
  .input(supportSchema.getTicket)
  .query(({ ctx, input }) => supportController.getTicket({ ctx, input }));

const closeTicket = adminProcedure
  .input(supportSchema.closeTicket)
  .mutation(({ ctx, input }) => supportController.closeTicket({ ctx, input }));

const addReply = adminProcedure
  .input(supportSchema.addReply)
  .mutation(({ ctx, input }) => supportController.addReply({ ctx, input }));

const supportRouter = createTRPCRouter({
  addReply,
  getTicket,
  getRecords,
  closeTicket,
});
export default supportRouter;
