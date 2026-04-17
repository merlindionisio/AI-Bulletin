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
    <div className="ad-slot" style={{ minHeight: '100px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ position: 'absolute', color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>Google AdSense Space (Awaiting Traffic)</span>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6727104921972754" crossOrigin="anonymous"></script>
      <ins className="adsbygoogle"
           style={{ display: 'block', textAlign: 'center', width: '100%', position: 'relative', zIndex: 10 }}
           data-ad-layout="in-article"
           data-ad-format="fluid"
           data-ad-client="ca-pub-6727104921972754"></ins>
    </div>
  );
}
