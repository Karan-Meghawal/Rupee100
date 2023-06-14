import { InstantDepositMethods } from "@/server/api/instant-deposits";
import { prisma } from "@/server/db";
import InstantDepositMethod from "@/server/services/InstantDepositMethod";
import { type AdminContext } from "@/server/trpc";
import { ClientError } from "@/server/utils/errors";
import { checkPermission, jsonResponse } from "@/server/utils/fns";
import { type Prisma } from "@prisma/client";
import { type InstantDepositSchema } from "../schema";

const create = async ({
  input,
}: {
  ctx: AdminContext;
  input: InstantDepositSchema["create"];
}) => {
  checkPermission();

  const { details, id, status, uniqueId, charge, chargeType } = input;

  const method = InstantDepositMethods.find(
    (list) => list.uniqueId === uniqueId,
  );
  if (!method)
    throw ClientError(`No instant method gateway for id ${uniqueId}`);
  const { config, logo, name, fullLogo, uniqueId: uniqueIdList } = method;

  const requestedKeys = Object.keys(details);
  const requiredKeys = config.map((data) => data.key);
  const isKeysSame = requiredKeys.every((item) => requestedKeys.includes(item));
  if (!isKeysSame) throw ClientError("Missing required details");

  const data: Prisma.InstantDepositMethodCreateInput = {
    details,
    fullLogo,
    logo,
    name,
    status,
    uniqueId: uniqueIdList,
    config,
    charge,
    chargeType,
  };

  let message: string;

  if (id) {
    await InstantDepositMethod.getInstance(id);
    await prisma.instantDepositMethod.update({
      where: {
        id,
      },
      data,
    });
    message = `${data.name} has been updated`;
  } else {
    await prisma.instantDepositMethod.create({
      data,
    });
    message = `${data.name} has been created`;
  }

  return jsonResponse(message);
};

export default create;
