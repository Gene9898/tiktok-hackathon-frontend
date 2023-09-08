import React, { useEffect, useState } from "react";
import CardDisplay from "./CardDisplay";
import { useDispatch, useSelector } from "react-redux";
import { getReq, postReq } from "@/lib/utils";
import {
  selectCardTransactions,
  setCardTransactions,
  setAdditionalPaymentDetails,
  selectTransactionCheck,
  selectPaymentDetails,
} from "@/store/slices/cardSlice";
import Transaction from "../Transactions/Transaction";
import { MdArrowBack } from "react-icons/md";
import CardForm from "./CardForm";
import TransactionForm from "../Transactions/TransactionForm";

const CardTransaction = (props) => {
  const dispatch = useDispatch();
  const [selection, setSelection] = useState("none");
  const transaction_check = useSelector(selectTransactionCheck);
  const payment_details = useSelector(selectPaymentDetails);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getReq({
        route: `http://localhost:3001/api/${props.card.cardNumber}`,
        headers: {},
      });
      console.log(res);
      dispatch(setCardTransactions(res));
    };
    // fetchData();
  }, [dispatch, props.card.cardNumber]);

  useEffect(() => {
    const postData = async () => {
      const res = await postReq({
        route: "http://localhost:3001/api/posttxn",
        body: payment_details,
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
      alert("Transaction Successful!");
    };
    if (transaction_check === true) {
      postData();
    }
  }, [transaction_check]);

  const DummyTxns = [
    {
      id: 1,
      title: "Food",
      risk: "high",
      amount: 800,
    },
    {
      id: 2,
      title: "Movies",
      risk: "med",
      amount: 100,
    },
    {
      id: 3,
      title: "Google",
      risk: "low",
      amount: 500,
    },
    {
      id: 4,
      title: "Bus / MRT",
      risk: "low",
      amount: 8,
    },
  ];

  return (
    <div className="w-[50%] h-full">
      {Object.keys(props.card).length > 0 && (
        <>
          <CardDisplay
            form={false}
            card={props.card}
            divclass={`w-[60%] h-fit mx-auto ${
              props.effect !== false && "animate-wiggle"
            }`}
          />
          {selection === "none" && (
            <section className="mt-10 flex flex-wrap w-[60%] mx-auto gap-8 justify-center">
              <button
                className="bg-rose-500 rounded-2xl p-4 text-2xl w-[35%] hover:scale-110"
                onClick={() => {
                  setSelection("payment");
                }}
              >
                Make Payment
              </button>
              <button
                className="bg-zinc-500 rounded-2xl p-4 text-2xl w-[35%] hover:scale-110"
                onClick={() => {
                  setSelection("txn");
                }}
              >
                Transaction History
              </button>
            </section>
          )}
          {selection === "txn" && (
            <section className=" mt-10 flex flex-col gap-4 bg-slate-500 w-[725px] mx-auto rounded-2xl p-6">
              <div className="flex flex-wrap">
                <MdArrowBack
                  size={48}
                  className="hover:scale-125 cursor-pointer"
                  onClick={() => {
                    setSelection("none");
                  }}
                />
                <h1 className="ml-auto">Transactions</h1>
              </div>
              {DummyTxns.map((txn, index) => (
                <Transaction
                  key={"transaction-" + index}
                  risk={txn.risk}
                  title={txn.title}
                  amount={txn.amount}
                />
              ))}
            </section>
          )}
          {selection === "payment" && (
            <section className="flex flex-col mt-10 w-[725px] mx-auto">
              <TransactionForm setSelection={setSelection} />
              <button
                className="w-full mx-auto btn bg-rose-500 text-2xl mt-10"
                onClick={() => {
                  dispatch(
                    setAdditionalPaymentDetails({
                      cardNumber: props.card.cardNumber,
                    })
                  );
                }}
              >
                Make Payment
              </button>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default CardTransaction;
