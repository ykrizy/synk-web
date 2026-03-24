import { Link } from 'react-router-dom'
import useMeta from '@/hooks/useMeta'
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
  { q: 'Posso negociar a comissão para projetos grandes?', a: 'Para projetos acima de €20.000, contacta-nos em hello@synk.pt para condições personalizadas. Temos condições especiais para projetos de grande volume.' },
  { q: 'Que métodos de pagamento aceitam?', a: 'Stripe: cartão de crédito/débito, Apple Pay, Google Pay e transferência bancária (SEPA). Todos os pagamentos são processados de forma segura.' },
  { q: 'O IVA está incluído?', a: 'Os valores apresentados são líquidos de IVA. O IVA aplicável será adicionado conforme a legislação em vigor no país do cliente.' },
  { q: 'Como funciona o reembolso se o projeto não for entregue?', a: 'O valor em Escrow é devolvido integralmente à empresa mediante análise do caso pela equipa Synk. A nossa política de proteção garante que as empresas nunca perdem o investimento.' },
]

function CheckItem({ children, color = '#6366f1' }) {
  return (
    <li className="flex items-center gap-3 text-sm" style={{ color: '#94a3b8' }}>
      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: `${color}22`, color }}>✓</span>
      {children}
    </li>
  )
}

export default function Precos() {
  useMeta({
    title: 'Preços',
    description: 'Modelo simples e transparente. Sem mensalidades. Sem surpresas.',
  })

  return (
    <>
      <PageHero
        heading="Simples. Transparente."
        highlight="Justo."
        sub="Sem mensalidades, sem taxas escondidas. A Synk só ganha quando tu ganhas."
      />

      {/* 3 pricing cards */}
      <section className="py-24" style={{ background: '#0f1117' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Empresas */}
            <Reveal delay={0}>
              <div className="card p-8 flex flex-col h-full">
                <span className="badge badge-indigo mb-4">Para Empresas</span>
                <div className="text-4xl font-extrabold mb-1" style={{ color: '#f1f5f9' }}>€0</div>
                <div className="text-sm mb-2 font-medium" style={{ color: '#64748b' }}>/ sempre</div>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: '#94a3b8' }}>
                  Publicar e contratar é sempre gratuito
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {EMPRESAS_FEATURES.map((f, i) => <CheckItem key={i} color="#6366f1">{f}</CheckItem>)}
                </ul>
                <Link to="/registar" className="btn-outline" style={{ textAlign: 'center', justifyContent: 'center' }}>
                  Começar Grátis
                </Link>
                <p className="text-xs mt-3 text-center" style={{ color: '#64748b' }}>Só pagas o valor acordado com o especialista</p>
              </div>
            </Reveal>

            {/* Especialistas — highlighted */}
            <Reveal delay={100}>
              <div
                className="relative flex flex-col h-full rounded-xl p-8"
                style={{ background: '#1a1f2e', border: '1px solid rgba(99,102,241,0.5)', boxShadow: '0 0 50px rgba(99,102,241,0.15)' }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge px-4 py-1" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', borderColor: 'transparent', boxShadow: '0 0 20px rgba(99,102,241,0.5)' }}>
                    ✦ Mais Popular
                  </span>
                </div>
                <span className="badge badge-violet mb-4 mt-2">Para Especialistas</span>
                <div className="text-4xl font-extrabold mb-1" style={{ color: '#f1f5f9' }}>15%</div>
                <div className="text-sm mb-2 font-medium" style={{ color: '#8b5cf6' }}>por projeto concluído</div>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: '#94a3b8' }}>
                  Só pagas quando recebes
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {ESPECIALISTAS_FEATURES.map((f, i) => <CheckItem key={i} color="#8b5cf6">{f}</CheckItem>)}
                </ul>
                <Link to="/registar" className="btn-primary btn-primary-lg" style={{ textAlign: 'center', justifyContent: 'center' }}>
                  Criar Perfil Gratuito
                </Link>
                <p className="text-xs mt-3 text-center" style={{ color: '#64748b' }}>Sem mensalidade · Comissão só em projetos pagos</p>
              </div>
            </Reveal>

            {/* Enterprise */}
            <Reveal delay={200}>
              <div className="card p-8 flex flex-col h-full">
                <span className="badge badge-amber mb-4">Grandes Empresas</span>
                <div className="text-4xl font-extrabold mb-1" style={{ color: '#f1f5f9' }}>Custom</div>
                <div className="text-sm mb-2 font-medium" style={{ color: '#f59e0b' }}>sob consulta</div>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: '#94a3b8' }}>
                  Para empresas com volume de projetos elevado
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {ENTERPRISE_FEATURES.map((f, i) => <CheckItem key={i} color="#f59e0b">{f}</CheckItem>)}
                </ul>
                <a href="mailto:hello@synk.pt" className="btn-outline" style={{ textAlign: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                  Falar com a Equipa
                </a>
                <p className="text-xs mt-3 text-center" style={{ color: '#64748b' }}>Resposta em 24h úteis</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-24" style={{ background: '#1a1f2e', borderTop: '1px solid #1e2436' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="Comparação" highlight="detalhada" sub="Tudo o que precisas de saber num só lugar." />
          <Reveal delay={100}>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #1e2436' }}>
              {/* Table header */}
              <div className="grid grid-cols-4 p-4" style={{ background: '#0f1117', borderBottom: '1px solid #1e2436' }}>
                <div className="text-sm font-semibold" style={{ color: '#64748b' }}>Funcionalidade</div>
                {['Empresas', 'Especialistas', 'Enterprise'].map((h, i) => (
                  <div key={i} className="text-sm font-bold text-center" style={{ color: i === 1 ? '#8b5cf6' : '#f1f5f9' }}>{h}</div>
                ))}
              </div>
              {TABLE_FEATURES.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 p-4 items-center"
                  style={{ borderBottom: i < TABLE_FEATURES.length - 1 ? '1px solid #1e2436' : 'none', background: i % 2 === 0 ? '#0f1117' : '#1a1f2e' }}
                >
                  <div className="text-sm" style={{ color: '#94a3b8' }}>{row.feature}</div>
                  {[row.empresas, row.especialistas, row.enterprise].map((val, j) => (
                    <div key={j} className="text-sm text-center font-medium" style={{ color: val === '✓' ? '#10b981' : val === '—' ? '#1e2436' : '#f1f5f9' }}>
                      {val}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Commission breakdown */}
      <section className="py-24" style={{ background: '#0f1117' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="Como funciona a" highlight="comissão de 15%" sub="Transparência total em cada projeto." />
          <Reveal delay={100}>
            <div className="rounded-2xl p-8" style={{ background: '#1a1f2e', border: '1px solid #1e2436' }}>
              {/* Flow */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                {[
                  { label: 'Empresa paga', value: '€5.000', color: '#6366f1', icon: '🏢' },
                  { arrow: true },
                  { label: 'Synk retém', value: '€750 (15%)', color: '#8b5cf6', icon: '🛡️' },
                  { arrow: true },
                  { label: 'Especialista recebe', value: '€4.250 (85%)', color: '#10b981', icon: '💰' },
                ].map((item, i) => (
                  item.arrow ? (
                    <div key={i} className="text-2xl font-bold hidden sm:block" style={{ color: '#1e2436' }}>→</div>
                  ) : (
                    <div key={i} className="flex-1 rounded-xl p-5 text-center" style={{ background: '#0f1117', border: `1px solid ${item.color}33` }}>
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="text-xs font-semibold mb-2" style={{ color: item.color }}>{item.label}</div>
                      <div className="font-bold text-lg" style={{ color: '#f1f5f9' }}>{item.value}</div>
                    </div>
                  )
                ))}
              </div>

              {/* Competitor comparison */}
              <h3 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#64748b' }}>Comparação com concorrentes</h3>
              <div className="space-y-3">
                {[
                  { name: 'Upwork', commission: 'até 20%', color: '#ef4444', width: 100 },
                  { name: 'Fiverr', commission: '20% fixo', color: '#f59e0b', width: 100 },
                  { name: 'Synk', commission: '15% fixo, sem taxas adicionais', color: '#10b981', width: 75 },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-20 text-sm font-medium flex-shrink-0" style={{ color: '#94a3b8' }}>{c.name}</div>
                    <div className="flex-1 h-2 rounded-full" style={{ background: '#1e2436' }}>
                      <div className="h-2 rounded-full" style={{ background: c.color, width: `${c.width}%` }} />
                    </div>
                    <div className="text-sm font-semibold flex-shrink-0" style={{ color: c.name === 'Synk' ? '#10b981' : '#94a3b8' }}>{c.commission}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24" style={{ background: '#0f1117' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="FAQ de" highlight="preços" />
          <FAQ faqs={FAQS_PRICING} />
        </div>
      </section>

      <CTABanner
        heading="Pronto para começar sem custos?"
        sub="Regista-te gratuitamente e descobre como a Synk pode transformar o teu negócio."
        primaryLabel="Começar Grátis"
        primaryTo="/registar"
        secondaryLabel="Ver como funciona"
        secondaryTo="/como-funciona"
      />
    </>
  )
}
