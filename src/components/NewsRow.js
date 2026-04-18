'use client';
import ReactionRow from './ReactionRow';

export default function NewsRow({ article }) {
  const dateStr = new Date(article.pubDate).toLocaleString([], { 
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
  });

  return (
    <div className="news-row-container" style={{ display: 'flex', flexDirection: 'column', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '6px', marginBottom: '8px', padding: '12px 16px', transition: 'all 0.2s ease', border: '1px solid transparent' }} 
         onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)'}
         onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(30, 41, 59, 0.4)'}>
      <a href={article.link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
        <div className="news-time" style={{ minWidth: '140px', fontFamily: 'monospace', color: '#8b9eb5', fontSize: '0.9rem' }}>{dateStr}</div>
        <div className="news-title" style={{ flex: 1, fontWeight: 500, margin: '0 1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{article.title}</div>
        <div className="news-source" style={{ background: '#1e293b', color: '#94a3b8', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{article.source}</div>
      </a>
      <ReactionRow articleUrl={article.link} />
    </div>
  );
}
