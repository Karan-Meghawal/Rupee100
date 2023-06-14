import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { type KycSchema } from "../schema";

const records = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: KycSchema["records"];
}) => prisma.kycForm.findMany();

export default records;
