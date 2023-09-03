import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  saved_cards: [],
};

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setSavedCards(state, action) {
      console.log(action.payload);
      state.saved_cards = action.payload;
    },
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.cards,
        };
      },
    },
  },
});

export const { setSavedCards } = cardSlice.actions;
export const selectSavedCards = (state) => state.cards.saved_cards;
export default cardSlice.reducer;
