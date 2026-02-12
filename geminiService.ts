
import { GoogleGenAI, Type } from "@google/genai";
import { Language } from "../types";

const API_KEY = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey: API_KEY });

const getLanguageInstruction = (lang: Language) => {
  if (lang === 'Hindi') return "Respond strictly in Hindi using Devanagari script. Use simple, rural-friendly vocabulary.";
  if (lang === 'Telugu') return "Respond strictly in Telugu using Telugu script. Use simple, rural-friendly vocabulary.";
  return "Respond in simple English suitable for rural users.";
};

export const getCropRecommendations = async (soilType: string, region: string, climate: string, lang: Language) => {
  const langInstruction = getLanguageInstruction(lang);
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As an expert agricultural advisor, suggest the best 3-5 crops for a farmer with ${soilType} soil in the ${region} region under ${climate} conditions. For each crop, explain why it fits, basic planting tips, and expected harvest time. ${langInstruction}`,
    config: {
      temperature: 0.7,
    }
  });
  return response.text;
};

export const getFertilizerAdvice = async (crop: string, soilType: string, growthStage: string, lang: Language) => {
  const langInstruction = getLanguageInstruction(lang);
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide a detailed fertilizer schedule for ${crop} grown in ${soilType} soil, specifically at the ${growthStage} stage. Include organic alternatives if possible. Use simple bullet points. ${langInstruction}`,
  });
  return response.text;
};

export const diagnosePestOrDisease = async (base64Image: string, lang: Language) => {
  const langInstruction = getLanguageInstruction(lang);
  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: base64Image,
    },
  };
  
  const prompt = `You are a plant pathologist. Analyze this image of a plant. 
  1. Identify if there is a pest or disease. 
  2. If yes, name it. 
  3. Provide 3-5 clear, low-cost steps for control (prefer natural/accessible methods first). 
  4. Provide 2 prevention tips for next season. 
  Format the output clearly for a farmer. If the image is not clear or not a plant, kindly ask for a better photo. ${langInstruction}`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [imagePart, { text: prompt }] },
  });
  
  return response.text;
};

export const getGeneralAdvice = async (question: string, lang: Language) => {
  const langInstruction = getLanguageInstruction(lang);
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: question,
    config: {
      systemInstruction: `You are AgriGuide, a friendly, expert digital farm assistant for rural farmers. You speak in simple, clear language. ${langInstruction}`
    }
  });
  return response.text;
};
