import React, { useEffect, useState } from "react";
import { getReq } from "@/lib/utils";
import {
  setSavedCards,
  selectSavedCards,
  selectFilterSavedCards,
  filterSavedCards,
} from "@/store/slices/cardSlice";
import { useDispatch, useSelector } from "react-redux";
import CardTxnDisplay from "components/Cards/CardTxnDisplay.js";
import MinimisedTxnCard from "components/Cards/MinimisedTxnCard";
import CardPayment from "components/Cards/CardPayment";
// import { CARD_SERVICE } from "@/config/configs";
import { selectUserId } from "@/store/slices/authSlice";
import { CARD_SERVICE } from "@/config/configs";

const Card = () => {
  const dispatch = useDispatch();
  const saved_cards = useSelector(selectSavedCards);
  const filtered_saved_cards = useSelector(selectFilterSavedCards);
  const userId = useSelector(selectUserId);
  // const token = useSelector(selectToken);
  const [cardDisplay, setCardDisplay] = useState({});
  const [effect, setEffect] = useState("");

  console.log(userId);

  useEffect(() => {
    console.log(effect);
  }, [effect]);

  useEffect(() => {
    const fetchData = async () => {
      // TODO card need to send user id
      // return card id in each obj
      const res = await getReq({
        route: CARD_SERVICE + "/" + userId,
        headers: {},
      });
      console.log("checking", res);
      dispatch(setSavedCards(res));
    };
    fetchData();
  }, [dispatch]);

  console.log("checking", filtered_saved_cards);
  return (
    <div className="w-full h-full flex flex-wrap">
      <div className="basis-1/2 h-full lg:basis-1/2 md:basis-full sm:basis-full">
        <div className="w-[50%] md:mx-0 sm:mx-0">
          <h2 className="relative w-[750px]">Card Manager</h2>
        </div>
      </div>

      <div className="basis-1/2 mt-6 h-full lg:basis-1/2 md:basis-full sm:basis-full">
        <h2 className="w-[50%] md:mx-0 sm:mx-0"></h2>
      </div>

      <div className="basis-1/2 h-full lg:basis-1/2 md:basis-full sm:basis-full">
        <div className="w-[50%] md:mx-0 sm:mx-0" id="txn-card-wallet">
          {filtered_saved_cards.map((card, index) => (
            <div
              className={`relative h-24 cursor-pointer w-[750px] mx-auto ${
                effect === card.cardNumber && "animate-wiggle"
              } ${index === filtered_saved_cards.length - 1 && "h-80"}`}
              key={"card-" + index}
              onClick={() => {
                setCardDisplay(card);
                setEffect(card.cardNumber);
                setTimeout(() => {
                  dispatch(filterSavedCards(card));
                }, 300);
              }}
              onAnimationEnd={() => setEffect(false)}
            >
              {index === filtered_saved_cards.length - 1 && (
                <CardTxnDisplay
                  card={card}
                  divclass={`absolute border-t-8 border-gray-500 transition-spacing duration-500 hover:scale-110 pt-5 w-[75%]`}
                />
              )}
              {index !== filtered_saved_cards.length - 1 && (
                <MinimisedTxnCard
                  card={card}
                  divclass={`absolute ${
                    index !== 0 && "border-t-8"
                  } border-gray-500 h-fit transition-spacing duration-500 pt-5 hover:pt-0 hover:pb-10 w-[75%]`}
                />
              )}
            </div>
          ))}
        </div>
        <CardPayment card={cardDisplay} effect={effect} />
      </div>
    </div>
  );
};

export default Card;
