import { type Prisma, type Setting as SettingModel } from "@prisma/client";
import { prisma, type PrismaTransaction } from "../db";
import { HttpError, NotFoundError } from "../utils/errors";
import { formatApiUrl } from "../utils/fns";
import User from "./User";

export default class Setting {
  //  ============================ Properties ============================

  public readonly row: SettingModel;

  //  ============================ Constructor ============================

  private constructor(row: SettingModel) {
    this.row = row;
  }

  //  ============================ Public Accessors ============================

  public get logoAbsUrl() {
    const { logo } = this.row;
    return formatApiUrl(logo);
  }

  //  ============================ Public Static Methods ============================

  public static async checkEmailRegistrationLimit(email: string) {
    const instance = await this.getInstance();
    const { emailAccountLimit } = instance.row;
    const accounts = await User.accountsRegisteredWithEmail(email);
    if (accounts >= emailAccountLimit && emailAccountLimit > 0)
      throw HttpError(
        `Email account limit exceeded of ${emailAccountLimit}`,
        "TOO_MANY_REQUESTS",
      );
    return undefined;
  }

  public static async checkRegistrationStatus() {
    const instance = await this.getInstance();
    const {
      configuration: { registration },
    } = instance.row;

    if (!registration)
      throw HttpError("Registration is currently unavailable", "BAD_REQUEST");
    return undefined;
  }

  public static async getInstance() {
    const row = await prisma.setting.findFirst();
    if (!row) throw NotFoundError("Settings not found");
    return new this(row);
  }

  static async getConfiguration() {
    const setting = await prisma.setting.findFirst();
    if (!setting) throw NotFoundError("Settings not found");
    return setting.configuration;
  }

  static async getEmailPreferences() {
    const setting = await prisma.setting.findFirst();
    if (!setting) throw NotFoundError("Settings not found");
    return setting.emailPreferences;
  }

  static async isInstalled() {
    const row = await prisma.setting.findFirst();
    return !!row;
  }

  static async createSetting(
    data: Prisma.SettingCreateInput,
    prismaTx: PrismaTransaction,
  ) {
    await prismaTx.setting.create({ data });
  }

  public static async fCurrency(amount: number) {
    const setting = await this.getInstance();
    const { currency, currencyPosition } = setting.row;
    return currencyPosition === "prefix"
      ? `${currency}${amount}`
      : `${amount}${currency}`;
  }

  public fCurrency = (amount: number) => {
    const { currency, currencyPosition } = this.row;
    return currencyPosition === "prefix"
      ? `${currency}${amount}`
      : `${amount}${currency}`;
  };
}
