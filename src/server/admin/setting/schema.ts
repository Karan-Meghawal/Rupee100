import { Setting_TransferPayment_Type } from "@prisma/client";
import {
  array,
  boolean,
  coerce,
  nativeEnum,
  number,
  object,
  string,
  undefined,
  z,
  type TypeOf,
} from "zod";

const emailSetting = object({
  encryption: z.enum(["ssl", "tls"] as const),
  host: string().nonempty("Host is required"),
  port: string().transform(Number).or(number()),
  userName: string().nonempty("Username is required"),
  password: string().nonempty("Password is required"),
});

const sendTestEmail = object({
  email: string().nonempty("String is required"),
});

const emailPreferences = object({
  paymentDeposit: boolean(),
  paymentTransfer: boolean(),
  paymentWithdraw: boolean(),
  registrationSuccess: boolean(),
});

const kyc = object({
  id: string().optional(),
  label: string().nonempty("Label is required"),
  required: z.enum(["required", "optional"]),
  //   inputType: z.enum(inputTypeArr),
  //   fileExtensions: array(z.enum(fileExtensionsArr)),
  dropdownOptions: array(
    object({ option: string().nonempty("Option is required") }),
  ),
});

const logo = object({
  logo: string().nonempty("Logo is required"),
});

const favicon = object({
  favicon: string().nonempty("Favicon is required"),
});

const fullLogo = object({
  fullLogo: string().nonempty("Full Logo is required"),
});

const siteConfiguration = object({
  contactDetails: boolean(),
  kycVerification: boolean(),
  registration: boolean(),
});

const siteSetting = object({
  appName: string().nonempty("App Name is required"),
  currency: string().nonempty("Currency is required"),
  timezone: string().nonempty("Timezone is required"),
  currencyPosition: z.enum(["prefix", "suffix"] as const),
  transferPayment: object({
    charge: string().transform(Number).or(coerce.number()),
    type: nativeEnum(Setting_TransferPayment_Type),
  }),
  emailAccountLimit: string().transform(Number).or(coerce.number()),
  country: string().nonempty("Country is required"),
});

const getSetting = undefined();

export type SettingSchema = {
  emailSetting: TypeOf<typeof emailSetting>;
  sendTestEmail: TypeOf<typeof sendTestEmail>;
  emailPreferences: TypeOf<typeof emailPreferences>;
  kyc: TypeOf<typeof kyc>;
  logo: TypeOf<typeof logo>;
  favicon: TypeOf<typeof favicon>;
  fullLogo: TypeOf<typeof fullLogo>;
  siteSetting: TypeOf<typeof siteSetting>;
  siteConfiguration: TypeOf<typeof siteConfiguration>;
  getSetting: TypeOf<typeof getSetting>;
};

const settingSchema = {
  emailSetting,
  sendTestEmail,
  emailPreferences,
  kyc,
  logo,
  fullLogo,
  favicon,
  siteSetting,
  siteConfiguration,
  getSetting,
};

export default settingSchema;
