import React, { useState } from "react";
import { currencyFormatter } from "@/lib/utils";
import ReportPopup from "../../pages/reports/ReportPopup";
const Transaction = (props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleReportClick = () => {
    setIsPopupOpen(true);
  };
  const types = {
    HIGH: "bg-red-500",
    NONE: "bg-green-500",
  };
  return (
    <div className="flex flex-wrap items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl w-[100%] mx-auto">
      <div className="flex items-center gap-4 w-fit">
        <div
          className={`w-[8px] h-[8px] sm:w-[25px] sm:h-[25px] rounded-full ${
            types[props.risk]
          }`}
        ></div>
        <h4 className="capitalize">{props.title}</h4>
      </div>
      <div className="flex ml-auto gap-9">
        <p className="my-auto font-bold">{currencyFormatter(props.amount)}</p>
        <button className="report font-bold" onClick={handleReportClick}>
          Report
        </button>
      </div>

      {isPopupOpen && (
        <ReportPopup
          transactionId={props.id}
          title={props.title}
          bank={props.bank}
          amount={props.amount}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default Transaction;
