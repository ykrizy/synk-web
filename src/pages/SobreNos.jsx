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
    color: 'var(--brand)',
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
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Confiança primeiro',
    desc: 'Cada feature que construímos começa com a pergunta: "Isto torna a plataforma mais segura e transparente para ambas as partes?"',
    color: 'var(--brand-light)',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Velocidade com qualidade',
    desc: 'Acreditamos que rapidez e qualidade não são opostos. O nosso processo de verificação garante ambos.',
    color: '#fbbf24',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Mercado ibérico, ambição global',
    desc: 'Começamos em Portugal porque é onde estamos. Mas o problema é global.',
    color: '#34d399',
  },
]

const STATS = [
  { value: 30, suffix: '+', label: 'Especialistas Verificados' },
  { value: 10, suffix: '', label: 'Projetos Piloto Concluídos' },
  { value: 48, suffix: 'h', label: 'Tempo médio de match' },
  { value: 3, suffix: '', label: 'Co-fundadores apaixonados pelo problema' },
]

const JOBS = ['Engenheiro Full-Stack', 'Community Manager', 'Sales (Espanha)']

const CONTACTS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email geral',
    email: 'hello@synk.pt',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: 'Parcerias',
    email: 'partnerships@synk.pt',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    label: 'Imprensa',
    email: 'press@synk.pt',
  },
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
      <section className="py-24" style={{ background: 'var(--bg)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div
              className="rounded-2xl p-8 lg:p-12 mb-16 text-center"
              style={{
                background: 'rgba(124,92,246,0.04)',
                border: '1px solid rgba(124,92,246,0.2)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(124,92,246,0.12)', color: 'var(--brand-light)', border: '1px solid rgba(124,92,246,0.2)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <blockquote
                className="text-lg sm:text-xl leading-relaxed italic"
                style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}
              >
                "A nossa missão é democratizar o acesso à automação empresarial — para que qualquer PME, independentemente da dimensão, possa competir com as grandes empresas através da tecnologia certa, implementada pelas pessoas certas."
              </blockquote>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-4">
            {VALUES.map((v, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="card p-6 h-full">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${v.color}12`, color: v.color, border: `1px solid ${v.color}20` }}
                  >
                    {v.icon}
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)', letterSpacing: '-0.01em' }}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="Quem está por trás" highlight="da Synk" />
          <div className="grid md:grid-cols-3 gap-5">
            {TEAM.map((member, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="card p-8 text-center h-full flex flex-col">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-lg mx-auto mb-5"
                    style={{
                      background: `linear-gradient(135deg, ${member.color}, ${member.color}88)`,
                      color: '#fff',
                      boxShadow: `0 8px 32px ${member.color}30`,
                    }}
                  >
                    {member.initials}
                  </div>
                  <h3 className="font-extrabold text-base mb-1" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>{member.name}</h3>
                  <div className="badge badge-indigo mb-3 mx-auto">{member.role}</div>
                  <p className="text-xs mb-4" style={{ color: 'var(--text-3)' }}>{member.focus}</p>
                  <blockquote className="text-sm italic flex-1" style={{ color: 'var(--text-2)', letterSpacing: '-0.01em' }}>
                    "{member.quote}"
                  </blockquote>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24" style={{ background: 'var(--bg)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="Como chegámos" highlight="aqui" />
          <div className="space-y-6">
            {TIMELINE.map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="timeline-item pb-6">
                  <div className="timeline-dot" style={{ fontSize: '9px' }}>{i + 1}</div>
                  <div className="card p-5" style={{ opacity: item.future ? 0.55 : 1 }}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="badge badge-indigo">{item.year}</span>
                      <h3 className="font-bold" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>{item.title}</h3>
                      {item.future && <span className="badge badge-amber">Em breve</span>}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)', letterSpacing: '-0.01em' }}>{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="py-20"
        style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="text-center">
                  <div
                    className="text-4xl font-extrabold mb-2 text-gradient"
                    style={{ letterSpacing: '-0.04em' }}
                  >
                    <AnimatedNumber end={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-2)', letterSpacing: '-0.01em' }}>{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="py-24" style={{ background: 'var(--bg)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div
              className="rounded-2xl p-8 mb-16"
              style={{
                background: 'linear-gradient(135deg, rgba(124,92,246,0.06), rgba(139,92,246,0.06))',
                border: '1px solid rgba(124,92,246,0.2)',
              }}
            >
              <h2
                className="text-2xl font-extrabold mb-3"
                style={{ color: 'var(--text)', letterSpacing: '-0.03em' }}
              >
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
                Ver posições abertas
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </Reveal>

          {/* Contact */}
          <SectionHeader heading="Fala" highlight="connosco" center={false} />
          <div className="grid sm:grid-cols-3 gap-4">
            {CONTACTS.map((c, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="card p-5 text-center">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: 'rgba(124,92,246,0.1)', color: 'var(--brand-light)', border: '1px solid rgba(124,92,246,0.2)' }}
                  >
                    {c.icon}
                  </div>
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: 'var(--text-3)', letterSpacing: '0.08em' }}
                  >
                    {c.label}
                  </div>
                  <a
                    href={`mailto:${c.email}`}
                    className="text-sm font-medium"
                    style={{ color: 'var(--brand-light)', textDecoration: 'none', letterSpacing: '-0.01em' }}
                  >
                    {c.email}
                  </a>
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
