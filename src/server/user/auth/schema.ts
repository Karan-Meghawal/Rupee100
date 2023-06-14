import zodSchemas from "@/server/utils/schema";
import { isUserName } from "@/utils/fns";
import regex from "@/utils/regex";
import {
  boolean,
  intersection,
  literal,
  number,
  object,
  string,
  z,
  type TypeOf,
} from "zod";

const placementSideArr = ["left", "right"] as const;

export const baseRegister = object({
  email: string()
    .nonempty("Email is required")
    .max(100, "Email must be at most 100 characters")
    .email("Please enter a valid email address")
    .toLowerCase(),
  userName: string()
    .nonempty("User name is required")
    .min(2, "User name must be at least 2 characters")
    .max(20, "User name must be at most 20 characters")
    .toLowerCase()
    .refine((val) => isUserName(val), {
      message: "Username must contain at least an alphabet and numbers only",
    }),
  firstName: string()
    .nonempty("First name is required")
    .max(20, "First name must be at most 20 characters")
    .refine((val) => regex.alphabet.test(val), {
      message: "Only alphabets are allowed",
    }),
  lastName: string()
    .nonempty("Last name is required")
    .max(20, "Last name must be at most 20 characters")
    .refine((val) => regex.alphabet.test(val), {
      message: "Only alphabets are allowed",
    }),
  password: zodSchemas.password("Password"),
  confirmPassword: zodSchemas.password("Confirm Password"),
  mobileNumber: string()
    .nonempty("Mobile number is required")
    .min(8, "Mobile number must be at least 8 characters")
    .max(16, "Mobile number must be at most 16 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords are not matching",
});

const register = intersection(
  baseRegister,
  object({
    referralId: string()
      .min(1, "Referral Id is required")
      .transform(Number)
      .or(number()),
    placementId: string().transform(Number).or(number()).optional(),
    placementSide: z.enum(placementSideArr, {
      errorMap: (issue) => {
        switch (issue.code) {
          case "invalid_type":
          default:
            return {
              message: `Placement Side must be one of ${placementSideArr.join(
                " | ",
              )}`,
            };
        }
      },
    }),
    step: literal(1).or(literal(2)),
    otp: zodSchemas.otp.optional(),
    referralUsername: string().optional(),
    placementUsername: string().optional(),
  }),
);

const login = object({
  userId: string().nonempty("User Id is required").toLowerCase(),
  password: string().nonempty("Password is required"),
  remember: boolean(),
  step: literal(1).or(literal(2)),
  otp: zodSchemas.otp.optional(),
});

const forgotPassword = object({
  userId: string().nonempty("User Id is required"),
});

const resetPassword = object({
  userId: number().min(1, "User Id is required"),
  otp: zodSchemas.otp,
  password: zodSchemas.password("Password"),
  confirmPassword: zodSchemas.password("Password"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords are not matching",
});

const checkReferralId = string().transform(Number).or(number());
const checkPlacementId = string().transform(Number).or(number());
const getNewUser = string().transform(Number).or(number());
const checkPlacementSide = string().transform(Number).or(number());
const checkUserName = string().nonempty("User name is required");

export type AuthSchema = {
  register: TypeOf<typeof register>;
  login: TypeOf<typeof login>;
  forgotPassword: TypeOf<typeof forgotPassword>;
  resetPassword: TypeOf<typeof resetPassword>;
  checkReferralId: TypeOf<typeof checkReferralId>;
  checkPlacementId: TypeOf<typeof checkPlacementId>;
  checkUserName: TypeOf<typeof checkUserName>;
  checkPlacementSide: TypeOf<typeof checkPlacementSide>;
  getNewUser: TypeOf<typeof getNewUser>;
};

export const authSchema = {
  register,
  login,
  forgotPassword,
  resetPassword,
  checkReferralId,
  checkPlacementId,
  checkUserName,
  checkPlacementSide,
  getNewUser,
};
