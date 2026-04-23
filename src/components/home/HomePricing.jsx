import { Link } from 'react-router-dom'
import Reveal from '@/components/ui/Reveal'
import SectionHeader from '@/components/ui/SectionHeader'

const EMPRESAS_BENEFITS = [
  'Publicação de projetos gratuita',
  'Propostas ilimitadas',
  'Escrow incluído',
  'Suporte dedicado',
  'Dashboard de gestão',
]

const ESPECIALISTAS_BENEFITS = [
  'Perfil gratuito',
  'Candidatura a projetos ilimitados',
  'Pagamento garantido',
  'Sem taxa mensal',
  'Suporte prioritário',
]

function CheckRow({ children, color }) {
  return (
    <li className="flex items-center gap-3 text-sm" style={{ color: '#475569', letterSpacing: '-0.01em' }}>
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      {children}
    </li>
  )
}

export default function HomePricing() {
  return (
    <section id="precos" className="py-24" style={{ background: '#080b12' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          heading="Transparência total."
          highlight="Sem surpresas."
          sub="Sem mensalidades, sem taxas escondidas. A Synk só ganha quando tu ganhas."
        />

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {/* Empresas */}
          <Reveal delay={100}>
            <div className="card p-8 flex flex-col h-full">
              <span className="badge badge-indigo mb-5">Para Empresas</span>
              <div
                className="text-3xl font-extrabold mb-2"
                style={{ color: '#e2e8f0', letterSpacing: '-0.03em' }}
              >
                Grátis para publicar
              </div>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: '#475569', letterSpacing: '-0.01em' }}>
                Publica projetos, recebe propostas e fala com especialistas sem qualquer custo.
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {EMPRESAS_BENEFITS.map((b, i) => (
                  <CheckRow key={i} color="#818cf8">{b}</CheckRow>
                ))}
              </ul>
              <Link to="/registar" className="btn-outline" style={{ textAlign: 'center', justifyContent: 'center' }}>
                Publicar Projeto
              </Link>
            </div>
          </Reveal>

          {/* Especialistas — highlighted */}
          <Reveal delay={200}>
            <div
              className="relative flex flex-col h-full rounded-2xl p-8"
              style={{
                background: 'rgba(99,102,241,0.04)',
                border: '1px solid rgba(99,102,241,0.3)',
                boxShadow: '0 0 60px rgba(99,102,241,0.1)',
              }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span
                  className="badge px-4 py-1"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                    color: '#fff',
                    borderColor: 'transparent',
                    boxShadow: '0 0 24px rgba(99,102,241,0.5)',
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                  }}
                >
                  Mais Popular
                </span>
              </div>
              <span className="badge badge-violet mb-5 mt-2">Para Especialistas</span>
              <div
                className="text-3xl font-extrabold mb-1"
                style={{ color: '#e2e8f0', letterSpacing: '-0.03em' }}
              >
                15% de comissão
              </div>
              <div className="text-sm mb-3 font-medium" style={{ color: '#a78bfa' }}>Só pagas quando recebes</div>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: '#475569', letterSpacing: '-0.01em' }}>
                Sem mensalidades, sem taxas de subscrição. A nossa comissão só é cobrada quando és pago.
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {ESPECIALISTAS_BENEFITS.map((b, i) => (
                  <CheckRow key={i} color="#a78bfa">{b}</CheckRow>
                ))}
              </ul>
              <Link
                to="/registar"
                className="btn-primary btn-primary-lg"
                style={{ textAlign: 'center', justifyContent: 'center' }}
              >
                Criar Perfil
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <div className="text-center mt-8">
            <Link
              to="/precos"
              className="text-sm font-medium"
              style={{ color: '#6366f1', textDecoration: 'none', letterSpacing: '-0.01em' }}
            >
              Ver comparação completa de planos →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
