import Setting from "@/server/services/Setting";
import { type AdminContext } from "@/server/trpc";
import { type DashboardSchema } from "../schema";

const getNotice = async ({}: {
  ctx: AdminContext;
  input: DashboardSchema["getNotice"];
}) => {
  const {
    row: { notice },
  } = await Setting.getInstance();
  return notice;
};
export default getNotice;
