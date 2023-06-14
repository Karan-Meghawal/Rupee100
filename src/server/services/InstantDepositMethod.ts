import { env } from "@/env.mjs";
import {
  type InstantDepositMethod_UniqueId,
  type InstantDepositMethod as InstantDepositMethodModel,
} from "@prisma/client";
import { prisma } from "../db";
import { ClientError, NotFoundError } from "../utils/errors";
import { formatApiUrl } from "../utils/fns";

interface DBCoinbaseConfig {
  API_KEY: string;
  WEBHOOK_SECRET: string;
}

interface DBCoingateConfig {
  AUTH_TOKEN: string;
  ENVIRONMENT: "test" | "production";
}

export interface CoinbaseConfig extends DBCoinbaseConfig {
  CALLBACK_URL: string;
  SUCCESS_URL: string;
  CANCEL_URL: string;
}

export interface CoingateConfig extends DBCoingateConfig {
  CALLBACK_URL: string;
  SUCCESS_URL: string;
  CANCEL_URL: string;
}

export default class InstantDepositMethod {
  public readonly id: string;
  public readonly row: InstantDepositMethodModel;

  private constructor(row: InstantDepositMethodModel) {
    this.row = row;
    this.id = row.id;
  }

  public static async isUniqueIdExist(id: InstantDepositMethod_UniqueId) {
    const row = await prisma.instantDepositMethod.findUnique({
      where: {
        uniqueId: id,
      },
    });
    return !!row;
  }

  public static async getInstance(id: string, error?: string) {
    const row = await prisma.instantDepositMethod.findUnique({
      where: {
        id,
      },
    });

    if (!row)
      throw NotFoundError(
        error ?? `Instant Deposit Method not exist for ${id}`,
      );
    return new this(row);
  }

  public calcCharge(amount: number) {
    const { charge, chargeType } = this.row;
    return chargeType === "fixed" ? charge : (amount * charge) / 100;
  }

  public static async getInstanceByUniqueId(
    id: InstantDepositMethod_UniqueId,
    error?: string,
  ) {
    const row = await prisma.instantDepositMethod.findUnique({
      where: {
        uniqueId: id,
      },
    });

    if (!row)
      throw NotFoundError(
        error ?? `Instant Deposit Method not exist for ${id}`,
      );
    return new this(row);
  }

  public checkStatus() {
    if (this.row.status !== "active")
      throw ClientError(`${this.row.name} is currently unavailable`);
  }

  public getConfig<T extends CoinbaseConfig | CoingateConfig>(
    uniqueId: InstantDepositMethod_UniqueId,
  ): T {
    const { details } = this.row;
    if (typeof details !== "object")
      throw ClientError("Method Details are invalid");

    if (uniqueId === "coinbase") {
      const config = {
        ...(details as unknown as DBCoinbaseConfig),
        CALLBACK_URL: formatApiUrl("/api/webhook/coinbase"),
        SUCCESS_URL: formatApiUrl("/u/deposit/history"),
        CANCEL_URL: formatApiUrl("/u/deposit/history"),
      };
      return config as T;
    }

    if (uniqueId === "coingate") {
      const isUrl = env.COINGATE_TEST_CALLBACK_URL.startsWith("http");

      const config = {
        ...(details as unknown as DBCoingateConfig),
        CALLBACK_URL: isUrl
          ? env.COINGATE_TEST_CALLBACK_URL
          : formatApiUrl("/api/webhook/coingate"),
        SUCCESS_URL: formatApiUrl("/u/deposit/history"),
        CANCEL_URL: formatApiUrl("/u/deposit/history"),
      };
      return config as T;
    }

    throw ClientError(`No Such Method ${uniqueId as string}`);
  }
}
