import React from "react";
import CardInput from "./CardInput";
const CardForm = () => {
  return (
    <form className="flex flex-wrap basis-[40%] w-[40%] bg-slate-500 rounded-md mr-auto p-4">
      <CardInput
        label="Card Number"
        type="tel"
        id="cardNumber"
        divclass="basis-full"
      />
      <CardInput
        label="Name of Owner"
        type="text"
        id="name"
        divclass="basis-full"
      />
      <CardInput
        label="Expiration Date"
        type="month"
        id="expirationDate"
        divclass="basis-1/2"
      />
      <CardInput label="CVV" type="number" id="cvv" divclass="basis-[41%]" />
    </form>
  );
};

export default CardForm;
