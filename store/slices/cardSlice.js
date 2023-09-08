import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  saved_cards: [],
  card_register_details: {},
  card_transactions: [],
  payment_details: {},
  transaction_check: false,
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
      console.log(state.card_register_details["bank"]);
    },
    setCardTransactions(state, action) {
      state.card_transactions = action.payload;
    },
    setPaymentDetails(state, action) {
      const id = action.payload.id;
      let val = action.payload.val;
      state.payment_details[id] = val;
    },
    setAdditionalPaymentDetails(state, action) {
      const categoryType = [
        "grocery_pos",
        "entertainment",
        "shopping_pos",
        "misc_pos",
        "shopping_net",
        "gas_transport",
        "misc_net",
        "grocery_net",
        "food_dining",
        "health_fitness",
        "kids_pets",
        "home",
        "personal_care",
        "travel",
      ];
      const india = {
        range: [8, 7],
        lat: [20, 28],
        long: [73, 80],
      };
      const nigeria = {
        range: [5, 6],
        lat: [7, 12],
        long: [4, 10],
      };
      const singapore = {
        range: [0.1, 0.2],
        lat: [1.3, 1.4],
        long: [103.7, 103.9],
      };
      const cardNumber = action.payload.cardNumber;
      const randomCountry = Math.random();
      const sgProb = 0.8;
      const otherProb = (1 - sgProb) / 2;
      let baseLat = 0,
        baseLong = 0,
        range = [];
      if (randomCountry < sgProb) {
        range = singapore.range;
        baseLat = singapore.lat[0];
        baseLong = singapore.long[0];
      } else if (randomCountry < sgProb + otherProb) {
        range = india.range;
        baseLat = india.lat[0];
        baseLong = india.long[0];
      } else {
        range = nigeria.range;
        baseLat = nigeria.lat[0];
        baseLong = nigeria.long[0];
      }
      const randomMerchFloat = Math.random();
      const randomUserFloat = Math.random();
      state.payment_details["merch_lat"] = (
        range[0] * randomMerchFloat +
        baseLat
      ).toFixed(6);
      state.payment_details["merch_lon"] = (
        range[1] * randomMerchFloat +
        baseLong
      ).toFixed(6);
      state.payment_details["lat"] = (
        singapore.range[0] * randomUserFloat +
        singapore.lat[0]
      ).toFixed(6);
      state.payment_details["lon"] = (
        singapore.range[1] * randomUserFloat +
        singapore.long[0]
      ).toFixed(6);
      state.payment_details["category"] =
        categoryType[Math.floor(Math.random() * categoryType.length)];
      state.payment_details["cardId"] = cardNumber;
      state.payment_details["dateTime"] = new Date();
      state.transaction_count++;
    },
    setTransactionCheck(state, action) {
      state.transaction_check = action.payload;
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

export const {
  setSavedCards,
  setCardRegistrationDetails,
  setCardTransactions,
  setPaymentDetails,
  setAdditionalPaymentDetails,
} = cardSlice.actions;
export const selectSavedCards = (state) => state.cards.saved_cards;
export const selectCardRegisterDetails = (state) =>
  state.cards.card_register_details;
export const selectCardTransactions = (state) => state.cards.card_transactions;
export const selectPaymentDetails = (state) => state.cards.payment_details;
export const selectTransactionCheck = (state) => state.cards.transaction_check;

export default cardSlice.reducer;
