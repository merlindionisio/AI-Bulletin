export default function PinnedAffiliate({ title, link, badge }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="news-row affiliate-row">
      <div className="news-time" style={{ color: '#10b981', fontWeight: 'bold' }}>🔥 PINNED</div>
      <div className="news-title">{title}</div>
      <div className="news-source affiliate-badge">{badge}</div>
    </a>
  );
}
