'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, MessageCircle, Share2, ThumbsUp } from 'lucide-react';

export default function ReactionRow({ articleUrl }) {
  const [upvotes, setUpvotes] = useState(Math.floor(Math.random() * 50)); // Placeholder until DB sync
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (!hasVoted) {
      setUpvotes(prev => prev + 1);
      setHasVoted(true);
      // TODO: Sync with Supabase Database here
    }
  };

  const ActionButton = ({ icon: Icon, label, onClick, active, color }) => (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'transparent',
        border: 'none',
        color: active ? color : '#7a7a8c',
        cursor: 'pointer',
        fontSize: '0.85rem',
        fontWeight: active ? 600 : 500,
        padding: '4px 8px',
        borderRadius: '6px',
        transition: 'background 0.2s',
        outline: 'none'
      }}
    >
      <Icon size={16} color={active ? color : '#7a7a8c'} />
      {label}
    </motion.button>
  );

  return (
    <div style={{ display: 'flex', gap: '16px', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
      <ActionButton 
        icon={Flame} 
        label={hasVoted ? 'Scorching' : 'Hot?'} 
        color="#ff5a5f" 
        active={hasVoted} 
        onClick={handleVote} 
      />
      <div style={{ color: hasVoted ? '#ff5a5f' : '#7a7a8c', fontSize: '0.85rem', alignSelf: 'center', fontWeight: 600 }}>
        <AnimatePresence mode="popLayout">
          <motion.span 
            key={upvotes}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{ display: 'inline-block' }}
          >
            {upvotes}
          </motion.span>
        </AnimatePresence>
      </div>
      
      <div style={{ flex: 1 }} />
      <ActionButton icon={ThumbsUp} label="React" />
      <ActionButton icon={MessageCircle} label="Discuss" />
      <ActionButton icon={Share2} label="Share" />
    </div>
  );
}
