/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import requestIp from "request-ip";

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
import { createTRPCStoreLimiter } from "@trpc-limiter/memory";
import { TRPCError, initTRPC, type inferAsyncReturnType } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import LoginSession from "./services/LoginSession";
import User from "./services/User";

type CreateContextOptions = {
  userAgent: string | undefined;
  ip: string | undefined;
  sessionId: string | null;
  user: User | null;
  revalidateSSG:
    | ((
        urlPath: string,
        opts?:
          | {
              unstable_onlyGenerated?: boolean | undefined;
            }
          | undefined,
      ) => Promise<void>)
    | null;
};

export const createInnerTRPCContext = (opts: CreateContextOptions) => ({
  userAgent: opts.userAgent,
  user: opts.user,
  sessionId: opts.sessionId,
  ip: opts.ip,
  revalidateSSG: opts.revalidateSSG,
});

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async (_opts: CreateNextContextOptions) => {
  // if (env.NODE_ENV === "development") {
  //   await new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve("");
  //     }, 300);
  //   });
  // }

  const Authorization = _opts.req.headers.authorization;

  let user: User | null = null;
  let sessionId: string | null = null;

  if (Authorization) {
    const data = await LoginSession.validateAuthorization(Authorization);
    if (data) {
      user = await User.getInstance(data.userId);
      sessionId = data.sessionId;
    }
  }

  const userAgent = _opts.req.headers["user-agent"];
  const ip = requestIp.getClientIp(_opts.req);

  return createInnerTRPCContext({
    userAgent,
    ip: ip ?? undefined,
    user,
    sessionId,
    revalidateSSG: _opts.res.revalidate,
  });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// rate limiter
const limiter = createTRPCStoreLimiter({
  root: t,
  fingerprint: (ctx, _input) => ctx.ip ?? "127.0.0.1",
  windowMs: 10000,
  message: (retryAfter) =>
    `Too many requests, please try again later. ${retryAfter}`,
  max: 50,
  onLimit: (retryAfter, _ctx, fingerprint) => {
    console.log(retryAfter, fingerprint);
    console.log(_ctx);
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: `Too many requests, please try again after some time`,
      // message: `Too many requests, please try again later ${retryAfter}s`,
    });
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure.use(limiter);

/** Reusable middleware that enforces users are logged in before running the procedure. */
const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user || !ctx.sessionId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
      sessionId: ctx.sessionId,
    },
  });
});

/** Reusable middleware that enforces admin are logged in before running the procedure. */
const enforceAdminIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user || !ctx.sessionId || !ctx.user.isAdmin()) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      user: undefined,
      admin: ctx.user,
      sessionId: ctx.sessionId,
    },
  });
});

export const userProcedure = publicProcedure.use(enforceUserIsAuthed);
export const adminProcedure = publicProcedure.use(enforceAdminIsAuthed);

type RequiredField<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: Exclude<T[P], null | undefined>;
};
export type UserContext = RequiredField<
  CreateContextOptions,
  "user" | "sessionId"
>;

export type AdminContext = Omit<UserContext, "user"> & {
  admin: User;
};
export type Context = inferAsyncReturnType<typeof createTRPCContext>;
