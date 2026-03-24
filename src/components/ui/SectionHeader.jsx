import Reveal from '@/components/ui/Reveal'

export default function SectionHeader({ eyebrow, heading, highlight, sub, center = true }) {
  return (
    <Reveal>
      <div className={`${center ? 'text-center' : ''} mb-16`}>
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#64748b' }}>
            {eyebrow}
          </p>
        )}
        <h2
          className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight"
          style={{ color: '#f1f5f9', letterSpacing: '-0.02em' }}
        >
          {heading}{highlight && <> <span className="text-gradient">{highlight}</span></>}
        </h2>
        {sub && (
          <p className={`text-lg ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`} style={{ color: '#94a3b8' }}>
            {sub}
          </p>
        )}
      </div>
    </Reveal>
  )
}
