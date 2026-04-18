import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Award, Target, Hash, Zap } from 'lucide-react'

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const supabase = await createClient()

  // Validate the user session securely on the backend
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  // Fetch Gamification data
  const { data: dbUser } = await supabase
    .from('users')
    .select('level_title, xp_points')
    .eq('id', user.id)
    .single()

  const xp = dbUser?.xp_points || 0
  const title = dbUser?.level_title || 'AI Novice'

  // Fetch their engagement history natively
  const { data: reactions } = await supabase
    .from('Reactions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <main className="container" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '40px', background: 'rgba(30,30,40,0.6)', padding: '24px', borderRadius: '16px', border: '1px solid #1e293b' }}>
        <img src={user.user_metadata?.avatar_url} width={80} height={80} style={{ borderRadius: '50%', border: '4px solid #3b82f6' }} alt="Avatar" />
        <div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '2rem' }}>{user.user_metadata?.full_name}</h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#d8b4fe', padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold' }}>{title}</span>
            <span style={{ color: '#8b9eb5', display: 'flex', alignItems: 'center', gap: '4px' }}><Zap size={16} color="#fbbf24" /> {xp} XP</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <div style={{ background: '#0f172a', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 16px 0' }}><Award size={20} color="#60a5fa" /> Achievements</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Interact with more articles to unlock ranks!</p>
          <div style={{ width: '100%', background: '#1e293b', height: '12px', borderRadius: '6px', marginTop: '16px' }}>
            <div style={{ width: `${Math.min(100, (xp / 100) * 100)}%`, background: 'linear-gradient(90deg, #3b82f6, #a855f7)', height: '100%', borderRadius: '6px', transition: 'width 1s ease' }}></div>
          </div>
          <p style={{ fontSize: '0.8rem', textAlign: 'right', marginTop: '8px', color: '#64748b' }}>Next Rank: {100 - xp} XP</p>
        </div>

        <div style={{ background: '#0f172a', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 16px 0' }}><Hash size={20} color="#10b981" /> Social Tracking</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '16px' }}>Link socials to amplify your network.</p>
          <input type="text" placeholder="Twitter / X (Optional)" style={{ width: '100%', padding: '10px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: 'white', boxSizing: 'border-box', outline: 'none' }} />
          <button style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', marginTop: '12px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>Sync Profile</button>
        </div>
      </div>

      <div style={{ background: '#0f172a', padding: '24px', borderRadius: '12px', border: '1px solid #1e293b' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 20px 0' }}><Target size={24} color="#f97316" /> Your 🔥 History</h2>
        {reactions && reactions.length > 0 ? (
          reactions.map((r, i) => (
            <div key={i} style={{ borderBottom: '1px solid #1e293b', padding: '12px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <a href={r.article_url} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'none' }}>{r.article_url}</a>
            </div>
          ))
        ) : (
          <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>You haven't hit the Scorching button on any articles lately. Head back to the Feed, hunt for breakthrough AI models, and start scoring XP!</p>
        )}
      </div>

      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <a href="/" style={{ color: '#8b9eb5', textDecoration: 'none', fontWeight: 'bold' }}>← Return to Live Feed</a>
      </div>
    </main>
  )
}
