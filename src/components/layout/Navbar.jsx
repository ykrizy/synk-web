import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

const NAV_LINKS = [
  { label: 'Como Funciona', to: '/como-funciona' },
  { label: 'Marketplace', to: '/marketplace' },
  { label: 'Para Empresas', to: '/para-empresas' },
  { label: 'Para Especialistas', to: '/para-especialistas' },
  { label: 'Preços', to: '/precos' },
  { label: 'Sobre Nós', to: '/sobre-nos' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
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
          <Link
            to="/"
            style={{ textDecoration: 'none' }}
            className="flex items-center gap-2.5 flex-shrink-0"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--brand)', boxShadow: '0 0 14px rgba(124,92,246,0.4)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span
              className="font-display text-lg"
              style={{ color: 'var(--text)', letterSpacing: '-0.04em' }}
            >
              Synk
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(link => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    textDecoration: 'none',
                    fontSize: '13.5px',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                    padding: '6px 12px',
                    borderRadius: '100px',
                    color: isActive ? 'var(--text)' : 'var(--text-3)',
                    background: isActive ? 'var(--surface-2)' : 'transparent',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
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
                <Link to="/dashboard" className="btn-ghost" style={{ fontSize: '13.5px', padding: '8px 16px' }}>
                  Dashboard
                </Link>
                <Link
                  to="/mensagens"
                  title="Mensagens"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '36px', height: '36px', borderRadius: '10px',
                    color: location.pathname === '/mensagens' ? 'var(--brand-light)' : 'var(--text-3)',
                    background: location.pathname === '/mensagens' ? 'rgba(124,92,246,0.12)' : 'transparent',
                    border: `1px solid ${location.pathname === '/mensagens' ? 'rgba(124,92,246,0.25)' : 'transparent'}`,
                    transition: 'all 0.15s ease',
                    textDecoration: 'none',
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
                  <Link to="/publicar-projeto" className="btn-primary" style={{ fontSize: '13.5px', padding: '9px 20px' }}>
                    Publicar Projeto
                  </Link>
                )}
                {perfil === 'especialista' && (
                  <Link to="/marketplace?tab=projetos" className="btn-primary" style={{ fontSize: '13.5px', padding: '9px 20px' }}>
                    Ver Projetos
                  </Link>
                )}
                <button onClick={handleLogout} className="btn-ghost" style={{ fontSize: '13.5px', padding: '8px 16px' }}>
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost" style={{ fontSize: '13.5px', padding: '8px 16px' }}>
                  Entrar
                </Link>
                <Link to="/registar" className="btn-primary" style={{ fontSize: '13.5px', padding: '9px 20px' }}>
                  Começar Grátis
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg"
            style={{ color: 'var(--text-2)', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu lg:hidden ${mobileOpen ? 'open' : ''}`}
        style={{ background: 'rgba(9,9,13,0.97)', backdropFilter: 'blur(20px)', borderTop: '1px solid var(--border)' }}
      >
        <div className="px-4 py-5 flex flex-col gap-1">
          {NAV_LINKS.map(link => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className="block px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  textDecoration: 'none',
                  color: isActive ? 'var(--text)' : 'var(--text-2)',
                  background: isActive ? 'var(--surface-2)' : 'transparent',
                  letterSpacing: '-0.01em',
                }}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="flex gap-2 mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            {user ? (
              <>
                <Link to="/dashboard" className="btn-primary flex-1 justify-center" style={{ fontSize: '13px' }}>Dashboard</Link>
                {perfil === 'empresa' && (
                  <Link to="/publicar-projeto" className="btn-ghost flex-1 justify-center" style={{ fontSize: '13px' }}>Publicar</Link>
                )}
                {perfil === 'especialista' && (
                  <Link to="/marketplace?tab=projetos" className="btn-ghost flex-1 justify-center" style={{ fontSize: '13px' }}>Projetos</Link>
                )}
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
