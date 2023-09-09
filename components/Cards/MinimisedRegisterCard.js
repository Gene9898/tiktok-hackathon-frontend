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

const MinimisedRegisterCard = (props) => {
  const dispatch = useDispatch();
  const censorDots = [1, 2, 3, 4];
  console.log(getBankColor(props.card.bank));
  return (
    <div
  className={`rounded-xl p-2 ${props.divclass} ${getBankColor(
    props.card.bank
  )}`}
  style={{
    width: '100%',
    maxWidth: '60%',
    margin: '0 auto',
  }}
>
  <div className="flex flex-wrap">
    {censorDots.map((index) => (
      <BsDot key={"dot" + index} size={36} className="" />
    ))}
    <h1 className="w-full rounded-md p-2 text-3xl">
      {formatMinimisedCardNumber(props.card.cardNumber)}
    </h1>
    {props.card.cardNumber &&
      props.card.cardNumber.replace(/ /g, "").length >= 6 && (
        <h1 className="w-full mt-2">{props.card.bank}</h1>
      )}
    <div className="invisible">
      <FcSimCardChip size={48} className="mt-4" />
      <h1 className="w-full rounded-md p-2 text-4xl">
        {formatCardNumber(props.card.cardNumber)}
      </h1>

      <section className="mt-4">
        <h1 className="w-full rounded-md p-2">
          {props.card.name}
        </h1>
        {props.card.expirationDate && (
          <h6 className="mt-2 text-[16px]">Valid Thru</h6>
        )}
        <h1>{props.card.expirationDate}</h1>
      </section>

      {props.card.cardNumber &&
        props.card.cardNumber.replace(/ /g, "").length >= 6 && (
          <div className="w-full mt-4 text-center">
            {getSchemeIcon(props.card.scheme)}
          </div>
        )}
    </div>
  </div>
</div>
  );
};

export default MinimisedRegisterCard;
