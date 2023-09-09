import React, { useEffect, useState } from "react";
import { getReq } from "@/lib/utils";
import { setSavedCards, selectSavedCards } from "@/store/slices/cardSlice";
import { useDispatch, useSelector } from "react-redux";
import CardTxnDisplay from "./CardTxnDisplay";
import MinimisedTxnCard from "./MinimisedTxnCard";
import CardTransaction from "./CardTransaction";

const Card = () => {
  const dispatch = useDispatch();
  const saved_cards = useSelector(selectSavedCards);
  const [cardDisplay, setCardDisplay] = useState({});
  const [effect, setEffect] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getReq({
        route: "http://localhost:3000/api/getcarddetails",
        headers: {},
      });
      console.log(res);
      dispatch(setSavedCards(res));
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="w-full h-full flex flex-wrap">
      <div className="basis-1/2 h-full">
        <div className="mx-auto w-[600px]">
          {saved_cards.map((card, index) => (
            <div
              className={`relative h-24 ${
                effect === index && "animate-wiggle"
              } cursor-pointer`}
              key={"card-" + index}
              onClick={() => {
                setCardDisplay(card);
                setEffect(index);
              }}
              onAnimationEnd={() => setEffect(false)}
            >
              {index === saved_cards.length - 1 && (
                <CardTxnDisplay
                  card={card}
                  divclass={`absolute border-t-8 border-gray-500 rounded-xl w-full transition-spacing duration-500ms hover:scale-110 pt-5`}
                />
              )}
              {/* pt-5 hover:pt-0 hover:pb-10 */}
              {index !== saved_cards.length - 1 && (
                <MinimisedTxnCard
                  card={card}
                  divclass={`absolute ${
                    index !== 0 && "border-t-8"
                  } border-gray-500 h-fit w-full transition-spacing duration-500ms pt-5 hover:pt-0 hover:pb-10`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <CardTransaction card={cardDisplay} effect={effect} />
    </div>
  );
};

export default Card;
