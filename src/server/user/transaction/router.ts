import { createTRPCRouter, userProcedure } from "@/server/trpc";
import transactionController from "./controllers";
import transactionSchema from "./schema";

const getRecords = userProcedure
  .input(transactionSchema.getRecords)
  .query(({ ctx, input }) => transactionController.getRecords({ ctx, input }));

const transactionRouter = createTRPCRouter({
  getRecords,
});

export default transactionRouter;
