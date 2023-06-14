/* eslint-disable no-param-reassign */
import { defaultTheme } from "@/config";
import { useAppSelector } from "@/redux/hook";
import { type PresetColors } from "@/theme/presets";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface ThemeState {
  mode: "light" | "dark";
  isLight: boolean;
  activeColorPreset: PresetColors;
  layout: "horizontal" | "vertical";
  isStretch: boolean;
}

const initialState: ThemeState = {
  ...defaultTheme,
  isLight: defaultTheme.mode === "light",
};

const slice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    changeMode(state, action: PayloadAction<ThemeState["mode"]>) {
      const { payload } = action;
      state.mode = payload;
      state.isLight = payload === "light";
    },
    toggleMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      state.isLight = !state.isLight;
    },
    changeColor(state, action: PayloadAction<PresetColors>) {
      const { payload } = action;
      state.activeColorPreset = payload;
    },
    changeLayout(state, action: PayloadAction<ThemeState["layout"]>) {
      const { payload } = action;
      state.layout = payload;
    },
    toggleStretch(state) {
      state.isStretch = !state.isStretch;
    },
    resetTheme: () => initialState,
  },
  extraReducers: {
    [HYDRATE]: (state) => ({
      ...state,
    }),
  },
});

export const {
  changeMode,
  toggleMode,
  changeColor,
  changeLayout,
  toggleStretch,
  resetTheme,
} = slice.actions;

const themeReducer = slice.reducer;
export const useTheme = () => useAppSelector((state) => state.theme);
export default themeReducer;
