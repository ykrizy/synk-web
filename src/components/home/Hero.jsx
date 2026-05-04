import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useSmartCTA from '@/hooks/useSmartCTA'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

const SOCIAL_PROOF = [
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    text: 'Match em menos de 48h',
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    text: 'Pagamento protegido por Escrow',
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    text: 'Especialistas verificados',
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    text: 'Portugal · Espanha · LATAM',
  },
]

const ACTIVITY = [
  {
    dot: 'rgba(52,211,153,0.8)',
    label: 'Nova proposta recebida',
    sub: 'Automação RPA · Ana Costa · €2.800',
    time: '2 min',
    to: '/dashboard',
    tooltip: 'Ver proposta no Dashboard',
  },
  {
    dot: 'rgba(129,140,248,0.8)',
    label: 'Match encontrado em 38h',
    sub: 'Integração Zapier · Miguel Santos',
    time: '1h',
    to: '/marketplace?tab=projetos',
    tooltip: 'Ver projetos disponíveis',
  },
  {
    dot: 'rgba(52,211,153,0.8)',
    label: 'Projeto concluído com sucesso',
    sub: 'Power Automate · Avaliação 5★',
    time: '3h',
    to: '/marketplace?tab=especialistas',
    tooltip: 'Ver especialistas verificados',
  },
  {
    dot: 'rgba(167,139,250,0.8)',
    label: 'Pagamento libertado via Escrow',
    sub: 'GreenRetail SA · €4.500',
    time: '5h',
    to: '/dashboard',
    tooltip: 'Gerir pagamentos no Dashboard',
  },
]

function fmt(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K'
  return String(n)
}

function HeroMockup() {
  const [stats, setStats] = useState({ especialistas: '—', projetos: '—' })
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    Promise.all([
      supabase.from('especialistas').select('*', { count: 'exact', head: true }),
      supabase.from('projetos').select('*', { count: 'exact', head: true }).neq('estado', 'pendente_pagamento'),
    ]).then(([esp, proj]) => {
      setStats({
        especialistas: fmt(esp.count ?? 0),
        projetos: fmt(proj.count ?? 0),
      })
    }).catch(() => {})
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % ACTIVITY.length)
    }, 2400)
    return () => clearInterval(timer)
  }, [])

  const METRICS = [
    { value: stats.especialistas, label: 'Especialistas' },
    { value: stats.projetos, label: 'Projetos' },
    { value: '4.9★', label: 'Rating médio' },
    { value: '38h', label: 'Tempo de match' },
  ]

  return (
    <div className="relative" style={{ width: '380px', maxWidth: '100%' }}>
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border-2)',
          boxShadow: '0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px rgba(124,92,246,0.1)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--brand)', boxShadow: '0 0 10px rgba(124,92,246,0.5)' }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span className="font-display text-sm" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>Synk Platform</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#34d399' }} />
            <span className="text-xs font-semibold" style={{ color: '#34d399' }}>Ao vivo</span>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="flex flex-col items-center justify-center py-4"
              style={{ background: 'var(--surface)' }}
            >
              <span className="font-extrabold text-lg leading-none mb-1" style={{ color: 'var(--text)', letterSpacing: '-0.03em' }}>
                {m.value}
              </span>
              <span className="text-center leading-tight" style={{ color: 'var(--text-3)', fontSize: '10px', letterSpacing: '-0.01em' }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* Activity feed */}
        <div className="px-5 pt-4 pb-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-3)', letterSpacing: '0.06em' }}>
              Atividade recente
            </span>
            <Link
              to="/marketplace"
              style={{ textDecoration: 'none', color: 'var(--brand-light)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}
            >
              Ver tudo
              <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="space-y-1.5">
            {ACTIVITY.map((a, i) => {
              const isActive = i === activeIdx
              return (
                <Link
                  key={i}
                  to={a.to}
                  title={a.tooltip}
                  style={{ textDecoration: 'none', display: 'block' }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = isActive ? 'rgba(124,92,246,0.07)' : 'rgba(255,255,255,0.03)' }}
                >
                  <div
                    className="flex items-center gap-3 rounded-lg px-3 py-2 group"
                    style={{
                      background: isActive ? 'rgba(124,92,246,0.07)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isActive ? 'rgba(124,92,246,0.2)' : 'rgba(255,255,255,0.05)'}`,
                      transition: 'all 0.4s ease',
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{
                        background: a.dot,
                        boxShadow: isActive ? `0 0 6px ${a.dot}` : 'none',
                        transition: 'box-shadow 0.4s ease',
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: isActive ? 'var(--text)' : 'var(--text-2)', letterSpacing: '-0.01em', transition: 'color 0.4s ease' }}>
                        {a.label}
                      </p>
                      <p className="text-xs truncate mt-0.5" style={{ color: 'var(--text-3)' }}>
                        {a.sub}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: a.dot }} />
                      )}
                      <span className="text-xs" style={{ color: isActive ? 'var(--text-3)' : 'var(--text-3)' }}>{a.time}</span>
                      <svg
                        width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                        style={{ color: 'var(--text-3)', opacity: 0.5, flexShrink: 0 }}
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Footer bar */}
        <div
          className="flex items-center justify-between px-5 py-3 mt-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}
        >
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-xs font-medium" style={{ color: '#34d399' }}>Pagamentos protegidos por Escrow</span>
          </div>
          <span className="text-xs font-bold" style={{ color: 'var(--text-2)' }}>€1.2M+</span>
        </div>
      </div>

    </div>
  )
}

