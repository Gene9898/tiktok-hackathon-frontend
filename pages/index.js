import React from "react";
import { initFirebase } from "@/config/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getReq } from "@/lib/utils";
import SockConfig from "./report/config";
import { setToken } from "@/store/slices/tokenSlice";
import { useDispatch } from "react-redux";



export default function Home() {
  const dispatch = useDispatch();
  const app = initFirebase();
  console.log(app);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return <div>Loading</div>;
  }

  // const callApi = async () => {
  //   const token = await user.getIdToken();
  //   console.log(token);
  //   const requestInfo = {
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   };

  //   const res = getReq({
  //     route: "http://localhost:8080/test",
  //     headers: requestInfo,
  //   });
  //   console.log(res);

  //   // const response = await fetch("http://localhost:8080/test", requestInfo);
  //   // const responseBody = await response.json();
  //   // console.log(responseBody)
  // };

  const getToken = async () => {
    const token = await user.getIdToken();
    console.log(token);
    const requestInfo = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const res = getReq({
      route: "http://localhost:8080/test",
      headers: requestInfo,
    });
    console.log(res);

    // const response = await fetch("http://localhost:8080/test", requestInfo);
    // const responseBody = await response.json();
    // console.log(responseBody)
  };

  /*
  if (user) {
    return (
      <div>
        <div>Signed In</div>
        <div onClick={() => auth.signOut()}>Sign out</div>
        <div onClick={() => getToken()}>Get token</div>
        <SockConfig/>
      </div>
    );
  }*/

  return (
    <div className="flex justify-center">
      <div className="sm:pt-0 pt-4">

<section className="max-w-3xl mb-4 sm:mb-1">
<div className="text-center bg-rose-600 mb-6 sm:mb-12 sm:mt-8 rounded-xl py-4 sm:py-2">
  <h2>Manage Your Finances with Ease</h2>
  <p>Simplify your financial life with our finance website.</p>
</div>
  <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-8 gap-6">
    <div className="panel">
      <h3>Safety Ensured</h3>
        <p>
         Our website can detect and prevent fradulant transactions.
        </p>
    </div>
    <div className="panel">
      <h3>Track Your Expenses</h3>
        <p>
          Monitor your spending habits and keep an close eye on your financial transactions.
        </p>
    </div>
    <div className="panel">
      <h3>Secure & Private</h3>
        <p>
          Your financial data is encrypted and kept confidential, ensuring your peace of mind.
        </p>
    </div>
    <div className="panel">
      <h3>Convenience</h3>
        <p>
         Monitor your finances at a click of a button.
       </p>
    </div>
  </div>
</section>



{user ? (
<footer className="text-center mt-6 sm:mt-12">
  <p>Welcome, {user.displayName}!</p>
  <button
    onClick={signOutUser}
    className="log"
  >
    Sign Out
  </button>
</footer>
) : (
<footer className="text-center sm:mt-12">
  <p>Get started today and take control of your financial future.</p>
  <button
    onClick={signIn}
    className="log"
  >
    Sign In with Google
  </button>
</footer>
)}
</div>
    </div>
    
  );
}
