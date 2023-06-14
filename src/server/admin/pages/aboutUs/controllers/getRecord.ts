import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { type AboutUsSchema } from "../schema";

const getRecord = async ({}: {
  ctx: AdminContext;
  input: AboutUsSchema["getRecord"];
}) => prisma.page_AboutUs.findFirst();
export default getRecord;
