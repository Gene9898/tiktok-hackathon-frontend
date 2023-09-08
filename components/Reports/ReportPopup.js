import React, { useState } from 'react';

export default function ReportPopup({ transactionId, title, amount, onClose }) {
  const [isReported, setIsReported] = useState(false);

  const handleReport = () => {
    setIsReported(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="max-w-3xl bg-white text-black p-6 rounded-lg shadow-md sm:mx-0 mx-4">
        <h1 className="sm:text-3xl text-xl font-semibold">Report Transaction</h1>

        {isReported ? (
          <div>
            <div className="text-green-600 text-xl mb-6">
                Report Submitted Successfully!
            </div>
            <div className='flex justify-center'>
                <button
                    className="w-full bg-rose-600 hover:bg-rose-500 text-white py-1 px-3 rounded-lg text-base font-semibold transition duration-300 ease-in-out"
                    onClick={onClose}
                  >
                    Close
                </button>
            </div>
          </div> 
        ) : (
              <div className="sm:mt-6 mt-4">
                <h3 className='sm:text-2xl text-base font-semibold'>Transaction Details</h3>
                <div className="mt-2 mb-6">
                <p>Transaction ID: { transactionId }</p>
                <p>Amount: ${ amount }</p>
                <p>Description: { title }</p>
                <p>Date: </p>
              </div>
                <p>
                  Please provide additional information for your report (if any).
                </p>
                <div className="mt-4">
                  <textarea
                    className="w-full h-24 px-3 py-2 sm:text-lg text-sm border rounded-lg"
                    placeholder="Enter your report details..."
                  />
                  <div className="mt-4 sm:space-x-4 space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-lg sm:text-lg text-xs font-semibold transition duration-300 ease-in-out"
                    onClick={handleReport}
                  >
                    Submit Report
                  </button>
                  <button
                    className="bg-rose-600 hover:bg-rose-500 text-white py-2 px-4 rounded-lg sm:text-lg text-xs font-semibold transition duration-300 ease-in-out"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  </div>
                </div>
              </div>
            )}
        </div>
        </div>
    )
}