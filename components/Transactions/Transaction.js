import React from "react";
import { currencyFormatter } from "@/lib/utils";
import Link from "next/link";
const Transaction = (props) => {
  const types = {
    high: "bg-red-500",
    med: "bg-yellow-500",
    low: "bg-green-500",
  };
  return (
    <div className="flex flex-wrap items-center justify-between px-4 py-4 bg-slate-800 rounded-3xl">
      <div className="flex items-center gap-4 w-fit">
        <div
          className={`w-[8px] h-[8px] sm:w-[25px] sm:h-[25px] rounded-full ${
            types[props.risk]
          }`}
        ></div>
        <h4 className="capitalize">{props.title}</h4>
      </div>
      <div className="flex ml-auto gap-9">
        <p>{currencyFormatter(props.amount)}</p>
        <Link
          href="/report"
          className="text-white capitalize bg-red-500"
        >
          Report
        </Link>
      </div>
    </div>
  );
};

export default Transaction;
