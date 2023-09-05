import React, { useState, useEffect } from "react";
import CardInput from "./CardInput";
import { useSelector } from "react-redux";
import { selectCardRegisterDetails } from "@/store/slices/cardSlice";
import { formatCardNumber } from "@/lib/utils";

const CardForm = () => {
  const card_details = useSelector(selectCardRegisterDetails);

  return (
    <form className="flex flex-wrap basis-[40%] w-[40%] bg-slate-500 rounded-md p-4 justify-center">
      <CardInput
        label="Card Number"
        type="tel"
        id="cardNumber"
        divclass="basis-full"
        value={formatCardNumber(card_details.cardNumber)}
      />
      <CardInput
        label="Name of Owner"
        type="text"
        id="name"
        divclass="basis-1/2"
        value={card_details.name}
      />
      <CardInput
        label="Date of Birth"
        type="date"
        id="dob"
        divclass="basis-1/2"
        value={card_details.dob}
      />
      <CardInput
        label="Expiration Date"
        type="month"
        id="expirationDate"
        divclass="basis-1/2"
        value={card_details.expirationDate}
      />
      <CardInput
        label="CVC"
        type="number"
        id="cvc"
        divclass="basis-1/2"
        value={card_details.cvc}
      />
    </form>
  );
};

export default CardForm;
