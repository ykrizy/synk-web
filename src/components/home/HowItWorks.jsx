import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'

const ICONS = {
  search: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  bolt: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  check: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  user: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  inbox: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
  shield: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
}

const STEPS = {
  empresas: [
    { icon: ICONS.search, title: 'Descreve o projeto', desc: 'Conta-nos que processo queres automatizar. O nosso sistema identifica o tipo de automação e sugere os melhores especialistas.', step: '01' },
    { icon: ICONS.bolt, title: 'Recebe propostas em 48h', desc: 'Compara perfis, portfolios, avaliações e preços. Fala diretamente com os candidatos antes de decidir.', step: '02' },
    { icon: ICONS.check, title: 'Paga só quando aprovares', desc: 'O pagamento fica retido em Escrow até aprovares o trabalho. Zero risco para a tua empresa.', step: '03' },
  ],
  especialistas: [
    { icon: ICONS.user, title: 'Cria o teu perfil', desc: 'Mostra as tuas competências em automação, ferramentas que dominas e projetos anteriores. Verificação rápida em 24h.', step: '01' },
    { icon: ICONS.inbox, title: 'Recebe projetos qualificados', desc: 'Recebe notificações de projetos que correspondem ao teu perfil. Sem spam, só oportunidades reais.', step: '02' },
    { icon: ICONS.shield, title: 'Recebe de forma segura', desc: 'Pagamento garantido via Escrow. Nunca trabalhas sem garantia de pagamento.', step: '03' },
  ],
}

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('empresas')

  return (
    <section id="como-funciona" className="py-24" style={{ background: '#080b12' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-4"
              style={{ color: '#e2e8f0', letterSpacing: '-0.03em' }}
            >
              Simples para empresas.{' '}
              <span className="text-gradient">Poderoso para especialistas.</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: '#475569', letterSpacing: '-0.01em' }}>
              Um processo transparente do início ao fim, com proteção para ambas as partes.
            </p>
          </div>
        </Reveal>

        {/* Tab switcher */}
        <Reveal delay={100}>
          <div className="flex justify-center mb-12">
            <div
              className="flex rounded-xl p-1"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {['empresas', 'especialistas'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="tab-btn px-6 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all"
                  style={{ color: activeTab === tab ? '#fff' : '#475569', letterSpacing: '-0.01em' }}
                >
                  {tab === 'empresas' ? 'Para Empresas' : 'Para Especialistas'}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {STEPS[activeTab].map((step, i) => (
            <Reveal key={`${activeTab}-${i}`} delay={i * 80}>
              <div className="card p-7 relative h-full">
                <div
                  className="absolute top-6 right-6 select-none font-extrabold"
                  style={{ color: 'rgba(99,102,241,0.06)', fontSize: '64px', letterSpacing: '-0.04em' }}
                >
                  {step.step}
                </div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }}
                >
                  {step.icon}
                </div>
                <h3 className="text-base font-bold mb-3" style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#475569', letterSpacing: '-0.01em' }}>{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
