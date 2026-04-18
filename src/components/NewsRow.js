'use client';
import ReactionRow from './ReactionRow';

export default function NewsRow({ article }) {
  const dateStr = new Date(article.pubDate).toLocaleString([], { 
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
  });

  const getBadgeStyle = (source) => {
    if (source.includes('HackerNews')) return { background: 'rgba(249, 115, 22, 0.1)', color: '#fdba74', border: '1px solid rgba(249, 115, 22, 0.5)' };
    if (source.includes('OpenAI') || source.includes('DeepSeek') || source.includes('Anthropic') || source.includes('xAI') || source.includes('Perplexity') || source.includes('Gemini') || source.includes('Kimi')) return { background: 'rgba(168, 85, 247, 0.1)', color: '#d8b4fe', border: '1px solid rgba(168, 85, 247, 0.5)' };
    if (source.includes('NVIDIA') || source.includes('Silicon')) return { background: 'rgba(59, 130, 246, 0.1)', color: '#93c5fd', border: '1px solid rgba(59, 130, 246, 0.5)' };
    if (source.includes('TechCrunch') || source.includes('AI News')) return { background: 'rgba(34, 197, 94, 0.1)', color: '#86efac', border: '1px solid rgba(34, 197, 94, 0.5)' };
    if (source.includes('MIT') || source.includes('Batch')) return { background: 'rgba(234, 179, 8, 0.1)', color: '#fde047', border: '1px solid rgba(234, 179, 8, 0.5)' };
    // Default fallback
    return { background: '#1e293b', color: '#94a3b8', border: '1px solid transparent', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' };
  };

  return (
    <div className="news-row-container" style={{ display: 'flex', flexDirection: 'column', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '6px', marginBottom: '8px', padding: '12px 16px', transition: 'all 0.2s ease', border: '1px solid transparent' }} 
         onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)'}
         onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(30, 41, 59, 0.4)'}>
      <a href={article.link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
        <div className="news-time" style={{ minWidth: '140px', fontFamily: 'monospace', color: '#8b9eb5', fontSize: '0.9rem' }}>{dateStr}</div>
        <div className="news-title" style={{ flex: 1, fontWeight: 500, margin: '0 1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{article.title}</div>
        <div className="news-source" style={{ ...getBadgeStyle(article.source), padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{article.source}</div>
      </a>
      <ReactionRow articleUrl={article.link} />
    </div>
  );
}
