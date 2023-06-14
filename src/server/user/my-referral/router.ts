import { createTRPCRouter, userProcedure } from "@/server/trpc";
import myReferralController from "./controllers";
import myReferralSchema from "./schema";

const getRecords = userProcedure
  .input(myReferralSchema.getRecords)
  .query(({ ctx, input }) => myReferralController.getRecords({ ctx, input }));

const myReferralRouter = createTRPCRouter({
  getRecords,
});
export default myReferralRouter;
