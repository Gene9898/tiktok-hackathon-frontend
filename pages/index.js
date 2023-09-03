import React from "react";
import { initFirebase } from "@/config/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getReq } from "@/lib/utils";

export default function Home() {
  const app = initFirebase();
  console.log(app);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
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
    
    // const response = await fetch("http://localhost:8080/test", requestInfo);
    // const responseBody = await response.json();
    // console.log(responseBody)
  };
  if (user) {
    return (
      <div>
        <div>Signed In</div>
        <div onClick={() => auth.signOut()}>Sign out</div>
        <div onClick={() => callApi()}>Test auth</div>
      </div>
    );
  }

  return (
    <header>
      <div>
        <h1>Hi</h1>
        <button onClick={signIn} className="">
          Sign in
        </button>
      </div>
    </header>
  );
}
