import { undefined, type TypeOf } from "zod";

const getSummary = undefined();
const getNotice = undefined();

export type DashboardSchema = {
  getSummary: TypeOf<typeof getSummary>;
  getNotice: TypeOf<typeof getNotice>;
};
const dashboardSchema = {
  getSummary,
  getNotice,
};
export default dashboardSchema;
