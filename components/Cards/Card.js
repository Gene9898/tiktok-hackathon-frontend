import React, { useEffect } from "react";
import { getReq } from "@/lib/utils";
import { setSavedCards, selectSavedCards } from "@/store/slices/cardSlice";
import { useDispatch, useSelector } from "react-redux";
import CardDisplay from "./CardDisplay";

const Card = () => {
  const dispatch = useDispatch();
  const saved_cards = useSelector(selectSavedCards);

  // const verify = async () => {
  //   const res = await getReq({
  //     route:
  //       "https://api.bincodes.com/bin/json/bd74bf4410ffdceef5db92f44c9ce728/526471/",
  //     headers: {},
  //   });
  //   console.log(res);
  // };

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
    <div className="flex flex-wrap gap-2">
      {saved_cards.map((card, index) => (
        <CardDisplay card={card} key={"card-" + index} />
      ))}
    </div>
  );
};

export default Card;
