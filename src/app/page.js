import { getLatestAIFeeds } from '@/lib/feedFetcher';
import { supabase } from '@/lib/supabase';
import NewsRow from '@/components/NewsRow';
import AdSlot from '@/components/AdSlot';
import PinnedAffiliate from '@/components/PinnedAffiliate';
import NewsletterBox from '@/components/NewsletterBox';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const articles = await getLatestAIFeeds();
  
  // Instantly fetch the permanent Sunday Newsletter from Supabase (0 Gemini API tokens spent here!)
  const { data: digests } = await supabase
    .from('WeeklyDigests')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

  const latestDigest = digests?.[0];

  return (
    <main className="container">
      <header>
        <h1>AI Bulletin</h1>
        <p className="subtitle">Real-time Artificial Intelligence News Aggregator</p>
      </header>
      
      <NewsletterBox />

      {latestDigest && (
        <div style={{ background: '#1e293b', padding: '24px', borderRadius: '12px', marginBottom: '32px', border: '1px solid #3b82f6', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          <h2 style={{ margin: '0 0 16px 0', color: '#60a5fa' }}>🔥 This Week's Deep Dive</h2>
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, color: '#e2e8f0', fontSize: '1rem' }}>
             {/* Simple pre-wrap for markdown spacing. We can add a full markdown parser later. */}
             {latestDigest.content}
          </div>
        </div>
      )}

      {/* Community Tabs */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
        <button style={{ background: 'transparent', color: 'white', border: 'none', fontSize: '1.05rem', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>Most Recent</button>
        <button style={{ background: 'transparent', color: '#8b9eb5', border: 'none', fontSize: '1.05rem', cursor: 'pointer', padding: 0 }}>🔥 Hot (Community)</button>
      </div>

      <div className="feed-list">
        {/* Pinned Affiliate */}
        <PinnedAffiliate 
          title="OKX - Trade Crypto on the Best Global Exchange" 
          link="https://okx.cab/join/13301983" 
          badge="SPONSORED" 
        />
        
        {articles.map((article, index) => (
          <div key={index}>
            {index > 0 && index % 15 === 0 && <AdSlot />}
            <NewsRow article={article} />
          </div>
        ))}
      </div>
    </main>
  );
}
