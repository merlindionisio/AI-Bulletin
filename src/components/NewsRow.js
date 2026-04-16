'use client';

export default function NewsRow({ article }) {
  const dateStr = new Date(article.pubDate).toLocaleString([], { 
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
  });

  return (
    <a href={article.link} target="_blank" rel="noopener noreferrer" className="news-row">
      <div className="news-time">{dateStr}</div>
      <div className="news-title">{article.title}</div>
      <div className="news-source">{article.source}</div>
    </a>
  );
}
