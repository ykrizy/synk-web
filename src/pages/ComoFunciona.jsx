import { Link } from 'react-router-dom'
import useMeta from '@/hooks/useMeta'
import PageHero from '@/components/ui/PageHero'
import SectionHeader from '@/components/ui/SectionHeader'
import FAQ from '@/components/ui/FAQ'
import CTABanner from '@/components/ui/CTABanner'
import Reveal from '@/components/ui/Reveal'

const EMPRESAS_STEPS = [
  { num: '01', icon: '🆓', title: 'Registo gratuito', desc: 'Cria a tua conta em menos de 2 minutos. Não precisas de cartão de crédito para começar.' },
  { num: '02', icon: '📝', title: 'Descreve o teu projeto', desc: 'Usa o nosso formulário guiado para descrever o que queres automatizar, prazo e orçamento estimado. O nosso sistema categoriza automaticamente o tipo de automação necessária.' },
  { num: '03', icon: '⚡', title: 'Recebe propostas em 48h', desc: 'Especialistas verificados submetem propostas com preço, timeline e abordagem. Tu decides com quem trabalhar.' },
  { num: '04', icon: '💬', title: 'Colabora na plataforma', desc: 'Comunica, partilha ficheiros, define milestones e acompanha o progresso — tudo no mesmo lugar.' },
  { num: '05', icon: '✅', title: 'Aprova e paga', desc: 'O pagamento em Escrow só é libertado quando aprovares o trabalho. Se algo não correr bem, mediamos a resolução.' },
]

const ESPECIALISTAS_STEPS = [
  { num: '01', icon: '🧑‍💻', title: 'Candidatura ao perfil', desc: 'Preenche o teu perfil com competências, ferramentas que dominas e portfolio. A nossa equipa verifica em 24h.' },
  { num: '02', icon: '🎯', title: 'Verificação técnica', desc: 'Consoante a tua área, podes ser convidado a fazer uma avaliação técnica curta para garantir qualidade na plataforma.' },
  { num: '03', icon: '🔔', title: 'Ativa notificações', desc: 'Define as tuas preferências: tipo de projetos, valor mínimo, disponibilidade. Só recebes alertas relevantes.' },
  { num: '04', icon: '📩', title: 'Submete propostas', desc: 'Quando encontrares um projeto interessante, submete a tua proposta com abordagem, timeline e preço.' },
  { num: '05', icon: '💰', title: 'Entrega e recebe', desc: 'Trabalha com o cliente na plataforma. O pagamento está garantido por Escrow — nunca trabalbes sem proteção.' },
]

const FAQS = [
  {
    q: 'Posso cancelar um projeto a meio?',
    a: 'Sim, com acordo entre ambas as partes. A Synk medeia a devolução proporcional do valor em Escrow, tendo em conta o trabalho já realizado.',
  },
  {
    q: 'O que acontece se o especialista não entregar?',
    a: 'Abrimos uma disputa e mediamos a resolução. Na pior das hipóteses, o valor é devolvido integralmente à empresa. O nosso sistema de reputação também penaliza especialistas que não cumprem.',
  },
  {
    q: 'Há limite de projetos?',
    a: 'Não. Podes ter múltiplos projetos ativos em simultâneo — tanto do lado empresa como especialista. A plataforma foi desenhada para gerir vários projetos em paralelo.',
  },
]

function Timeline({ steps }) {
  return (
    <div className="space-y-6">
      {steps.map((step, i) => (
        <Reveal key={i} delay={i * 80}>
          <div className="timeline-item pb-6">
            <div className="timeline-dot">{step.num}</div>
            <div className="card p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{step.icon}</span>
                <div>
                  <h3 className="font-bold text-base mb-1" style={{ color: '#f1f5f9' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{step.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export default function ComoFunciona() {
  useMeta({
    title: 'Como Funciona',
    description: 'Descobre como conectamos empresas a especialistas em automação em menos de 48 horas.',
  })

  return (
    <>
      <PageHero
        heading="Do problema à solução"
        highlight="em 3 passos"
        sub="Desenhamos cada detalhe para que empresas e especialistas se encontrem rapidamente, trabalhem com confiança e obtenham resultados reais."
      />

      {/* Fluxo Empresas */}
      <section className="py-24" style={{ background: '#0f1117' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-12">
              <span className="badge badge-indigo">Para Empresas</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#f1f5f9', letterSpacing: '-0.02em' }}>
                Como publicar e contratar
              </h2>
            </div>
          </Reveal>
          <Timeline steps={EMPRESAS_STEPS} />
        </div>
      </section>

      {/* Fluxo Especialistas */}
      <section className="py-24" style={{ background: '#1a1f2e', borderTop: '1px solid #1e2436' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-12">
              <span className="badge badge-violet">Para Especialistas</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#f1f5f9', letterSpacing: '-0.02em' }}>
                Como entrar e receber
              </h2>
            </div>
          </Reveal>
          <Timeline steps={ESPECIALISTAS_STEPS} />
        </div>
      </section>

      {/* Escrow explanation */}
      <section className="py-24" style={{ background: '#0f1117' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div
              className="rounded-2xl p-8 lg:p-12"
              style={{ background: '#1a1f2e', border: '1px solid rgba(99,102,241,0.3)', boxShadow: '0 0 40px rgba(99,102,241,0.08)' }}
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-6" style={{ color: '#f1f5f9', letterSpacing: '-0.02em' }}>
                O que é o Escrow e{' '}
                <span className="text-gradient">porque te protege</span>
              </h2>

              {/* Escrow diagram */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                {[
                  { label: 'Empresa deposita', icon: '🏢', color: '#6366f1' },
                  { label: '→', arrow: true },
                  { label: 'Synk retém', icon: '🛡️', color: '#8b5cf6' },
                  { label: '→', arrow: true },
                  { label: 'Especialista recebe após aprovação', icon: '💰', color: '#10b981' },
                ].map((item, i) => (
                  item.arrow ? (
                    <div key={i} className="text-2xl font-bold hidden sm:block" style={{ color: '#1e2436' }}>→</div>
                  ) : (
                    <div
                      key={i}
                      className="flex-1 rounded-xl p-4 text-center"
                      style={{ background: '#0f1117', border: `1px solid ${item.color}33` }}
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="text-xs font-semibold" style={{ color: item.color }}>{item.label}</div>
                    </div>
                  )
                ))}
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: '#94a3b8' }}>
                O Escrow é um sistema de pagamento onde os fundos ficam retidos por um intermediário (a Synk) até que ambas as partes cumpram os termos acordados. É o padrão de segurança em marketplaces profissionais como Upwork e Fiverr Business.
              </p>

              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}
              >
                <span style={{ color: '#10b981' }}>🔒</span>
                <span className="text-sm font-semibold" style={{ color: '#10b981' }}>Powered by Stripe</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mini FAQ */}
      <section className="py-24" style={{ background: '#0f1117' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeader heading="Dúvidas" highlight="rápidas" />
          <FAQ faqs={FAQS} />
        </div>
      </section>

      <CTABanner
        heading="Pronto para começar?"
        sub="Publica o teu primeiro projeto gratuitamente ou regista-te como especialista em minutos."
        primaryLabel="Publicar Projeto"
        primaryTo="/registar"
        secondaryLabel="Registar como Especialista"
        secondaryTo="/registar"
      />
    </>
  )
}
