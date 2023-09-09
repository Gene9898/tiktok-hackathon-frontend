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
import { TX_SERVICE, CARD_SERVICE } from "@/config/configs";

const CardTransaction = (props) => {
  const dispatch = useDispatch();
  const [selection, setSelection] = useState("none");
  const transaction_check = useSelector(selectTransactionCheck);
  const payment_details = useSelector(selectPaymentDetails);
  const transaction_details = useSelector(selectTransactionDetails);

  useEffect(() => {
    const fetchData = async () => {
      // TODO needa to get card id from redux stored cards
      const res = await getReq({
        route: TX_SERVICE + "/card" + "/" + props.card.cardId,
      });
      console.log(res);
      dispatch(setTransactionDetails(res));
    };
    fetchData();
  }, [dispatch, props.card.cardId]);
  console.log(props.card.cardId);
  // useEffect(() => {
  //   const postData = async () => {
  //     const res = await postReq({
  //       //TODO post with the card in the tx obj
  //       route: TX_SERVICE,
  //       body: payment_details,
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     console.log(res);
  //     alert("Transaction Successful!");
  //   };
  //   if (transaction_check === true) {
  //     postData();
  //     dispatch(setTransactionCheck(false));
  //   }
  // }, [transaction_check]);

  return (
    <div className="mt-10 basis-1/2 h-full lg:basis-1/2 md:basis-full sm:basis-full">
      {Object.keys(props.card).length > 0 && (
        <div className="w-[750px]">
          <CardTxnDisplay
            form={false}
            card={props.card}
            divclass={`sm:w-[75%] w-3/5 md:mx-0 sm:mx-0 ${
              props.effect !== false && "animate-wiggle"
            }`}
          />
          <section className="mt-10 flex flex-col gap-4 bg-slate-900 sm:w-[75%] w-3/5 md:mx-0 sm:mx-0 rounded-2xl p-6 ml-auto lg:ml-auto">
            <div className="flex flex-wrap">
              <h2>Transactions</h2>
            </div>
            {transaction_details.map((txn, index) => (
              <>
                {(index === 0 ||
                  transaction_details[index - 1]["transactionDateTime"] !==
                    transaction_details[index]["transactionDateTime"]) && (
                  <h4>{txn["transactionDateTime"]}</h4>
                  <h4>{txn["transactionDateTime"]}</h4>
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
        </div>
      )}
    </div>
  );
};

export default CardTransaction;
