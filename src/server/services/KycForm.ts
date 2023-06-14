import { type KycForm as KycFormModel } from "@prisma/client";
import { prisma } from "../db";
import { ClientError } from "../utils/errors";

export default class KycForm {
  static async validateId(id: string): Promise<boolean> {
    const row = await prisma.kycForm.findUnique({
      where: {
        id,
      },
    });
    if (!row) throw ClientError(`Kyc Form not found with id ${id}`);
    return !!row;
  }

  static isUserDataValid(
    kycData: KycFormModel[],
    userData?: Record<string, string> | null,
  ) {
    if (!userData) return false;
    return kycData.every((detail) => detail.id in userData);
  }

  static async validateKycData(
    userData: Record<string, string> | null,
    error?: string,
  ) {
    const kycData = await prisma.kycForm.findMany();

    const isValid = this.isUserDataValid(kycData, userData);
    if (!isValid) throw ClientError(error || "Invalid Profile Values received");
    return kycData;
  }
}
