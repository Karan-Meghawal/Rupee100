import { createTRPCRouter, userProcedure } from "@/server/trpc";
import { analyticsController } from "./controllers";
import { analyticsSchema } from "./schema";

const joining = userProcedure
  .input(analyticsSchema.joining)
  .query(({ ctx, input }) => analyticsController.joining({ ctx, input }));

const analyticsRouter = createTRPCRouter({
  joining,
});

export default analyticsRouter;
