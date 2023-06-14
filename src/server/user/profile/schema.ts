import {
  OTP_LENGTH,
  MIN_PASSWORD_LENGTH,
  PIN_CODE_MAX_LENGTH,
  PIN_CODE_MIN_LENGTH,
} from "@/server/config";
import zodSchemas from "@/server/utils/schema";
import { Prisma } from "@prisma/client";
import {
  boolean,
  date,
  literal,
  object,
  record,
  string,
  undefined,
  type TypeOf,
  nativeEnum,
} from "zod";

const isServer = typeof window === "undefined";

const updateContact = object({
  address: string()
    .nonempty("Address is required")
    .max(200, "Address must be at most 200 characters"),
  country: string()
    .nonempty("Country is required")
    .max(50, "Country must be at most 50 characters"),
  state: string()
    .nonempty("State is required")
    .max(50, "State must be at most 50 characters"),
  city: string()
    .nonempty("City is required")
    .max(50, "City must be at most 50 characters"),
  pinCode: string()
    .nonempty("Pin Code is required")
    .min(
      PIN_CODE_MIN_LENGTH,
      `Pin Code must be at least ${PIN_CODE_MIN_LENGTH} characters`,
    )
    .max(
      PIN_CODE_MAX_LENGTH,
      `Pin Code must be at most ${PIN_CODE_MAX_LENGTH}  characters`,
    )
    .transform((value) => (isServer ? Number(value) : String(value))),
  mobileNumber: string()
    .min(8, "Mobile number must be at least 8 characters")
    .max(16, "Mobile number must be at most 16 characters"),
});

const changePassword = object({
  currentPassword: string().nonempty("Current Password is required"),
  password: string()
    .min(
      MIN_PASSWORD_LENGTH,
      `New Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    )
    .max(20, "New Password must be at most 20 characters"),
  confirmPassword: string()
    .min(
      MIN_PASSWORD_LENGTH,
      `Confirm New Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    )
    .max(20, "Confirm New Password must be at most 20 characters"),
  otp: string()
    .length(OTP_LENGTH, `Otp must be ${OTP_LENGTH} characters`)
    .optional(),
  step: literal(1).or(literal(2)),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords are not matching",
});

const twoFA = object({
  step: literal(1).or(literal(2)),
  otp: string()
    .length(OTP_LENGTH, `Otp must be ${OTP_LENGTH} characters`)
    .optional(),
  status: boolean(),
});

const updateProfile = object({
  firstName: string()
    .nonempty("First name is required")
    .max(20, "First name must be at most 20 characters"),
  lastName: string()
    .nonempty("Last name is required")
    .max(20, "Last name must be at most 20 characters"),
  kyc: record(
    string(),
    string().or(date().transform((val) => val.toISOString())),
  ),
});

const getSession = undefined();
const getWallet = undefined();
const getLastKyc = undefined();

const updateAvatar = object({
  avatar: string().nonempty("Avatar is required"),
});
const verifyKyc = undefined();
const expireToken = string().nonempty("Session Id is required");
const logoutAll = undefined();
const loginSessions = zodSchemas.table(
  nativeEnum(Prisma.LoginSessionScalarFieldEnum),
);

export type ProfileSchema = {
  getSession: TypeOf<typeof getSession>;
  getWallet: TypeOf<typeof getWallet>;
  updateProfile: TypeOf<typeof updateProfile>;
  updateAvatar: TypeOf<typeof updateAvatar>;
  changePassword: TypeOf<typeof changePassword>;
  updateContact: TypeOf<typeof updateContact>;
  verifyKyc: TypeOf<typeof verifyKyc>;
  expireToken: TypeOf<typeof expireToken>;
  logoutAll: TypeOf<typeof logoutAll>;
  twoFA: TypeOf<typeof twoFA>;
  loginSessions: TypeOf<typeof loginSessions>;
  getLastKyc: TypeOf<typeof getLastKyc>;
};

export const profileSchema = {
  getSession,
  getWallet,
  updateProfile,
  updateAvatar,
  changePassword,
  updateContact,
  verifyKyc,
  expireToken,
  logoutAll,
  twoFA,
  loginSessions,
  getLastKyc,
};
