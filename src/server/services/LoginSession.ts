import { env } from "@/env.mjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { prisma } from "../db";
import { AuthError } from "../utils/errors";
import User from "./User";

export default class LoginSession {
  public static async validateAuthorization(Authorization: string) {
    try {
      const row = await prisma.loginSession.findUnique({
        where: {
          token: Authorization,
        },
      });

      if (!row) return null;
      const { token, id: sessionId, status } = row;

      const verifiedToken = <JwtPayload>jwt.verify(token, env.JWT_SECRET_KEY);
      const { id: userId, exp } = verifiedToken;
      if (typeof userId !== "number") throw AuthError("Invalid Authorization");

      const currentTime = Date.now() / 1000;
      if (!exp || exp < currentTime) throw AuthError("Authorization Expired");
      if (status !== "active")
        throw AuthError("Authorization has been expired");

      const isUser = await User.isUserId(userId);
      if (!isUser) throw AuthError("Invalid Authorization");

      return { userId, sessionId };
    } catch (error) {
      return null;
    }
  }
}
