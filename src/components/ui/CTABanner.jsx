import { Link } from 'react-router-dom'
import Reveal from '@/components/ui/Reveal'
import useSmartCTA from '@/hooks/useSmartCTA'

export default function CTABanner({
  heading = 'Pronto para automatizar o teu negócio?',
  sub = 'Junta-te a centenas de empresas que já estão a poupar tempo e dinheiro com a Twonect.',
  primaryLabel = null,
  primaryTo = null,
  secondaryLabel = null,
  secondaryTo = null,
}) {
  const { empresaTo, especialistaTo, primaryLabel: smartPrimary, secondaryLabel: smartSecondary } = useSmartCTA()
  const resolvedPrimaryTo = primaryTo ?? empresaTo
  const resolvedSecondaryTo = secondaryTo ?? especialistaTo
  const resolvedPrimaryLabel = primaryLabel ?? smartPrimary
  const resolvedSecondaryLabel = secondaryLabel ?? smartSecondary
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="orb-drift"
          style={{
            position: 'absolute', top: '-30%', left: '20%',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(124,92,246,0.12) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }}
        />
        <div
          className="orb-drift-2"
          style={{
            position: 'absolute', bottom: '-20%', right: '15%',
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />
      </div>
      {/* Top border glow */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(124,92,246,0.5), transparent)' }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
            style={{ background: 'rgba(124,92,246,0.08)', border: '1px solid rgba(124,92,246,0.2)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ backgroundColor: 'var(--brand-light)' }} />
            <span className="text-xs font-semibold" style={{ color: 'var(--brand-light)', letterSpacing: '0.02em' }}>
              Começa hoje, gratuitamente
            </span>
          </div>
          <h2
            className="font-display mb-5"
            style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', color: 'var(--text)' }}
          >
            {heading.split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="mb-10 leading-relaxed" style={{ color: 'var(--text-2)', fontSize: '1.0625rem', letterSpacing: '-0.01em' }}>
            {sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={resolvedPrimaryTo} className="btn-primary btn-primary-lg">
              {resolvedPrimaryLabel}
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to={resolvedSecondaryTo} className="btn-ghost" style={{ fontSize: '14px', padding: '13px 24px' }}>
              {resolvedSecondaryLabel}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
