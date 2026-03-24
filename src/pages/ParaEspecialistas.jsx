import { Link } from 'react-router-dom'
import useMeta from '@/hooks/useMeta'
import PageHero from '@/components/ui/PageHero'
import SectionHeader from '@/components/ui/SectionHeader'
import CTABanner from '@/components/ui/CTABanner'
import Reveal from '@/components/ui/Reveal'

const BENEFITS = [
  { icon: '💰', title: 'Pagamento garantido', desc: 'O Escrow garante que recebes pelo trabalho entregue. Nunca trabalhas sem proteção financeira.', color: '#10b981' },
  { icon: '🎯', title: 'Projetos qualificados', desc: 'Chega de perder tempo com clientes sem orçamento ou pedidos vagos. Os projetos na Synk são estruturados e com budget definido.', color: '#6366f1' },
  { icon: '📈', title: 'Constrói reputação', desc: 'O teu histórico de avaliações e projetos concluídos na plataforma é o teu melhor portfólio.', color: '#8b5cf6' },
  { icon: '🌍', title: 'Mercado ibérico e LATAM', desc: 'Acede a empresas em Portugal, Espanha e América Latina sem precisares de procurar clientes.', color: '#06b6d4' },
]

const SKILLS = [
  { icon: '⚙️', title: 'RPA (UiPath, AA, Power Automate)', demand: 'Alta Procura', demandVariant: 'badge-emerald' },
  { icon: '🔗', title: 'Integrações (Make, Zapier, n8n)', demand: 'Alta Procura', demandVariant: 'badge-emerald' },
  { icon: '🤖', title: 'IA Aplicada (LLMs, automação com IA)', demand: 'Em Crescimento', demandVariant: 'badge-cyan' },
  { icon: '🐍', title: 'Python Automation', demand: 'Alta Procura', demandVariant: 'badge-emerald' },
  { icon: '📊', title: 'Power BI / Data Automation', demand: 'Estável', demandVariant: 'badge-indigo' },
  { icon: '☁️', title: 'Cloud & DevOps Automation', demand: 'Em Crescimento', demandVariant: 'badge-cyan' },
  { icon: '📧', title: 'Marketing Automation', demand: 'Estável', demandVariant: 'badge-indigo' },
  { icon: '🔧', title: 'Custom Development', demand: 'Alta Procura', demandVariant: 'badge-emerald' },
]

const EARNINGS = [
  { project: '€2.000', commission: '€300', receives: '€1.700', pct: 85 },
  { project: '€5.000', commission: '€750', receives: '€4.250', pct: 85 },
  { project: '€15.000', commission: '€2.250', receives: '€12.750', pct: 85 },
]

const VERIFICATION_STEPS = [
  { icon: '📝', title: 'Submetes candidatura', desc: 'Preenches o perfil com competências, ferramentas e portfolio (15 min)' },
  { icon: '🔍', title: 'Revisão do perfil', desc: 'A nossa equipa analisa o teu perfil em 24 horas úteis' },
  { icon: '🎯', title: 'Avaliação técnica', desc: 'Para certas especialidades, um teste técnico rápido de 30 min (se aplicável)' },
  { icon: '✅', title: 'Perfil ativo', desc: 'Começas a receber notificações de projetos compatíveis' },
]

