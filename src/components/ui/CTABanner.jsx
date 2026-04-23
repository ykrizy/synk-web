import { Link } from 'react-router-dom'
import Reveal from '@/components/ui/Reveal'

export default function CTABanner({
  heading = 'Pronto para automatizar o teu negócio?',
  sub = 'Junta-te a centenas de empresas que já estão a poupar tempo e dinheiro com a Synk.',
  primaryLabel = 'Publicar o Meu Projeto',
  primaryTo = '/registar',
  secondaryLabel = 'Sou especialista, quero registar-me',
  secondaryTo = '/registar',
}) {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: '#080b12', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          style={{
            width: '700px',
            height: '350px',
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
            style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#818cf8' }} />
            <span className="text-xs font-semibold" style={{ color: '#818cf8', letterSpacing: '0.02em' }}>
              Começa hoje, gratuitamente
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5"
            style={{ color: '#e2e8f0', letterSpacing: '-0.035em' }}
          >
            {heading.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < heading.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="text-lg mb-10" style={{ color: '#475569', letterSpacing: '-0.01em' }}>
            {sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={primaryTo} className="btn-primary btn-primary-lg">
              {primaryLabel}
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to={secondaryTo} className="btn-ghost" style={{ fontSize: '14px', padding: '13px 24px' }}>
              {secondaryLabel}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
