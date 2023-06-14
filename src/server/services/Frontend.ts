import { type Prisma } from "@prisma/client";
import { type PrismaTransaction } from "../db";

export default class Frontend {
  static async createFrontend(
    data: Prisma.SectionCreateInput,
    prismaTx: PrismaTransaction,
  ) {
    await prismaTx.section.create({ data });
  }
}
