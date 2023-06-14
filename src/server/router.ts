import adminRouter from "./admin/router";
import mainRouter from "./main/router";
import { createTRPCRouter } from "./trpc";
import userRouter from "./user/router";

const appRouter = createTRPCRouter({
  user: userRouter,
  admin: adminRouter,
  main: mainRouter,
});

export default appRouter;

// export type definition of API
export type AppRouter = typeof appRouter;
