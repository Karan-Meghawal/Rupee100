/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { useAppSelector } from "../hook";

export interface SidebarState {
  isCollapsed: boolean;
  collapseClicked: boolean;
  collapseHovered: boolean;
}

const initialState: SidebarState = {
  isCollapsed: false,
  collapseClicked: false,
  collapseHovered: false,
};

const slice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleCollapse(state) {
      state.collapseClicked = !state.collapseClicked;
      state.isCollapsed = state.collapseClicked && !state.collapseHovered;
    },
    setCollapse(state, action: PayloadAction<boolean>) {
      state.collapseClicked = action.payload;
      state.isCollapsed = action.payload && !state.collapseHovered;
    },
    setMouseEnter(state) {
      if (state.collapseClicked) {
        state.collapseHovered = true;
        state.isCollapsed = state.collapseClicked && !state.collapseHovered;
      }
    },
    setMouseLeave(state) {
      state.collapseHovered = false;
      state.isCollapsed = state.collapseClicked && !state.collapseHovered;
    },
  },
  extraReducers: {
    [HYDRATE]: (state) => ({
      ...state,
    }),
  },
});

export const { setCollapse, setMouseEnter, setMouseLeave, toggleCollapse } =
  slice.actions;
export default slice.reducer;

export const useSidebar = () => useAppSelector((state) => state.sidebar);
