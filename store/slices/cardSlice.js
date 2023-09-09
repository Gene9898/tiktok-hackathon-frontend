import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  saved_cards: [],
  card_register_details: {},
  payment_details: {},
  transaction_check: false,
  transaction_details: [],
  filtered_saved_cards: [],
};

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setSavedCards(state, action) {
      console.log(action.payload);
      state.saved_cards = action.payload;
      state.filtered_saved_cards = action.payload;
    },
    setCardRegistrationDetails(state, action) {
      const id = action.payload.id;
      let val = action.payload.val;
      console.log(val);
      if (val === "") {
        delete state.card_register_details[id];
      } else if (id === "expirationDate") {
        state.card_register_details["expiryYear"] = val.split("-")[0];
        state.card_register_details["expiryMonth"] = val.split("-")[1];
      } else {
        state.card_register_details[id] = val;
      }
      console.log(
        state.card_register_details["expiryMonth"],
        state.card_register_details["expiryYear"]
      );
      console.log(state.card_register_details["cardNumber"]);
      console.log(state.card_register_details["bank"]);
    },
    setPaymentDetails(state, action) {
      const id = action.payload.id;
      let val = action.payload.val;
      console.log(id, val);
      if (val.length === 0) {
        delete state.payment_details[id];
      } else {
        state.payment_details[id] = val;
      }
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
      const cardId = action.payload.cardId;
      const dateOfBirth = action.payload.dateOfBirth;
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
      state.payment_details["cardId"] = cardId;
      state.payment_details["dateTime"] = new Date();
      state.payment_details["dateOfBirth"] = dateOfBirth;
      state.transaction_check = true;
    },
    setTransactionCheck(state, action) {
      state.transaction_check = action.payload;
    },
    setTransactionDetails(state, action) {
      function formatDate(inputDate) {
        // Create a Date object from the input string
        const date = new Date(inputDate);

        // Get the day, month, and year
        const dayOfMonth = date.getDate();
        const monthName = new Intl.DateTimeFormat("en-US", {
          month: "long",
        }).format(date);
        const yearValue = date.getFullYear();

        // Add the appropriate suffix to the day
        let dayWithSuffix;
        if (dayOfMonth >= 11 && dayOfMonth <= 13) {
          dayWithSuffix = dayOfMonth + "th";
        } else {
          const lastDigit = dayOfMonth % 10;
          switch (lastDigit) {
            case 1:
              dayWithSuffix = dayOfMonth + "st";
              break;
            case 2:
              dayWithSuffix = dayOfMonth + "nd";
              break;
            case 3:
              dayWithSuffix = dayOfMonth + "rd";
              break;
            default:
              dayWithSuffix = dayOfMonth + "th";
              break;
          }
        }

        // Combine the formatted parts
        const formattedDate = `${dayWithSuffix} ${monthName} ${yearValue}`;

        return formattedDate;
      }
      const transactions = action.payload;
      transactions.sort(
        (t1, t2) =>
          new Date(t2["transactionDateTime"]) -
          new Date(t1["transactionDateTime"])
      );
      transactions.forEach((txn) => {
        txn["transactionDateTime"] = formatDate(
          new Date(txn["transactionDateTime"])
        );
      });
      console.log(transactions);
      state.transaction_details = transactions;
    },
    filterSavedCards(state, action) {
      const cardDisplay = action.payload;
      state.filtered_saved_cards = state.saved_cards;
      console.log(state.filtered_saved_cards.length);
      state.filtered_saved_cards = state.filtered_saved_cards.filter(
        (card) => card["cardNumber"] !== cardDisplay["cardNumber"]
      );
      console.log(state.filtered_saved_cards.length);
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
  setPaymentDetails,
  setAdditionalPaymentDetails,
  setTransactionCheck,
  setTransactionDetails,
  filterSavedCards,
} = cardSlice.actions;
export const selectSavedCards = (state) => state.cards.saved_cards;
export const selectCardRegisterDetails = (state) =>
  state.cards.card_register_details;
export const selectPaymentDetails = (state) => state.cards.payment_details;
export const selectTransactionCheck = (state) => state.cards.transaction_check;
export const selectTransactionDetails = (state) =>
  state.cards.transaction_details;
export const selectFilterSavedCards = (state) =>
  state.cards.filtered_saved_cards;

export default cardSlice.reducer;
