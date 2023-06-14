import { createTRPCRouter, userProcedure } from "@/server/trpc";
import Controller from "./controllers";
import Schema from "./schema";

const transfer = userProcedure
  .input(Schema.transfer)
  .mutation(({ input, ctx }) => Controller.transfer({ input, ctx }));

const getRecords = userProcedure
  .input(Schema.getRecords)
  .query(({ ctx, input }) => Controller.getRecords({ ctx, input }));

const getConfig = userProcedure
  .input(Schema.getConfig)
  .query(({ ctx, input }) => Controller.getConfig({ ctx, input }));

const getWallet = userProcedure
  .input(Schema.getWallet)
  .query(({ ctx, input }) => Controller.getWallet({ ctx, input }));

const searchUser = userProcedure
  .input(Schema.searchUser)
  .query(({ input, ctx }) => Controller.searchUser({ input, ctx }));

const transferPaymentRouter = createTRPCRouter({
  transfer,
  getRecords,
  getConfig,
  searchUser,
  getWallet,
});

export default transferPaymentRouter;
