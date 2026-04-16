import { GoogleGenerativeAI } from '@google/generative-ai';

export async function generateWeeklySummary(articles) {
  if (!process.env.GEMINI_API_KEY) {
    return "Please configure the GEMINI_API_KEY in your environment.";
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Use flash model for speed and efficiency
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Pass top 15 articles to the prompt 
    const topArticles = articles.slice(0, 15).map(a => `- ${a.title} (${a.source})`).join('\n');
    
    const prompt = `You are an expert AI news curator for the "AI Bulletin". Based on the following top AI headlines from the past 7 days, generate a concise, highly engaging, 2-3 paragraph summary of the state of AI right now. Highlight the biggest trends. Do not make up information. Use plain text formatting.

Headlines:
${topArticles}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating Gemini summary:", error);
    return "Error generating summary. The API might be restricted or busy.";
  }
}
