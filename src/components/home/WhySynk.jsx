import Reveal from '@/components/ui/Reveal'

const FEATURES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Pagamento Escrow',
    desc: 'O dinheiro só é libertado quando aprovares o trabalho. Total segurança para ambas as partes.',
    color: '#818cf8',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Especialistas Verificados',
    desc: 'Cada especialista passa por uma avaliação técnica antes de entrar na plataforma.',
    color: '#34d399',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Match em 48h',
    desc: 'O nosso algoritmo encontra os melhores candidatos para o teu projeto em menos de 48 horas.',
    color: '#fbbf24',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Comunicação Integrada',
    desc: 'Gere toda a comunicação, ficheiros e milestones diretamente na plataforma.',
    color: '#22d3ee',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Sistema de Avaliações',
    desc: 'Reviews verificados de projetos reais. Sabes sempre com quem estás a trabalhar.',
    color: '#f59e0b',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Talentos Ibéricos e LATAM',
    desc: 'Acesso a especialistas em Portugal, Espanha e América Latina.',
    color: '#a78bfa',
  },
]

const PROJECTS = [
  { name: 'Automação ERP', status: 'Em Progresso', progress: 75, color: '#6366f1', statusBg: 'rgba(99,102,241,0.1)', statusText: '#818cf8', statusBorder: 'rgba(99,102,241,0.25)' },
  { name: 'CRM Integration', status: 'Em Revisão', progress: 95, color: '#f59e0b', statusBg: 'rgba(245,158,11,0.1)', statusText: '#fbbf24', statusBorder: 'rgba(245,158,11,0.25)' },
  { name: 'BI Dashboard', status: 'Concluído', progress: 100, color: '#10b981', statusBg: 'rgba(16,185,129,0.1)', statusText: '#34d399', statusBorder: 'rgba(16,185,129,0.25)' },
]

function DashboardMockup() {
  return (
    <div
      className="w-full max-w-sm rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)',
      }}
    >
      {/* Chrome */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        <span className="ml-2 text-xs font-medium" style={{ color: '#334155' }}>synk.pt/dashboard</span>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-sm font-bold" style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}>Os meus projetos</div>
            <div className="text-xs" style={{ color: '#334155' }}>3 projetos ativos</div>
          </div>
          <button className="btn-primary" style={{ padding: '6px 14px', fontSize: '12px' }}>+ Novo</button>
        </div>

        <div className="space-y-3">
          {PROJECTS.map((p, i) => (
            <div
              key={i}
              className="rounded-xl p-4"
              style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-sm font-medium" style={{ color: '#e2e8f0', letterSpacing: '-0.01em' }}>{p.name}</span>
                <span
                  className="badge"
                  style={{
                    background: p.statusBg,
                    color: p.statusText,
                    border: `1px solid ${p.statusBorder}`,
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontSize: '10px',
                    fontWeight: '600',
                    letterSpacing: '0.02em',
                  }}
                >
                  {p.status}
                </span>
              </div>
              <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-1 rounded-full" style={{ background: p.color, width: `${p.progress}%` }} />
              </div>
              <div className="text-right mt-1">
                <span className="text-xs" style={{ color: '#334155' }}>{p.progress}%</span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-4 rounded-xl p-4"
          style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div
                className="text-xs font-semibold uppercase tracking-widest mb-1 flex items-center gap-1.5"
                style={{ color: '#34d399' }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Escrow Total
              </div>
              <div className="text-xl font-extrabold" style={{ color: '#e2e8f0', letterSpacing: '-0.03em' }}>€7.200</div>
            </div>
            <div className="text-right">
              <div className="text-xs" style={{ color: '#334155' }}>Protegido</div>
              <div className="text-xs font-medium" style={{ color: '#34d399' }}>Garantido</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WhySynk() {
  return (
    <section id="features" className="py-24" style={{ background: '#080b12' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Features list */}
          <div>
            <Reveal>
              <h2
                className="text-3xl sm:text-4xl font-extrabold mb-4"
                style={{ color: '#e2e8f0', letterSpacing: '-0.03em' }}
              >
                Construído para que{' '}
                <span className="text-gradient">nada corra mal</span>
              </h2>
              <p className="text-lg mb-10" style={{ color: '#475569', letterSpacing: '-0.01em' }}>
                Cada detalhe foi pensado para proteger empresas e especialistas.
              </p>
            </Reveal>

            <div className="space-y-5">
              {FEATURES.map((f, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="flex gap-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${f.color}12`, color: f.color, border: `1px solid ${f.color}20` }}
                    >
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}>{f.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#475569', letterSpacing: '-0.01em' }}>{f.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Mockup */}
          <Reveal delay={200}>
            <div className="flex justify-center">
              <DashboardMockup />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
