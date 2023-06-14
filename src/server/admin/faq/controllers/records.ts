import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { type FaqsSchema } from "../schema";

const records = async ({}: {
  ctx: AdminContext;
  input: FaqsSchema["records"];
}) => prisma.faq.findMany();
export default records;
