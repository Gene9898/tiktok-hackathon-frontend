import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  saved_cards: [],
  card_register_details: {},
  card_transactions: [],
};

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setSavedCards(state, action) {
      console.log(action.payload);
      state.saved_cards = action.payload;
    },
    setCardRegistrationDetails(state, action) {
      const id = action.payload.id;
      let val = action.payload.val;

      state.card_register_details[id] = val;
      console.log(state.card_register_details["cardNumber"]);
    },
    setCardTransactions(state, action) {
      state.card_transactions = action.payload;
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

export const { setSavedCards, setCardRegistrationDetails, setCardTransactions } =
  cardSlice.actions;
export const selectSavedCards = (state) => state.cards.saved_cards;
export const selectCardRegisterDetails = (state) =>
  state.cards.card_register_details;
export const selectCardTransactions = (state) => state.cards.card_transactions;
export default cardSlice.reducer;
