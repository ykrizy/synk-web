import { Link } from 'react-router-dom'

const COLS = [
  {
    title: 'Plataforma',
    links: [
      { label: 'Como Funciona', to: '/como-funciona' },
      { label: 'Para Empresas', to: '/para-empresas' },
      { label: 'Para Especialistas', to: '/para-especialistas' },
      { label: 'Preços', to: '/precos' },
      { label: 'Blog', to: '#' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre Nós', to: '/sobre-nos' },
      { label: 'Carreiras', to: '/sobre-nos' },
      { label: 'Contacto', to: '/sobre-nos' },
      { label: 'Imprensa', to: '/sobre-nos' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Termos de Serviço', to: '#' },
      { label: 'Política de Privacidade', to: '#' },
      { label: 'RGPD', to: '#' },
      { label: 'Cookies', to: '#' },
    ],
  },
]

const SOCIALS = [
  {
    label: 'LinkedIn',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer style={{ background: '#080b12', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-gradient font-extrabold text-xl tracking-tight block mb-3"
              style={{ textDecoration: 'none', letterSpacing: '-0.02em' }}
            >
              Synk
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#475569' }}>
              O marketplace de automação empresarial para PMEs ibéricas.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#475569', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; e.currentTarget.style.color = '#818cf8' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#475569' }}
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map((col, i) => (
            <div key={i}>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#94a3b8' }}>
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      to={link.to}
                      className="text-sm transition-colors"
                      style={{ color: '#475569', textDecoration: 'none' }}
                      onMouseEnter={e => (e.target.style.color = '#94a3b8')}
                      onMouseLeave={e => (e.target.style.color = '#475569')}
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
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-sm" style={{ color: '#334155' }}>
            © 2026 Synk. Todos os direitos reservados.
          </p>
          <p className="text-sm" style={{ color: '#334155' }}>
            Feito em Portugal
          </p>
        </div>
      </div>
    </footer>
  )
}
