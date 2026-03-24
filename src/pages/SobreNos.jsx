import { Link } from 'react-router-dom'
import useMeta from '@/hooks/useMeta'
import PageHero from '@/components/ui/PageHero'
import SectionHeader from '@/components/ui/SectionHeader'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import CTABanner from '@/components/ui/CTABanner'
import Reveal from '@/components/ui/Reveal'

const TEAM = [
  {
    initials: 'KS',
    name: 'Khalid Shah',
    role: 'Co-founder & CEO',
    focus: 'Estratégia, parcerias e crescimento',
    quote: 'Acredito que automação vai redefinir como as PMEs competem.',
    color: '#6366f1',
  },
  {
    initials: 'DP',
    name: 'Daniel Pinto',
    role: 'Co-founder & CTO',
    focus: 'Produto, tecnologia e plataforma',
    quote: 'Cada linha de código deve criar valor real para quem usa a plataforma.',
    color: '#06b6d4',
  },
  {
    initials: 'CP',
    name: 'Cristiano Pereira',
    role: 'Co-founder & COO',
    focus: 'Operações, especialistas e qualidade',
    quote: 'A qualidade dos especialistas é a nossa maior vantagem competitiva.',
    color: '#8b5cf6',
  },
]

const TIMELINE = [
  { year: '2025', title: 'A ideia', desc: 'Identificámos o problema: empresas sem acesso fácil a especialistas de automação. Começámos a pesquisa de mercado.' },
  { year: 'Jan 2026', title: 'O MVP', desc: 'Primeiros 30 especialistas verificados. Primeiros 10 projetos concluídos com sucesso.' },
  { year: 'Mar 2026', title: 'Lançamento', desc: 'Synk abre ao público em Portugal.' },
  { year: '2026 →', title: 'Próximo passo', desc: 'Expansão para Espanha e mercado ibérico.', future: true },
]

const VALUES = [
  { icon: '🔒', title: 'Confiança primeiro', desc: 'Cada feature que construímos começa com a pergunta: "Isto torna a plataforma mais segura e transparente para ambas as partes?"' },
  { icon: '⚡', title: 'Velocidade com qualidade', desc: 'Acreditamos que rapidez e qualidade não são opostos. O nosso processo de verificação garante ambos.' },
  { icon: '🌍', title: 'Mercado ibérico, ambição global', desc: 'Começamos em Portugal porque é onde estamos. Mas o problema é global.' },
]

const STATS = [
  { value: 30, suffix: '+', label: 'Especialistas Verificados', icon: '👥' },
  { value: 10, suffix: '', label: 'Projetos Piloto Concluídos', icon: '✅' },
  { value: 48, suffix: 'h', label: 'Tempo médio de match', icon: '⚡' },
  { value: 3, suffix: '', label: 'Co-fundadores apaixonados pelo problema', icon: '❤️' },
]

const JOBS = ['Engenheiro Full-Stack', 'Community Manager', 'Sales (Espanha)']

const CONTACTS = [
  { icon: '📧', label: 'Email geral', email: 'hello@synk.pt' },
  { icon: '💼', label: 'Parcerias', email: 'partnerships@synk.pt' },
  { icon: '📰', label: 'Imprensa', email: 'press@synk.pt' },
]

