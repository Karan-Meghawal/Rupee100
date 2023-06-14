import { type AdminContext } from "@/server/trpc";
import Plan from "@/server/services/Plan";
import { type PlanSchema } from "../schema";

const getRecord = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: PlanSchema["getRecord"];
}) => {
  const id = input;
  const plan = await Plan.getInstance(id);
  return plan.row;
};
export default getRecord;
