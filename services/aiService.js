import OpenAI from "openai";

export const generatePodcastScript = async (text) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `Convert the following research paper text into a podcast script (Speaker A and B alternating, 5-15 min, clear structure):\n${text.substring(0, 8000)}`;
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful podcast script writer." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });
  return response.choices[0].message.content;
};

export const generateHighlights = async (text) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `Summarize the paper into concise bullet highlights:\n${text.substring(0, 8000)}`;
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Summarize research papers into key points." },
      { role: "user", content: prompt },
    ],
    temperature: 0.4,
  });
  return response.choices[0].message.content;
};

export const askQuestion = async (text, question) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `Answer this question based on the paper:\nQuestion: ${question}\nPaper:\n${text.substring(0, 8000)}`;
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a research assistant AI." },
      { role: "user", content: prompt },
    ],
    temperature: 0.4,
  });
  return response.choices[0].message.content;
};
