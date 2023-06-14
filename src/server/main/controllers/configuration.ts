import { prisma } from "@/server/db";
import { HttpError } from "@/server/utils/errors";

const configuration = async () => {
  const setting = await prisma.setting.findFirst({
    select: {
      appName: true,
      configuration: true,
      country: true,
      currency: true,
      currencyPosition: true,
      logo: true,
      fullLogo: true,
      favicon: true,
    },
  });

  if (!setting) throw HttpError("Installation required", "PRECONDITION_FAILED");
  return setting;
};
export default configuration;
