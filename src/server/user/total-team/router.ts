import { createTRPCRouter, userProcedure } from "@/server/trpc";
import totalTeamController from "./controllers";
import totalTeamSchema from "./schema";

const getRecords = userProcedure
  .input(totalTeamSchema.getRecords)
  .query(({ ctx, input }) => totalTeamController.getRecords({ ctx, input }));

const totalTeamRouter = createTRPCRouter({
  getRecords,
});
export default totalTeamRouter;
