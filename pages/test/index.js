import React, { useState } from "react";
import Head from "next/head";

export default function IndexPage() {
  const [effect, setEffect] = useState(false);
  return (
    <div className="flex h-screen flex-col justify-center">
      <Head>
        <title>
          Animate a button after a click with Next.js/React + Tailwind{" "}
        </title>
      </Head>
      <div className="flex justify-center">
        <button
          className={`${
            effect && "animate-wiggle"
          } bg-blue-500 p-4 text-white rounded hover:bg-blue-700 hover:shadow-xl`}
          onClick={() => {
            setEffect(true);
          }}
          onAnimationEnd={() => setEffect(false)}
        >
          Wiggle wiggle...
        </button>
      </div>
    </div>
  );
}
