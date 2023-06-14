import { env } from "@/env.mjs";
import appRouter from "@/server/router";
import { createTRPCContext } from "@/server/trpc";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
          if (error.cause instanceof ZodError) {
            // eslint-disable-next-line no-param-reassign
            error.message = fromZodError(error.cause).message;
          }
        }
      : undefined,
});
