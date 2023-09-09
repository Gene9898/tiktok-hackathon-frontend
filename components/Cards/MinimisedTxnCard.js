import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcSimCardChip } from "react-icons/fc";
import { getCardType } from "@/lib/utils";
import { setCardRegistrationDetails } from "@/store/slices/cardSlice";
import {
  getSchemeIcon,
  formatCardNumber,
  formatMinimisedCardNumber,
  getBankColor,
} from "@/lib/utils";
import { BsDot } from "react-icons/bs";

const MinimisedTxnCard = (props) => {
  const dispatch = useDispatch();
  const censorDots = [1, 2, 3, 4];
  console.log(getBankColor(props.card.bank));
  return (
    <div
      className={` rounded-xl w-[60%] p-2 ${props.divclass} ${getBankColor(
        props.card.bank
      )}`}
    >
      <div className="ml-12 h-full flex flex-wrap">
        {censorDots.map((index) => (
          <BsDot key={"dot" + index} size={54} className="" />
        ))}
        <h1 className="w-fit h-14 rounded-md p-2 text-4xl ">
          {formatMinimisedCardNumber(props.card.cardNumber)}
        </h1>
        {props.card.cardNumber &&
          props.card.cardNumber.replace(/ /g, "").length >= 6 && (
            <h1 className="ml-auto w-fit h-10 my-auto">{props.card.bank}</h1>
          )}
        <div className="invisible">
          <FcSimCardChip size={64} className="basis-full mt-20" />
          <h1 className="w-full h-14 rounded-md p-2 text-5xl ">
            {formatCardNumber(props.card.cardNumber)}
          </h1>

          <section className="mt-10">
            <h1 className="float-left mr-4 h-14 rounded-md w-1/2 p-2 ">
              {props.card.name}
            </h1>
            {props.card.expirationDate && (
              <h6 className="float-left h-14 w-10 p-2 mr-6 text-[18px]">
                Valid Thru
              </h6>
            )}
            <h1 className="h-14 p-2 ">{props.card.expirationDate}</h1>
          </section>

          {props.card.cardNumber &&
            props.card.cardNumber.replace(/ /g, "").length >= 6 && (
              <div className="w-fit block ml-auto mt-auto">
                {getSchemeIcon(props.card.scheme)}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MinimisedTxnCard;
