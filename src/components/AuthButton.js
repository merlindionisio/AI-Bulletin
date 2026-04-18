'use client'
import { createClient } from '@/lib/supabase/client'
import { LogIn, LogOut, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function AuthButton() {
  const [user, setUser] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignIn = async () => {
    // Ensure the Google provider is active in the Supabase Dashboard
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (user) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <a href="/profile" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }}>
          <img src={user.user_metadata?.avatar_url || ''} width={32} height={32} style={{ borderRadius: '50%', border: '2px solid #60a5fa' }} alt="Avatar" />
          <span style={{ fontSize: '0.95rem' }}>{user.user_metadata?.full_name?.split(' ')[0] || 'User'}</span>
        </a>
        <button onClick={handleSignOut} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#a0a0b0', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}>
          <LogOut size={14} /> Sign Out
        </button>
      </motion.div>
    )
  }

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleSignIn} 
      style={{ background: 'linear-gradient(90deg, #ea4335, #fbbc05)', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s', boxShadow: '0 4px 14px rgba(234, 67, 53, 0.4)' }}
    >
      <LogIn size={18} /> Sign In with Google
    </motion.button>
  )
}
