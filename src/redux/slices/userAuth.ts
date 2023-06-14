/* eslint-disable no-param-reassign */
import { useAppSelector } from "@/redux/hook";
import { type UserApiInputs, type UserApiOutputs } from "@/utils/api";
import { type User, type User_Contact } from "@prisma/client";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { type UserWithoutPassword } from "~/types";

type LoginValues = UserApiInputs["auth"]["login"];
type RegisterValues = UserApiInputs["auth"]["register"];
type ForgotPasswordValues = UserApiOutputs["auth"]["forgotPassword"]["userId"];

interface AuthState {
  isAuthenticated: boolean;
  Authorization?: string | null;
  sessionId?: string;
  user: UserWithoutPassword | null;
  loginPage: {
    step: 1 | 2;
    email: string;
    data: LoginValues | null;
  };
  registerPage: {
    step: 1 | 2;
    email: string;
    data: RegisterValues | null;
  };
  forgotPasswordPage: {
    step: 1 | 2;
    email: string;
    userId: ForgotPasswordValues | null;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  Authorization: null,
  user: null,
  loginPage: {
    step: 1,
    email: "",
    data: null,
  },
  registerPage: {
    step: 1,
    email: "",
    data: null,
  },
  forgotPasswordPage: {
    step: 1,
    email: "",
    userId: null,
  },
};

const slice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        user: UserWithoutPassword;
        Authorization: string;
        sessionId: string;
      }>,
    ) {
      const { user, Authorization, sessionId } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.Authorization = Authorization;
      state.sessionId = sessionId;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.Authorization = null;
    },
    setLoginPage(state, action: PayloadAction<AuthState["loginPage"]>) {
      const { payload } = action;
      state.loginPage = payload;
    },
    resetLoginPage(state) {
      state.loginPage = initialState.loginPage;
    },
    setRegisterPage(state, action: PayloadAction<AuthState["registerPage"]>) {
      const { payload } = action;
      state.registerPage = payload;
    },
    resetRegisterPage(state) {
      state.registerPage = initialState.registerPage;
    },
    setForgotPasswordPage(
      state,
      action: PayloadAction<AuthState["forgotPasswordPage"]>,
    ) {
      const { payload } = action;
      state.forgotPasswordPage = payload;
    },
    resetForgotPasswordPage(state) {
      state.forgotPasswordPage = initialState.forgotPasswordPage;
    },
    updateAvatar(state, action: PayloadAction<string>) {
      state.user!.avatar = action.payload;
    },
    updateUser(state, action: PayloadAction<UserWithoutPassword>) {
      state.user = action.payload;
    },
    updateContact(state, action: PayloadAction<User_Contact>) {
      state.user = {
        ...state.user!,
        contact: action.payload,
      };
    },
    updateProfile(state, action: PayloadAction<UserWithoutPassword>) {
      state.user = action.payload;
    },
    updateTwoFA(state, action: PayloadAction<User["twoFA"]>) {
      state.user = {
        ...state.user!,
        twoFA: action.payload,
      };
    },
    updateKyc(state, action: PayloadAction<User["kyc"]>) {
      state.user = {
        ...state.user!,
        kyc:action.payload,
      };
    },
    updatePlan(state, action: PayloadAction<string>) {
      state.user = {
        ...state.user!,
        planId: action.payload,
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state) => ({
      ...state,
    }),
  },
});

export const {
  login,
  logout,
  setLoginPage,
  setRegisterPage,
  setForgotPasswordPage,
  resetLoginPage,
  resetRegisterPage,
  resetForgotPasswordPage,
  updateAvatar,
  updateUser,
  updateContact,
  updateProfile,
  updateTwoFA,
  updateKyc,
  updatePlan,
} = slice.actions;

const authReducer = slice.reducer;
export default authReducer;

export const useUserAuth = () => useAppSelector((state) => state.userAuth);
