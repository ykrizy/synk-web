import { Link } from 'react-router-dom'

export default function PageHero({ badge, badgeVariant = 'badge-brand', heading, highlight, sub, primaryCTA, secondaryCTA }) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Ambient top glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-15%', left: '50%', transform: 'translateX(-50%)',
          width: '75%', height: '65%',
          background: 'radial-gradient(ellipse, rgba(124,92,246,0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 30%, transparent 100%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {badge && (
          <div className="mb-6 flex justify-center">
            <span className={`badge ${badgeVariant}`}>{badge}</span>
          </div>
        )}

        <h1
          className="font-display mb-6"
          style={{ fontSize: 'clamp(2.1rem, 5vw, 3.5rem)', color: 'var(--text)' }}
        >
          {heading}{' '}
          {highlight && <span className="text-gradient">{highlight}</span>}
        </h1>

        {sub && (
          <p
            className="mx-auto mb-10 leading-relaxed"
            style={{ color: 'var(--text-2)', fontSize: '1.0625rem', maxWidth: 540, letterSpacing: '-0.01em' }}
          >
            {sub}
          </p>
        )}

        {(primaryCTA || secondaryCTA) && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {primaryCTA && (
              <Link to={primaryCTA.to} className="btn-primary btn-primary-lg">
                {primaryCTA.label}
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            )}
            {secondaryCTA && (
              <Link to={secondaryCTA.to} className="btn-outline">
                {secondaryCTA.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
