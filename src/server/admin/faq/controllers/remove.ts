import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type FaqsSchema } from "../schema";

const remove = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: FaqsSchema["remove"];
}) => {
  const id = input;
  await prisma.faq.delete({
    where: {
      id,
    },
  });

  // revalidate
  await ctx.revalidateSSG?.("/faq");

  return jsonResponse("Faq has been deleted");
};
export default remove;
