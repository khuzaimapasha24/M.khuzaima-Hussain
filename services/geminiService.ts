
import { GoogleGenAI } from "@google/genai";
import { CardData, RelationType } from "../types";

export const generateBirthdayMessage = async (data: CardData): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const isRomantic = data.relation === RelationType.BOYFRIEND || data.relation === RelationType.GIRLFRIEND || data.relation === RelationType.SPOUSE;

  const prompt = `
    Task: Write a high-end Birthday Card message.
    From: ${data.senderName}
    To: ${data.recipientName} (${data.relation})
    Vibe: ${data.vibe}
    Tone: ${data.tone}
    Romantic Level: ${isRomantic ? 'Very High (use terms of endearment and heartfelt love)' : 'Platonic (focus on bond and friendship)'}
    Special Memory to include: "${data.favMemory}"
    ${data.age ? `Turning age: ${data.age}` : ''}
    
    Instructions:
    1. If Tone is "Hype", use CAPS for excitement and high energy.
    2. If Tone is "Deep", focus on the soul and the strength of the bond.
    3. If Tone is "Funny", include a clever birthday-related roast or joke.
    4. Reference the special memory: "${data.favMemory}" naturally.
    5. Keep it between 50-80 words.
    6. Ensure it matches the ${data.vibe} aesthetic.
    7. If the recipient is a ${data.relation}, make sure the message feels appropriate for that bond.
    8. End with a unique "Happy Birthday" sign-off.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { temperature: 1.0 }
    });

    return response.text?.trim() || "Happy Birthday! You make the world a brighter place just by being in it.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Another year of greatness! May your day be as special as the memories we share.";
  }
};
