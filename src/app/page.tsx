"use client"

import Chatbox from "./components/Chatbox";
import { useState } from "react";
import { CVcontainer } from "./components/CVcontainer";

export default function Home() {
  const [cvUploaded,setCvUploaded]=useState(false)

  return (
    <main className="min-h-screen min-w-full p-6 bg-amber-100 text-amber-950">
      <h1 className="text-3xl mb-10 font-bold text-center">Hi, Welcome to CV Guy</h1>
      { 
        <div>
        {!cvUploaded? (
          <CVcontainer onuploaded={()=>setCvUploaded(true)}/>):(
            <Chatbox/>
          )
        }
      </div>
      }
    </main>
  );
}
