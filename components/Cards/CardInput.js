import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "@/store/slices/authSlice";

const CardInput = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  return (
    <div className={`flex flex-col flex-wrap p-2 ${props.divclass} `}>
      <label
        htmlFor={props.id}
        className={`text-xs sm:text-sm md:text-lg lg:text-xl ${props.labelclass}`}
      >
        {props.label}
      </label>
      {props.id === "cardNumber" && (
        <input
          value={props.value}
          id={props.id}
          type={props.type}
          inputMode="numeric"
          pattern="[0-9\s]{13,19}"
          autoComplete="cc-number"
          maxLength="19"
          placeholder="xxxx xxxx xxxx xxxx"
          className={`mr-auto rounded-md text-black text-xs xs:text-base  sm:text-lg md:text-xl lg:text-2xl w-full h-fit mt-2 p-2 ${props.inputclass}`}
          onChange={(event) => {
            let val = event.target.value.replace(/ /g, "");
            dispatch(
              props.setFunc({
                id: props.id,
                val: val,
                userId:userId,
              })
            );
          }}
        />
      )}
      {props.id !== "cardNumber" && (
        <input
          value={props.value}
          type={props.type}
          id={props.id}
          maxLength={props.maxLength}
          className={`mr-auto rounded-md text-black text-xs xs:text-base sm:text-lg md:text-xl lg:text-2xl w-full h-fit mt-2 p-2 ${props.inputclass}`}
          onChange={(event) => {
            dispatch(
              props.setFunc({
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
