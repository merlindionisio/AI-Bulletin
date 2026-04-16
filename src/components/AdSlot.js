'use client';
import { useEffect } from 'react';

export default function AdSlot() {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense Error:', err);
    }
  }, []);

  return (
    <div className="ad-slot" style={{ minHeight: '100px', overflow: 'hidden' }}>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6727104921972754" crossOrigin="anonymous"></script>
      <ins className="adsbygoogle"
           style={{ display: 'block', textAlign: 'center' }}
           data-ad-layout="in-article"
           data-ad-format="fluid"
           data-ad-client="ca-pub-6727104921972754"></ins>
    </div>
  );
}
