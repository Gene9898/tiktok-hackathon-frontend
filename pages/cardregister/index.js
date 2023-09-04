import React from "react";
import VerticalDivider from "@/components/StandardStyles/VerticalDivider";
import CardDisplay from "@/components/Cards/CardDisplay";
const CardRegister = () => {
  return (
    <div className="flex flex-wrap h-full w-full gap-4">
      <h1 className="h-fit basis-full">Add Card</h1>
      <form className="flex flex-wrap basis-[50%] h-96 bg-slate-500 rounded-md">
        <div className="flex flex-col flex-wrap p-2 basis-full">
          <label htmlFor="cardnumber" className="text-2xl">
            Card Number
          </label>
          <input
            type="text"
            id="cardnumber"
            className="mr-auto rounded-md text-black text-2xl w-[85%] h-fit mt-2"
          />
        </div>
        <div className="flex flex-col flex-wrap p-2 basis-full">
          <label htmlFor="name" className="text-2xl">
            Name of Owner
          </label>
          <input
            type="text"
            id="name"
            className="mr-auto rounded-md text-black text-2xl w-[85%] h-fit mt-2"
          />
        </div>
        <div className="flex flex-col flex-wrap p-2 basis-1/2">
          <label htmlFor="expirydate" className="text-2xl">
            Expiration Date
          </label>
          <input
            type="text"
            id="expirydate"
            className="mr-auto rounded-md text-black text-2xl w-[85%] h-fit mt-2"
          />
        </div>
        <div className="flex flex-col flex-wrap p-2 basis-1/2">
          <label htmlFor="cvv" className="text-2xl">
            CVV
          </label>
          <input
            type="number"
            id="cvv"
            className="mr-auto rounded-md text-black text-2xl w-[70%] h-fit mt-2"
          />
        </div>
      </form>
      <VerticalDivider />
      <CardDisplay />
    </div>
  );
};

export default CardRegister;
