'use client';
import { useState } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export default function DisqusThread({ articleUrl, articleTitle }) {
  const [isOpen, setIsOpen] = useState(false);

  const disqusConfig = {
    url: articleUrl,
    identifier: articleUrl,
    title: articleTitle || 'AI Bulletin Discussion',
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'transparent',
          border: 'none',
          color: isOpen ? '#60a5fa' : '#7a7a8c',
          cursor: 'pointer',
          fontSize: '0.85rem',
          fontWeight: isOpen ? 600 : 500,
          padding: '4px 8px',
          borderRadius: '6px',
          transition: 'background 0.2s',
          outline: 'none'
        }}
      >
        {isOpen ? <X size={16} /> : <MessageCircle size={16} />}
        {isOpen ? 'Close' : 'Discuss'}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', marginTop: '12px' }}
          >
            <div style={{
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <DiscussionEmbed
                shortname="ai-bulletin-1"
                config={disqusConfig}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
