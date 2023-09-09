import React, { useState, useEffect } from "react";
import CardInput from "../Cards/CardInput";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCardRegisterDetails,
  selectPaymentDetails,
  setPaymentDetails,
} from "@/store/slices/cardSlice";
import { formatCardNumber } from "@/lib/utils";
import { MdArrowBack } from "react-icons/md";

const TransactionForm = (props) => {
  const dispatch = useDispatch();
  const payment_details = useSelector(selectPaymentDetails);

  return (
    <form
      className="flex flex-wrap w-full bg-slate-400 rounded-xl p-4 justify-center font-mono mx-auto"
      id="txn-form"
    >
      <div className="flex flex-wrap w-full">
        <MdArrowBack
          size={48}
          className="hover:scale-125 cursor-pointer"
          onClick={() => {
            props.setSelection("none");
          }}
        />
        <h1 className="ml-auto">Payment</h1>
      </div>
      <div className="flex flex-wrap w-[90%] mt-5 ">
        <CardInput
          label="Name"
          type="text"
          id="name"
          divclass="basis-full"
          setFunc={setPaymentDetails}
          // value={card_details.name}
        />
        <CardInput
          label="Phone Number"
          type="tel"
          id="phoneNumber"
          divclass="basis-1/2"
          setFunc={setPaymentDetails}
          // value={card_details.dateOfBirth}
          maxLength={8}
        />
        <CardInput
          label="Amount"
          type="number"
          id="amount"
          divclass="basis-1/2"
          setFunc={setPaymentDetails}
          // value={card_details.expirationDate}
        />
      </div>
    </form>
  );
};

export default TransactionForm;
