import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { appUserSlice } from "./user";
import { appBusinessSlice } from "./business";
import { appLeadSlice } from "./lead";

const rootReducer = combineReducers({
  appUser: appUserSlice.reducer,
  appBusiness: appBusinessSlice.reducer, // Update the key to match the slice name
  appLead: appLeadSlice.reducer,
  // other reducers can be added here
});

export const store = configureStore({
  reducer: rootReducer,
});
