import { prisma } from "@/server/db";
import KycForm from "@/server/services/KycForm";
import { type AdminContext } from "@/server/trpc";
import { ClientError } from "@/server/utils/errors";
import { jsonResponse } from "@/server/utils/fns";
import { type KycForm as KycFormModel } from "@prisma/client";
import { type KycSchema } from "../schema";

const create = async ({
  ctx,
  input,
}: {
  ctx: AdminContext;
  input: KycSchema["create"];
}) => {
  const { inputType, label, required, id } = input;

  const dropdownOptions = inputType === "dropdown" ? input.dropdownOptions : [];
  const fileExtensions = inputType === "file" ? input.fileExtensions : [];

  let message: string;
  let data: KycFormModel;

  await prisma.$transaction(async (prismaTx) => {
    if (id) {
      // todo change createdAt
      data = {
        inputType,
        label,
        required,
        fileExtensions,
        id,
        dropdownOptions,
        createdAt: new Date(),
      };
      const isId = await KycForm.validateId(id);
      if (!isId) throw ClientError("Id");

      await prismaTx.kycForm.update({
        where: {
          id,
        },
        data: {
          dropdownOptions,
          inputType,
          label,
          required,
          fileExtensions,
        },
      });
      message = "Kyc Form has been updated";
    } else {
      data = await prismaTx.kycForm.create({
        data: {
          dropdownOptions,
          inputType,
          label,
          required,
          fileExtensions,
          id,
        },
      });
      message = "Kyc Form has been created";
    }

    // update users kyc to unverified if new required kyc record created or updated
    if (required) {
      await prismaTx.user.updateMany({
        data: {
          kyc: "unverified",
        },
      });
    }

    return undefined;
  });

  return jsonResponse(message!, { data: data! });
};

export default create;
