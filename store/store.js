import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { cardSlice } from "./slices/cardSlice";

const store = () =>
  configureStore({
    reducer: {
      [cardSlice.name]: cardSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(store);
