import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

const NAV_LINKS = [
  { label: 'Como Funciona', to: '/como-funciona' },
  { label: 'Marketplace', to: '/marketplace' },
  { label: 'Para Empresas', to: '/para-empresas' },
  { label: 'Para Especialistas', to: '/para-especialistas' },
  { label: 'Preços', to: '/precos' },
  { label: 'Sobre Nós', to: '/sobre-nos' },
]

const TIPO_META = {
  nova_mensagem:      { icon: '💬', dot: '#6366f1' },
  proposta_aceite:    { icon: '✅', dot: '#10b981' },
  proposta_rejeitada: { icon: '❌', dot: '#f87171' },
  nova_proposta:      { icon: '📋', dot: '#7c5cf6' },
  projeto_concluido:  { icon: '🎉', dot: '#6366f1' },
  escrow_pago:        { icon: '🔐', dot: '#f59e0b' },
}

// ── Notification Bell ─────────────────────────────────────────────────────────
function NotifBell({ user }) {
  const [items, setItems]   = useState([])
  const [open, setOpen]     = useState(false)
  const [loading, setLoading] = useState(true)
  const ref = useRef(null)
  const location = useLocation()

  const unread = items.filter(i => !i.lida).length

  // Fechar ao mudar de rota
  useEffect(() => { setOpen(false) }, [location.pathname])

  // Fechar ao clicar fora
  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  // Carregar notificações + subscrever Realtime
  useEffect(() => {
    if (!user) return
    loadNotifs()

    const channel = supabase
      .channel(`notifs-${user.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notificacoes',
        filter: `user_id=eq.${user.id}`,
      }, (payload) => {
        setItems(prev => [payload.new, ...prev])
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [user])

  async function loadNotifs() {
    setLoading(true)
    const { data } = await supabase
      .from('notificacoes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20)
    setItems(data || [])
    setLoading(false)
  }

  async function handleOpen() {
    const nowOpen = !open
    setOpen(nowOpen)
    if (nowOpen && unread > 0) {
      const ids = items.filter(i => !i.lida).map(i => i.id)
      await supabase.from('notificacoes').update({ lida: true }).in('id', ids)
      setItems(prev => prev.map(i => ({ ...i, lida: true })))
    }
  }

  function fmtTime(iso) {
    const diff = Date.now() - new Date(iso)
    if (diff < 3600000)  return `${Math.max(1, Math.round(diff / 60000))}m`
    if (diff < 86400000) return `${Math.round(diff / 3600000)}h`
    return new Date(iso).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={handleOpen}
        title="Notificações"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '36px', height: '36px', borderRadius: '10px', position: 'relative',
          color: open ? 'var(--brand-light)' : 'var(--text-3)',
          background: open ? 'rgba(124,92,246,0.12)' : 'transparent',
          border: `1px solid ${open ? 'rgba(124,92,246,0.25)' : 'transparent'}`,
          cursor: 'pointer', transition: 'all 0.15s ease',
        }}
        onMouseEnter={e => { if (!open) { e.currentTarget.style.color = 'var(--brand-light)'; e.currentTarget.style.background = 'rgba(124,92,246,0.08)' } }}
        onMouseLeave={e => { if (!open) { e.currentTarget.style.color = 'var(--text-3)'; e.currentTarget.style.background = 'transparent' } }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unread > 0 && (
          <span style={{
            position: 'absolute', top: '-4px', right: '-4px',
            minWidth: '16px', height: '16px', borderRadius: '999px',
            background: 'var(--brand)', color: '#fff',
            fontSize: '9px', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0 3px', lineHeight: 1,
          }}>
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          width: '320px', borderRadius: '16px', overflow: 'hidden', zIndex: 200,
          background: 'rgba(11,11,16,0.98)', border: '1px solid var(--border-2)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03)',
          backdropFilter: 'blur(24px)',
        }}>
          {/* Header */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ color: 'var(--text)', fontSize: '13px', fontWeight: 600, letterSpacing: '-0.01em' }}>Notificações</p>
            {unread > 0 && (
              <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px', background: 'rgba(124,92,246,0.15)', color: 'var(--brand-light)', border: '1px solid rgba(124,92,246,0.2)' }}>
                {unread} nova{unread !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Body */}
          {loading ? (
            <div style={{ padding: '28px', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--brand)', borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite' }} />
            </div>
          ) : items.length === 0 ? (
            <div style={{ padding: '36px 16px', textAlign: 'center' }}>
              <p style={{ fontSize: '26px', marginBottom: '8px' }}>🔔</p>
              <p style={{ color: 'var(--text-2)', fontSize: '13px', fontWeight: 500 }}>Tudo em dia!</p>
              <p style={{ color: 'var(--text-3)', fontSize: '12px', marginTop: '4px' }}>Sem notificações novas</p>
            </div>
          ) : (
            <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
              {items.map((item, i) => {
                const meta = TIPO_META[item.tipo] ?? { icon: '🔔', dot: 'var(--brand)' }
                return (
                  <Link
                    key={item.id}
                    to={item.link || '/dashboard'}
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'flex', gap: '10px', alignItems: 'flex-start',
                      textDecoration: 'none', padding: '11px 16px',
                      borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                      background: item.lida ? 'transparent' : 'rgba(124,92,246,0.04)',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = item.lida ? 'transparent' : 'rgba(124,92,246,0.04)'}
                  >
                    {/* Icon */}
                    <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>{meta.icon}</span>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontSize: '12px', color: item.lida ? 'var(--text-2)' : 'var(--text)',
                        fontWeight: item.lida ? 400 : 600,
                        letterSpacing: '-0.01em', lineHeight: 1.4,
                      }}>
                        {item.titulo}
                      </p>
                      {item.mensagem && (
                        <p style={{ fontSize: '11px', color: 'var(--text-3)', marginTop: '2px', lineHeight: 1.4 }}>
                          {item.mensagem}
                        </p>
                      )}
                    </div>

                    {/* Time + unread dot */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                      <span style={{ fontSize: '10px', color: 'var(--text-3)' }}>{fmtTime(item.created_at)}</span>
                      {!item.lida && (
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: meta.dot, boxShadow: `0 0 6px ${meta.dot}` }} />
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          {/* Footer */}
          <div style={{ padding: '10px 16px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
            <Link to="/dashboard" onClick={() => setOpen(false)}
              style={{ fontSize: '12px', color: 'var(--text-3)', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--brand-light)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
            >
              Ver Dashboard →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Navbar ────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, perfil, logout } = useAuth()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-scrolled' : ''}`}
      style={{ backgroundColor: scrolled ? undefined : 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px]">

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }} className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--brand)', boxShadow: '0 0 14px rgba(124,92,246,0.4)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span className="font-display text-lg" style={{ color: 'var(--text)', letterSpacing: '-0.04em' }}>Synk</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(link => {
              const isActive = location.pathname === link.to
              return (
                <Link key={link.to} to={link.to} style={{
                  textDecoration: 'none', fontSize: '13.5px', fontWeight: 500,
                  letterSpacing: '-0.01em', padding: '6px 12px', borderRadius: '100px',
                  color: isActive ? 'var(--text)' : 'var(--text-3)',
                  background: isActive ? 'var(--surface-2)' : 'transparent',
                  transition: 'all 0.15s ease', whiteSpace: 'nowrap',
                }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-2)' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-3)' }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <>
                <Link to="/dashboard" className="btn-ghost" style={{ fontSize: '13.5px', padding: '8px 16px' }}>Dashboard</Link>

                <NotifBell user={user} />

                {/* Mensagens */}
                <Link to="/mensagens" title="Mensagens" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '36px', height: '36px', borderRadius: '10px',
                  color: location.pathname === '/mensagens' ? 'var(--brand-light)' : 'var(--text-3)',
                  background: location.pathname === '/mensagens' ? 'rgba(124,92,246,0.12)' : 'transparent',
                  border: `1px solid ${location.pathname === '/mensagens' ? 'rgba(124,92,246,0.25)' : 'transparent'}`,
                  transition: 'all 0.15s ease', textDecoration: 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--brand-light)'; e.currentTarget.style.background = 'rgba(124,92,246,0.08)' }}
                  onMouseLeave={e => {
                    if (location.pathname !== '/mensagens') {
                      e.currentTarget.style.color = 'var(--text-3)'
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </Link>

                {perfil === 'empresa' && (
                  <Link to="/publicar-projeto" className="btn-primary" style={{ fontSize: '13.5px', padding: '9px 20px' }}>Publicar Projeto</Link>
                )}
                {perfil === 'especialista' && (
                  <Link to="/marketplace?tab=projetos" className="btn-primary" style={{ fontSize: '13.5px', padding: '9px 20px' }}>Ver Projetos</Link>
                )}
                <button onClick={handleLogout} className="btn-ghost" style={{ fontSize: '13.5px', padding: '8px 16px' }}>Sair</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost" style={{ fontSize: '13.5px', padding: '8px 16px' }}>Entrar</Link>
                <Link to="/registar" className="btn-primary" style={{ fontSize: '13.5px', padding: '9px 20px' }}>Começar Grátis</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden p-2 rounded-lg"
            style={{ color: 'var(--text-2)', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
            {mobileOpen ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu lg:hidden ${mobileOpen ? 'open' : ''}`}
        style={{ background: 'rgba(9,9,13,0.97)', backdropFilter: 'blur(20px)', borderTop: '1px solid var(--border)' }}>
        <div className="px-4 py-5 flex flex-col gap-1">
          {NAV_LINKS.map(link => {
            const isActive = location.pathname === link.to
            return (
              <Link key={link.to} to={link.to}
                className="block px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={{ textDecoration: 'none', color: isActive ? 'var(--text)' : 'var(--text-2)', background: isActive ? 'var(--surface-2)' : 'transparent', letterSpacing: '-0.01em' }}>
                {link.label}
              </Link>
            )
          })}
          <div className="flex gap-2 mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            {user ? (
              <>
                <Link to="/dashboard" className="btn-primary flex-1 justify-center" style={{ fontSize: '13px' }}>Dashboard</Link>
                {perfil === 'empresa' && <Link to="/publicar-projeto" className="btn-ghost flex-1 justify-center" style={{ fontSize: '13px' }}>Publicar</Link>}
                {perfil === 'especialista' && <Link to="/marketplace?tab=projetos" className="btn-ghost flex-1 justify-center" style={{ fontSize: '13px' }}>Projetos</Link>}
                <button onClick={handleLogout} className="btn-ghost justify-center" style={{ fontSize: '13px', padding: '8px 16px' }}>Sair</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost flex-1 justify-center" style={{ fontSize: '13px' }}>Entrar</Link>
                <Link to="/registar" className="btn-primary flex-1 justify-center" style={{ fontSize: '13px' }}>Começar Grátis</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
