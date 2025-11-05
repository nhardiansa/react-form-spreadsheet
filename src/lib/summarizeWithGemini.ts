import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function summarizeText(text: string) {
  if (!text || text.trim().length === 0) {
    return "Tanpa Judul karena tidak ada feedback yang diberikan.";
  }

  const prompt = `
  Buatkan menjadi judul dari sebuah testimoni yang ringkas juga memiliki 8-10 kata saja. Berikan jawabanmu 1 saya dalam bentuk text biasa tanpa perlu pengantar dsb. Berikut teksnya:
  
  "${text}"
  `;

  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  // const result = await model.generateContent(prompt);
  // const response = result.response.text();

  console.log("Gemini Response:", response);

  return response.text;
}
