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
      <div className="text-center mb-12 mt-15 py-3">
        <h1 className="text-4xl font-bold">Manage Your Finances with Ease</h1>
        <p className="mt-4 text-lg">Simplify your financial life with our finance website.</p>
      </div>

      <section className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg bg-blue-800 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Track Your Expenses</h2>
            <p className="text-lg">
              Monitor your spending habits and keep an close eye on your financial transactions.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-blue-800 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Safety Ensured</h2>
            <p className="text-lg">
              Our website can detect and prevent fradulant transactions.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-blue-800 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Convenience</h2>
            <p className="text-lg">
              Monitor your finances at a click of a button.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-blue-800 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Secure & Private</h2>
            <p className="text-lg">
              Your financial data is encrypted and kept confidential, ensuring your peace of mind.
            </p>
          </div>
        </div>
      </section>

      <footer className="text-center mt-16">
        <p className="text-lg">Get started today and take control of your financial future.</p>
        <button onClick={signIn} className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg text-lg font-semibold transition duration-300 ease-in-out">
          Sign in with Google
        </button>
      </footer>
    </header>
  );
}
