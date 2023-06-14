import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { type SectionSchema } from "../schema";

const getSection = async ({}: {
  ctx: AdminContext;
  input: SectionSchema["getSection"];
}) => prisma.section.findFirst();
export default getSection;
