import AnimatedNumber from '@/components/ui/AnimatedNumber'
import Reveal from '@/components/ui/Reveal'

const STATS = [
  { value: 500, suffix: '+', label: 'Especialistas Verificados', icon: '👥' },
  { value: 48, suffix: 'h', label: 'Tempo médio de match', icon: '⚡' },
  { value: 98, suffix: '%', label: 'Taxa de projetos concluídos', icon: '✅' },
  { value: 15, suffix: '%', label: 'Comissão · sem taxas escondidas', icon: '💎' },
]

export default function Stats() {
  return (
    <section
      className="py-24"
      style={{ background: '#1a1f2e', borderTop: '1px solid #1e2436', borderBottom: '1px solid #1e2436' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-widest mb-12" style={{ color: '#64748b' }}>
            Números que falam por si
          </p>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="text-center">
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-4xl lg:text-5xl font-extrabold mb-2 text-gradient">
                  <AnimatedNumber end={s.value} suffix={s.suffix} />
                </div>
                <p className="text-sm" style={{ color: '#64748b' }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
