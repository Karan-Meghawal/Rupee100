import { prisma } from "@/server/db";
import WithdrawMethod from "@/server/services/WithdrawMethod";
import { type AdminContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import crypto from "crypto";
import { type WithdrawSchema } from "../schema";

const create = async ({
  input,
}: {
  ctx: AdminContext;
  input: WithdrawSchema["create"];
}) => {
  const { id, ...data } = input;

  const details = input.details.map((detail) => ({
    ...detail,
    name: detail.name ?? crypto.randomBytes(6).toString("hex"),
  }));

  let message: string;
  if (id) {
    await WithdrawMethod.getInstance(id);

    await prisma.withdrawMethod.update({
      where: {
        id,
      },
      data: {
        ...data,
        details,
      },
    });

    message = "Withdraw Method has been updated";
  } else {
    await prisma.withdrawMethod.create({
      data: {
        ...data,
        details,
      },
    });

    message = "Withdraw Method has been created";
  }
  return jsonResponse(message);
};

export default create;
