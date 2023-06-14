import { APP_URL } from "@/config";
import { env } from "@/env.mjs";
import { Prisma } from "@prisma/client";
import { ClientError } from "./errors";

type UserResponse<T> = {
  message: string;
} & T;

export const jsonResponse = <T extends Record<string, unknown>>(
  message: string,
  response: T = {} as T,
): UserResponse<T> => ({ message, ...response });

export const formatApiUrl = (url: string): string => APP_URL + url;

export const isObjectId = (id: string): boolean => {
  // Regular expression that checks for 24 hex characters
  const checkForHexRegExp = /^[0-9a-fA-F]{24}$/;

  return id.length === 24 && checkForHexRegExp.test(id);
};

export const validateObjectid = (id: string): never | undefined => {
  if (!isObjectId(id)) throw ClientError(`Invalid Id pattern: ${id}`);
  return undefined;
};

export const handlePrismaException = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code !== "P2025") throw error;
  }
};

export const prismaJsonToRecord = (data: Prisma.JsonValue) => {
  if (typeof data !== "object" || Array.isArray(data)) return null;
  return data as Record<string, string>;
};

export const checkPermission = () => {
  if (env.RESTRICTION === "yes") {
    throw ClientError("Action not allowed in demo");
  }
};
