import React, { useState } from 'react';
import ReportPopup from 'components/Reports/ReportPopup'; 

const { currencyFormatter } = require("lib/utils");

function TransactionObj({ color, title, bank, amount, id }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleReportClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <div className="flex items-center justify-between px-4 py-4 bg-slate-800 rounded-3xl">
      <div className="flex items-center gap-2">
        <div
          className="w-[8px] h-[8px] sm:w-[25px] sm:h-[25px] rounded-full"
          style={{ backgroundColor: color }}
        />
        <h4 className="capitalize">{title}</h4>
      </div>
      <div className="flex items-center gap-9">
        <p>{currencyFormatter(amount)}</p>
        <button className='report' onClick={handleReportClick}>
          Report
        </button>
      </div>

      {isPopupOpen && (
        <ReportPopup
          transactionId={id}
          title={title}
          bank={bank}
          amount={amount}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
}

module.exports = TransactionObj;
