/* eslint-disable no-param-reassign */
import { useAppSelector } from "@/redux/hook";
import { type Setting } from "@prisma/client";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export type ConfigurationState = Pick<
  Setting,
  | "appName"
  | "configuration"
  | "country"
  | "currency"
  | "currencyPosition"
  | "logo"
  | "fullLogo"
  | "favicon"
>;

const initialState: ConfigurationState = {
  currency: "",
  currencyPosition: "prefix",
  appName: "",
  logo: "",
  fullLogo: "",
  favicon: "",
  country: "IN",
  configuration: {
    contactDetails: false,
    kycVerification: false,
    registration: true,
  },
};

const slice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    updateConfiguration: (state, action: PayloadAction<ConfigurationState>) =>
      action.payload,
    updateLogo(state, action: PayloadAction<string>) {
      state.logo = action.payload;
    },
    updateFullLogo(state, action: PayloadAction<string>) {
      state.fullLogo = action.payload;
    },
    updateFavicon(state, action: PayloadAction<string>) {
      state.favicon = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state) => ({
      ...state,
    }),
  },
});

export const {
  updateConfiguration,
  updateLogo,
  updateFullLogo,
  updateFavicon,
} = slice.actions;
export const useConfiguration = () =>
  useAppSelector((state) => state.configuration);

const configurationReducer = slice.reducer;
export default configurationReducer;
