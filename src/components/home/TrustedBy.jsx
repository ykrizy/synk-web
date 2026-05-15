import Reveal from '@/components/ui/Reveal'

const COMPANIES = [
  { name: 'TechRetail', abbr: 'TR' },
  { name: 'LogísticaExpress', abbr: 'LE' },
  { name: 'FinancialHub', abbr: 'FH' },
  { name: 'IberiaSoft', abbr: 'IS' },
  { name: 'DataFlow', abbr: 'DF' },
  { name: 'CloudBridge', abbr: 'CB' },
  { name: 'NexaGroup', abbr: 'NG' },
  { name: 'PrimeTech', abbr: 'PT' },
]

export default function TrustedBy() {
  const doubled = [...COMPANIES, ...COMPANIES]

  return (
    <section
      className="py-16"
      style={{ borderTop: '1px solid #1e2436', borderBottom: '1px solid #1e2436', background: '#0f1117' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-sm font-medium uppercase tracking-widest mb-10" style={{ color: '#64748b' }}>
            Empresas que já automatizaram com a Twonect
          </p>
        </Reveal>

        <div
          className="overflow-hidden"
          style={{ maskImage: 'linear-gradient(90deg, transparent 0%, #000 15%, #000 85%, transparent 100%)' }}
        >
          <div className="marquee-track">
            {doubled.map((c, i) => (
              <div key={i} className="flex items-center gap-3 mx-8 flex-shrink-0">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{ background: '#1a1f2e', border: '1px solid #1e2436', color: '#64748b' }}
                >
                  {c.abbr}
                </div>
                <span className="text-base font-semibold whitespace-nowrap" style={{ color: '#64748b' }}>
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
