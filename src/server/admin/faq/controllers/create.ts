import { prisma } from "@/server/db";
import Faq from "@/server/services/Faq";
import { type AdminContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type Faq as FaqModel } from "@prisma/client";
import { type FaqsSchema } from "../schema";

const create = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: FaqsSchema["create"];
}) => {
  const { id, question, answer } = input;

  let data: FaqModel;

  if (id) {
    const faq = await Faq.getInstance(id, `Faq not exists with id ${id}`);
    await prisma.faq.update({
      where: { id },
      data: {
        question,
        answer,
      },
    });

    data = {
      ...input,
      id,
      createdAt: faq.row.createdAt,
    };
  } else {
    data = await prisma.faq.create({
      data: {
        question,
        answer,
      },
    });
  }

  // revalidate
  await ctx.revalidateSSG?.("/faq");
  return jsonResponse("Faq has been created", { data });
};
export default create;
