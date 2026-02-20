// server/services/quizService.js

import OpenAI from "openai";

export const generateQuizFromText = async (text) => {

 const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
 });

 const response = await openai.chat.completions.create({
   model: "gpt-4o-mini",
   messages: [
     {
       role: "system",
       content: "Generate 5 MCQ quiz questions in JSON format.",
     },
     {
       role: "user",
       content: text.substring(0, 8000),
     },
   ],
 });

 const content = response.choices[0].message.content;

try {
  return JSON.parse(content);
} catch (err) {
  throw new Error("AI returned invalid JSON format");
}
};