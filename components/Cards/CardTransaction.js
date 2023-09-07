import React, { useEffect, useState } from "react";
import CardDisplay from "./CardDisplay";
import { useDispatch } from "react-redux";
import { getReq } from "@/lib/utils";
import {
  selectCardTransactions,
  setCardTransactions,
} from "@/store/slices/cardSlice";
import Transaction from "../Transactions/Transaction";
import TransactionObj from "../Transactions/transactionObj";
const CardTransaction = (props) => {
  const dispatch = useDispatch();

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
    <div>
      {Object.keys(props.card).length > 0 && (
        <>
          <CardDisplay
            card={props.card}
            divclass={`w-[60%] h-fit ${
              props.effect !== false && "animate-wiggle"
            }`}
          />
          <section className=" mt-10 flex flex-col gap-4 bg-slate-500 w-[60%] rounded-2xl p-4">
            {DummyTxns.map((txn, index) => (
              <Transaction
                key={"transaction-" + index}
                risk={txn.risk}
                title={txn.title}
                amount={txn.amount}
              />
            ))}
          </section>
        </>
      )}
    </div>
  );
};

export default CardTransaction;