export default function Hero() {
  const { empresaTo, especialistaTo } = useSmartCTA()
  const { perfil } = useAuth()

  const isEspecialista = perfil === 'especialista'
  const isEmpresa = perfil === 'empresa'

  // Role-aware content
  const heroHeadingPart1 = isEspecialista ? 'Encontra os melhores' : 'Automatiza o teu'
  const heroHighlight = isEspecialista ? 'projetos de automação' : 'negócio com os'
  const heroHeadingPart2 = isEspecialista ? null : 'melhores especialistas'
  const heroSub = isEspecialista
    ? 'A Synk conecta-te a empresas que precisam das tuas competências. Projetos qualificados, pagamento garantido, sem intermediários desnecessários.'
    : 'A Synk conecta a tua empresa a especialistas em automação verificados. Encontra o profissional certo, lança o projeto e paga só quando estiveres satisfeito.'

  const primaryTo = isEspecialista ? especialistaTo : empresaTo
  const primaryLabel = isEspecialista ? 'Ver Projetos →' : isEmpresa ? 'Publicar Projeto →' : 'Publicar Projeto Grátis'
  const secondaryTo = isEspecialista || isEmpresa ? '/dashboard' : especialistaTo
  const secondaryLabel = isEspecialista || isEmpresa ? 'Ir para o Dashboard' : 'Sou Especialista'

  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 60% 30%, rgba(124,92,246,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Copy */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
              style={{ background: 'rgba(124,92,246,0.08)', border: '1px solid rgba(124,92,246,0.2)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--brand-light)' }} />
              <span className="text-xs font-semibold tracking-wide" style={{ color: 'var(--brand-light)', letterSpacing: '0.02em' }}>
                Marketplace B2B de Automação
              </span>
            </div>

            <h1
              className="font-display mb-6"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', color: 'var(--text)' }}
            >
              {heroHeadingPart1}{' '}
              <span className="text-gradient">{heroHighlight}</span>
              {heroHeadingPart2 && <>{' '}{heroHeadingPart2}</>}
            </h1>

            <p className="mb-10 leading-relaxed max-w-lg" style={{ color: 'var(--text-2)', fontSize: '1.125rem', letterSpacing: '-0.01em' }}>
              {heroSub}
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Link to={primaryTo} className="btn-primary btn-primary-lg">
                {primaryLabel}
                {!isEspecialista && !isEmpresa && (
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </Link>
              <Link to={secondaryTo} className="btn-outline">{secondaryLabel}</Link>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {SOCIAL_PROOF.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-3)' }}>
                  <span style={{ color: 'var(--brand-light)' }}>{item.icon}</span>
                  <span style={{ letterSpacing: '-0.01em' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="float-animation w-full max-w-sm">
              <HeroMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
