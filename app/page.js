'use client';

import { useChat } from 'ai/react';
import { useState, useEffect, useRef } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const formRef = useRef();
  const submitRef1 = useRef();
  const gptBtnRef = useRef();
  const submitRef2 = useRef();
  const [gpt3, setGPT3] = useState('GPT3 says nothing');
  const [llam2, setLLAM2] = useState('LLAM2 says nothing');

  async function talkToGPT3(formData) {
    const res = await fetch("/api/gpt3", {
      body: formData, method: "post", headers: { "Content-Type": "application/json" }
    });
    return res.json()
  }

  async function talkToLLAM2(formData) {
    const res = await fetch("/api/llam2", {
      body: formData, method: "post", headers: { "Content-Type": "application/json" }
    });
    return res.json()
  }

  const submitForm = async () => {
    console.log("Submitting to both apis");
    let body = JSON.stringify({ input: input })
    const answerFromGPT3 = talkToGPT3(body);
    const answerFromLLAM2 = talkToLLAM2(body);
    const [gpt3, llam2] = await Promise.all([answerFromGPT3, answerFromLLAM2])
    setGPT3(gpt3['text']);
    setLLAM2(llam2['text']);
  };

  const generateSubmitEvent = () => {
    console.log("Generating submit event");
    submitRef1.current.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  }


  return (
    <div>
      <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        {messages.map(m => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </div>
        ))}

        <form onSubmit={handleSubmit} ref={formRef}>
          <input
            className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>

      <form action="/api/gpt3" method="POST" ref={submitRef1}>
        <div>
          <input
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
            name="input"
          />
          <button ref={gptBtnRef} onClick={() => submitRef1.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          )}>Submit to GPT3</button>
        </div>
      </form>

      <form action="/api/llam2" method="POST" ref={submitRef2}>
        <div>
          <input
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
            name="input"
          />
          <button>Submit to LLAM2</button>
        </div>
      </form>
      <div>
        <div>{gpt3}</div>
        <div>{llam2}</div>
      </div>
      <div><button onClick={submitForm} >Submit to both</button></div>
      <div><button onClick={generateSubmitEvent} >Generating Submit Events</button></div>
    </div >
  );
}
