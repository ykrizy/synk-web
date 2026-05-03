import { useState, useEffect } from 'react'
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
    color: 'var(--brand-light)',
    raw: '#A78BFA',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Especialistas Verificados',
    desc: 'Cada especialista passa por uma avaliação técnica antes de entrar na plataforma.',
    color: 'var(--success-light)',
    raw: '#34D399',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Match em 48h',
    desc: 'O nosso algoritmo encontra os melhores candidatos para o teu projeto em menos de 48 horas.',
    color: 'var(--accent-light)',
    raw: '#FB923C',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Comunicação Integrada',
    desc: 'Gere toda a comunicação, ficheiros e milestones diretamente na plataforma.',
    color: '#67E8F9',
    raw: '#67E8F9',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Sistema de Avaliações',
    desc: 'Reviews verificados de projetos reais. Sabes sempre com quem estás a trabalhar.',
    color: 'var(--warning)',
    raw: '#F59E0B',
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
    color: '#C4B5FD',
    raw: '#C4B5FD',
  },
]

const TIMELINE_STEPS = [
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    label: 'Projeto publicado',
    detail: 'Automação ERP · TechCorp SA',
    time: '2 min',
    done: true,
    accent: 'rgba(124,92,246,0.8)',
    accentBg: 'rgba(124,92,246,0.12)',
    accentBorder: 'rgba(124,92,246,0.25)',
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: '4 propostas recebidas',
    detail: 'Especialistas verificados',
    time: '18h',
    done: true,
    accent: 'rgba(129,140,248,0.8)',
    accentBg: 'rgba(129,140,248,0.1)',
    accentBorder: 'rgba(129,140,248,0.2)',
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    label: 'Especialista selecionado',
    detail: 'Ana Costa · Rating 4.9★',
    time: '38h',
    done: true,
    accent: 'rgba(52,211,153,0.8)',
    accentBg: 'rgba(52,211,153,0.1)',
    accentBorder: 'rgba(52,211,153,0.2)',
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    label: 'Entrega em progresso',
    detail: '75% concluído · 3 dias restantes',
    time: 'Agora',
    done: false,
    accent: 'rgba(251,146,60,0.8)',
    accentBg: 'rgba(251,146,60,0.1)',
    accentBorder: 'rgba(251,146,60,0.2)',
  },
]

function ProjectTimeline() {
  const [activeStep, setActiveStep] = useState(3)

  useEffect(() => {
    const t = setInterval(() => {
      setActiveStep(prev => (prev + 1) % TIMELINE_STEPS.length)
    }, 3000)
    return () => clearInterval(t)
  }, [])

  const step = TIMELINE_STEPS[activeStep]

  return (
    <div
      className="w-full max-w-sm rounded-2xl overflow-hidden"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border-2)',
        boxShadow: '0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)',
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--brand)', boxShadow: '0 0 10px rgba(124,92,246,0.4)' }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="text-sm font-semibold" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Automação ERP
          </span>
        </div>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(251,146,60,0.12)', color: 'rgba(251,146,60,0.9)', border: '1px solid rgba(251,146,60,0.2)' }}
        >
          Em progresso
        </span>
      </div>

      {/* Timeline steps */}
      <div className="px-5 py-4">
        <div className="space-y-1">
          {TIMELINE_STEPS.map((s, i) => {
            const isActive = i === activeStep
            const isPast = s.done && !isActive
            return (
              <div key={i} className="relative">
                <div
                  className="flex items-start gap-3 rounded-xl px-3 py-3"
                  style={{
                    background: isActive ? s.accentBg : 'transparent',
                    border: `1px solid ${isActive ? s.accentBorder : 'transparent'}`,
                    transition: 'all 0.5s ease',
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: isActive ? s.accentBg : isPast ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.04)',
                      color: isActive ? s.accent : isPast ? 'rgba(52,211,153,0.7)' : 'var(--text-3)',
                      border: `1px solid ${isActive ? s.accentBorder : isPast ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.07)'}`,
                      transition: 'all 0.5s ease',
                    }}
                  >
                    {isPast ? (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : s.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs font-semibold"
                      style={{
                        color: isActive ? 'var(--text)' : isPast ? 'var(--text-2)' : 'var(--text-3)',
                        letterSpacing: '-0.01em',
                        transition: 'color 0.5s ease',
                      }}
                    >
                      {s.label}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>{s.detail}</p>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {isActive && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.accent }} />}
                    <span className="text-xs" style={{ color: isActive ? s.accent : 'var(--text-3)', transition: 'color 0.5s ease' }}>
                      {s.time}
                    </span>
                  </div>
                </div>

                {/* Connector line */}
                {i < TIMELINE_STEPS.length - 1 && (
                  <div
                    className="absolute left-[22px] ml-0.5"
                    style={{
                      top: '44px',
                      width: '1px',
                      height: '8px',
                      background: i < activeStep ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.07)',
                      transition: 'background 0.5s ease',
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'rgba(52,211,153,0.1)' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: '#34d399' }}>€2.800 em Escrow</p>
            <p className="text-xs" style={{ color: 'var(--text-3)' }}>Libertado na aprovação</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold" style={{ color: 'var(--text)' }}>TechCorp SA</p>
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>Ana Costa · 38h match</p>
        </div>
      </div>
    </div>
  )
}

export default function WhySynk() {
  return (
    <section id="features" className="py-24" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Features list */}
          <div>
            <Reveal>
              <h2
                className="font-display mb-4"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--text)' }}
              >
                Construído para que{' '}
                <span className="text-gradient">nada corra mal</span>
              </h2>
              <p className="mb-10 leading-relaxed" style={{ color: 'var(--text-2)', fontSize: '1.0625rem', letterSpacing: '-0.01em' }}>
                Cada detalhe foi pensado para proteger empresas e especialistas.
              </p>
            </Reveal>

            <div className="space-y-5">
              {FEATURES.map((f, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="flex gap-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${f.raw}12`, color: f.raw, border: `1px solid ${f.raw}20` }}
                    >
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="font-heading text-sm mb-1" style={{ color: 'var(--text)' }}>{f.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)', letterSpacing: '-0.01em' }}>{f.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Timeline mockup */}
          <Reveal delay={200}>
            <div className="flex justify-center">
              <ProjectTimeline />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
