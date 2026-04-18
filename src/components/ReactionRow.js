'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Share2, ThumbsUp } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import DisqusThread from '@/components/DisqusThread';

export default function ReactionRow({ articleUrl, articleTitle }) {
  const [upvotes, setUpvotes] = useState(Math.floor(Math.random() * 50)); // Placeholder until DB sync
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = async () => {
    if (!hasVoted) {
      setUpvotes(prev => prev + 1);
      setHasVoted(true);
      
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Log the active user's vote into Supabase
        await supabase.from('Reactions').insert([
          { article_url: articleUrl, user_id: session.user.id } // Requires `user_id` inside reactions table 
        ]);
        
        // Grant XP for interacting with the platform natively
        const { data: userData } = await supabase.from('users').select('xp_points').eq('id', session.user.id).single();
        if (userData) {
          await supabase.from('users').update({ xp_points: userData.xp_points + 1 }).eq('id', session.user.id);
        }
      }
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
      <DisqusThread articleUrl={articleUrl} articleTitle={articleTitle} />
      <ActionButton icon={Share2} label="Share" />
    </div>
  );
}
