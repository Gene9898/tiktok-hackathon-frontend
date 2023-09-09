import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCardRegisterDetails,
  selectSavedCards,
  setSavedCards,
} from "@/store/slices/cardSlice";
import CardForm from "@/components/Cards/CardForm";
import { cardFormValidation, postReq, getReq } from "@/lib/utils";
import MinimisedRegisterCard from "@/components/Cards/MinimisedRegisterCard";
import CardRegisterDisplay from "@/components/Cards/CardRegisterDisplay";
import { useRouter } from 'next/router';


const Option = () => {
    const dispatch = useDispatch();
  const card_detail = useSelector(selectCardRegisterDetails);
  const saved_cards = useSelector(selectSavedCards);
  const [isReported, setIsReported] = useState(false);

  const fetchData = async () => {
    const res = await getReq({
      route: "http://localhost:3000/api/getcarddetails",
      headers: {},
    });
    console.log(res);
    dispatch(setSavedCards(res));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReport = () => {
    setIsReported(true);
  };

  const handleClose = () => {
    setIsReported(false);
  };

  const submitForm = async () => {
    const check = cardFormValidation(card_detail);
    console.log(check);
    if (check) {
      const res = await postReq({
        route: "http://localhost:3000/api/postcarddetails",
        body: card_detail,
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
      alert("Card Successfully Saved!");
      handleClose(); 
      fetchData();
    }
  };

  const router = useRouter();

  const handleClick = () => {
    router.push('/payment');
  };

  return (
    <main>
        <div className="flex mt-8">
      
      <div className="flex-1 flex justify-center container relative text-center scale-95 hover:scale-100">
      <img
          className="w-4/5 text-white text-5xl bg-blue-500 hover:bg-blue-600 border border-white rounded-lg focus:outline-none" src="./payment.jpg" onClick={handleClick}
        />
        <h4 className="bg-black p-1 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Payment</h4>
      </div>

      <div className="flex-1 flex justify-center container relative text-center scale-95 hover:scale-100">
        <img
          className="w-4/5 text-white text-5xl bg-blue-500 hover:bg-blue-600 border border-white rounded-lg focus:outline-none" src="./add.jpg" onClick={handleReport}
        />
        <h4 className="bg-black p-1 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    Add Card
  </h4>
      </div>
    </div>
    {isReported && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-[90%] sm:w-[60%] p-10 container mx-auto">
              <div className="flex flex-col gap-6 mx-auto container h-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-lg mr-4">Add Card</h3>
                  <div className="sm:space-x-8 space-x-4">
                    <button
                      className="hover:text-blue-400 text-xs xs:text-sm sm:text-base lg:text-xl"
                      onClick={submitForm}
                    >
                      Save
                    </button>
                    <button
                      className="hover:text-red-500 text-xs xs:text-sm sm:text-base lg:text-xl"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <CardForm />
                </div>
              </div>
            </div>
          </div>
        )}
    </main>
    
  );
};

export default Option;
