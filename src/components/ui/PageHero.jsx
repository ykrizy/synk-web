import { Link } from 'react-router-dom'
import Reveal from '@/components/ui/Reveal'

/**
 * Reusable inner-page hero.
 * Props:
 *  badge        – string | null
 *  badgeVariant – 'badge-indigo' | 'badge-violet' | 'badge-emerald' …
 *  heading      – string (plain part before highlight)
 *  highlight    – string | null (gradient part, appended after heading)
 *  sub          – string | null
 *  primaryCTA   – { label, to } | null
 *  secondaryCTA – { label, to } | null
 *  children     – extra content below CTAs
 */
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
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #1a1f2e 0%, #0f1117 60%)' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
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
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 tracking-tight"
            style={{ color: '#f1f5f9', letterSpacing: '-0.03em' }}
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
            <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: '#94a3b8' }}>
              {sub}
            </p>
          </Reveal>
        )}

        {(primaryCTA || secondaryCTA) && (
          <Reveal delay={200}>
            <div className="flex flex-wrap gap-4 justify-center mt-2">
              {primaryCTA && (
                <Link to={primaryCTA.to} className="btn-primary btn-primary-lg">
                  {primaryCTA.label}
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
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
