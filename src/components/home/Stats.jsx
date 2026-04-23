import AnimatedNumber from '@/components/ui/AnimatedNumber'
import Reveal from '@/components/ui/Reveal'

const STATS = [
  { value: 500, suffix: '+', label: 'Especialistas Verificados' },
  { value: 48, suffix: 'h', label: 'Tempo médio de match' },
  { value: 98, suffix: '%', label: 'Taxa de projetos concluídos' },
  { value: 15, suffix: '%', label: 'Comissão · sem taxas escondidas' },
]

export default function Stats() {
  return (
    <section
      className="py-20"
      style={{
        background: 'var(--bg-subtle)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p
            className="text-center text-xs font-semibold uppercase tracking-widest mb-12"
            style={{ color: 'var(--text-3)', letterSpacing: '0.1em' }}
          >
            Números que falam por si
          </p>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="text-center">
                <div
                  className="font-display text-gradient mb-2"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
                >
                  <AnimatedNumber end={s.value} suffix={s.suffix} />
                </div>
                <p className="text-sm" style={{ color: 'var(--text-2)', letterSpacing: '-0.01em' }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
