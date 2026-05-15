import { Link } from 'react-router-dom'
import useMeta from '@/hooks/useMeta'
import useSmartCTA from '@/hooks/useSmartCTA'
import PageHero from '@/components/ui/PageHero'
import SectionHeader from '@/components/ui/SectionHeader'
import FAQ from '@/components/ui/FAQ'
import CTABanner from '@/components/ui/CTABanner'
import Reveal from '@/components/ui/Reveal'

const EMPRESAS_FEATURES = [
  'Publicação de projetos ilimitada',
  'Receber propostas de especialistas',
  'Chat com candidatos antes de contratar',
  'Sistema de Escrow incluído',
  'Gestão de projetos na plataforma',
  'Histórico de projetos e avaliações',
  'Suporte por chat',
]

const ESPECIALISTAS_FEATURES = [
  'Perfil profissional verificado',
  'Acesso a todos os projetos publicados',
  'Propostas ilimitadas',
  'Pagamento garantido por Escrow',
  'Sistema de avaliações e reputação',
  'Suporte prioritário',
  'Dashboard de earnings',
]

const ENTERPRISE_FEATURES = [
  'Tudo do plano Empresas',
  'Account manager dedicado',
  'SLA garantido de 24h para matching',
  'Contratos personalizados',
  'Relatórios de utilização',
  'Integração com sistemas internos',
  'Onboarding assistido',
]

const TABLE_FEATURES = [
  { feature: 'Publicar projetos', empresas: '✓', especialistas: '—', enterprise: '✓' },
  { feature: 'Propostas ilimitadas', empresas: '✓', especialistas: '✓', enterprise: '✓' },
  { feature: 'Chat integrado', empresas: '✓', especialistas: '✓', enterprise: '✓' },
  { feature: 'Pagamento Escrow', empresas: '✓', especialistas: '✓', enterprise: '✓' },
  { feature: 'Gestão de projetos', empresas: '✓', especialistas: '✓', enterprise: '✓' },
  { feature: 'Suporte', empresas: 'Chat', especialistas: 'Prioritário', enterprise: 'Dedicado' },
  { feature: 'SLA de matching', empresas: '48h', especialistas: '—', enterprise: '24h' },
  { feature: 'Account manager', empresas: '—', especialistas: '—', enterprise: '✓' },
  { feature: 'Relatórios avançados', empresas: '—', especialistas: '—', enterprise: '✓' },
  { feature: 'API access', empresas: '—', especialistas: '—', enterprise: '✓' },
]

const FAQS_PRICING = [
  { q: 'Há algum custo de registo ou mensalidade?', a: 'Não. Tanto empresas como especialistas registam-se gratuitamente. Não há taxas de subscrição nem custos recorrentes.' },
  { q: 'Quando é que a comissão é cobrada?', a: 'A comissão de 15% é deduzida automaticamente do valor em Escrow quando o projeto é aprovado pela empresa. É processada de forma transparente e automática.' },
  { q: 'Posso negociar a comissão para projetos grandes?', a: 'Para projetos acima de €20.000, contacta-nos em hello@twonect.pt para condições personalizadas. Temos condições especiais para projetos de grande volume.' },
  { q: 'Que métodos de pagamento aceitam?', a: 'Stripe: cartão de crédito/débito, Apple Pay, Google Pay e transferência bancária (SEPA). Todos os pagamentos são processados de forma segura.' },
  { q: 'O IVA está incluído?', a: 'Os valores apresentados são líquidos de IVA. O IVA aplicável será adicionado conforme a legislação em vigor no país do cliente.' },
  { q: 'Como funciona o reembolso se o projeto não for entregue?', a: 'O valor em Escrow é devolvido integralmente à empresa mediante análise do caso pela equipa Twonect. A nossa política de proteção garante que as empresas nunca perdem o investimento.' },
]

