import type data from "@/appData.json";
import { type GridColDef, type GridSortDirection } from "@mui/x-data-grid";
import {
  type User_PlacementSide,
  type User,
  type Setting_CurrencyPosition,
  type Setting_Configuration,
} from "@prisma/client";

type UserWithoutPassword = Omit<
  Omit<User, "password" | "kycData"> & {
    kycData: Record<string, string> | null;
  },
  ""
>;

type AppData = typeof data;

type ReferralRegister = {
  placement: User_PlacementSide;
  placementId: string;
  referralId: string;
};

type DateToString<T> = {
  [P in keyof T]: T[P] extends Date ? string : DateToString<T[P]>;
};
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}.${P}`
    : never
  : never;
type DeepKeys<T, P extends string | number = keyof T> = {
  [K in P]: T[K] extends object ? K | Join<K, DeepKeys<T[K]>> : K;
}[P];

type GridColKeys<T extends Record<string, unknown>> = Omit<
  GridColDef<T>,
  "field"
> & { field: DeepKeys<DateToString<T>> };

type GridSortModelZod<T extends string> = {
  field: T;
  sort: GridSortDirection;
}[];

type SiteSetting = {
  country: string;
  configuration: Setting_Configuration;
  logo: string;
  fullLogo: string;
  favicon: string;
  appName: string;
  currency: string;
  currencyPosition: Setting_CurrencyPosition;
};
