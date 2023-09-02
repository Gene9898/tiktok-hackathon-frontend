import React from "react"
import { initFirebase } from "@/config/firebase"
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth"

export default function Home() {
  const app = initFirebase()
  console.log(app)
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user)
  }

  return (
  <div>
    <h1>Hi</h1>
    <button onClick={signIn}>Sign in</button>
  </div>
  )
}
