import { Link } from 'react-router-dom'
import Reveal from '@/components/ui/Reveal'
import useSmartCTA from '@/hooks/useSmartCTA'

export default function CTABanner({
  heading = 'Pronto para automatizar o teu negócio?',
  sub = 'Junta-te a centenas de empresas que já estão a poupar tempo e dinheiro com a Synk.',
  primaryLabel = 'Publicar o Meu Projeto',
  primaryTo = null,
  secondaryLabel = 'Sou especialista, quero registar-me',
  secondaryTo = null,
}) {
  const { empresaTo, especialistaTo } = useSmartCTA()
  const resolvedPrimaryTo = primaryTo ?? empresaTo
  const resolvedSecondaryTo = secondaryTo ?? especialistaTo
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          style={{
            width: '700px',
            height: '350px',
            background: 'radial-gradient(ellipse, rgba(124,92,246,0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

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
              {primaryLabel}
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to={resolvedSecondaryTo} className="btn-ghost" style={{ fontSize: '14px', padding: '13px 24px' }}>
              {secondaryLabel}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
