import { type Faq as FaqModel } from "@prisma/client";
import { prisma } from "../db";
import { NotFoundError } from "../utils/errors";

export default class Faq {
  public readonly row: FaqModel;
  public readonly id: string;

  private constructor(faq: FaqModel) {
    this.row = faq;
    this.id = faq.id;
  }

  public static async isFaqId(id: string): Promise<boolean> {
    const row = await prisma.faq.findUnique({
      where: {
        id,
      },
    });
    return !!row;
  }

  static async getInstance(id: string, error?: string) {
    const faq = await prisma.faq.findUnique({
      where: {
        id,
      },
    });
    if (!faq) throw NotFoundError(error ?? `Faq not found with id ${id}`);

    return new this(faq);
  }
}
