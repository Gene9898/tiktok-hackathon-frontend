import React, { useState } from "react";
import CardDisplay from "@/components/Cards/CardDisplay";
import { useDispatch, useSelector } from "react-redux";
import { selectCardRegisterDetails } from "@/store/slices/cardSlice";
import CardForm from "@/components/Cards/CardForm";
import { cardFormValidation, postReq } from "@/lib/utils";

const Cards = () => {
  const dispatch = useDispatch();
  const card_detail = useSelector(selectCardRegisterDetails);

  const [isReported, setIsReported] = useState(false);

  const handleReport = () => {
    setIsReported(true);
  };

  const handleClose = () => {
    setIsReported(false);
  };

  const submitForm = async () => {
    const check = cardFormValidation(card_detail);
    console.log(check);
    if (check) {
      const res = await postReq({
        route: "http://localhost:3001/api/postcarddetails",
        body: card_detail,
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
      alert("Card Successfully Saved!");
      handleClose(); // Close the popup after submitting
    }
  };

  return (
    <div>
      {/*Display cards here*/}
      <div className="text-center mb-6 sm:mb-12 sm:mt-8">
        <h2>Display cards here...</h2>
      </div>
    <div className="text-center mt-4">
      <button className="bg-blue-400 text-white p-2 rounded-md" onClick={handleReport}>
        Add Card
      </button>

      {isReported && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-slate-700 w-[60%] rounded-3xl p-10 container mx-auto">
            <div className="flex flex-col gap-6 mx-auto container h-full">
              <div className="flex justify-between">
              <h3>Add Card</h3>
                <div className="space-x-8 mr-2 text-xl">
                <button
                className="hover:text-blue-400"
                onClick={submitForm}
              >
                Save
              </button>
              <button
                className="hover:text-red-500"
                onClick={handleClose}
              >
                Cancel
              </button>
                </div>
              </div>
              <div className="flex justify-center">
                <CardForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Cards;