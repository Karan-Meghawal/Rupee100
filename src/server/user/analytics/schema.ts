import { date, object, type TypeOf } from "zod";

const joining = object({
  startDate: date(),
  endDate: date(),
});

export type AnalyticsSchema = {
  joining: TypeOf<typeof joining>;
};
export const analyticsSchema = {
  joining,
};
