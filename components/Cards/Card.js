import React, { useEffect } from "react";
import { getReq, getCardType } from "@/lib/utils";
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

  // const verify = async () => {
  //   const res = await getReq({
  //     route:
  //       "https://api.bincodes.com/bin/json/bd74bf4410ffdceef5db92f44c9ce728/526471/",
  //     headers: {},
  //   });
  //   console.log(res);
  // };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      {saved_cards.map((card, index) => (
        <div key={"card" + index} className="rounded-md border-2 bg-slate-800">
          <h1>{card.cardNumber}</h1>
          <h1>{card.cvc}</h1>
          <h1>{card.expiryDate}</h1>
          <h1>{card.userId}</h1>
          <h1>{getCardType(card.cardNumber)}</h1>
        </div>
      ))}
    </div>
  );
};

export default Card;
