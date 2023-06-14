import { ADMIN_PATH } from "@/route";
import { type AppRouter } from "@/server/router";
import { MutationCache, QueryCache } from "@tanstack/react-query";
import { TRPCClientError, httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { toast } from "react-toastify";
import superjson from "superjson";
import { getAuthorization } from "./jwt";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const baseApi = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: "always",
            keepPreviousData: true,
            retry: 1,
          },
        },
        queryCache: new QueryCache({
          onError: (error) => {
            if (error instanceof TRPCClientError) {
              toast.error(error.message);
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              const statusCode = error.shape?.data?.httpStatus as number;
              if (
                statusCode === 412 &&
                window.location.pathname !== ADMIN_PATH.install
              ) {
                window.location.replace(ADMIN_PATH.install);
              }
            } else {
              console.log(error);
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            if (error instanceof TRPCClientError) {
              toast.error(error.message);
            } else {
              console.log(error);
            }
          },
          onSuccess(data) {
            if (
              typeof data === "object" &&
              data !== null &&
              "message" in data
            ) {
              const message = data.message as string;
              toast.success(message);
            }
          },
        }),
      },
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            const Authorization = getAuthorization();
            return Authorization ? { Authorization } : {};
          },
        }),
      ],
    };
  },
  ssr: false,
});

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export type ApiInputs = RouterInputs["main"];
export type ApiOutputs = RouterOutputs["main"];

export type UserApiInputs = RouterInputs["user"];
export type UserApiOutputs = RouterOutputs["user"];

export type AdminApiInputs = RouterInputs["admin"];
export type AdminApiOutputs = RouterOutputs["admin"];

export const api = baseApi.main;
export const userApi = baseApi.user;
export const adminApi = baseApi.admin;

export const useBaseUtils = () => baseApi.useContext();
export const useUtils = () => useBaseUtils().main;
export const useUserUtils = () => useBaseUtils().user;
export const useAdminUtils = () => useBaseUtils().admin;
