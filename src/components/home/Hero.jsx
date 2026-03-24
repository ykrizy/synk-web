import { Link } from 'react-router-dom'

const SOCIAL_PROOF = [
  { icon: '⚡', text: 'Match em menos de 48h' },
  { icon: '🛡️', text: 'Pagamento protegido por Escrow' },
  { icon: '✅', text: 'Especialistas verificados' },
  { icon: '🌍', text: 'Portugal · Espanha · LATAM' },
]

function HeroMockup() {
  return (
    <div className="relative" style={{ width: '360px', maxWidth: '100%' }}>
      {/* Main card */}
      <div
        className="card-no-hover rounded-2xl p-5"
        style={{
          background: '#1a1f2e',
          border: '1px solid #1e2436',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.1)',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-gradient font-bold text-sm">Synk</span>
            <span className="badge badge-emerald">● Live</span>
          </div>
          <span className="text-xs" style={{ color: '#64748b' }}>há 2 min</span>
        </div>

        <div className="rounded-xl p-4 mb-4" style={{ background: '#0f1117', border: '1px solid #1e2436' }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#64748b' }}>Novo Projeto</div>
              <div className="font-semibold text-sm" style={{ color: '#f1f5f9' }}>Automação de Faturação ERP</div>
            </div>
            <span className="badge badge-amber">Em Progresso</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="badge badge-indigo">RPA</span>
            <span className="badge badge-cyan">SAP</span>
            <span className="badge badge-violet">Zapier</span>
          </div>
        </div>

        <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#64748b' }}>Match Encontrado ⚡</div>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff' }}
          >
            MS
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm" style={{ color: '#f1f5f9' }}>Miguel Santos</div>
            <div className="text-xs" style={{ color: '#94a3b8' }}>RPA & Workflow Specialist</div>
          </div>
          <div className="flex items-center gap-1">
            <span style={{ color: '#f59e0b', fontSize: '14px' }}>★</span>
            <span className="text-sm font-semibold" style={{ color: '#f1f5f9' }}>4.9</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1.5" style={{ color: '#64748b' }}>
            <span>Progresso do projeto</span>
            <span style={{ color: '#10b981' }}>75%</span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: '#0f1117' }}>
            <div className="h-1.5 rounded-full" style={{ background: 'linear-gradient(90deg, #6366f1, #10b981)', width: '75%' }} />
          </div>
        </div>

        <div
          className="flex items-center justify-between rounded-lg p-3"
          style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
        >
          <div className="flex items-center gap-2">
            <span style={{ color: '#10b981', fontSize: '14px' }}>🛡️</span>
            <span className="text-xs font-medium" style={{ color: '#10b981' }}>Escrow Protegido</span>
          </div>
          <span className="text-sm font-bold" style={{ color: '#f1f5f9' }}>€2.400</span>
        </div>
      </div>

      {/* Floating notification */}
      <div
        className="absolute -top-4 -right-4 rounded-xl px-4 py-3 shadow-2xl"
        style={{
          background: '#1a1f2e',
          border: '1px solid rgba(99,102,241,0.4)',
          minWidth: '180px',
          boxShadow: '0 0 20px rgba(99,102,241,0.15)',
        }}
      >
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '16px' }}>🔔</span>
          <div>
            <div className="text-xs font-semibold" style={{ color: '#f1f5f9' }}>Nova proposta</div>
            <div className="text-xs" style={{ color: '#94a3b8' }}>Ana C. · €1.800</div>
          </div>
        </div>
      </div>

      {/* Floating success */}
      <div
        className="absolute -bottom-4 -left-4 rounded-xl px-4 py-3 shadow-2xl"
        style={{
          background: '#1a1f2e',
          border: '1px solid rgba(16,185,129,0.3)',
          boxShadow: '0 0 20px rgba(16,185,129,0.1)',
        }}
      >
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '16px' }}>✅</span>
          <div>
            <div className="text-xs font-semibold" style={{ color: '#10b981' }}>Projeto entregue!</div>
            <div className="text-xs" style={{ color: '#94a3b8' }}>Pagamento libertado</div>
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
      style={{ background: 'radial-gradient(ellipse at 60% 40%, #1a1f2e 0%, #0f1117 70%)' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#6366f1' }} />
              <span className="text-xs font-semibold" style={{ color: '#6366f1' }}>Marketplace B2B de Automação</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6"
              style={{ letterSpacing: '-0.03em' }}
            >
              <span style={{ color: '#f1f5f9' }}>Automatiza o teu</span>
              <br />
              <span className="text-gradient">negócio com os</span>
              <br />
              <span style={{ color: '#f1f5f9' }}>melhores especialistas</span>
            </h1>

            <p className="text-lg mb-8 leading-relaxed max-w-xl" style={{ color: '#94a3b8' }}>
              A Synk conecta a tua empresa a especialistas em automação verificados. Encontra o profissional certo, lança o projeto e paga só quando estiveres satisfeito.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/para-especialistas" className="btn-primary btn-primary-lg">
                Procurar Especialistas
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/registar" className="btn-outline">Sou Especialista</Link>
            </div>

            <div className="flex flex-wrap gap-4">
              {SOCIAL_PROOF.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm" style={{ color: '#64748b' }}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
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
