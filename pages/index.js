import React, { useEffect, useState } from "react";
import { initFirebase } from "@/config/firebase";
import Image from "next/image";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getReq } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";

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

  const callApi = async () => {
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
  };

  return (
    <header className="sm:pt-0 pt-4 m-3 h-full">
      <section className="max-w-4xl mx-auto flex flex-col items-center">
        <Image
          width = {96}
          height = {96}
          className="w-full"
          src="/tiktok-logo.gif"
          alt="Tiktok Logo GIF - Tiktok Logo Glitch GIFs"
        />
      </section>
      <section>
        <div className="max-w-4xl mx-auto text-left py-8">
          <h1>Secure Banking</h1>
          <i>
            <h3 className="mt-2 mb-1 font-semibold">
              Protect your finances and monitor your transactions using
              FraudNow.
            </h3>
            <h3 className="sm:mb-6 mb-4 font-semibold">
              Take control of your financial future!
            </h3>
          </i>
          {user ? (
            <footer className="text-left">
              <p className="mb-2">Welcome, {user.displayName}!</p>
              <button
                className="p-1 rounded-full bg-gradient-to-r from-blue-400 via-indigo-500 to-rose-500"
                onClick={signOutUser}
              >
                <span className="log">Sign Out</span>
              </button>
            </footer>
          ) : (
            <footer className="text-left">
              <button
                className="rounded-full bg-gradient-to-r from-blue-400 via-indigo-500 to-rose-500"
                onClick={signIn}
              >
                <span className="log">Sign in with Google</span>
              </button>
            </footer>
          )}
        </div>
      </section>
    </header>
  );
}
