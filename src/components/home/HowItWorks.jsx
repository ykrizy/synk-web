import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'

const STEPS = {
  empresas: [
    { icon: '🔍', title: 'Descreve o projeto', desc: 'Conta-nos que processo queres automatizar. O nosso sistema identifica o tipo de automação e sugere os melhores especialistas.', step: '01' },
    { icon: '⚡', title: 'Recebe propostas em 48h', desc: 'Compara perfis, portfolios, avaliações e preços. Fala diretamente com os candidatos antes de decidir.', step: '02' },
    { icon: '✅', title: 'Paga só quando aprovares', desc: 'O pagamento fica retido em Escrow até aprovares o trabalho. Zero risco para a tua empresa.', step: '03' },
  ],
  especialistas: [
    { icon: '🧑‍💻', title: 'Cria o teu perfil', desc: 'Mostra as tuas competências em automação, ferramentas que dominas e projetos anteriores. Verificação rápida em 24h.', step: '01' },
    { icon: '📩', title: 'Recebe projetos qualificados', desc: 'Recebe notificações de projetos que correspondem ao teu perfil. Sem spam, só oportunidades reais.', step: '02' },
    { icon: '💰', title: 'Recebe de forma segura', desc: 'Pagamento garantido via Escrow. Nunca trabalhas sem garantia de pagamento.', step: '03' },
  ],
}

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('empresas')

  return (
    <section id="como-funciona" className="py-24" style={{ background: '#0f1117' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight" style={{ color: '#f1f5f9', letterSpacing: '-0.02em' }}>
              Simples para empresas.{' '}
              <span className="text-gradient">Poderoso para especialistas.</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#94a3b8' }}>
              Um processo transparente do início ao fim, com proteção para ambas as partes.
            </p>
          </div>
        </Reveal>

        {/* Tab switcher */}
        <Reveal delay={100}>
          <div className="flex justify-center mb-12">
            <div className="flex rounded-xl p-1" style={{ background: '#1a1f2e', border: '1px solid #1e2436' }}>
              {['empresas', 'especialistas'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-btn px-6 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all`}
                  style={{ color: activeTab === tab ? '#fff' : '#94a3b8' }}
                >
                  {tab === 'empresas' ? 'Para Empresas' : 'Para Especialistas'}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS[activeTab].map((step, i) => (
            <Reveal key={`${activeTab}-${i}`} delay={i * 100}>
              <div className="card p-6 lg:p-8 relative h-full">
                <div
                  className="absolute top-6 right-6 select-none font-extrabold"
                  style={{ color: 'rgba(99,102,241,0.08)', fontSize: '60px' }}
                >
                  {step.step}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-lg font-bold mb-3" style={{ color: '#f1f5f9' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
