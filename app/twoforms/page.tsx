'use client';

import { useState } from "react";

export default function TwoForms() {
  let [tokens, setTokens] = useState('') //gives a initial value is important otherwise you will get a warning

  const handleChange = (e: any) => {
    setTokens(e.target.value)
  }

  const handleSubmit = (e: any) => {
    console.log(`Trying to sent to both apis. data:${tokens}`);
  }

  const hadnleSubmit1 = (e: any) => {
    e.preventDefault();
    console.log(`Trying to sent to both apis. data:${tokens}`);
  }

  return (
    <div>
      <h1>Submitting two forms at the same time</h1>
      <h2>Form1</h2>
      <form action='/api/gpt3' method="POST" onSubmit={hadnleSubmit1}>
        <label>Input1</label>
        <input type="text" name="input1" onChange={handleChange} value={tokens}></input>
        <button>Submit1</button>
      </form>
      <h2>Form2</h2>
      <form action='/api/llam2' method="POST">
        <label>Input2</label>
        <input type="text" name="input2" onChange={handleChange} value={tokens}></input>
        <button>Submit2</button>
      </form>
      <button onClick={handleSubmit}>Submit to both</button>
    </div>
  );
}
