import { Link } from 'react-router-dom'

const SOCIAL_PROOF = [
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    text: 'Match em menos de 48h',
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    text: 'Pagamento protegido por Escrow',
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    text: 'Especialistas verificados',
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    text: 'Portugal · Espanha · LATAM',
  },
]

function HeroMockup() {
  return (
    <div className="relative" style={{ width: '360px', maxWidth: '100%' }}>
      <div
        className="rounded-2xl p-5"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border-2)',
          boxShadow: '0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px rgba(124,92,246,0.1)',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm text-gradient" style={{ letterSpacing: '-0.02em' }}>Synk</span>
            <span className="badge badge-emerald" style={{ fontSize: '10px' }}>Ao vivo</span>
          </div>
          <span className="text-xs" style={{ color: 'var(--text-3)' }}>há 2 min</span>
        </div>

        <div className="rounded-xl p-4 mb-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--text-3)' }}>Novo Projeto</div>
              <div className="font-semibold text-sm" style={{ color: 'var(--text)' }}>Automação de Faturação ERP</div>
            </div>
            <span className="badge badge-amber">Em Progresso</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="badge badge-indigo">RPA</span>
            <span className="badge badge-cyan">SAP</span>
            <span className="badge badge-violet">Zapier</span>
          </div>
        </div>

        <div className="text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-1.5" style={{ color: 'var(--text-3)' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          Match Encontrado
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand-dark))', color: '#fff' }}
          >
            MS
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm" style={{ color: 'var(--text)' }}>Miguel Santos</div>
            <div className="text-xs" style={{ color: 'var(--text-2)' }}>RPA & Workflow Specialist</div>
          </div>
          <div className="flex items-center gap-1">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--warning)" stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>4.9</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--text-3)' }}>
            <span>Progresso do projeto</span>
            <span style={{ color: 'var(--success-light)' }}>75%</span>
          </div>
          <div className="h-1 rounded-full" style={{ background: 'var(--surface-3)' }}>
            <div className="h-1 rounded-full" style={{ background: 'linear-gradient(90deg, var(--brand), var(--success))', width: '75%' }} />
          </div>
        </div>

        <div
          className="flex items-center justify-between rounded-xl p-3"
          style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.18)' }}
        >
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success-light)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-xs font-medium" style={{ color: 'var(--success-light)' }}>Escrow Protegido</span>
          </div>
          <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>€2.400</span>
        </div>
      </div>

      {/* Floating notification */}
      <div
        className="absolute -top-4 -right-4 rounded-xl px-4 py-3"
        style={{
          background: 'rgba(9,9,13,0.95)',
          border: '1px solid rgba(124,92,246,0.3)',
          minWidth: '180px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(124,92,246,0.12)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(124,92,246,0.2)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--brand-light)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-semibold" style={{ color: 'var(--text)' }}>Nova proposta</div>
            <div className="text-xs" style={{ color: 'var(--text-2)' }}>Ana C. · €1.800</div>
          </div>
        </div>
      </div>

      {/* Floating success */}
      <div
        className="absolute -bottom-4 -left-4 rounded-xl px-4 py-3"
        style={{
          background: 'rgba(9,9,13,0.95)',
          border: '1px solid rgba(16,185,129,0.25)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(16,185,129,0.08)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(16,185,129,0.15)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--success-light)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-semibold" style={{ color: 'var(--success-light)' }}>Projeto entregue</div>
            <div className="text-xs" style={{ color: 'var(--text-2)' }}>Pagamento libertado</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 60% 30%, rgba(124,92,246,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Copy */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
              style={{ background: 'rgba(124,92,246,0.08)', border: '1px solid rgba(124,92,246,0.2)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--brand-light)' }} />
              <span className="text-xs font-semibold tracking-wide" style={{ color: 'var(--brand-light)', letterSpacing: '0.02em' }}>
                Marketplace B2B de Automação
              </span>
            </div>

            <h1
              className="font-display mb-6"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', color: 'var(--text)' }}
            >
              Automatiza o teu{' '}
              <span className="text-gradient">negócio com os</span>{' '}
              melhores especialistas
            </h1>

            <p className="mb-10 leading-relaxed max-w-lg" style={{ color: 'var(--text-2)', fontSize: '1.125rem', letterSpacing: '-0.01em' }}>
              A Synk conecta a tua empresa a especialistas em automação verificados. Encontra o profissional certo, lança o projeto e paga só quando estiveres satisfeito.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Link to="/para-empresas" className="btn-primary btn-primary-lg">
                Publicar Projeto Grátis
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/registar" className="btn-outline">Sou Especialista</Link>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {SOCIAL_PROOF.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-3)' }}>
                  <span style={{ color: 'var(--brand-light)' }}>{item.icon}</span>
                  <span style={{ letterSpacing: '-0.01em' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="float-animation w-full max-w-sm">
              <HeroMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
