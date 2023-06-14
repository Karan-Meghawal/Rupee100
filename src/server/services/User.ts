/* eslint-disable no-underscore-dangle */
import { env } from "@/env.mjs";
import {
  type Prisma,
  type User as UserModel,
  type User_Contact,
  type User_PlacementSide,
  type User_Role,
} from "@prisma/client";
import bcrypt from "bcryptjs";
import { addDays, endOfDay, startOfDay } from "date-fns";
import jwt from "jsonwebtoken";
import { getSelectorsByUserAgent } from "react-device-detect";
import { type UserWithoutPassword } from "~/types";
import { MAX_LOGIN_SESSION } from "../config";
import { prisma, type PrismaTransaction } from "../db";
import { ClientError, NotFoundError, ServerError } from "../utils/errors";
import Plan from "./Plan";
import ReferralIncome from "./ReferralIncome";
import Transaction from "./Transaction";
import PlanHistory from "./PlanHistory";

type InitializeBy = "userId" | "userName";
type InitializeOptions = {
  userId: number;
  user: UserModel;
  options: {
    error?: string;
    initializeBy?: InitializeBy;
    prismaTx?: PrismaTransaction;
  };
};
type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};
export type UserContactRequired = NoUndefinedField<User_Contact>;

export default class User {
  // ============================ Properties ============================

  public readonly row: UserModel;
  public readonly userId: number;

  // ============================ Constructors ============================

  private constructor(user: UserModel) {
    this.row = user;
    this.userId = user.userId;
  }

  // ============================ Public Static Methods ============================

  public static async accountsRegisteredWithEmail(
    email: string,
  ): Promise<number> {
    const counts = await prisma.user.count({ where: { email } });
    return counts;
  }

