import { InstantDepositMethods } from "@/server/api/instant-deposits";
import { type AdminContext } from "@/server/trpc";
import { type InstantDepositSchema } from "../schema";

const getCreateRecords = ({}: {
  ctx: AdminContext;
  input: InstantDepositSchema["getCreateRecords"];
}) => InstantDepositMethods;
export default getCreateRecords;