export default function ParaEspecialistas() {
  useMeta({
    title: 'Para Especialistas',
    description: 'Acede a projetos de automação qualificados. Trabalha com segurança. Recebe sempre.',
  })

  return (
    <>
      <PageHero
        badge="Para Especialistas"
        badgeVariant="badge-violet"
        heading="O teu talento merece"
        highlight="projetos à sua altura"
        sub="A Synk liga-te a empresas que precisam das tuas competências em automação. Projetos qualificados, pagamento garantido, sem intermediários desnecessários."
        primaryCTA={{ label: 'Criar Perfil Gratuito', to: '/registar' }}
        secondaryCTA={{ label: 'Ver projetos disponíveis', to: '/registar' }}
      />

      {/* Benefits */}
      <section className="py-24" style={{ background: '#0f1117' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="O que ganhas como" highlight="especialista Synk" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map((b, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="card p-6 text-center h-full flex flex-col items-center">
                  <div className="text-4xl mb-4">{b.icon}</div>
                  <h3 className="font-bold mb-2" style={{ color: '#f1f5f9' }}>{b.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills grid */}
      <section className="py-24" style={{ background: '#1a1f2e', borderTop: '1px solid #1e2436' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="A tua área de especialização" highlight="tem procura" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILLS.map((s, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="card-no-hover rounded-xl p-5 flex items-start gap-4 h-full" style={{ background: '#0f1117' }}>
                  <span className="text-2xl flex-shrink-0">{s.icon}</span>
                  <div>
                    <div className="text-sm font-semibold mb-2" style={{ color: '#f1f5f9' }}>{s.title}</div>
                    <span className={`badge ${s.demandVariant}`}>{s.demand}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings */}
      <section className="py-24" style={{ background: '#0f1117' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="Transparência total" highlight="nas comissões" sub="Sem mensalidades. Só pagas 15% quando recebes." />
          <Reveal delay={100}>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #1e2436' }}>
              {/* Header */}
              <div className="grid grid-cols-4 gap-4 p-4" style={{ background: '#1a1f2e', borderBottom: '1px solid #1e2436' }}>
                {['Valor do projeto', 'Comissão Synk (15%)', 'Tu recebes', ''].map((h, i) => (
                  <div key={i} className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#64748b' }}>{h}</div>
                ))}
              </div>
              {EARNINGS.map((row, i) => (
                <div key={i} className="grid grid-cols-4 gap-4 p-4 items-center" style={{ borderBottom: i < EARNINGS.length - 1 ? '1px solid #1e2436' : 'none', background: '#0f1117' }}>
                  <div className="font-bold" style={{ color: '#f1f5f9' }}>{row.project}</div>
                  <div className="font-medium" style={{ color: '#ef4444' }}>- {row.commission}</div>
                  <div className="font-bold text-lg" style={{ color: '#10b981' }}>{row.receives}</div>
                  <div>
                    <div className="h-2 rounded-full" style={{ background: '#1e2436' }}>
                      <div className="h-2 rounded-full" style={{ background: '#10b981', width: `${row.pct}%` }} />
                    </div>
                    <div className="text-xs mt-1" style={{ color: '#64748b' }}>{row.pct}% para ti</div>
                  </div>
                </div>
              ))}
              <div className="p-4" style={{ background: '#1a1f2e' }}>
                <p className="text-sm text-center" style={{ color: '#64748b' }}>
                  Sem taxas de subscrição · Sem mensalidades · Comissão só aplicada em projetos pagos
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Verification process */}
      <section className="py-24" style={{ background: '#1a1f2e', borderTop: '1px solid #1e2436' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="Como funciona a" highlight="verificação de perfis" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VERIFICATION_STEPS.map((step, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="card p-6 h-full">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-4"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff' }}
                  >
                    {i + 1}
                  </div>
                  <div className="text-2xl mb-3">{step.icon}</div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: '#f1f5f9' }}>{step.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured testimonial */}
      <section className="py-24" style={{ background: '#0f1117' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div
              className="rounded-2xl p-8 lg:p-12"
              style={{ background: '#1a1f2e', border: '1px solid rgba(139,92,246,0.3)', boxShadow: '0 0 40px rgba(139,92,246,0.08)' }}
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#f59e0b', fontSize: '18px' }}>★</span>)}
              </div>
              <blockquote className="text-lg leading-relaxed italic mb-8" style={{ color: '#f1f5f9' }}>
                "Em 6 meses na Synk fiz 12 projetos e construí uma base de clientes recorrentes. A plataforma poupou-me todo o trabalho de prospeção — posso focar-me no que sei fazer."
              </blockquote>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', color: '#fff' }}
                >
                  RF
                </div>
                <div>
                  <div className="font-bold" style={{ color: '#f1f5f9' }}>Ricardo Fernandes</div>
                  <div className="text-sm" style={{ color: '#94a3b8' }}>Especialista em RPA · 47 projetos concluídos</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABanner
        heading="Junta-te a centenas de especialistas"
        sub="Verificação em 24h · Projetos qualificados · Pagamento garantido."
        primaryLabel="Criar Perfil Gratuito"
        primaryTo="/registar"
        secondaryLabel="Ver como funciona"
        secondaryTo="/como-funciona"
      />
    </>
  )
}
