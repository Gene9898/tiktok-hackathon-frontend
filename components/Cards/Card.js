import React, { useEffect } from "react";
import { getReq } from "@/lib/utils";
import { setSavedCards, selectSavedCards } from "@/store/slices/cardSlice";
import { useDispatch, useSelector } from "react-redux";

const Card = () => {
  const dispatch = useDispatch();
  const saved_cards = useSelector(selectSavedCards);

  const fetchData = async () => {
    const res = await getReq({
      route: "http://localhost:3001/api/getcarddetails",
      headers: {},
    });
    dispatch(setSavedCards(res));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {saved_cards.map((card, index) => (
        <div key={"card" + index}>
          <h1>{card.cardNumber}</h1>
          <h1>{card.cvc}</h1>
          <h1>{card.expiryDate}</h1>
          <h1>{card.userId}</h1>
        </div>
      ))}
    </div>
  );
};

export default Card;
