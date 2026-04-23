import { Link } from 'react-router-dom'
import Reveal from '@/components/ui/Reveal'

export default function PageHero({
  badge,
  badgeVariant = 'badge-indigo',
  heading,
  highlight,
  sub,
  primaryCTA,
  secondaryCTA,
  children,
}) {
  return (
    <section
      className="relative pt-28 pb-20 overflow-hidden"
      style={{ background: '#080b12' }}
    >
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {badge && (
          <Reveal>
            <div className={`inline-flex items-center badge ${badgeVariant} mb-6`}>{badge}</div>
          </Reveal>
        )}

        <Reveal delay={badge ? 80 : 0}>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5"
            style={{ color: '#e2e8f0', letterSpacing: '-0.035em', lineHeight: 1.1 }}
          >
            {heading}
            {highlight && (
              <>
                {' '}
                <span className="text-gradient">{highlight}</span>
              </>
            )}
          </h1>
        </Reveal>

        {sub && (
          <Reveal delay={badge ? 160 : 80}>
            <p
              className="text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
              style={{ color: '#475569', letterSpacing: '-0.01em' }}
            >
              {sub}
            </p>
          </Reveal>
        )}

        {(primaryCTA || secondaryCTA) && (
          <Reveal delay={200}>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
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
          </Reveal>
        )}

        {children && <Reveal delay={240}>{children}</Reveal>}
      </div>
    </section>
  )
}
