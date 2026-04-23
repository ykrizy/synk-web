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
      style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p
            className="text-center text-xs font-semibold uppercase tracking-widest mb-12"
            style={{ color: '#334155', letterSpacing: '0.1em' }}
          >
            Números que falam por si
          </p>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="text-center">
                <div
                  className="text-4xl lg:text-5xl font-extrabold mb-2 text-gradient"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  <AnimatedNumber end={s.value} suffix={s.suffix} />
                </div>
                <p className="text-sm" style={{ color: '#475569', letterSpacing: '-0.01em' }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