function CheckItem({ children, color = '#6366f1' }) {
  return (
    <li className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-2)', letterSpacing: '-0.01em' }}>
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}28` }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      {children}
    </li>
  )
}

export default function Precos() {
  const { empresaTo, especialistaTo } = useSmartCTA()
  useMeta({
    title: 'Preços',
    description: 'Modelo simples e transparente. Sem mensalidades. Sem surpresas.',
  })

  return (
    <>
      <PageHero
        heading="Simples. Transparente."
        highlight="Justo."
        sub="Sem mensalidades, sem taxas escondidas. A Twonect só ganha quando tu ganhas."
      />

      {/* 3 pricing cards */}
      <section className="py-24" style={{ background: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            {/* Empresas */}
            <Reveal delay={0}>
              <div className="card p-8 flex flex-col h-full">
                <span className="badge badge-indigo mb-5">Para Empresas</span>
                <div className="text-4xl font-extrabold mb-1" style={{ color: 'var(--text)', letterSpacing: '-0.04em' }}>€0</div>
                <div className="text-sm mb-2 font-medium" style={{ color: 'var(--text-3)' }}>/ sempre</div>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--text-2)', letterSpacing: '-0.01em' }}>
                  Publicar e contratar é sempre gratuito
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {EMPRESAS_FEATURES.map((f, i) => <CheckItem key={i} color="#818cf8">{f}</CheckItem>)}
                </ul>
                <Link to={empresaTo} className="btn-outline" style={{ textAlign: 'center', justifyContent: 'center' }}>
                  Começar Grátis
                </Link>
                <p className="text-xs mt-3 text-center" style={{ color: 'var(--text-3)' }}>Só pagas o valor acordado com o especialista</p>
              </div>
            </Reveal>

            {/* Especialistas — highlighted */}
            <Reveal delay={100}>
              <div
                className="relative flex flex-col h-full rounded-2xl p-8"
                style={{
                  background: 'rgba(124,92,246,0.04)',
                  border: '1px solid rgba(124,92,246,0.3)',
                  boxShadow: '0 0 60px rgba(124,92,246,0.1)',
                }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className="badge px-4 py-1"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                      color: '#fff',
                      borderColor: 'transparent',
                      boxShadow: '0 0 24px rgba(99,102,241,0.5)',
                      fontSize: '10px',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Mais Popular
                  </span>
                </div>
                <span className="badge badge-violet mb-5 mt-2">Para Especialistas</span>
                <div className="text-4xl font-extrabold mb-1" style={{ color: 'var(--text)', letterSpacing: '-0.04em' }}>15%</div>
                <div className="text-sm mb-2 font-medium" style={{ color: '#a78bfa' }}>por projeto concluído</div>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--text-2)', letterSpacing: '-0.01em' }}>
                  Só pagas quando recebes
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {ESPECIALISTAS_FEATURES.map((f, i) => <CheckItem key={i} color="#a78bfa">{f}</CheckItem>)}
                </ul>
                <Link to={especialistaTo} className="btn-primary btn-primary-lg" style={{ textAlign: 'center', justifyContent: 'center' }}>
                  Criar Perfil Gratuito
                </Link>
                <p className="text-xs mt-3 text-center" style={{ color: 'var(--text-3)' }}>Sem mensalidade · Comissão só em projetos pagos</p>
              </div>
            </Reveal>

            {/* Enterprise */}
            <Reveal delay={200}>
              <div className="card p-8 flex flex-col h-full">
                <span className="badge badge-amber mb-5">Grandes Empresas</span>
                <div className="text-4xl font-extrabold mb-1" style={{ color: 'var(--text)', letterSpacing: '-0.04em' }}>Custom</div>
                <div className="text-sm mb-2 font-medium" style={{ color: '#fbbf24' }}>sob consulta</div>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--text-2)', letterSpacing: '-0.01em' }}>
                  Para empresas com volume de projetos elevado
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {ENTERPRISE_FEATURES.map((f, i) => <CheckItem key={i} color="#fbbf24">{f}</CheckItem>)}
                </ul>
                <a href="mailto:hello@twonect.pt" className="btn-outline" style={{ textAlign: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                  Falar com a Equipa
                </a>
                <p className="text-xs mt-3 text-center" style={{ color: 'var(--text-3)' }}>Resposta em 24h úteis</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-24" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="Comparação" highlight="detalhada" sub="Tudo o que precisas de saber num só lugar." />
          <Reveal delay={100}>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="grid grid-cols-4 p-4" style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>Funcionalidade</div>
                {['Empresas', 'Especialistas', 'Enterprise'].map((h, i) => (
                  <div key={i} className="text-sm font-bold text-center" style={{ color: i === 1 ? '#a78bfa' : '#e2e8f0', letterSpacing: '-0.01em' }}>{h}</div>
                ))}
              </div>
              {TABLE_FEATURES.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 p-4 items-center"
                  style={{
                    borderBottom: i < TABLE_FEATURES.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                  }}
                >
                  <div className="text-sm" style={{ color: 'var(--text-2)', letterSpacing: '-0.01em' }}>{row.feature}</div>
                  {[row.empresas, row.especialistas, row.enterprise].map((val, j) => (
                    <div key={j} className="text-sm text-center font-medium" style={{ color: val === '✓' ? '#34d399' : val === '—' ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}>
                      {val === '✓' ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : val === '—' ? (
                        <span style={{ color: 'rgba(255,255,255,0.12)' }}>—</span>
                      ) : val}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Commission breakdown */}
      <section className="py-24" style={{ background: 'var(--bg)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="Como funciona a" highlight="comissão de 15%" sub="Transparência total em cada projeto." />
          <Reveal delay={100}>
            <div
              className="rounded-2xl p-8"
              style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {[
                  {
                    label: 'Empresa paga',
                    value: '€5.000',
                    color: 'var(--brand-light)',
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    ),
                  },
                  { arrow: true },
                  {
                    label: 'Twonect retém',
                    value: '€750 (15%)',
                    color: '#a78bfa',
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    ),
                  },
                  { arrow: true },
                  {
                    label: 'Especialista recebe',
                    value: '€4.250 (85%)',
                    color: '#34d399',
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    ),
                  },
                ].map((item, i) =>
                  item.arrow ? (
                    <div key={i} className="hidden sm:flex items-center justify-center flex-shrink-0" style={{ color: 'rgba(255,255,255,0.15)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  ) : (
                    <div
                      key={i}
                      className="flex-1 rounded-xl p-5 text-center"
                      style={{ background: 'rgba(0,0,0,0.2)', border: `1px solid ${item.color}20` }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                        style={{ background: `${item.color}15`, color: item.color }}
                      >
                        {item.icon}
                      </div>
                      <div className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: item.color }}>{item.label}</div>
                      <div className="font-bold text-lg" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>{item.value}</div>
                    </div>
                  )
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="FAQ de" highlight="preços" />
          <FAQ faqs={FAQS_PRICING} />
        </div>
      </section>

      <CTABanner
        heading="Pronto para começar sem custos?"
        sub="Regista-te gratuitamente e descobre como a Twonect pode transformar o teu negócio."
        primaryLabel="Começar Grátis"
        primaryTo={empresaTo}
        secondaryLabel="Ver como funciona"
        secondaryTo="/como-funciona"
      />
    </>
  )
}
