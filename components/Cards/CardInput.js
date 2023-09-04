import { setCardRegistrationDetails } from "@/store/slices/cardSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const CardInput = (props) => {
  const dispatch = useDispatch();
  return (
    <div className={`flex flex-col flex-wrap p-2 ${props.divclass}`}>
      <label htmlFor={props.id} className={`text-2xl ${props.labelclass}`}>
        {props.label}
      </label>
      {props.type === "tel" && (
        <input
          id={props.id}
          type={props.type}
          inputMode="numeric"
          pattern="[0-9\s]{13,19}"
          autoComplete="cc-number"
          maxLength="19"
          placeholder="xxxx xxxx xxxx xxxx"
          className={`mr-auto rounded-md text-black text-2xl w-[85%] h-fit mt-2 p-2 ${props.inputclass}`}
          onChange={(event) => {
            dispatch(
              setCardRegistrationDetails({
                id: props.id,
                val: event.target.value,
              })
            );
          }}
        />
      )}
      {props.type !== "tel" && (
        <input
          type={props.type}
          id={props.id}
          className={`mr-auto rounded-md text-black text-2xl w-[85%] h-fit mt-2 p-2 ${props.inputclass}`}
          onChange={(event) => {
            dispatch(
              setCardRegistrationDetails({
                id: props.id,
                val: event.target.value,
              })
            );
          }}
        />
      )}
    </div>
  );
};

export default CardInput;
