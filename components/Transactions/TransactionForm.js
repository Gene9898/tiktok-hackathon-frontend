import React, { useState, useEffect } from "react";
import CardInput from "../Cards/CardInput";
import { useSelector } from "react-redux";
import { selectCardRegisterDetails } from "@/store/slices/cardSlice";
import { formatCardNumber } from "@/lib/utils";
import { MdArrowBack } from "react-icons/md";

const TransactionForm = (props) => {
  const card_details = useSelector(selectCardRegisterDetails);

  return (
    <form className="flex flex-wrap w-full bg-slate-400 rounded-xl p-4 justify-center font-mono mx-auto">
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
      <div className="flex flex-wrap w-[80%] mt-5">
        <CardInput
          label="Name"
          type="text"
          id="name"
          divclass="basis-full"
          // value={card_details.name}
        />
        <CardInput
          label="Phone Number"
          type="tel"
          id="phonenumber"
          divclass="basis-1/2"
          // value={card_details.dob}
        />
        <CardInput
          label="Amount"
          type="number"
          id="amount"
          divclass="basis-1/2"
          // value={card_details.expirationDate}
        />
      </div>
    </form>
  );
};

export default TransactionForm;
