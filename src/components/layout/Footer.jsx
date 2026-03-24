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
  { label: 'LinkedIn', icon: 'in' },
  { label: 'Instagram', icon: '📷' },
  { label: 'YouTube', icon: '▶' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0f1117', borderTop: '1px solid #1e2436' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="text-gradient font-extrabold text-2xl tracking-tight block mb-3" style={{ textDecoration: 'none' }}>
              Synk
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#64748b' }}>
              O marketplace de automação empresarial para PMEs ibéricas.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all"
                  style={{ background: '#1a1f2e', border: '1px solid #1e2436', color: '#94a3b8', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.color = '#6366f1' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e2436'; e.currentTarget.style.color = '#94a3b8' }}
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
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#f1f5f9' }}>
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      to={link.to}
                      className="text-sm transition-colors"
                      style={{ color: '#64748b', textDecoration: 'none' }}
                      onMouseEnter={e => (e.target.style.color = '#94a3b8')}
                      onMouseLeave={e => (e.target.style.color = '#64748b')}
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
          style={{ borderTop: '1px solid #1e2436' }}
        >
          <p className="text-sm" style={{ color: '#64748b' }}>
            © 2026 Synk. Todos os direitos reservados.
          </p>
          <p className="text-sm" style={{ color: '#64748b' }}>
            Feito em Portugal 🇵🇹
          </p>
        </div>
      </div>
    </footer>
  )
}
