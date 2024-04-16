import { ReplicateStream, StreamingTextResponse } from 'ai';
import Replicate from 'replicate';
import { experimental_buildLlama2Prompt } from 'ai/prompts';

// Create a Replicate API client (that's edge friendly!)
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY || '',
});

// IMPORTANT! Set the runtime to edge
//export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log(messages);

  const response = await replicate.predictions.create({
    model: "meta/llama-2-70b-chat",
    stream: true,
    input: {
      prompt: experimental_buildLlama2Prompt(messages),
    },
  });
  const stream = await ReplicateStream(response);
  return new StreamingTextResponse(stream);

  // const input = {
  //   top_k: 0,
  //   top_p: 1,
  //   prompt: "Can you write a poem about open source machine learning? Let's make it in the style of E. E. Cummings.",
  //   temperature: 0.5,
  //   system_prompt: "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
  //   length_penalty: 1,
  //   max_new_tokens: 500,
  //   min_new_tokens: -1,
  //   prompt_template: "<s>[INST] <<SYS>>\n{system_prompt}\n<</SYS>>\n\n{prompt} [/INST]",
  //   presence_penalty: 0
  // };
  // for await (const event of replicate.stream("meta/llama-2-70b-chat", { input })) {
  //   process.stdout.write(event.toString());
  // };


}

