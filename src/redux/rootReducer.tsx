import { combineReducers } from "@reduxjs/toolkit";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import userAuthReducer from "./slices/userAuth";
import adminAuthReducer from "./slices/adminAuth";
import themeReducer from "./slices/theme";
import configurationReducer from "./slices/configuration";
import sidebarReducer from "./slices/sidebar";

// ----------------------------------------------------------------------

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: string) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "r-",
};

const rootReducer = combineReducers({
  theme: themeReducer,
  userAuth: userAuthReducer,
  adminAuth: adminAuthReducer,
  configuration: configurationReducer,
  sidebar: sidebarReducer,
});

export { rootPersistConfig, rootReducer };
