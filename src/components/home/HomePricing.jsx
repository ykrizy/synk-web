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

export default function HomePricing() {
  return (
    <section id="precos" className="py-24" style={{ background: '#0f1117' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          heading="Transparência total."
          highlight="Sem surpresas."
          sub="Pagamos apenas quando um projeto é concluído com sucesso."
        />

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Empresas */}
          <Reveal delay={100}>
            <div className="card p-8 flex flex-col h-full">
              <span className="badge badge-indigo mb-4">Para Empresas</span>
              <div className="text-3xl font-extrabold mb-3" style={{ color: '#f1f5f9' }}>Grátis para publicar</div>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: '#94a3b8' }}>
                Publica projetos, recebe propostas e fala com especialistas sem qualquer custo. Só pagas quando contratares.
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {EMPRESAS_BENEFITS.map((b, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm" style={{ color: '#94a3b8' }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1' }}>✓</span>
                    {b}
                  </li>
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
              className="relative flex flex-col h-full rounded-xl p-8"
              style={{ background: '#1a1f2e', border: '1px solid rgba(99,102,241,0.4)', boxShadow: '0 0 40px rgba(99,102,241,0.12)' }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="badge px-4 py-1" style={{ boxShadow: '0 0 20px rgba(99,102,241,0.4)', background: '#6366f1', color: '#fff', borderColor: 'transparent' }}>
                  ✦ Mais Popular
                </span>
              </div>
              <span className="badge badge-violet mb-4 mt-2">Para Especialistas</span>
              <div className="text-3xl font-extrabold mb-1" style={{ color: '#f1f5f9' }}>15% de comissão</div>
              <div className="text-sm mb-3 font-medium" style={{ color: '#8b5cf6' }}>Só pagas quando recebes</div>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: '#94a3b8' }}>
                Sem mensalidades, sem taxas de subscrição. A nossa comissão só é cobrada quando és pago.
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {ESPECIALISTAS_BENEFITS.map((b, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm" style={{ color: '#94a3b8' }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: 'rgba(139,92,246,0.15)', color: '#8b5cf6' }}>✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              <Link to="/registar" className="btn-primary btn-primary-lg" style={{ textAlign: 'center', justifyContent: 'center' }}>
                Criar Perfil
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <div className="text-center mt-8">
            <Link to="/precos" className="text-sm font-medium" style={{ color: '#6366f1', textDecoration: 'none' }}>
              Ver comparação completa de planos →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
