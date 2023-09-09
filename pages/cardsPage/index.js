import React, { useState, useEffect } from "react";
import CardDisplay from "@/components/Cards/CardDisplay";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCardRegisterDetails,
  selectSavedCards,
  setSavedCards,
} from "@/store/slices/cardSlice";
import CardForm from "@/components/Cards/CardForm";
import { cardFormValidation, postReq, getReq } from "@/lib/utils";
import MinimisedCard from "@/components/Cards/MinimisedCard";

const Cards = () => {
  const dispatch = useDispatch();
  const card_detail = useSelector(selectCardRegisterDetails);
  const saved_cards = useSelector(selectSavedCards);
  const [isReported, setIsReported] = useState(false);

  const fetchData = async () => {
    const res = await getReq({
      route: "http://localhost:3000/api/getcarddetails",
      headers: {},
    });
    console.log(res);
    dispatch(setSavedCards(res));
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        route: "http://localhost:3000/api/postcarddetails",
        body: card_detail,
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
      alert("Card Successfully Saved!");
      handleClose(); // Close the popup after submitting
      fetchData();
    }
  };

  return (
    <div className="flex flex-wrap">
      <div className="basis-1/2">
        {saved_cards.map((card, index) => (
          <div
            className={`relative h-24 mx-auto w-[725px]`}
            key={"card-" + index}
            onClick={() => {}}
          >
            {index === saved_cards.length - 1 && (
              <CardDisplay
                card={card}
                divclass={`absolute border-t-8 border-gray-500 rounded-xl w-full transition-spacing duration-500ms`}
              />
            )}
            {index !== saved_cards.length - 1 && (
              <MinimisedCard
                card={card}
                divclass={`absolute ${
                  index !== 0 && "border-t-8"
                } border-gray-500 h-fit w-full transition-spacing duration-500ms`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-4 basis-1/2">
        <button
          className="bg-blue-400 text-white p-2 rounded-md"
          onClick={handleReport}
        >
          Add Card
        </button>

        {isReported && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-[90%] sm:w-[60%] p-10 container mx-auto">
              <div className="flex flex-col gap-6 mx-auto container h-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-lg mr-4">Add Card</h3>
                  <div className="sm:space-x-8 space-x-4">
                    <button
                      className="hover:text-blue-400 text-xs xs:text-sm sm:text-base lg:text-xl"
                      onClick={submitForm}
                    >
                      Save
                    </button>
                    <button
                      className="hover:text-red-500 text-xs xs:text-sm sm:text-base lg:text-xl"
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
