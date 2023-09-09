import React, { useEffect, useState } from "react";
import { getReq } from "@/lib/utils";
import {
  setSavedCards,
  selectSavedCards,
  selectFilterSavedCards,
  filterSavedCards,
} from "@/store/slices/cardSlice";
import { useDispatch, useSelector } from "react-redux";
import CardTxnDisplay from "./CardTxnDisplay";
import MinimisedTxnCard from "./MinimisedTxnCard";
import CardTransaction from "./CardTransaction";
import { CARD_SERVICE } from "@/config/configs";
import { selectUserId, selectToken } from "@/store/slices/authSlice";

const Card = () => {
  const dispatch = useDispatch();
  const saved_cards = useSelector(selectSavedCards);
  const filtered_saved_cards = useSelector(selectFilterSavedCards);
  const userId = useSelector(selectUserId);
  const [cardDisplay, setCardDisplay] = useState({});
  const [effect, setEffect] = useState("");

  useEffect(() => {
    console.log(userId);
  }, [userId]);
  useEffect(() => {
    const fetchData = async () => {
      // TODO card need to send user id
      // return card id in each obj
      const res = await getReq({
        route: CARD_SERVICE + "/" + userId,
        headers: {},
      });
      console.log("checking ", res);
      dispatch(setSavedCards(res));
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="w-full h-full flex flex-wrap">
      {filtered_saved_cards.length !== 0 && (
        <>
          <div className="basis-1/2 h-full">
            <div className="mx-auto  w-[600px]">
              {filtered_saved_cards.map((card, index) => (
                <div
                  className={`relative h-24 cursor-pointer`}
                  key={"card-" + index}
                  onClick={() => {
                    setCardDisplay(card);
                    setEffect(card.cardNumber);
                    setTimeout(() => {
                      dispatch(filterSavedCards(card));
                    }, 900);
                  }}
                  onAnimationEnd={() => setEffect(false)}
                >
                  {index === filtered_saved_cards.length - 1 && (
                    <CardTxnDisplay
                      card={card}
                      divclass={`absolute border-t-8 border-gray-500 rounded-xl w-full transition-position duration-1000 hover:scale-110 pt-5 ${
                        effect === card.cardNumber
                          ? "left-[1005px] -top-[295px] border-t-0"
                          : "left-0 top-0"
                      }`}
                    />
                  )}
                  {/* pt-5 hover:pt-0 hover:pb-10 */}
                  {index !== saved_cards.length - 1 && (
                    <MinimisedTxnCard
                      card={card}
                      divclass={`absolute ${
                        index !== 0 && "border-t-8"
                      } border-gray-500 h-fit w-full transition-position duration-1000 pt-5 hover:pt-0 hover:pb-10 ${
                        effect === card.cardNumber
                          ? "left-[1005px] -top-[200px] border-t-0"
                          : "left-0 top-0"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <CardTransaction card={cardDisplay} effect={effect} />
        </>
      )}
      {filtered_saved_cards.length === 0 && <h1>No cards detected</h1>}
    </div>
  );
};

export default Card;
