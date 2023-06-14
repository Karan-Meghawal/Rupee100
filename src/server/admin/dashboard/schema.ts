import { undefined, type TypeOf, object, string } from "zod";

const getNotice = undefined();
const updateNotice = object({
  notice: string().max(5000),
});
const getCardValues = undefined();

export type DashboardSchema = {
  getNotice: TypeOf<typeof getNotice>;
  updateNotice: TypeOf<typeof updateNotice>;
  getCardValues: TypeOf<typeof getCardValues>;
};

const dashboardSchema = { getNotice, updateNotice, getCardValues };
export default dashboardSchema;
