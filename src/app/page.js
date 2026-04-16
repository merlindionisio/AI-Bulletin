import { getLatestAIFeeds } from '@/lib/feedFetcher';
import { generateWeeklySummary } from '@/lib/geminiSummary';
import NewsRow from '@/components/NewsRow';
import AdSlot from '@/components/AdSlot';
import PinnedAffiliate from '@/components/PinnedAffiliate';
import SummaryToggle from '@/components/SummaryToggle';

// This makes Next.js regenerate the page in the background every 3600 seconds (1 hour). Set and forget!
export const revalidate = 3600; // Trigger Vercel Build

export default async function Home() {
  const articles = await getLatestAIFeeds();
  const summaryText = await generateWeeklySummary(articles);

  return (
    <main className="container">
      <header>
        <h1>AI Bulletin</h1>
        <p className="subtitle">Real-time Artificial Intelligence News Aggregator</p>
      </header>

      <SummaryToggle summary={summaryText} />

      <div className="feed-list">
        {/* Pinned Affiliate - We put OKX here since you like it! */}
        <PinnedAffiliate 
          title="OKX - Trade Crypto on the Best Global Exchange" 
          link="https://okx.cab/join/13301983" 
          badge="SPONSORED" 
        />
        
        {articles.map((article, index) => (
          <div key={index}>
            {/* Auto-inject an AdSense slot after every 15 non-sponsored articles */}
            {index > 0 && index % 15 === 0 && <AdSlot />}
            <NewsRow article={article} />
          </div>
        ))}
      </div>
    </main>
  );
}
