import Setting from "@/server/services/Setting";
import { type UserContext } from "@/server/trpc";
import { type DashboardSchema } from "../schema";

const getNotice = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: DashboardSchema["getNotice"];
}) => {
  const setting = await Setting.getInstance();
  return setting.row.notice;
};
export default getNotice;
