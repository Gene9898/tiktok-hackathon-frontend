import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { cardSlice } from "./slices/cardSlice";
import { tokenSlice } from "./slices/tokenSlice";

const store = () =>
  configureStore({
    reducer: {
      [cardSlice.name]: cardSlice.reducer,
      [tokenSlice.name]: tokenSlice.reducer
    },
    devTools: true,
  });

export const wrapper = createWrapper(store);
