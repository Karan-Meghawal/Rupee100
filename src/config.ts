import { type KycForm_FileExtensions } from "@prisma/client";
// eslint-disable-next-line import/extensions
import { env } from "./env.mjs";
import { type ThemeState } from "./redux/slices/theme";

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 92,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
} as const;

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
};

// SETTINGS
// Please remove `localStorage` when you set settings.
// ----------------------------------------------------------------------

export const defaultTheme: Omit<ThemeState, "isLight"> = {
  mode: "light",
  activeColorPreset: "default",
  layout: "horizontal",
  isStretch: false,
} as const;

export const RESPONSIVE_GAP = { xs: 1, md: 2 };

export const APP_URL = env.NEXT_PUBLIC_APP_URL;
export const APP_VERSION = 6.1

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 */
export const FILE_EXTENSIONS_WITH_MIME: Record<KycForm_FileExtensions, string> =
  {
    JPG: "image/jpeg",
    JPEG: "image/jpeg",
    PNG: "image/png",
    WEBP: "image/webp",
    PDF: "application/pdf",
    DOC: "application/msword",
    DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    TXT: "text/plain",
    XLS: "application/vnd.ms-excel",
    XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    CSV: "text/csv",
  };
export const MAXIMUM_FILE_SIZE_MB = 5;
export const MAXIMUM_FILE_SIZE_BYTES = 5 * 1024 * 1024;
export const SUPPORT_MAXIMUM_FILES = 5;
export const ALLOWED_FILE_TYPES = Object.keys(FILE_EXTENSIONS_WITH_MIME);
export const ALLOWED_FILE_MIMES = Object.values(FILE_EXTENSIONS_WITH_MIME);
// eslint-disable-next-line @typescript-eslint/naming-convention
export type FILE_EXTENSIONS_TYPE = keyof typeof FILE_EXTENSIONS_WITH_MIME;
