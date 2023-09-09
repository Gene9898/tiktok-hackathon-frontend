import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCardRegisterDetails,
  selectSavedCards,
  setSavedCards,
} from "@/store/slices/cardSlice";
import CardForm from "@/components/Cards/CardForm";
import { cardFormValidation, postReq, getReq } from "@/lib/utils";
import MinimisedRegisterCard from "@/components/Cards/MinimisedRegisterCard";
import CardRegisterDisplay from "@/components/Cards/CardRegisterDisplay";

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
              <CardRegisterDisplay
                card={card}
                divclass={`absolute border-t-8 border-gray-500 rounded-xl w-full transition-spacing duration-500ms`}
              />
            )}
            {index !== saved_cards.length - 1 && (
              <MinimisedRegisterCard
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

        
      </div>
    </div>
  );
};

export default Cards;



  /*{selection === "none" && (
            <section className="mt-10 flex flex-wrap w-[60%] mx-auto gap-8 justify-center">
              <button
                className="bg-rose-500 rounded-2xl p-4 text-2xl w-[35%] hover:scale-110"
                onClick={() => {
                  setSelection("payment");
                }}
              >
                Make Payment
              </button>
              <button
                className="bg-zinc-500 rounded-2xl p-4 text-2xl w-[35%] hover:scale-110"
                onClick={() => {
                  setSelection("txn");
                }}
              >
                Transaction History
              </button>
            </section>
          )}
          {selection === "txn" && (
            
          )}
          {selection === "payment" && (
            <section className="flex flex-col mt-10 w-[725px] mx-auto">
              <TransactionForm setSelection={setSelection} />
              <button
                className="w-full mx-auto btn bg-rose-500 text-2xl mt-10"
                onClick={() => {
                  dispatch(
                    setAdditionalPaymentDetails({
                      cardNumber: props.card.cardNumber,
                    })
                  );
                }}
              >
                Make Payment
              </button>
            </section>
          )}*/