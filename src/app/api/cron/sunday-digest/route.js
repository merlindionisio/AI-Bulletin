import { NextResponse } from 'next/server';
import { getLatestAIFeeds } from '@/lib/feedFetcher';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '@/lib/supabase';

// This handles the Vercel Cron Job triggered every Sunday
export async function GET(request) {
  // Vercel Cron security: verifies it was triggered by Vercel and not a random user
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const articles = await getLatestAIFeeds();
    const topArticles = articles.slice(0, 30).map(a => `- ${a.title} (${a.source})`).join('\n');

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `You are an elite AI newsletter author. Act as the ultimate editor for "AI Bulletin". 
    Write a highly engaging, deep-dive Sunday Newsletter summarizing the most critical themes of this week's AI news.
    Format your response in beautiful Markdown, use bullet points, emojis, and structure it like a premium LinkedIn or Substack newsletter.
    Do not just list these headlines—synthesize them as a high-level industry analyst. Make it captivating.
    
    This week's data:\n\n${topArticles}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Permanently save the generated article to Supabase
    const { error } = await supabase
      .from('WeeklyDigests')
      .insert([
        { content: text, created_at: new Date().toISOString() }
      ]);

    if (error) {
      console.error("Supabase insert error:", error);
    }

    return NextResponse.json({ success: true, message: "Sunday Digest Generated successfully!" });
  } catch (error) {
    console.error("Cron Job Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
