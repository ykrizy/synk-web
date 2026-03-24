import Reveal from '@/components/ui/Reveal'

const FEATURES = [
  { icon: '🛡️', title: 'Pagamento Escrow', desc: 'O dinheiro só é libertado quando aprovares o trabalho. Total segurança para ambas as partes.' },
  { icon: '✅', title: 'Especialistas Verificados', desc: 'Cada especialista passa por uma avaliação técnica antes de entrar na plataforma.' },
  { icon: '⚡', title: 'Match em 48h', desc: 'O nosso algoritmo encontra os melhores candidatos para o teu projeto em menos de 48 horas.' },
  { icon: '💬', title: 'Comunicação Integrada', desc: 'Gere toda a comunicação, ficheiros e milestones diretamente na plataforma.' },
  { icon: '⭐', title: 'Sistema de Avaliações', desc: 'Reviews verificados de projetos reais. Sabes sempre com quem estás a trabalhar.' },
  { icon: '🌍', title: 'Talentos Ibéricos e LATAM', desc: 'Acesso a especialistas em Portugal, Espanha e América Latina.' },
]

const PROJECTS = [
  { name: 'Automação ERP', status: 'Em Progresso', progress: 75, color: '#6366f1', statusColor: 'rgba(99,102,241,0.15)', textColor: '#6366f1', borderColor: 'rgba(99,102,241,0.3)' },
  { name: 'CRM Integration', status: 'Em Revisão', progress: 95, color: '#f59e0b', statusColor: 'rgba(245,158,11,0.15)', textColor: '#f59e0b', borderColor: 'rgba(245,158,11,0.3)' },
  { name: 'BI Dashboard', status: 'Concluído', progress: 100, color: '#10b981', statusColor: 'rgba(16,185,129,0.15)', textColor: '#10b981', borderColor: 'rgba(16,185,129,0.3)' },
]

function DashboardMockup() {
  return (
    <div className="w-full max-w-sm rounded-2xl overflow-hidden" style={{ background: '#1a1f2e', border: '1px solid #1e2436', boxShadow: '0 25px 60px rgba(0,0,0,0.4)' }}>
      {/* Chrome */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid #1e2436' }}>
        <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        <span className="ml-2 text-xs font-medium" style={{ color: '#64748b' }}>synk.io/dashboard</span>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-sm font-bold" style={{ color: '#f1f5f9' }}>Os meus projetos</div>
            <div className="text-xs" style={{ color: '#64748b' }}>3 projetos ativos</div>
          </div>
          <button className="btn-primary" style={{ padding: '6px 14px', fontSize: '12px' }}>+ Novo</button>
        </div>

        <div className="space-y-4">
          {PROJECTS.map((p, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: '#0f1117', border: '1px solid #1e2436' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: '#f1f5f9' }}>{p.name}</span>
                <span className="badge" style={{ background: p.statusColor, color: p.textColor, border: `1px solid ${p.borderColor}`, padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: '600' }}>
                  {p.status}
                </span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: '#1a1f2e' }}>
                <div className="h-1.5 rounded-full" style={{ background: p.color, width: `${p.progress}%` }} />
              </div>
              <div className="text-right mt-1">
                <span className="text-xs font-medium" style={{ color: '#64748b' }}>{p.progress}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl p-4" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#10b981' }}>💰 Escrow Total</div>
              <div className="text-xl font-extrabold" style={{ color: '#f1f5f9' }}>€7.200</div>
            </div>
            <div className="text-right">
              <div className="text-xs" style={{ color: '#64748b' }}>Protegido</div>
              <div className="text-xs font-medium" style={{ color: '#10b981' }}>🛡️ Garantido</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WhySynk() {
  return (
    <section id="features" className="py-24" style={{ background: '#0f1117' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Features list */}
          <div>
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight" style={{ color: '#f1f5f9', letterSpacing: '-0.02em' }}>
                Construído para que{' '}<span className="text-gradient">nada corra mal</span>
              </h2>
              <p className="text-lg mb-10" style={{ color: '#94a3b8' }}>
                Cada detalhe foi pensado para proteger empresas e especialistas.
              </p>
            </Reveal>

            <div className="space-y-6">
              {FEATURES.map((f, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="flex gap-4">
                    <div className="text-2xl flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: '#1a1f2e', border: '1px solid #1e2436' }}>
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: '#f1f5f9' }}>{f.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{f.desc}</p>
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
