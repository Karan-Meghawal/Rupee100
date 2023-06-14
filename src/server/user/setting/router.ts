import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { settingConfiguration } from "./controllers";

const getConfiguration = publicProcedure.query(() =>
  settingConfiguration.getConfiguration(),
);

const settingRouter = createTRPCRouter({
  getConfiguration,
});

export default settingRouter;
