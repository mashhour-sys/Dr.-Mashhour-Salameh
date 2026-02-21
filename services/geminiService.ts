
import { GoogleGenAI, Type } from "@google/genai";
import { StrategicAnalysis } from "../types";

// Always use named parameter for apiKey and obtain it directly from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateStrategicAnalysis(eventsData: string): Promise<StrategicAnalysis | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `أنت محلل استراتيجي رفيع المستوى في وحدة الإعلام الرقمي للجمهورية العربية السورية. 
      بناءً على البيانات التالية المستمدة من المصادر المفتوحة (OSINT) والبحث المباشر في الويب، قم بإجراء تحليل استراتيجي معمق وشامل للموقف الحالي في سوريا.
      
      البيانات المجمعة:
      ${eventsData}
      
      المطلوب (باللغة العربية الفصحى):
      1. ملخص تنفيذي للموقف الحالي يربط الأحداث ببعضها.
      2. قائمة بأهم 3 تهديدات محتملة للأمن القومي أو الاستقرار.
      3. توصيات عملية وعاجلة لصناع القرار.
      4. تقييم مؤشر الثقة في البيانات (من 100).
      
      ملاحظة: استخدم أداة البحث في جوجل (Google Search) للحصول على أحدث المستجدات المتعلقة بهذه الأحداث لضمان أن التحليل "ويب لايف مباشر".`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "ملخص تنفيذي للموقف الاستراتيجي" },
            threats: { 
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "أهم التهديدات المرصودة"
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "توصيات لصناع القرار"
            },
            confidenceScore: { type: Type.NUMBER, description: "درجة الثقة في التحليل" }
          },
          required: ["summary", "threats", "recommendations", "confidenceScore"]
        }
      }
    });

    // Directly access the .text property from GenerateContentResponse
    if (response.text) {
      const jsonStr = response.text.trim();
      return JSON.parse(jsonStr) as StrategicAnalysis;
    }
    return null;
  } catch (error) {
    console.error("Gemini Strategic Analysis Error:", error);
    return null;
  }
}