export default function SobreNos() {
  useMeta({
    title: 'Sobre Nós',
    description: 'Conhece a equipa por trás do marketplace de automação empresarial para PMEs ibéricas.',
  })

  return (
    <>
      <PageHero
        heading="Construídos por empreendedores,"
        highlight="para empreendedores"
        sub="Vimos em primeira mão como as PMEs perdem tempo e dinheiro em processos manuais enquanto os especialistas certos estão a um clique de distância. A Synk existe para fechar essa distância."
      />

      {/* Mission */}
      <section className="py-24" style={{ background: '#0f1117' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div
              className="rounded-2xl p-8 lg:p-12 mb-16"
              style={{ background: '#1a1f2e', border: '1px solid rgba(99,102,241,0.3)', boxShadow: '0 0 40px rgba(99,102,241,0.06)' }}
            >
              <div className="text-4xl mb-6 text-center">🎯</div>
              <blockquote className="text-lg sm:text-xl leading-relaxed text-center italic" style={{ color: '#f1f5f9' }}>
                "A nossa missão é democratizar o acesso à automação empresarial — para que qualquer PME, independentemente da dimensão, possa competir com as grandes empresas através da tecnologia certa, implementada pelas pessoas certas."
              </blockquote>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="card p-6 h-full">
                  <div className="text-3xl mb-4">{v.icon}</div>
                  <h3 className="font-bold mb-2" style={{ color: '#f1f5f9' }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24" style={{ background: '#1a1f2e', borderTop: '1px solid #1e2436' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="Quem está por trás" highlight="da Synk" />
          <div className="grid md:grid-cols-3 gap-6">
            {TEAM.map((member, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="card p-8 text-center h-full flex flex-col">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center font-extrabold text-xl mx-auto mb-5"
                    style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}88)`, color: '#fff', boxShadow: `0 0 30px ${member.color}33` }}
                  >
                    {member.initials}
                  </div>
                  <h3 className="font-extrabold text-lg mb-1" style={{ color: '#f1f5f9' }}>{member.name}</h3>
                  <div className="badge badge-indigo mb-3 mx-auto">{member.role}</div>
                  <p className="text-xs mb-4" style={{ color: '#64748b' }}>{member.focus}</p>
                  <blockquote className="text-sm italic flex-1" style={{ color: '#94a3b8' }}>
                    "{member.quote}"
                  </blockquote>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24" style={{ background: '#0f1117' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="Como chegámos" highlight="aqui" />
          <div className="space-y-6">
            {TIMELINE.map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="timeline-item pb-6">
                  <div className="timeline-dot" style={{ fontSize: '9px' }}>{i + 1}</div>
                  <div
                    className="card p-5"
                    style={{ opacity: item.future ? 0.6 : 1 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="badge badge-indigo">{item.year}</span>
                      <h3 className="font-bold" style={{ color: '#f1f5f9' }}>{item.title}</h3>
                      {item.future && <span className="badge badge-amber">Em breve</span>}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20" style={{ background: '#1a1f2e', borderTop: '1px solid #1e2436', borderBottom: '1px solid #1e2436' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="text-center">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <div className="text-4xl font-extrabold mb-2 text-gradient">
                    <AnimatedNumber end={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-sm" style={{ color: '#64748b' }}>{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="py-24" style={{ background: '#0f1117' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div
              className="rounded-2xl p-8 mb-16"
              style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))', border: '1px solid rgba(99,102,241,0.3)' }}
            >
              <h2 className="text-2xl font-extrabold mb-3" style={{ color: '#f1f5f9', letterSpacing: '-0.02em' }}>
                Estamos a construir algo grande.{' '}
                <span className="text-gradient">Junta-te a nós.</span>
              </h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {JOBS.map((job, i) => (
                  <span key={i} className="badge badge-indigo">{job}</span>
                ))}
              </div>
              <a
                href="mailto:hello@synk.pt?subject=Candidatura Synk"
                className="btn-primary"
                style={{ textDecoration: 'none' }}
              >
                Ver posições abertas →
              </a>
            </div>
          </Reveal>

          {/* Contact */}
          <SectionHeader heading="Fala" highlight="connosco" center={false} />
          <div className="grid sm:grid-cols-3 gap-4">
            {CONTACTS.map((c, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="card p-5 text-center">
                  <div className="text-2xl mb-2">{c.icon}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#64748b' }}>{c.label}</div>
                  <a href={`mailto:${c.email}`} className="text-sm font-medium" style={{ color: '#6366f1', textDecoration: 'none' }}>{c.email}</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Pronto para fazer parte da Synk?"
        sub="Seja como empresa, especialista ou membro da equipa — há um lugar para ti."
        primaryLabel="Começar agora"
        primaryTo="/registar"
        secondaryLabel="Falar connosco"
        secondaryTo="/sobre-nos"
      />
    </>
  )
}
