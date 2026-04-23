import { Link } from 'react-router-dom'
import useMeta from '@/hooks/useMeta'
import PageHero from '@/components/ui/PageHero'
import SectionHeader from '@/components/ui/SectionHeader'
import CTABanner from '@/components/ui/CTABanner'
import Reveal from '@/components/ui/Reveal'

const BENEFITS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Pagamento garantido',
    desc: 'O Escrow garante que recebes pelo trabalho entregue. Nunca trabalhas sem proteção financeira.',
    color: '#34d399',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    title: 'Projetos qualificados',
    desc: 'Chega de perder tempo com clientes sem orçamento ou pedidos vagos. Os projetos na Synk são estruturados e com budget definido.',
    color: '#818cf8',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Constrói reputação',
    desc: 'O teu histórico de avaliações e projetos concluídos na plataforma é o teu melhor portfólio.',
    color: '#a78bfa',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Mercado ibérico e LATAM',
    desc: 'Acede a empresas em Portugal, Espanha e América Latina sem precisares de procurar clientes.',
    color: '#22d3ee',
  },
]

const SKILLS = [
  { title: 'RPA (UiPath, AA, Power Automate)', demand: 'Alta Procura', demandVariant: 'badge-emerald' },
  { title: 'Integrações (Make, Zapier, n8n)', demand: 'Alta Procura', demandVariant: 'badge-emerald' },
  { title: 'IA Aplicada (LLMs, automação com IA)', demand: 'Em Crescimento', demandVariant: 'badge-cyan' },
  { title: 'Python Automation', demand: 'Alta Procura', demandVariant: 'badge-emerald' },
  { title: 'Power BI / Data Automation', demand: 'Estável', demandVariant: 'badge-indigo' },
  { title: 'Cloud & DevOps Automation', demand: 'Em Crescimento', demandVariant: 'badge-cyan' },
  { title: 'Marketing Automation', demand: 'Estável', demandVariant: 'badge-indigo' },
  { title: 'Custom Development', demand: 'Alta Procura', demandVariant: 'badge-emerald' },
]

const EARNINGS = [
  { project: '€2.000', commission: '€300', receives: '€1.700', pct: 85 },
  { project: '€5.000', commission: '€750', receives: '€4.250', pct: 85 },
  { project: '€15.000', commission: '€2.250', receives: '€12.750', pct: 85 },
]

const VERIFICATION_STEPS = [
  { title: 'Submetes candidatura', desc: 'Preenches o perfil com competências, ferramentas e portfolio (15 min)' },
  { title: 'Revisão do perfil', desc: 'A nossa equipa analisa o teu perfil em 24 horas úteis' },
  { title: 'Avaliação técnica', desc: 'Para certas especialidades, um teste técnico rápido de 30 min (se aplicável)' },
  { title: 'Perfil ativo', desc: 'Começas a receber notificações de projetos compatíveis' },
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
      <section className="py-24" style={{ background: '#080b12' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="O que ganhas como" highlight="especialista Synk" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map((b, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="card p-6 text-center h-full flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${b.color}12`, color: b.color, border: `1px solid ${b.color}20` }}
                  >
                    {b.icon}
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}>{b.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#475569', letterSpacing: '-0.01em' }}>{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills grid */}
      <section className="py-24" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="A tua área de especialização" highlight="tem procura" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILLS.map((s, i) => (
              <Reveal key={i} delay={i * 50}>
                <div
                  className="rounded-xl p-5 flex items-start gap-4 h-full"
                  style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                    style={{ background: '#6366f1' }}
                  />
                  <div>
                    <div className="text-sm font-semibold mb-2" style={{ color: '#e2e8f0', letterSpacing: '-0.01em' }}>{s.title}</div>
                    <span className={`badge ${s.demandVariant}`}>{s.demand}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings */}
      <section className="py-24" style={{ background: '#080b12' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="Transparência total" highlight="nas comissões" sub="Sem mensalidades. Só pagas 15% quando recebes." />
          <Reveal delay={100}>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="grid grid-cols-4 gap-4 p-4" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Valor do projeto', 'Comissão Synk (15%)', 'Tu recebes', ''].map((h, i) => (
                  <div key={i} className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#334155', letterSpacing: '0.06em' }}>{h}</div>
                ))}
              </div>
              {EARNINGS.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 gap-4 p-4 items-center"
                  style={{
                    borderBottom: i < EARNINGS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                  }}
                >
                  <div className="font-bold" style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}>{row.project}</div>
                  <div className="font-medium" style={{ color: '#f87171' }}>- {row.commission}</div>
                  <div className="font-bold text-lg" style={{ color: '#34d399', letterSpacing: '-0.02em' }}>{row.receives}</div>
                  <div>
                    <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div className="h-1.5 rounded-full" style={{ background: '#34d399', width: `${row.pct}%` }} />
                    </div>
                    <div className="text-xs mt-1" style={{ color: '#334155' }}>{row.pct}% para ti</div>
                  </div>
                </div>
              ))}
              <div className="p-4" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <p className="text-sm text-center" style={{ color: '#334155', letterSpacing: '-0.01em' }}>
                  Sem taxas de subscrição · Sem mensalidades · Comissão só aplicada em projetos pagos
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Verification process */}
      <section className="py-24" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="Como funciona a" highlight="verificação de perfis" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VERIFICATION_STEPS.map((step, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="card p-6 h-full">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-4"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)', color: '#fff' }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}>{step.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#475569', letterSpacing: '-0.01em' }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured testimonial */}
      <section className="py-24" style={{ background: '#080b12' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div
              className="rounded-2xl p-8 lg:p-12"
              style={{
                background: 'rgba(139,92,246,0.04)',
                border: '1px solid rgba(139,92,246,0.2)',
              }}
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <blockquote
                className="text-lg leading-relaxed italic mb-8"
                style={{ color: '#cbd5e1', letterSpacing: '-0.01em' }}
              >
                "Em 6 meses na Synk fiz 12 projetos e construí uma base de clientes recorrentes. A plataforma poupou-me todo o trabalho de prospeção — posso focar-me no que sei fazer."
              </blockquote>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', color: '#fff' }}
                >
                  RF
                </div>
                <div>
                  <div className="font-bold" style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}>Ricardo Fernandes</div>
                  <div className="text-sm" style={{ color: '#475569' }}>Especialista em RPA · 47 projetos concluídos</div>
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
