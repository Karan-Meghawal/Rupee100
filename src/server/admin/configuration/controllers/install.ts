import { prisma } from "@/server/db";
import {
  DEFAULT_FAQS,
  DEFAULT_PAGE_ABOUT_US,
  DEFAULT_PAGE_HOME,
  DEFAULT_SECTION_RECORD,
} from "@/server/defaultData";
import Setting from "@/server/services/Setting";
import User from "@/server/services/User";
import { ClientError } from "@/server/utils/errors";
import { jsonResponse } from "@/server/utils/fns";
import { type ConfigurationSchema } from "../schema";

const install = async ({
  input,
}: {
  input: ConfigurationSchema["install"];
}) => {
  // check if already installed

  const isInstalled = await Setting.isInstalled();
  if (isInstalled) throw ClientError("Already installed");

  const {
    email,
    firstName,
    lastName,
    license,
    mobileNumber,
    password,
    userName,
  } = input;

  if (license !== "JFDT67GD") throw ClientError("License is not valid");

  const lft = 1;
  const placementSide = "left";
  const rgt = 2;
  const userId = await User.createUserId();

  await prisma.$transaction(async (prismaTx) => {
    // create admin
    await User.createUser(
      {
        email,
        firstName,
        lastName,
        lft,
        password,
        placementSide,
        rgt,
        role: "admin",
        userId,
        userName,
        contact: {
          mobileNumber,
        },
      },
      prismaTx,
    );

    // create setting
    const appName = "Jamsrmlm";
    const country = "IN";
    const currency = "₹";
    const currencyPosition = "prefix";
    const emailAccountLimit = 0;
    const favicon = "/images/favicon.png";
    const fullLogo = "/images/full-logo.png";
    const logo = "/images/logo.png";
    const notice = "Welcome to the Jamsrmlm";
    const configuration = {
      contactDetails: false,
      kycVerification: false,
      registration: true,
    };
    const timezone = "Asia/Kolkata";

    await Setting.createSetting(
      {
        appName,
        country,
        currency,
        currencyPosition,
        emailAccountLimit,
        favicon,
        fullLogo,
        logo,
        notice,
        configuration,
        timezone,
        transferPayment: {
          charge: 0,
          type: "percent",
        },
        emailPreferences: {
          paymentDeposit: false,
          paymentTransfer: false,
          paymentWithdraw: false,
          registrationSuccess: true,
        },
      },
      prismaTx,
    );

    // create frontend
    await prismaTx.section.create({ data: DEFAULT_SECTION_RECORD });

    // create homepage
    await prismaTx.page_Home.create({ data: DEFAULT_PAGE_HOME });

    // create about us page
    await prismaTx.page_AboutUs.create({ data: DEFAULT_PAGE_ABOUT_US });

    // create faq
    await prismaTx.faq.createMany({ data: DEFAULT_FAQS });
  });

  return jsonResponse("Installation Successful");
};

export default install;
