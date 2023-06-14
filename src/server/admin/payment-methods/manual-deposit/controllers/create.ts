import { prisma } from "@/server/db";
import ManualDepositMethod from "@/server/services/ManualDepositMethod";
import { type AdminContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type ManualDepositMethodSchema } from "../schema";

const create = async ({
  input,
}: {
  ctx: AdminContext;
  input: ManualDepositMethodSchema["create"];
}) => {
  const { id, ...data } = input;

  let message: string;
  if (id) {
    await ManualDepositMethod.getInstance(id);

    await prisma.manualDepositMethod.update({
      where: {
        id,
      },
      data,
    });

    message = `Deposit Method ${data.name} has been updated`;
  } else {
    await prisma.manualDepositMethod.create({
      data,
    });

    message = `Deposit Method ${data.name} has been created`;
  }
  return jsonResponse(message);
};

export default create;
