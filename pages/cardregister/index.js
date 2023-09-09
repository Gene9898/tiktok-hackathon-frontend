import React from "react";
import CardTxnDisplay from "@/components/Cards/CardTxnDisplay";
import { useDispatch, useSelector } from "react-redux";
import { selectCardRegisterDetails } from "@/store/slices/cardSlice";
import CardForm from "@/components/Cards/CardForm";
import { cardFormValidation, postReq } from "@/lib/utils";

const CardRegister = () => {
  const dispatch = useDispatch();
  const card_detail = useSelector(selectCardRegisterDetails);

  const submitForm = async () => {
    const check = cardFormValidation(card_detail);
    console.log(check);
    if (check) {
      const res = await postReq({
        route: "http://localhost:3000/api/postcarddetails",
        body: card_detail,
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
      alert("Card Successfully Saved!");
    }
  };

  return (
    <div className="flex flex-col gap-4 mx-auto container h-full">
      <h1>Add Card</h1>
      <CardTxnDisplay card={card_detail} divclass="basis-[40%] w-[40%]" />
      <CardForm />
      <button
        className="basis-[8%] w-[40%] bg-slate-400 rounded-md text-3xl hover:bg-blue-400 p-2 mb-10"
        onClick={submitForm}
      >
        Save Card
      </button>
    </div>
  );
};

export default CardRegister;
