import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { type HomeSchema } from "../schema";

const getRecord = async ({}: {
  ctx: AdminContext;
  input: HomeSchema["getRecord"];
}) => prisma.page_Home.findFirst();

export default getRecord;
