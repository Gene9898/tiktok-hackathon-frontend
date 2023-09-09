import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { cardSlice } from "./slices/cardSlice";
import authSlice from "./slices/authSlice";

const store = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [cardSlice.name]: cardSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(store);
