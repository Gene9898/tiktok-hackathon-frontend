import React, { useEffect, useState } from "react";
import CardTxnDisplay from "./CardTxnDisplay";
import { useDispatch, useSelector } from "react-redux";
import { getReq, postReq, paymentFormValidation } from "@/lib/utils";
import {
  selectCardTransactions,
  setCardTransactions,
  setAdditionalPaymentDetails,
  selectTransactionCheck,
  selectPaymentDetails,
  setTransactionCheck,
  setTransactionDetails,
  selectTransactionDetails,
} from "@/store/slices/cardSlice";
import Transaction from "../Transactions/Transaction";
import { MdArrowBack } from "react-icons/md";
import CardForm from "./CardForm";
import TransactionForm from "../Transactions/TransactionForm";
import { TX_SERVICE, CARD_SERVICE} from "@/config/configs";

const CardTransaction = (props) => {
  const dispatch = useDispatch();
  const [selection, setSelection] = useState("none");
  const transaction_check = useSelector(selectTransactionCheck);
  const payment_details = useSelector(selectPaymentDetails);
  const transaction_details = useSelector(selectTransactionDetails);

  useEffect(() => {
    const fetchData = async () => {
      // TODO needa get card id from redux stored cards
      const res = await getReq({
        route: TX_SERVICE + props.card.cardId,
        headers:  {}
      });
      console.log(res);
      dispatch(setCardTransactions(res));
    };
    fetchData();
    dispatch(setTransactionDetails());
  }, [dispatch, props.card.cardId]);

  useEffect(() => {
    const postData = async () => {
      const res = await postReq({
        //TODO post with the card in the tx obj
        route: TX_SERVICE,
        body: payment_details,
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
      alert("Transaction Successful!");
    };
    if (transaction_check === true) {
      postData();
      dispatch(setTransactionCheck(false));
    }
  }, [transaction_check]);

  return (
    <div className="w-[50%] h-full">
      {Object.keys(props.card).length > 0 && (
        <>
          <CardTxnDisplay
            form={false}
            card={props.card}
            divclass={`w-[60%] h-fit mx-auto ${
              props.effect !== false && "animate-wiggle"
            }`}
          />
          <section className=" mt-10 flex flex-col gap-4 bg-slate-800 w-[725px] mx-auto rounded-2xl p-6">
              <div className="flex flex-wrap">
                <h1>Transactions</h1>
              </div>
              {transaction_details.map((txn, index) => (
                <>
                  {(index === 0 ||
                    transaction_details[index - 1]["transactionDateTime"] !==
                      transaction_details[index]["transactionDateTime"]) && (
                    <h3 className="ml-16">{txn["transactionDateTime"]}</h3>
                  )}
                  <Transaction
                    key={"transaction-" + index}
                    risk={txn.risk}
                    title={txn.name}
                    amount={txn.amount}
                  />
                </>
              ))}
            </section>
          
        </>
      )}
    </div>
  );
};

export default CardTransaction;
