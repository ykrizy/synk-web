import Reveal from '@/components/ui/Reveal'

export default function SectionHeader({ eyebrow, heading, highlight, sub, center = true }) {
  return (
    <Reveal>
      <div className={`${center ? 'text-center' : ''} mb-16`}>
        {eyebrow && (
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#334155', letterSpacing: '0.1em' }}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className="text-3xl sm:text-4xl font-extrabold mb-4"
          style={{ color: '#e2e8f0', letterSpacing: '-0.03em' }}
        >
          {heading}{highlight && <> <span className="text-gradient">{highlight}</span></>}
        </h2>
        {sub && (
          <p
            className={`text-lg ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}
            style={{ color: '#475569', letterSpacing: '-0.01em' }}
          >
            {sub}
          </p>
        )}
      </div>
    </Reveal>
  )
}
