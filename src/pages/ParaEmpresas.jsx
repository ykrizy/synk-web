import { useState } from 'react'
import { Link } from 'react-router-dom'
import useMeta from '@/hooks/useMeta'
import PageHero from '@/components/ui/PageHero'
import SectionHeader from '@/components/ui/SectionHeader'
import CTABanner from '@/components/ui/CTABanner'
import Reveal from '@/components/ui/Reveal'

const PAINS = [
  { icon: '🕐', title: 'Demasiado tempo em tarefas repetitivas', desc: 'A tua equipa passa horas em processos que podiam estar automatizados.', variant: 'badge-amber' },
  { icon: '💸', title: 'Contratar full-time é caro e lento', desc: 'Um especialista interno custa €40K+/ano. Um projeto de automação pode custar €2.000.', variant: 'badge-amber' },
  { icon: '🔍', title: 'Difícil encontrar quem saiba o que preciso', desc: '"Automação" é vago. Não sabes se precisas de RPA, Make, Python ou IA.', variant: 'badge-amber' },
  { icon: '🤝', title: 'Medo de pagar e não receber', desc: 'Já pagaste a um freelancer e o resultado foi dececionante? Com Escrow isso não acontece.', variant: 'badge-red' },
  { icon: '📋', title: 'Projetos sem gestão estruturada', desc: 'Email vai e vem, ficheiros perdem-se, prazos falham.', variant: 'badge-amber' },
  { icon: '🌍', title: 'Pouco acesso a talento especializado', desc: 'Portugal é pequeno. Os melhores especialistas podem estar em Espanha ou no Brasil.', variant: 'badge-cyan' },
]

const PERSONAS = [
  { icon: '🏪', title: 'Retalho & E-commerce', desc: 'Automatiza inventário, fulfillment, email marketing e relatórios de vendas.' },
  { icon: '🏢', title: 'Serviços Profissionais', desc: 'Automatiza faturação, CRM, onboarding de clientes e reporting.' },
  { icon: '🏭', title: 'Indústria & Logística', desc: 'Integra sistemas ERP/WMS, automatiza encomendas e rastreio de entregas.' },
]

const STEPS_3 = [
  { num: '1', title: 'Descreve o que precisas', sub: '2 min', icon: '📝' },
  { num: '2', title: 'Recebe propostas', sub: '48h', icon: '⚡' },
  { num: '3', title: 'Começa o projeto', sub: 'Esta semana', icon: '🚀' },
]

