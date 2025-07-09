"use client"

import Chatbox from "./components/Chatbox";
import EmailForm from "./components/EmailForm";

export default function Home() {

  return (
    <main className="min-h-screen p-6 bg-amber-200 text-amber-950">
      <div className="flex w-full justify-between">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to CV guy
        </h1>
        <EmailForm/>
      </div>
      <Chatbox/>

    </main>

  );
}
