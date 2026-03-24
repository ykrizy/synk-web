import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Como Funciona', to: '/como-funciona' },
  { label: 'Para Empresas', to: '/para-empresas' },
  { label: 'Para Especialistas', to: '/para-especialistas' },
  { label: 'Preços', to: '/precos' },
  { label: 'Matching', to: '/matching' },
  { label: 'Calculadora', to: '/calculadora' },
  { label: 'Sobre Nós', to: '/sobre-nos' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-scrolled' : ''}`}
      style={{ backgroundColor: scrolled ? undefined : 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-gradient font-extrabold text-2xl tracking-tight" style={{ textDecoration: 'none' }}>
            Synk
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-medium px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap"
                  style={{
                    fontSize: '13px',
                    color: isActive ? '#f1f5f9' : '#94a3b8',
                    textDecoration: 'none',
                    background: isActive ? '#1a1f2e' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/registar" className="btn-ghost">Entrar</Link>
            <Link to="/registar" className="btn-primary">Começar Grátis</Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setMobileOpen(!mobileOpen)}
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
        className={`mobile-menu md:hidden ${mobileOpen ? 'open' : ''}`}
        style={{
          borderTop: '1px solid #1e2436',
          background: 'rgba(15,17,23,0.97)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-4 py-3 rounded-lg text-sm font-medium"
              style={{
                color: location.pathname === link.to ? '#f1f5f9' : '#94a3b8',
                textDecoration: 'none',
                background: location.pathname === link.to ? '#1a1f2e' : 'transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-3 pt-3" style={{ borderTop: '1px solid #1e2436' }}>
            <Link to="/registar" className="btn-ghost flex-1 justify-center">Entrar</Link>
            <Link to="/registar" className="btn-primary flex-1 justify-center">Começar Grátis</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
