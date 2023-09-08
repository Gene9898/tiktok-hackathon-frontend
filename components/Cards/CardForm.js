import React, { useState, useEffect } from "react";
import CardInput from "./CardInput";
import { useSelector } from "react-redux";
import { selectCardRegisterDetails } from "@/store/slices/cardSlice";
import { formatCardNumber } from "@/lib/utils";
import { setCardRegistrationDetails } from "@/store/slices/cardSlice";

const CardForm = () => {
  const card_details = useSelector(selectCardRegisterDetails);

  return (
    <form className="flex flex-wrap w-[45%] bg-red-700 rounded-xl p-4 justify-center font-mono">
      <CardInput
        label="Card Number"
        type="tel"
        id="cardNumber"
        divclass="basis-full"
        value={formatCardNumber(card_details.cardNumber)}
        setFunc={setCardRegistrationDetails}
      />
      <div>
        <CardInput
          label="Name of Owner"
          type="text"
          id="name"
          divclass="basis-1/2"
          value={card_details.name}
          setFunc={setCardRegistrationDetails}
        />
        <CardInput
          label="Date of Birth"
          type="date"
          id="dob"
          divclass="basis-1/2"
          value={card_details.dob}
          setFunc={setCardRegistrationDetails}
        />
      </div>
      <div>
        <CardInput
          label="Expiration Date"
          type="month"
          id="expirationDate"
          divclass="basis-1/2"
          value={card_details.expirationDate}
          setFunc={setCardRegistrationDetails}
        />
        <CardInput
          label="CVC"
          type="number"
          id="cvc"
          divclass="basis-1/2"
          value={card_details.cvc}
          setFunc={setCardRegistrationDetails}
        />
      </div>
    </form>
  );
};

export default CardForm;
