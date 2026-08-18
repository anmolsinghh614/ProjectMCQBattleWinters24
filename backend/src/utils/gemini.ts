import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  console.warn(
    "[gemini] GEMINI_API_KEY is not set. AI features will fail until it is configured."
  );
}

export const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default genAI;