function ROICalculator() {
  const [hours, setHours] = useState(10)
  const [hourCost, setHourCost] = useState(25)

  const annualCost = hours * hourCost * 52
  const automationCost = Math.min(8000, Math.max(2000, Math.round((hours * hourCost * 1.8) / 500) * 500))
  const paybackMonths = Math.max(1, Math.ceil(automationCost / (annualCost / 12)))
  const firstYearSavings = Math.max(0, annualCost - automationCost)

  const fmt = (v) => `€${v.toLocaleString('pt-PT')}`

  return (
    <div className="rounded-2xl p-8" style={{ background: '#1a1f2e', border: '1px solid #1e2436' }}>
      <div className="grid md:grid-cols-2 gap-10">
        {/* Inputs */}
        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-3">
              <label className="text-sm font-semibold" style={{ color: '#f1f5f9' }}>Horas semanais em tarefas manuais</label>
              <span className="text-sm font-bold" style={{ color: '#6366f1' }}>{hours}h</span>
            </div>
            <input
              type="range" min="1" max="40" value={hours}
              onChange={e => setHours(+e.target.value)}
              style={{ '--progress': `${((hours - 1) / 39) * 100}%` }}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: '#64748b' }}>
              <span>1h</span><span>40h</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-3">
              <label className="text-sm font-semibold" style={{ color: '#f1f5f9' }}>Custo hora da tua equipa</label>
              <span className="text-sm font-bold" style={{ color: '#6366f1' }}>€{hourCost}</span>
            </div>
            <input
              type="range" min="10" max="100" value={hourCost}
              onChange={e => setHourCost(+e.target.value)}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: '#64748b' }}>
              <span>€10</span><span>€100</span>
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="space-y-4">
          {[
            { label: 'Custo anual do problema', value: fmt(annualCost), color: '#ef4444', icon: '📉' },
            { label: 'Custo estimado de automação', value: fmt(automationCost), color: '#f59e0b', icon: '⚙️' },
            { label: 'Payback em', value: `${paybackMonths} meses`, color: '#06b6d4', icon: '📅' },
            { label: 'Poupança no 1º ano', value: fmt(firstYearSavings), color: '#10b981', icon: '💰' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl p-4"
              style={{ background: '#0f1117', border: `1px solid ${item.color}22` }}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm" style={{ color: '#94a3b8' }}>{item.label}</span>
              </div>
              <span className="font-bold text-sm" style={{ color: item.color }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 text-center" style={{ borderTop: '1px solid #1e2436' }}>
        <p className="text-xs mb-4" style={{ color: '#64748b' }}>* Valores estimados com base em médias do mercado ibérico</p>
        <Link to="/registar" className="btn-primary btn-primary-lg">
          Automatizar agora →
        </Link>
      </div>
    </div>
  )
}

export default function ParaEmpresas() {
  useMeta({
    title: 'Para Empresas',
    description: 'Encontra especialistas em automação verificados para o teu negócio. Rápido, seguro e sem risco.',
  })

  return (
    <>
      <PageHero
        badge="Para Empresas"
        badgeVariant="badge-indigo"
        heading="Para de perder tempo em"
        highlight="processos manuais"
        sub="Conecta-te a especialistas em automação que transformam os teus processos em menos de uma semana. Sem risco, sem contrato de longo prazo."
        primaryCTA={{ label: 'Publicar Projeto Grátis', to: '/registar' }}
      />

      {/* Problemas */}
      <section className="py-24" style={{ background: '#0f1117' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="Reconheces algum" highlight="destes problemas?" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PAINS.map((p, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="card p-6 h-full">
                  <div className="text-3xl mb-4">{p.icon}</div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: '#f1f5f9' }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios alternados */}
      <section className="py-24" style={{ background: '#1a1f2e', borderTop: '1px solid #1e2436' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="O que a Synk" highlight="faz por ti" />

          {[
            {
              title: 'Especialistas verificados, sem surpresas',
              body: 'Cada especialista passa por uma avaliação técnica antes de entrar na plataforma. Vês o portfolio, as avaliações reais de projetos anteriores e o tempo médio de resposta.',
              visual: (
                <div className="card-no-hover rounded-xl p-6" style={{ background: '#0f1117' }}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff' }}>MS</div>
                    <div>
                      <div className="font-bold text-sm" style={{ color: '#f1f5f9' }}>Miguel Santos</div>
                      <div className="text-xs" style={{ color: '#94a3b8' }}>RPA & Workflow Specialist</div>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <span style={{ color: '#f59e0b' }}>★</span>
                      <span className="font-bold text-sm" style={{ color: '#f1f5f9' }}>4.9</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="badge badge-emerald">✓ Verificado</span>
                    <span className="badge badge-indigo">47 projetos</span>
                    <span className="badge badge-cyan">RPA</span>
                  </div>
                  <div className="flex justify-between text-xs" style={{ color: '#64748b' }}>
                    <span>Tempo de resposta: &lt;2h</span>
                    <span>Taxa de sucesso: 100%</span>
                  </div>
                </div>
              ),
            },
            {
              title: 'Proposta em 48h, projeto em dias',
              body: 'Publica o projeto hoje. Amanhã já tens propostas de especialistas qualificados. Em média, os projetos começam dentro de 3 a 5 dias após publicação.',
              visual: (
                <div className="card-no-hover rounded-xl p-6" style={{ background: '#0f1117' }}>
                  {[
                    { label: 'Projeto publicado', time: 'Hoje', done: true },
                    { label: 'Primeiras propostas', time: '+24h', done: true },
                    { label: 'Escolha do especialista', time: '+48h', done: false },
                    { label: 'Início do projeto', time: '+72h', done: false },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4 mb-3 last:mb-0">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: step.done ? '#10b981' : '#1e2436', color: step.done ? '#fff' : '#64748b' }}>
                        {step.done ? '✓' : i + 1}
                      </div>
                      <span className="text-sm flex-1" style={{ color: step.done ? '#f1f5f9' : '#64748b' }}>{step.label}</span>
                      <span className="badge badge-emerald">{step.time}</span>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              title: 'Pagamento 100% protegido',
              body: 'O dinheiro só sai quando tu approvas. O sistema Escrow da Synk garante que nunca perdes o investimento — mesmo que o projeto não corra como esperado.',
              visual: (
                <div className="card-no-hover rounded-xl p-6" style={{ background: '#0f1117' }}>
                  <div className="flex flex-col gap-3">
                    {[
                      { step: '1', label: 'Empresa deposita', desc: 'Pagamento retido pela Synk', color: '#6366f1' },
                      { step: '2', label: 'Trabalho em progresso', desc: 'Especialista executa o projeto', color: '#8b5cf6' },
                      { step: '3', label: 'Aprovação da empresa', desc: 'Empresa revê e aprova', color: '#06b6d4' },
                      { step: '4', label: 'Pagamento libertado', desc: 'Especialista recebe automaticamente', color: '#10b981' },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: s.color, color: '#fff' }}>{s.step}</div>
                        <div>
                          <div className="text-xs font-semibold" style={{ color: '#f1f5f9' }}>{s.label}</div>
                          <div className="text-xs" style={{ color: '#64748b' }}>{s.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            },
          ].map((block, i) => (
            <Reveal key={i} delay={100}>
              <div className={`grid md:grid-cols-2 gap-10 items-center mb-20 last:mb-0 ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}>
                <div className={i % 2 === 1 ? 'md:[direction:ltr]' : ''}>
                  <h3 className="text-xl sm:text-2xl font-extrabold mb-4" style={{ color: '#f1f5f9', letterSpacing: '-0.02em' }}>{block.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{block.body}</p>
                </div>
                <div className={i % 2 === 1 ? 'md:[direction:ltr]' : ''}>{block.visual}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Personas */}
      <section className="py-24" style={{ background: '#0f1117' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="Feito para PMEs que querem" highlight="crescer sem contratar" />
          <div className="grid md:grid-cols-3 gap-6">
            {PERSONAS.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="card p-6 text-center">
                  <div className="text-4xl mb-4">{p.icon}</div>
                  <h3 className="font-bold mb-2" style={{ color: '#f1f5f9' }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-24" style={{ background: '#1a1f2e', borderTop: '1px solid #1e2436' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader heading="Quanto podes poupar" highlight="com automação?" />
          <Reveal delay={100}>
            <ROICalculator />
          </Reveal>
        </div>
      </section>

      {/* 3 passos simples */}
      <section className="py-24" style={{ background: '#0f1117' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader heading="Como publicar" highlight="um projeto" sub="Rápido, simples e sem compromisso." />
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {STEPS_3.map((s, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="card p-6 text-center">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <div className="text-sm font-bold mb-1" style={{ color: '#f1f5f9' }}>{s.title}</div>
                  <div className="badge badge-emerald">{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <Link to="/registar" className="btn-primary btn-primary-lg">
              Publicar o Meu Primeiro Projeto — É Grátis
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </Reveal>
        </div>
      </section>

      <CTABanner
        heading="Pronto para automatizar o teu negócio?"
        sub="Publica o teu projeto gratuitamente e recebe propostas de especialistas verificados em menos de 48 horas."
        primaryLabel="Publicar Projeto Grátis"
        primaryTo="/registar"
        secondaryLabel="Saber mais sobre como funciona"
        secondaryTo="/como-funciona"
      />
    </>
  )
}
