import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcSimCardChip } from "react-icons/fc";
import { getCardType } from "@/lib/utils";
import {
  selectCardRegisterDetails,
  setCardRegistrationDetails,
} from "@/store/slices/cardSlice";
import { getSchemeIcon } from "@/lib/utils";

const CardDisplay = (props) => {
  const dispatch = useDispatch();
  console.log(props.card);
  useEffect(() => {
    if (props.card.cardNumber !== undefined) {
      const res = getCardType(props.card.cardNumber);
      dispatch(setCardRegistrationDetails({ id: "scheme", val: res.scheme }));
      dispatch(setCardRegistrationDetails({ id: "bank", val: res.bank }));
    }
  }, [dispatch, props.card.cardNumber]);

  return (
    <div className="bg-zinc-400 rounded-md basis-[40%] w-[40%] mr-auto p-4 relative">
      <div className="ml-16 h-full">
        <h1 className="ml-auto w-fit h-10">{props.card.bank}</h1>

        <FcSimCardChip size={64} className="basis-full mt-20" />
        <h1 className="w-full h-14 bg-slate-500 rounded-md p-2">
          {props.card.cardNumber}
        </h1>

        <section className="mt-10">
          <h1 className="float-left mr-4 h-14 rounded-md w-1/2 bg-slate-500 p-2">
            {props.card.name}
          </h1>
          <h6 className="float-left h-14 w-10">Valid Thru</h6>
          <h1 className="">{props.card.expirationDate}</h1>
        </section>

        <div className="w-fit block ml-auto mt-auto">
          {getSchemeIcon(props.card.scheme)}
        </div>
      </div>
    </div>
  );
};

export default CardDisplay;
