import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: import.meta.env.VITE_OPENAI_ORG,
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

delete configuration.baseOptions.headers['User-Agent'];
export const openai = new OpenAIApi(configuration);
