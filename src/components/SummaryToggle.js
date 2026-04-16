'use client';
import { useState } from 'react';

export default function SummaryToggle({ summary }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="summary-container">
      <div className="summary-header">
        <h3 style={{ margin: 0, color: '#f8fafc' }}>🤖 7-Day AI Digest</h3>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Hide Summary' : 'Read Summary'}
        </button>
      </div>
      {isOpen && (
        <div className="summary-content">
          {summary.split('\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  );
}
