import { isDecNum } from "@/utils/fns";
import { isValid, parse } from "date-fns";
import { isObjectId } from "./fns";

export const prismaFilter = {
  string: (value: string) => ({
    contains: value,
    mode: "insensitive" as const,
  }),
  enum: <T extends string>(value: string, obj: Record<T, T>) =>
    value.toLowerCase() in obj ? (value.toLowerCase() as T) : undefined,
  number: (value: string) => (isDecNum(value) ? Number(value) : undefined),
  id: (value: string) => (isObjectId(value) ? value : undefined),
  date: (value: string) => {
    const parsedDate = parse(value, "dd MMM yyyy HH:mm:ss", new Date());
    const isValidDate = isValid(parsedDate);
    return isValidDate
      ? {
          gte: new Date(value).toISOString(),
          lt: new Date(new Date(value).getTime() + 1000).toISOString(),
        }
      : undefined;
  },
};
