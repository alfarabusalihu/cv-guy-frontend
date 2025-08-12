import axios from 'axios';
import React, { useState } from 'react'
import { Message } from '../interfaces/message.interface';
import EmailForm from './EmailForm';

const Chatbox = () => {
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState<Message[]>([])


    const handleQuestions = async () => {
        if (!question.trim()) return

        try {
            const sendRequest = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/chat`, { question })
            setMessages([...messages, { question, answer: sendRequest.data.answer }]);
            setQuestion('')
        }
        catch (err) {
            console.log(err)
        }
    }
return (
  <div className="flex flex-col items-center justify-start min-h-screen py-1">
    <div className="w-full max-w-4xl">
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-grow border border-gray-300 rounded-lg px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          placeholder="Ask about the resume..."
        />
        <button
          onClick={handleQuestions}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          Send
        </button>
        <EmailForm />
      </div>
      <div className="space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="p-5 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <p className="text-gray-800 mb-2">
              <span className="font-semibold text-blue-900">Question:</span>{" "}
              {msg.question}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-green-900">Answer:</span>{" "}
              {msg.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default Chatbox