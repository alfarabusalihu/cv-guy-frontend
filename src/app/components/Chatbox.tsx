import axios from 'axios';
import React, { useState } from 'react'
import { Message } from '../interfaces/message.interface';

export const Chatbox = () => {
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState<Message[]>([])


    const handleQuestions = async () => {
        if (!question.trim()) return

        try {
            const sendRequest = await axios.post(`${process.env.BASE_URL}/api/chat`, { question })
            setMessages([...messages, { question, answer: sendRequest.data.answer }]);
            setQuestion('')
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => { setQuestion(e.target.value) }}

                    className="flex-1 border-2 rounded px-2 py-2 rounded-shadow"
                    placeholder="Ask about the resume"
                />
                <button onClick={handleQuestions}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Send
                </button>
            </div>

            <div className="grid gap-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className="p-4 rounded border-rounded shadow bg-gray-50">
                        <p className="text-semibold"><strong className="text-amber-950 m-5">Question:</strong>{msg.question}</p>
                        <p className="mt-3"><strong className="text-amber-950">Answer: </strong> {msg.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Chatbox