import React, { useState, useEffect } from "react";
import CardInput from "./CardInput";
import { useSelector, useDispatch } from "react-redux";
import { selectCardRegisterDetails } from "@/store/slices/cardSlice";
import { formatCardNumber, getCardType } from "@/lib/utils";
import { setCardRegistrationDetails } from "@/store/slices/cardSlice";

const CardForm = () => {
  const dispatch = useDispatch();
  const card_details = useSelector(selectCardRegisterDetails);

  useEffect(() => {
    if (card_details.cardNumber !== undefined) {
      const res = getCardType(card_details.cardNumber);
      dispatch(setCardRegistrationDetails({ id: "scheme", val: res.scheme }));
      dispatch(setCardRegistrationDetails({ id: "bank", val: res.bank }));
    }
  }, [card_details.cardNumber, dispatch]);

  return (
    <form className="flex flex-wrap bg-rose-600 rounded-xl p-4 justify-center font-mono text-left">
      <CardInput
        label="Card Number"
        type="tel"
        id="cardNumber"
        divclass="basis-full w-full sm:w-1/2 md:w-1/4 lg:w-1/6 xl:w-1/12"
        value={formatCardNumber(card_details.cardNumber)}
        setFunc={setCardRegistrationDetails}
      />
      <div className="sm:flex w-full">
        <CardInput
          label="Name of Owner"
          type="text"
          id="name"
          divclass="sm:w-1/2"
          value={card_details.name}
          setFunc={setCardRegistrationDetails}
        />
        <CardInput
          label="Date of Birth"
          type="date"
          id="dob"
          divclass="sm:w-1/2"
          value={card_details.dob}
          setFunc={setCardRegistrationDetails}
        />
      </div>
      <div className="sm:flex w-full">
        <CardInput
          label="Expiration Date"
          type="month"
          id="expirationDate"
          divclass="sm:w-1/2"
          value={card_details.expirationDate}
          setFunc={setCardRegistrationDetails}
        />
        <CardInput
          label="CVC"
          type="number"
          id="cvc"
          divclass="sm:w-1/2"
          value={card_details.cvc}
          setFunc={setCardRegistrationDetails}
        />
      </div>
    </form>
  );
};

export default CardForm;
