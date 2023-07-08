const { DiscussServiceClient } = require('@google-ai/generativelanguage');
const { GoogleAuth } = require('google-auth-library');

const MODEL_NAME = 'models/chat-bison-001';
require('dotenv').config();

const API_KEY = process.env.Secret;

const Ask = (message) => {
  const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
  });
  const { context } = message;
  const messages = [];

  messages.push({ content: message.question });

  return client.generateMessage({
    // required, which model to use to generate the result
    model: MODEL_NAME,
    // optional, 0.0 always uses the highest-probability result
    temperature: 0.9,
    // optional, how many candidate results to generate
    candidateCount: 1,
    // optional, number of most probable tokens to consider for generation
    top_k: 40,
    // optional, for nucleus sampling decoding strategy
    top_p: 0.95,
    prompt: {
    // optional, sent on every request and prioritized over history
      context,
      // // optional, examples to further finetune responses
      // examples: examples,
      // required, alternating prompt/response messages
      messages,
    },
   }).then((result) => result[0].candidates).catch((err) => {
    console.log(err);
    return 'error';
  });
};

module.exports = Ask;
