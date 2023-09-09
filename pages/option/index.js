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
import { CARD_SERVICE } from "@/config/configs";
import { selectUserId, selectToken } from "@/store/slices/authSlice";
import { useRouter } from "next/router";
import Image from 'next/image'


const Option = () => {
    const dispatch = useDispatch();
  const card_detail = useSelector(selectCardRegisterDetails);
  const saved_cards = useSelector(selectSavedCards);
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const [isReported, setIsReported] = useState(false);
  const fetchData = async () => {
    const res = await getReq({
      // TODO
      route: CARD_SERVICE+userId,
      headers: {
        Authorization: "Bearer " + token,
    },
    });
    console.log(res);
    dispatch(setSavedCards(res));
  };

  useEffect(() => {
    console.log("userId ", userId)
    fetchData();
    console.log("CHECKING ",saved_cards);
  }, []);

  const handleReport = () => {
    setIsReported(true);
  };

  const handleClose = () => {
    setIsReported(false);
  };

  const submitForm = async () => {
    const check = cardFormValidation(card_detail,saved_cards);
    console.log(check);
    if (check) {
      const res = await postReq({
        //TODO send user id with the obj too
        route: CARD_SERVICE,
        body: card_detail,
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
      alert("Card Successfully Saved!");
      handleClose(); // Close the popup after submitting
      document.getElementById("card-form").reset();
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
      <Image
          src="/payment.jpg"
          alt="Image of payment"
          width={1000}
          height={1000}
          className="w-4/5 text-white text-5xl bg-blue-500 hover:bg-blue-600 border border-white rounded-lg focus:outline-none"
          onClick={handleClick}
        />
      
        <h4 className="bg-black p-1 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Payment</h4>
      </div>

      <div className="flex-1 flex justify-center container relative text-center scale-95 hover:scale-100">
      <Image
          src="/add.jpg"
          alt="Image of adding card"
          width={1000}
          height={1000}
          className="w-4/5 text-white text-5xl bg-blue-500 hover:bg-blue-600 border border-white rounded-lg focus:outline-none"
          onClick={handleReport}
        />
        <h4 className="bg-black p-1 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    Add Card
  </h4>
      </div>
    </div>
    {isReported && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-[90%] sm:w-[60%] p-10 container mx-auto">
              <div className="bg-slate-800 rounded-xl flex flex-col gap-6 mx-auto container h-full">
                <div className="flex items-center justify-between mx-4 mt-4">
                  <h3 className="text-sm sm:text-lg">Add Card</h3>
                  
                </div>
                <div className="flex justify-center">
                  <CardForm />
                </div>
                <div className="sm:space-x-4 space-x-2 mx-4 mb-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-400 text-white py-1 px-3 rounded-lg transition duration-300 ease-in-out text-xs xs:text-sm sm:text-base lg:text-xl"
                      onClick={submitForm}
                    >
                      Save
                    </button>
                    <button
                      className="bg-rose-500 hover:bg-rose-400 text-white py-1 px-3 rounded-lg transition duration-300 ease-in-out text-xs xs:text-sm sm:text-base lg:text-xl"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
              </div>
            </div>
          </div>
        )}
    </main>
    
  );
};

export default Option;
