import Link from 'next/link';
import { useState } from 'react';

export default function Report() {
  const [transaction, setTransaction] = useState({
    id: 1,
    amount: 100,
    description: 'Sample Transaction',
    date: 'Thursday, 31 August 2023',
  });

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isReported, setIsReported] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const handleReport = () => {
    setIsReported(true);
  };

  return (
    <div>
      <main className="bg-slate-900 p-4 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white text-black p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold mb-4">Report Transaction</h1>

          {isReported ? (
            <div className="text-green-600 text-xl mb-4">
              Report Submitted Successfully!
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold">Transaction Details</h2>
              <div className="mt-4">
                <p className="text-lg">Transaction ID: {transaction.id}</p>
                <p className="text-lg">Amount: ${transaction.amount}</p>
                <p className="text-lg">Description: {transaction.description}</p>
                <p className="text-lg">Date: {transaction.date}</p>
              </div>

              {!isConfirmed ? (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold">Report</h2>
                  <p className="mt-4 text-lg">
                    Do you want to report this transaction?
                  </p>
                  <div className="mt-4 space-x-4">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-lg font-semibold transition duration-300 ease-in-out"
                      onClick={handleConfirm}
                    >
                      Confirm
                    </button>
                    <Link href="/transactions" className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-lg font-semibold transition duration-300 ease-in-out">
                        Cancel
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold">Report Details</h2>
                  <p className="mt-4 text-lg">
                    Please provide additional information for your report (if any).
                  </p>
                  <div className="mt-4 space-x-4">
                    <textarea
                      className="w-full h-24 px-3 py-2 text-lg border rounded-lg"
                      placeholder="Enter your report details..."
                    />
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-lg font-semibold transition duration-300 ease-in-out"
                      onClick={handleReport}
                    >
                      Submit Report
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}