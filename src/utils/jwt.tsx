import { store } from "@/redux/store";
import { decode, type JwtPayload } from "jsonwebtoken";
// ----------------------------------------------------------------------

export const AUTHORIZATION_KEY = "AUTHORIZATION";

export const getAuthorization = () =>
  window.location.pathname.startsWith("/admin")
    ? store.getState().adminAuth.Authorization
    : store.getState().userAuth.Authorization;

export const isValidToken = () => {
  const token = getAuthorization();
  if (!token) return null;
  const decoded = decode(token) as JwtPayload;
  const currentTime = Date.now() / 1000;
  return decoded.exp ? decoded.exp > currentTime : false;
};
