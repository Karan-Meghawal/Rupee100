import { createServerSideHelpers } from "@trpc/react-query/server";
import SuperJSON from "superjson";
import appRouter from "./router";
import { createInnerTRPCContext } from "./trpc";

const ssgHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    transformer: SuperJSON,
    ctx: createInnerTRPCContext({
      user: null,
      sessionId: null,
      ip: undefined,
      revalidateSSG: null,
      userAgent: undefined,
    }),
  });

export default ssgHelper;

export const apiSsgHelper = () => ssgHelper().main;
export const userSsgHelper = () => ssgHelper().user;
export const adminSsgHelper = () => ssgHelper().admin;
