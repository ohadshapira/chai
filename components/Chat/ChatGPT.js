import OpenAI from 'openai';

const apiKey = "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";
const baseURL = "https://api.openai.com/v1";
const engine = "gpt-3.5-turbo-0125";
const maxTokens = 150;
const numCompletions = 3;
const temperature = 1;

var assistant_id = '';
var thread_id = '';

const openai = new OpenAI({
  apiKey: "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", dangerouslyAllowBrowser: true
});



const handle_assistant = async () => { //req,res
  const thread = await openai.beta.threads.create();
  // console.log(thread.id)
  const message = await openai.beta.threads.messages.create(
    thread.id,
    {
      role: "user",
      content: "Can you help me?",
      // assistant_id:"asst_hy51DKqIT90uqL420ezzZxD4"
    }
  );
  // console.log(message)
  const run = await openai.beta.threads.runs.create(
    thread.id,
    {
      assistant_id: "asst_hy51DKqIT90uqL420ezzZxD4",//assistant.id,
      // instructions: "Please address the user as Jane Doe. The user has a premium account."
    }
  );
  // console.log(run)

  const retrieve_run = await openai.beta.threads.runs.retrieve(
    thread.id,
    run.id
  );
  // console.log(retrieve_run)

  await checkStatus(thread.id, run.id);


  const messages = await openai.beta.threads.messages.list(
    thread.id
  );
  // res.status(200).send({
  //     answer: messages.body.data[0].content[0].text.value,
  // });
  console.log(messages)
  console.log(messages.body.data[0].content[0].text.value)
}
const generateText = async (prompt) => {
  try {

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-0125",
      prompt: prompt,
      max_tokens: maxTokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    // console.log(response)
    // console.log();
    // handle_assistant();
    console.log(response.choices)


    // const  message=await openai.beta.threads.messages.create(thread.id,)
    return response.choices[0].text;
  } catch (error) {
    console.error(error);
    throw new Error("Error generating text");
  }
};

async function checkStatus(threadId, runId) {
  let isComplete = false;
  while (!isComplete) {
    const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    if (runStatus.status === "completed") {
      isComplete = true;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

const ask_assistant = async (prompt) => { //req,res
  // console.log("thread_id",thread_id)
  // console.log("assistant_id",assistant_id)
  const message = await openai.beta.threads.messages.create(
    thread_id,
    {
      role: "user",
      content: prompt,
      // assistant_id:"asst_hy51DKqIT90uqL420ezzZxD4"
    }
  );
  // console.log(message)
  const run = await openai.beta.threads.runs.create(
    thread_id,
    {
      assistant_id: assistant_id,//assistant.id,
      // temperature: temperature,
      // max_tokens: maxTokens,

      // instructions: "Please address the user as Jane Doe. The user has a premium account."
    }
  );
  // console.log(run)

  const retrieve_run = await openai.beta.threads.runs.retrieve(
    thread_id,
    run.id
  );
  // console.log(retrieve_run)

  await checkStatus(thread_id, run.id);


  const messages = await openai.beta.threads.messages.list(
    thread_id
  );
  // res.status(200).send({
  //     answer: messages.body.data[0].content[0].text.value,
  // });
  console.log(messages)
  return messages.body.data[0].content[0].text.value;
}
const update_chat_details = async (assistant_id_rec) => {
  console.log("update_chat_details")
  assistant_id = assistant_id_rec;
  console.log("assistant_id",assistant_id)
  const thread = await openai.beta.threads.create();
  thread_id = thread.id;
  // console.log(thread_id)
}

const getGeneratedText = async (address) => {
  const neighborhoodPrompt = `Pretend you are a jewish local who lived in this city ${address},
    focus all your answers on the jewish aspect of the jewish community there,
    don't answer any questions beyond this country`;

  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-0125",
      prompt: neighborhoodPrompt,
      temperature: temperature,
      max_tokens: maxTokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response.choices)
    return response.choices[0].text;

    const generatedText = response.choices[0].text.trim();
    return generatedText;
  } catch (error) {
    console.error(error);
    throw new Error("Error generating text");
  }
};

export {generateText, getGeneratedText, update_chat_details, ask_assistant};
