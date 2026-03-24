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
      style={{ background: 'linear-gradient(180deg, #0f1117 0%, #1a1f2e 100%)' }}
    >
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          style={{
            width: '600px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)' }}
          >
            <span className="text-xs font-semibold" style={{ color: '#6366f1' }}>
              ✦ Começa hoje, grátis
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight"
            style={{ color: '#f1f5f9', letterSpacing: '-0.02em' }}
          >
            {heading.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < heading.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="text-lg mb-10" style={{ color: '#94a3b8' }}>
            {sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={primaryTo} className="btn-primary btn-primary-lg">
              {primaryLabel}
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to={secondaryTo} className="btn-ghost" style={{ fontSize: '15px', padding: '14px 24px' }}>
              {secondaryLabel}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
