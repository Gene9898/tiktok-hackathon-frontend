import React, { useEffect, useState } from "react";
import { getReq } from "@/lib/utils";
import { setSavedCards, selectSavedCards } from "@/store/slices/cardSlice";
import { useDispatch, useSelector } from "react-redux";
import CardDisplay from "./CardDisplay";
import MinimisedCard from "./MinimisedCard";
import CardTransaction from "./CardTransaction";

const Card = () => {
  const dispatch = useDispatch();
  const saved_cards = useSelector(selectSavedCards);
  const [cardDisplay, setCardDisplay] = useState({});
  const [effect, setEffect] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getReq({
        route: "http://localhost:3001/api/getcarddetails",
        headers: {},
      });
      console.log(res);
      dispatch(setSavedCards(res));
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="w-full h-full grid grid-cols-2">
      <div className="w-full h-full">
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
              <CardDisplay
                card={card}
                divclass={`absolute border-t-8 border-gray-500 rounded-xl w-[60%] transition-spacing duration-500ms pt-5 hover:pt-0 hover:pb-10`}
              />
            )}
            {index !== saved_cards.length - 1 && (
              <MinimisedCard
                card={card}
                divclass={`absolute ${
                  index !== 0 && "border-t-8"
                } border-gray-500 h-fit w-[60%] transition-spacing duration-500ms pt-5 hover:pt-0 hover:pb-10`}
              />
            )}
          </div>
        ))}
      </div>
      <CardTransaction card={cardDisplay} effect={effect} />
    </div>
  );
};

export default Card;
