'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle2, ChevronRight } from 'lucide-react';

export default function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('idle');
      }
    } catch {
      setStatus('idle');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="newsletter-box"
      style={{
        background: 'linear-gradient(135deg, rgba(30,30,40,0.8), rgba(20,20,25,0.9))',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '24px',
        margin: '32px 0',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle at 50% 0%, rgba(100, 100, 255, 0.1), transparent 50%)', pointerEvents: 'none' }} />
      
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}>
        <Mail size={32} color="#8a8a9a" />
        <div>
          <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 600, color: '#ffffff' }}>The Sunday Deep Dive</h3>
          <p style={{ margin: '8px 0 0', color: '#a0a0b0', fontSize: '0.95rem', maxWidth: '400px' }}>
            Get our exclusive, AI-authored weekly digest of the entire industry delivered to your inbox every Sunday.
          </p>
        </div>

        <form onSubmit={handleSubscribe} style={{ display: 'flex', width: '100%', maxWidth: '450px', gap: '8px', marginTop: '8px' }}>
          <input 
            type="email" 
            placeholder="enter@your.email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status !== 'idle'}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(0,0,0,0.3)',
              color: 'white',
              outline: 'none',
              fontSize: '0.95rem'
            }}
          />
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={status !== 'idle'}
            style={{
              padding: '0 24px',
              borderRadius: '8px',
              border: 'none',
              background: status === 'success' ? '#22c55e' : 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              color: 'white',
              fontWeight: 600,
              cursor: status !== 'idle' ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background 0.3s ease'
            }}
          >
            {status === 'loading' ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                <ChevronRight size={20} />
              </motion.div>
            ) : status === 'success' ? (
              <>Subscribed <CheckCircle2 size={18} /></>
            ) : (
              'Subscribe'
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
