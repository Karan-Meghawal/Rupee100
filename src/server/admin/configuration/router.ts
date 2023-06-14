import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import configurationSchema from "./schema";
import configurationController from "./controllers";

const install = publicProcedure
  .input(configurationSchema.install)
  .mutation(({ input }) => configurationController.install({ input }));

const configurationRouter = createTRPCRouter({
  install,
});

export default configurationRouter;
