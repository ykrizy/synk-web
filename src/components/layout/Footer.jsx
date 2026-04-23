import { Link } from 'react-router-dom'

const COLS = [
  {
    title: 'Plataforma',
    links: [
      { label: 'Como Funciona', to: '/como-funciona' },
      { label: 'Marketplace', to: '/marketplace' },
      { label: 'Para Empresas', to: '/para-empresas' },
      { label: 'Para Especialistas', to: '/para-especialistas' },
      { label: 'Preços', to: '/precos' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre Nós', to: '/sobre-nos' },
      { label: 'Matching', to: '/matching' },
      { label: 'Calculadora', to: '/calculadora' },
      { label: 'Carreiras', to: '/sobre-nos' },
      { label: 'Contacto', to: '/sobre-nos' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Termos de Serviço', to: '#' },
      { label: 'Privacidade', to: '#' },
      { label: 'RGPD', to: '#' },
      { label: 'Cookies', to: '#' },
    ],
  },
]

const SOCIALS = [
  {
    label: 'LinkedIn',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Top grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand column */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4" style={{ textDecoration: 'none' }}>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--brand)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="font-display text-lg" style={{ color: 'var(--text)', letterSpacing: '-0.04em' }}>Synk</span>
            </Link>

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-3)', maxWidth: 220 }}>
              O marketplace que liga empresas aos melhores especialistas de automação em Portugal.
            </p>

            <div className="flex gap-2">
              {SOCIALS.map((s, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-3)', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,92,246,0.4)'; e.currentTarget.style.color = 'var(--brand-light)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-3)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map((col, i) => (
            <div key={i}>
              <h4
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: 'var(--text-3)', letterSpacing: '0.08em' }}
              >
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      to={link.to}
                      className="text-sm transition-colors duration-150"
                      style={{ color: 'var(--text-3)', textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-2)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-4)' }}>
            © 2026 Synk Technologies, Lda. Todos os direitos reservados.
          </p>
          <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--text-4)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Feito com orgulho em Portugal
          </p>
        </div>
      </div>
    </footer>
  )
}
