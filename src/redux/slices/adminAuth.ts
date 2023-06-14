/* eslint-disable no-param-reassign */
import { useAppSelector } from "@/redux/hook";
import { type UserApiInputs } from "@/utils/api";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { type UserWithoutPassword } from "~/types";

type LoginValues = UserApiInputs["auth"]["login"];

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
};

const slice = createSlice({
  name: "adminAuth",
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
    updateUser(state, action: PayloadAction<UserWithoutPassword>) {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state) => ({
      ...state,
    }),
  },
});

export const { login, logout, setLoginPage, resetLoginPage, updateUser } =
  slice.actions;

const authReducer = slice.reducer;
export default authReducer;
export const useAdminAuth = () => useAppSelector((state) => state.adminAuth);
