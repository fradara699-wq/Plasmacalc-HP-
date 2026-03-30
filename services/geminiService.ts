
import { GoogleGenAI } from "@google/genai";

// Declaración para satisfacer a TSC durante el build sin necesidad de instalar @types/node globalmente si hay conflictos
declare const process: {
  env: {
    GEMINI_API_KEY: string;
    [key: string]: string | undefined;
  };
};

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getClinicalInsight = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "Eres un experto hematólogo y especialista en aféresis. Tu conocimiento principal se basa en las Guías de la ASFA (American Society for Apheresis) 2023 y protocolos internacionales. Proporcionas información concisa, técnica y profesional sobre categorías de indicación, grados de recomendación, volúmenes de recambio y complicaciones. Responde siempre en español de forma estructurada.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Lo siento, no pude obtener una respuesta en este momento.";
  }
};
