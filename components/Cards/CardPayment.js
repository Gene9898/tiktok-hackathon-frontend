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
import { TX_SERVICE } from "@/config/configs";

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
        // route: CARD_SERVICE + props.card.cardId,
        // headers:  {Authorization: "Bearer " + token}
        route: "http://localhost:3000/api/getcarddetails",
        headers: {},
      });
      console.log(res);
      dispatch(setCardTransactions(res));
    };
    // fetchData();
    dispatch(setTransactionDetails());
  }, [dispatch, props.card.cardId]);

  useEffect(() => {
    const postData = async () => {
      const res = await postReq({
        //TODO post with the card in the tx obj
        route: TX_SERVICE,
        // route:"http://localhost:8082/transactions",
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
          <section className="flex flex-col mt-10 sm:w-[75%] w-3/5 bg-slate-700 rounded-xl p-4">
              <TransactionForm setSelection={setSelection} />
              <button
                className="w-[82%] mx-auto btn bg-rose-500 text-2xl mt-10"
                onClick={() => {
                  let check = paymentFormValidation(payment_details);
                  if (check) {
                    dispatch(
                      setAdditionalPaymentDetails({
                        // cardId: props.card.cardId,
                        cardId: props.card.cardNumber,
                        dateOfBirth: props.card.dateOfBirth,
                      })
                    );
                    document.getElementById("txn-form").reset();
                  }
                }}
              >
                Make Payment
              </button>
            </section>
          {/* {selection === "none" && (
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
          )} */}
          {/* {selection === "txn" && ( */}
          {/* )} */}
          {/* {selection === "payment" && (
            
          )} */}
        </div>
      )}
    </div>
  );
};

export default CardTransaction;