  public static async createUser(
    user: Prisma.UserCreateInput,
    prismaTx: PrismaTransaction,
  ) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await prismaTx.user.create({
      data: { ...user, password: hashedPassword },
    });
    return newUser;
  }

  public static async createUserId() {
    const STARTING_USER_ID = 1006090;
    const lastUser = await prisma.user.findFirst({
      orderBy: { userId: "desc" },
    });
    if (!lastUser) return STARTING_USER_ID;
    const { userId } = lastUser;
    return userId + 1;
  }

  public static async getInstance(
    userId: number | string,
    options?: InitializeOptions["options"],
  ): Promise<User> {
    const errorText = options?.error || `User not found for ${userId}`;
    const initializeBy: InitializeBy = options?.initializeBy || "userId";

    let user: UserModel | null = null;
    if (initializeBy === "userId" && typeof userId === "number") {
      user = await (options?.prismaTx ?? prisma).user.findUnique({
        where: {
          userId,
        },
      });
    } else if (initializeBy === "userName" && typeof userId === "string") {
      user = await (options?.prismaTx ?? prisma).user.findUnique({
        where: {
          userName: userId,
        },
      });
    }
    if (!user) throw NotFoundError(errorText);
    return new this(user);
  }

  public static async getInstanceByIdUserName(userId: string): Promise<User> {
    const initializeBy = isNaN(Number(userId)) ? "userName" : "userId";

    return initializeBy === "userId"
      ? this.getInstance(Number(userId), {
          error: "No account is registered with this userId or userName",
          initializeBy,
        })
      : this.getInstance(userId, {
          error: "No account is registered with this userId or userName",
          initializeBy,
        });
  }

  public static async isUserId(userId: number): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { userId } });
    return !!user;
  }

  public static async isUserName(userName: string): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { userName } });
    return !!user;
  }

  // ============================ Public Methods ============================

  public async addReferralIncome(userId: number, prismaTx: PrismaTransaction) {
    const referralIncome = 0;
    await ReferralIncome.createIncome(
      {
        referralId: this.userId,
        amount: referralIncome,
        user: {
          connect: {
            userId,
          },
        },
      },
      prismaTx,
    );
  }

  public get isPremium() {
    const { planId } = this.row;
    return !!planId;
  }

  public async updatePendingReferralIncome(
    userId: number,
    userInvestment: number,
    prismaTx: PrismaTransaction,
  ) {
    const charge = 0;
    const description = `referral income - ${userId}`;
    const {
      isPremium,
      row: { planId },
    } = this;

    let referralIncome = 0;
    if (isPremium && planId) {
      const plan = await Plan.getInstance(planId);
      referralIncome = plan.getReferralIncome(userInvestment);
    }

    // create transaction
    const transaction = await Transaction.createTransaction(
      {
        amount: referralIncome,
        category: "referralIncome",
        charge,
        description,
        netAmount: referralIncome,
        status: "credit",
        user: {
          connect: {
            userId: this.userId,
          },
        },
      },
      prismaTx,
    );
    const transactionId = transaction.id;

    // update referral user pending referral income record
    await prismaTx.referralIncome.update({
      where: {
        referralId: this.userId,
        userId,
      },
      data: {
        transactionId,
        status: "credit",
        amount: referralIncome,
      },
    });

    // update plan history referral income
    const planHistory = await PlanHistory.getActivePlanHistory(
      this.userId,
      prismaTx,
    );
    await planHistory.updateReferralIncome(referralIncome, prismaTx);
  }

  public async checkLoginSessionLimit() {
    const sessions = await prisma.loginSession.count({
      where: { userId: this.userId },
    });

    if (sessions >= MAX_LOGIN_SESSION) {
      const ids = await prisma.loginSession.findMany({
        where: { userId: this.userId },
        orderBy: { createdAt: "desc" },
        take: MAX_LOGIN_SESSION - sessions - 1,
        select: { id: true },
      });
      await prisma.loginSession.deleteMany({
        where: { id: { in: ids.map((user) => user.id) } },
      });
    }
  }

  public checkPlacementAvailability(placement: User_PlacementSide): void {
    const { leftId, rightId } = this.row;
    if (leftId && rightId) {
      throw ClientError(
        `${this.userId} can be used for placement Id. Both left and right sides are in use`,
      );
    }

    if (placement === "left" && leftId) {
      throw ClientError(
        `${this.userId} can't be used for placement id for left placement side`,
      );
    }

    if (placement === "right" && rightId) {
      throw ClientError(
        `${this.userId} can't be used for placement id for right placement side`,
      );
    }

    return undefined;
  }

  public async createLoginSession({
    token,
    ip,
    remember,
    userAgent,
    agent = "user",
  }: {
    token: string;
    ip?: string;
    remember: boolean;
    userAgent?: string;
    agent?: User_Role;
  }) {
    let browser = "";
    let os = "";
    let country = "";
    let region = "";
    let city = "";

    try {
      interface IpRes {
        country: string;
        regionName: string;
        city: string;
      }

      const res = await fetch(User.getIpFetchUrl(ip));
      const response = (await res.json()) as IpRes;

      if (response.country) country = response.country;
      if (response.regionName) region = response.regionName;
      if (response.city) city = response.city;
    } catch (error) {
      console.log("error->", error);
    }

    if (userAgent) {
      const data = getSelectorsByUserAgent(userAgent ?? "") as UserAgent;
      const { browserName, fullBrowserVersion, osName, osVersion } = data;

      browser = `${browserName} ${fullBrowserVersion}`;
      os = `${osName} ${osVersion}`;
    }

    const validTill = addDays(new Date(), remember ? 7 : 1);

    return prisma.loginSession.create({
      data: {
        token,
        userId: this.userId,
        validTill,
        agent,
        browser,
        city,
        country,
        ip,
        os,
        region,
      },
    });
  }

  public createSessionToken(remember: boolean) {
    const token = jwt.sign({ id: this.userId }, env.JWT_SECRET_KEY, {
      expiresIn: remember ? "7d" : "1d",
    });
    return token;
  }

  public async getChildPlacementSide(
    childId: number,
    prismaTx: PrismaTransaction,
  ): Promise<User_PlacementSide> {
    const parentId = this.userId;
    if (parentId === childId) return this.row.placementSide;

    const childUser = await User.getInstance(childId, { prismaTx });
    let { placementId } = childUser.row;
    if (parentId === placementId) return childUser.row.placementSide;

    let placementSide: User_PlacementSide | null = null;
    while (placementId !== parentId) {
      if (!placementId)
        throw ServerError("Something went wrong in getting placement side");
      const user = await User.getInstance(placementId);
      placementId = user.row.placementId;
      placementSide = user.row.placementSide;
    }
    if (!placementSide) throw ServerError("Error in getting placement side");
    return placementSide;
  }

  public getDisplayName() {
    return `${this.row.firstName} ${this.row.lastName}`;
  }

  public async getWallet(): Promise<number> {
    // credits
    const receivedAmount = await this.getReceivedAmount();
    const referralIncome = await this.getReferralIncome();
    const roiIncome = await this.getRoiIncome();
    const deposit = await this.getDeposit();

    // debits
    const transferredAmount = await this.getTransferredAmount();
    const withdraw = await this.getWithdraw();
    const pendingWithdraw = await this.getPendingWithdraw();

    const totalCredit = receivedAmount + referralIncome + roiIncome + deposit;
    const totalDebit = transferredAmount + withdraw + pendingWithdraw;

    const totalWallet = totalCredit - totalDebit;
    return Number(totalWallet.toFixed(2));
  }

  public async getReferralIncome(): Promise<number> {
    const data = await prisma.referralIncome.aggregate({
      where: {
        referralId: this.userId,
      },
      _sum: {
        amount: true,
      },
    });

    const total = data._sum.amount ?? 0;
    return total;
  }

  public async getRoiIncome(): Promise<number> {
    const data = await prisma.roi.aggregate({
      where: {
        userId: this.userId,
      },
      _sum: {
        amount: true,
      },
    });

    const total = data._sum.amount ?? 0;
    return total;
  }

  public async getReceivedAmount(): Promise<number> {
    const data = await prisma.transferPayment.aggregate({
      where: {
        userId: this.userId,
        action: "received",
      },
      _sum: {
        netAmount: true,
      },
    });
    const total = data._sum.netAmount ?? 0;
    return total;
  }

  public async getTransferredAmount(): Promise<number> {
    const data = await prisma.transferPayment.aggregate({
      where: {
        userId: this.userId,
        action: "transferred",
      },
      _sum: {
        netAmount: true,
      },
    });
    const total = data._sum.netAmount ?? 0;
    return total;
  }

  public async getDeposit(): Promise<number> {
    const data = await prisma.deposit.aggregate({
      where: {
        userId: this.userId,
        status: {
          in: ["approved", "credit"],
        },
      },
      _sum: {
        netAmount: true,
      },
    });
    const total = data._sum.netAmount ?? 0;
    return total;
  }

  public async getDepositInReview(): Promise<number> {
    const data = await prisma.deposit.aggregate({
      where: {
        userId: this.userId,
        status: {
          in: ["review"],
        },
      },
      _sum: {
        netAmount: true,
      },
    });
    const total = data._sum.netAmount ?? 0;
    return total;
  }

  public async getLastDeposit(): Promise<number> {
    const data = await prisma.deposit.findFirst({
      where: {
        userId: this.userId,
        status: {
          in: ["approved", "credit"],
        },
      },
      select: {
        netAmount: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const total = data?.netAmount ?? 0;
    return total;
  }

  public async getWithdraw(): Promise<number> {
    const data = await prisma.withdraw.aggregate({
      where: {
        userId: this.userId,
        status: "success",
      },
      _sum: {
        amount: true,
      },
    });
    const total = data._sum.amount ?? 0;
    return total;
  }

  public async getLastWithdraw(): Promise<number> {
    const data = await prisma.withdraw.findFirst({
      where: {
        userId: this.userId,
        status: "success",
      },
      select: {
        amount: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const total = data?.amount ?? 0;
    return total;
  }

  public async getPendingWithdraw(): Promise<number> {
    const data = await prisma.withdraw.aggregate({
      where: {
        userId: this.userId,
        status: "pending",
      },
      _sum: {
        amount: true,
      },
    });
    const total = data._sum.amount ?? 0;
    return total;
  }

  public async getTotalIncome(): Promise<number> {
    const referralIncome = await this.getReferralIncome();
    const roiIncome = await this.getRoiIncome();
    return referralIncome + roiIncome;
  }

  public async getTotalTeamCount(): Promise<number> {
    const { lft, rgt } = this.row;
    const count = await prisma.user.count({
      where: {
        lft: {
          gte: lft,
        },
        rgt: {
          lte: rgt,
        },
      },
    });
    return count;
  }

  public async getDirectReferralCount(): Promise<number> {
    const count = await prisma.user.count({
      where: {
        referralId: this.userId,
      },
    });
    return count;
  }

  public async getPremiumReferralCount(): Promise<number> {
    const count = await prisma.user.count({
      where: {
        referralId: this.userId,
        planId: {
          isSet: true,
        },
      },
    });
    return count;
  }

  public async getPlacementIdForRegistration(
    placement: User_PlacementSide,
  ): Promise<number> {
    let { leftId, rightId } = this.row;

    let isLeftId = !!leftId;
    let isRightId = !!rightId;

    switch (placement) {
      case "left":
        if (leftId) {
          while (isLeftId) {
            const user = await User.getInstance(leftId);
            if (user.row.leftId) {
              leftId = user.row.leftId;
              isLeftId = true;
            } else break;
          }
        }
        return leftId ?? this.userId;
      case "right":
        if (rightId) {
          while (isRightId) {
            const user = await User.getInstance(rightId);
            if (user.row.leftId) {
              rightId = user.row.leftId;
              isRightId = true;
            } else break;
          }
        }
        return rightId ?? this.userId;
      default:
        throw ClientError(`Unknown placement side: ${placement as string}`);
    }
  }

  public isAdmin() {
    return this.row.role === "admin";
  }

  public isBlocked() {
    return this.row.status === "blocked";
  }

  public async isChild(childId: number) {
    const { lft, rgt } = this.row;

    const user = await prisma.user.findFirst({
      where: {
        lft: { gt: lft },
        rgt: { gt: rgt },
        userId: childId,
      },
    });
    return !!user;
  }

  public async updateLeftRightId({
    childId,
    placement,
    prismaTx,
  }: {
    childId: number;
    placement: User_PlacementSide;
    prismaTx: PrismaTransaction;
  }) {
    const placementSideText = `${placement}Id` as const;

    await prismaTx.user.updateMany({
      where: { userId: this.userId },
      data: { [placementSideText]: childId },
    });
  }

  public async updateParentsLeftRightCount(prismaTx: PrismaTransaction) {
    const { lft, rgt } = this.row;
    const parents = await prismaTx.user.findMany({
      where: { lft: { lt: lft }, rgt: { gt: rgt } },
    });

    // eslint-disable-next-line no-restricted-syntax
    for await (const parent of parents) {
      const { userId, leftCount, rightCount } = parent;
      const parentUser = await User.getInstance(userId);
      const placementSide = await parentUser.getChildPlacementSide(
        this.userId,
        prismaTx,
      );

      const placementSideCount = `${placementSide}Count` as const;
      await prismaTx.user.update({
        where: { userId },
        data: { [placementSideCount]: { increment: 1 } },
      });

      if (leftCount > 0 && rightCount > 0 && leftCount === rightCount) {
        await prismaTx.user.update({
          where: { userId },
          data: { pairCount: { increment: 1 } },
        });
      }
    }
  }

  public async updatePassword(password: string, prismaTx: PrismaTransaction) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prismaTx.user.update({
      where: { userId: this.userId },
      data: { password: hashedPassword },
    });
  }

  public async validatePassword(password: string, message?: string) {
    const dbPassword = this.row.password;
    const isPasswordCorrect = await bcrypt.compare(password, dbPassword);
    if (!isPasswordCorrect)
      throw ClientError(message ?? "Password is incorrect");
    return undefined;
  }

  public validateStatus() {
    const { status } = this.row;
    if (status !== "active")
      throw ClientError(
        "Your account is blocked. Contact support for further support",
      );
    return undefined;
  }

  public async updateContact(data: UserContactRequired) {
    await prisma.user.update({
      data: {
        contact: data,
      },
      where: { userId: this.userId },
    });
  }

  public async removeAllSessions() {
    await prisma.loginSession.updateMany({
      where: {
        userId: this.userId,
      },
      data: {
        status: "expired",
      },
    });
  }

  public async removeSessionsExceptCurrent(
    sessionId: string,
    prismaTx?: PrismaTransaction,
  ) {
    await (prismaTx ?? prisma).loginSession.updateMany({
      where: {
        userId: this.userId,
        id: {
          not: sessionId,
        },
      },
      data: {
        status: "expired",
      },
    });
  }

  public async getActivePlanHistoryRow(prismaTx: PrismaTransaction) {
    const row = await prismaTx.planHistory.findFirst({
      where: {
        userId: this.userId,
        status: "active",
      },
    });
    if (!row)
      throw ServerError(`User ${this.userId} is not premium. Error adding roi`);
    return row;
  }

  public async hasGotTodayRoiIncome(purchaseTransactionId: string) {
    const row = await prisma.roi.findFirst({
      where: {
        userId: this.userId,
        createdAt: {
          gte: startOfDay(new Date()),
          lte: endOfDay(new Date()),
        },
        purchaseTransactionId,
      },
    });
    return !!row;
  }

  public async addRoiIncome({
    plan,
    prismaTx,
    investment,
  }: {
    plan: Plan;
    investment: number;
    prismaTx: PrismaTransaction;
  }) {
    const planHistory = await PlanHistory.getActivePlanHistory(
      this.userId,
      prismaTx,
    );
    const purchaseTransactionId = planHistory.transactionId;

    const hasGotTodayRoiIncome = await this.hasGotTodayRoiIncome(
      purchaseTransactionId,
    );
    if (hasGotTodayRoiIncome) return;

    const roi = plan.getRandomRoi();

    // create transaction
    const amount = roi;
    const charge = 0;
    const netAmount = amount - charge;
    const description = `roi - ${plan.row.name}`;

    const transaction = await Transaction.createTransaction(
      {
        amount,
        category: `roi`,
        charge,
        description,
        netAmount,
        status: "credit",
        user: {
          connect: { userId: this.userId },
        },
      },
      prismaTx,
    );
    const transactionId = transaction.id;

    // create roi record
    await prisma.roi.create({
      data: {
        userId: this.userId,
        amount,
        transactionId,
        planName: plan.row.name,
        investment,
        purchaseTransactionId,
      },
    });

    // update plan history roi income
    await planHistory.updateRoiIncome(amount, prismaTx);
  }

  public static async getTodayJoiningCount() {
    const users = await prisma.user.count({
      where: {
        createdAt: {
          gte: startOfDay(new Date()),
          lte: endOfDay(new Date()),
        },
      },
    });
    return users;
  }

  public static async getActiveUsersCount() {
    const users = await prisma.user.count({
      where: {
        status: "active",
      },
    });
    return users;
  }

  // ============================ Private Static Methods ============================

  private static getIpFetchUrl(ip?: string) {
    const url = "http://ip-api.com/json";
    if (!ip || ip === "::1" || ip === "127.0.0.1") return url;
    return `${url}/${ip}`;
  }

  toJSON() {
    const { row } = this;
    const { password, ...rest } = row;
    return rest as UserWithoutPassword;
  }
}

type UserAgent = {
  browserName: string;
  fullBrowserVersion: string;
  osName: string;
  osVersion: string;
};
