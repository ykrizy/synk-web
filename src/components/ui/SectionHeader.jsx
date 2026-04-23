import Reveal from '@/components/ui/Reveal'

export default function SectionHeader({ eyebrow, heading, highlight, sub, center = true }) {
  return (
    <Reveal>
      <div className={`${center ? 'text-center' : ''} mb-16`}>
        {eyebrow && (
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: 'var(--text-3)', letterSpacing: '0.1em' }}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className="font-display mb-4"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--text)' }}
        >
          {heading}{highlight && <> <span className="text-gradient">{highlight}</span></>}
        </h2>
        {sub && (
          <p
            className={`leading-relaxed ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}
            style={{ color: 'var(--text-2)', fontSize: '1.0625rem', letterSpacing: '-0.01em' }}
          >
            {sub}
          </p>
        )}
      </div>
    </Reveal>
  )
}
