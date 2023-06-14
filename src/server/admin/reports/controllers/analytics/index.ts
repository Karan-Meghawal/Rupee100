import { type AdminContext } from "@/server/trpc";
import { ClientError } from "@/server/utils/errors";
import { type ReportSchema } from "../../schema";
import depositAnalytics from "./deposit";
import registrationAnalytics from "./registration";
import withdrawAnalytics from "./withdraw";

const analytics = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: ReportSchema["analytics"];
}) => {
  const { startDate, endDate, event } = input;

  switch (event) {
    case "registration":
      return registrationAnalytics(startDate, endDate);
    case "deposit":
      return depositAnalytics(startDate, endDate);
    case "withdraw":
      return withdrawAnalytics(startDate, endDate);
    default:
      throw ClientError(`Invalid event ${event as string}`);
  }
};
export default analytics;
