import { type User_PlacementSide } from "@prisma/client";
import { APP_URL } from "../config";
import regex from "./regex";

export const getReferralLink = (
  referralId: number | string,
  placement?: User_PlacementSide,
) => {
  const url = new URL(`${APP_URL}/register`);

  url.searchParams.set("referralId", String(referralId));
  if (placement) url.searchParams.set("placement", String(placement));
  return url.toString();
};

export const isUserName = (userName: string) => {
  // regex
  const regex = /[A-Za-z]/.test(userName);
  if (!regex) return false;

  return /^[a-zA-Z0-9]+$/.test(userName);
};

export const isDecNum = (t: string | number) =>
  /^\d+(\.\d+)?$/.test(t.toString());

export const isUserId = (userId: string | number) =>
  !!userId && String(userId).length > 6 && /^\d+$/.test(String(userId));

export const getFileSrc = (src: string) =>
  src && src.startsWith("/uploads") ? `/api${src}` : src;

export const getDiscount = (mrp: number, price: number) => {
  const discount = 100 - (price / mrp) * 100;
  return discount.toFixed(2);
};

export const isExternalLink = (path: string) => path.includes("http");

export const copyToClipboard = (text: string) =>
  navigator.clipboard.writeText(text);

export const userDisplayName = (firstName: string, lastName: string) =>
  `${firstName} ${lastName}`;

export const generateRandomFloat = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const getRandomFromArray = (length: number) =>
  Math.floor(Math.random() * length);

export const getYouTubeVideoID = (url: string) => {
  const match = url.match(regex.youTube);
  if (match) {
    return match[1];
  }
  return null;
};
