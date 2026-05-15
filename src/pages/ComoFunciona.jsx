import { Link } from 'react-router-dom'
import useMeta from '@/hooks/useMeta'
import PageHero from '@/components/ui/PageHero'
import SectionHeader from '@/components/ui/SectionHeader'
import FAQ from '@/components/ui/FAQ'
import CTABanner from '@/components/ui/CTABanner'
import Reveal from '@/components/ui/Reveal'

const EMPRESAS_STEPS = [
  { num: '01', title: 'Registo gratuito', desc: 'Cria a tua conta em menos de 2 minutos. Não precisas de cartão de crédito para começar.' },
  { num: '02', title: 'Descreve o teu projeto', desc: 'Usa o nosso formulário guiado para descrever o que queres automatizar, prazo e orçamento estimado. O nosso sistema categoriza automaticamente o tipo de automação necessária.' },
  { num: '03', title: 'Recebe propostas em 48h', desc: 'Especialistas verificados submetem propostas com preço, timeline e abordagem. Tu decides com quem trabalhar.' },
  { num: '04', title: 'Colabora na plataforma', desc: 'Comunica, partilha ficheiros, define milestones e acompanha o progresso — tudo no mesmo lugar.' },
  { num: '05', title: 'Aprova e paga', desc: 'O pagamento em Escrow só é libertado quando aprovares o trabalho. Se algo não correr bem, mediamos a resolução.' },
]

const ESPECIALISTAS_STEPS = [
  { num: '01', title: 'Candidatura ao perfil', desc: 'Preenche o teu perfil com competências, ferramentas que dominas e portfolio. A nossa equipa verifica em 24h.' },
  { num: '02', title: 'Verificação técnica', desc: 'Consoante a tua área, podes ser convidado a fazer uma avaliação técnica curta para garantir qualidade na plataforma.' },
  { num: '03', title: 'Ativa notificações', desc: 'Define as tuas preferências: tipo de projetos, valor mínimo, disponibilidade. Só recebes alertas relevantes.' },
  { num: '04', title: 'Submete propostas', desc: 'Quando encontrares um projeto interessante, submete a tua proposta com abordagem, timeline e preço.' },
  { num: '05', title: 'Entrega e recebe', desc: 'Trabalha com o cliente na plataforma. O pagamento está garantido por Escrow — nunca trabalbes sem proteção.' },
]

const FAQS = [
  {
    q: 'Posso cancelar um projeto a meio?',
    a: 'Sim, com acordo entre ambas as partes. A Twonect medeia a devolução proporcional do valor em Escrow, tendo em conta o trabalho já realizado.',
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
        <Reveal key={i} delay={i * 70}>
          <div className="timeline-item pb-6">
            <div className="timeline-dot" style={{ fontSize: '9px' }}>{step.num}</div>
            <div className="card p-5">
              <h3 className="font-bold text-base mb-1" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)', letterSpacing: '-0.01em' }}>{step.desc}</p>
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
      <section className="py-24" style={{ background: 'var(--bg)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-12">
              <span className="badge badge-indigo">Para Empresas</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: 'var(--text)', letterSpacing: '-0.03em' }}>
                Como publicar e contratar
              </h2>
            </div>
          </Reveal>
          <Timeline steps={EMPRESAS_STEPS} />
        </div>
      </section>

      {/* Fluxo Especialistas */}
      <section className="py-24" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-12">
              <span className="badge badge-violet">Para Especialistas</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: 'var(--text)', letterSpacing: '-0.03em' }}>
                Como entrar e receber
              </h2>
            </div>
          </Reveal>
          <Timeline steps={ESPECIALISTAS_STEPS} />
        </div>
      </section>

      {/* Escrow explanation */}
      <section className="py-24" style={{ background: 'var(--bg)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div
              className="rounded-2xl p-8 lg:p-12"
              style={{
                background: 'rgba(124,92,246,0.04)',
                border: '1px solid rgba(124,92,246,0.2)',
              }}
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-6" style={{ color: 'var(--text)', letterSpacing: '-0.03em' }}>
                O que é o Escrow e{' '}
                <span className="text-gradient">porque te protege</span>
              </h2>

              {/* Escrow diagram */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                {[
                  {
                    label: 'Empresa deposita',
                    color: 'var(--brand-light)',
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                    ),
                  },
                  { arrow: true },
                  {
                    label: 'Twonect retém',
                    color: '#a78bfa',
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    ),
                  },
                  { arrow: true },
                  {
                    label: 'Especialista recebe após aprovação',
                    color: '#34d399',
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                    ),
                  },
                ].map((item, i) =>
                  item.arrow ? (
                    <div key={i} className="hidden sm:flex items-center" style={{ color: 'rgba(255,255,255,0.15)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  ) : (
                    <div
                      key={i}
                      className="flex-1 rounded-xl p-4 text-center"
                      style={{ background: 'rgba(0,0,0,0.25)', border: `1px solid ${item.color}20` }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                        style={{ background: `${item.color}15`, color: item.color }}
                      >
                        {item.icon}
                      </div>
                      <div className="text-xs font-semibold" style={{ color: item.color, letterSpacing: '-0.01em' }}>{item.label}</div>
                    </div>
                  )
                )}
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-2)', letterSpacing: '-0.01em' }}>
                O Escrow é um sistema de pagamento onde os fundos ficam retidos por um intermediário (a Twonect) até que ambas as partes cumpram os termos acordados. É o padrão de segurança em marketplaces profissionais globais.
              </p>

              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span className="text-sm font-semibold" style={{ color: '#34d399' }}>Powered by Stripe</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mini FAQ */}
      <section className="py-24" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
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
