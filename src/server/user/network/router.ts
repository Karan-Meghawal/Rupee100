import { createTRPCRouter, userProcedure } from "@/server/trpc";
import networkController from "./controllers";
import networkSchema from "./schema";

const genealogy = userProcedure
  .input(networkSchema.genealogy)
  .query(({ input, ctx }) => networkController.genealogy({ input, ctx }));

const networkRouter = createTRPCRouter({
  genealogy,
});
export default networkRouter;
