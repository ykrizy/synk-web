import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useMeta from '@/hooks/useMeta'
import useSmartCTA from '@/hooks/useSmartCTA'
import PageHero from '@/components/ui/PageHero'
import CTABanner from '@/components/ui/CTABanner'
import Reveal from '@/components/ui/Reveal'
import SectionHeader from '@/components/ui/SectionHeader'

/* ── Process types with reduction rates ── */
const PROCESS_TYPES = {
  invoices:   { label: 'Processamento de Faturas / Documentos', reduction: 0.80, complexity: 'medium' },
  emails:     { label: 'Gestão de Emails e Comunicações',        reduction: 0.70, complexity: 'simple' },
  reports:    { label: 'Relatórios e Dashboards',                reduction: 0.85, complexity: 'medium' },
  orders:     { label: 'Processamento de Encomendas',            reduction: 0.75, complexity: 'medium' },
  onboarding: { label: 'Onboarding de Clientes / Funcionários',  reduction: 0.65, complexity: 'complex' },
  sync:       { label: 'Sincronização de Dados entre Sistemas',  reduction: 0.90, complexity: 'complex' },
  scheduling: { label: 'Agendamentos e Follow-ups',              reduction: 0.75, complexity: 'simple' },
  accounting: { label: 'Reconciliação Contabilística',           reduction: 0.80, complexity: 'complex' },
}

const COMPLEXITY_MULTIPLIER = { simple: 30, medium: 50, complex: 70 }

/* ── Animated counter hook ── */
function useCountUp(target, duration = 1200, active = false) {
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current) return
    started.current = true
    const startTime = performance.now()

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(update)
      else setValue(target)
    }
    requestAnimationFrame(update)
  }, [active, target, duration])

  // Reset when target changes
  useEffect(() => {
    started.current = false
    setValue(0)
  }, [target])

  return value
}

/* ── Metric card with animated number ── */
function MetricCard({ label, value, suffix = '', prefix = '', color, icon, active, delay = 0 }) {
  const animated = useCountUp(value, 1200, active)
  return (
    <div
      className="rounded-xl p-6 text-center"
      style={{
        background: 'rgba(0,0,0,0.2)',
        border: `1px solid ${color}22`,
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      <div className="text-3xl lg:text-4xl font-extrabold mb-2" style={{ color, letterSpacing: '-0.04em' }}>
        {prefix}{animated.toLocaleString('pt-PT')}{suffix}
      </div>
      <div className="text-sm" style={{ color: 'var(--text-2)', letterSpacing: '-0.01em' }}>{label}</div>
    </div>
  )
}

/* ── Slider with live value ── */
function Slider({ label, helper, min, max, step, value, onChange, format }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium" style={{ color: 'var(--text-2)' }}>{label}</label>
        <span className="text-sm font-bold" style={{ color: 'var(--brand)' }}>{format(value)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step}
        value={value}
        onChange={e => onChange(+e.target.value)}
      />
      <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-2)' }}>
        <span>{format(min)}</span>
        {helper && <span style={{ color: 'var(--brand)' }}>{helper}</span>}
        <span>{format(max)}</span>
      </div>
    </div>
  )
}

/* ── Comparison bar ── */
function ComparisonBar({ label, value, maxValue, color, animated }) {
  const pct = maxValue > 0 ? Math.min((value / maxValue) * 100, 100) : 0
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1.5" style={{ color: 'var(--text-2)' }}>
        <span>{label}</span>
        <span className="font-bold" style={{ color }}>{value.toLocaleString('pt-PT')}h</span>
      </div>
      <div className="h-4 rounded-full" style={{ background: 'var(--bg)' }}>
        <div
          className="h-4 rounded-full flex items-center justify-end pr-2"
          style={{
            background: color,
            width: animated ? `${pct}%` : '0%',
            transition: 'width 1s ease',
            minWidth: animated && pct > 0 ? '20px' : '0',
          }}
        />
      </div>
    </div>
  )
}

/* ══════════════════════════════ */
export default function Calculadora() {
  const { empresaTo, genericTo, genericLabel } = useSmartCTA()
  useMeta({
    title: 'Calculadora de ROI',
    description: 'Calcula quanto tempo e dinheiro podes poupar com automação. Descobre o ROI real do teu projeto de automação.',
  })

  const [form, setForm] = useState({
    processType: 'invoices',
    hoursPerWeek: 10,
    people: 2,
    hourCost: 20,
    projectCost: 3000,
    autoEstimate: false,
  })
  const [results, setResults] = useState(null)
  const [showResults, setShowResults] = useState(false)

  /* Auto-estimate project cost based on complexity */
  const autoProjectCost = (() => {
    const proc = PROCESS_TYPES[form.processType]
    const mult = COMPLEXITY_MULTIPLIER[proc.complexity]
    const est = form.hoursPerWeek * form.people * mult
    return Math.min(30000, Math.max(500, Math.round(est / 500) * 500))
  })()

  const effectiveProjectCost = form.autoEstimate ? autoProjectCost : form.projectCost

  function calcROI() {
    const proc = PROCESS_TYPES[form.processType]
    const reduction = proc.reduction

    const horasAnuaisAtual = form.hoursPerWeek * form.people * 52
    const horasAnuaisApos = Math.round(horasAnuaisAtual * (1 - reduction))
    const horasPoupadas = horasAnuaisAtual - horasAnuaisApos
    const horasSemanaisPoupadas = Math.round(horasPoupadas / 52)

    const custoAtualAnual = horasAnuaisAtual * form.hourCost
    const custoAposAnual = horasAnuaisApos * form.hourCost
    const poupancaAnual = custoAtualAnual - custoAposAnual

    const roi = poupancaAnual > 0
      ? Math.round(((poupancaAnual - effectiveProjectCost) / effectiveProjectCost) * 100)
      : 0
    const paybackMeses = poupancaAnual > 0
      ? Math.max(1, Math.round(effectiveProjectCost / (poupancaAnual / 12)))
      : 999

    const equivalentPartTime = +(horasPoupadas / (52 * 20)).toFixed(1) // 20h/week part-time

    setResults({
      horasPoupadas,
      horasSemanaisPoupadas,
      poupancaAnual,
      roi,
      paybackMeses,
      custoAtualAnual,
      custoAposAnual,
      horasAnuaisAtual,
      horasAnuaisApos,
      equivalentPartTime,
      reduction: Math.round(reduction * 100),
      projectCost: effectiveProjectCost,
    })

    setShowResults(false)
    setTimeout(() => setShowResults(true), 80)
    setTimeout(() => {
      document.getElementById('roi-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const fmtEuro = v => `€${v.toLocaleString('pt-PT')}`
  const fmtH = v => `${v}h`
  const fmtN = v => `${v}`

  /* Budget suggestion range based on results */
  const budgetMin = results ? Math.round(results.projectCost * 0.8 / 500) * 500 : null
  const budgetMax = results ? Math.round(results.projectCost * 1.3 / 500) * 500 : null

  return (
    <>
      <PageHero
        badge="Calculadora de ROI"
        badgeVariant="badge-emerald"
        heading="Quanto tempo e dinheiro podes"
        highlight="poupar com automação?"
        sub="Insere os dados do teu processo atual e descobre o impacto real de o automatizar com a Twonect."
      />

      {/* Benchmarks */}
      <section className="py-16" style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: '60–85%', label: 'Redução média de tempo de processamento', color: '#34d399' },
              { value: '300–500%', label: 'ROI médio no primeiro ano', color: 'var(--brand-light)' },
              { value: '3–6 meses', label: 'Payback period típico', color: '#22d3ee' },
              { value: '80–95%', label: 'Redução de erros vs processos manuais', color: '#fbbf24' },
            ].map((b, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="card p-5 text-center">
                  <div className="text-xl font-extrabold mb-1" style={{ color: b.color, letterSpacing: '-0.02em' }}>{b.value}</div>
                  <div className="text-xs leading-relaxed" style={{ color: 'var(--text-2)', letterSpacing: '-0.01em' }}>{b.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="text-xs text-center mt-4" style={{ color: 'var(--text-2)' }}>
            Fonte: McKinsey Digital, Gartner 2025, Forrester Research
          </p>
        </div>
      </section>

      {/* Calculator form */}
      <section className="py-24" style={{ background: 'var(--surface)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold mb-3 tracking-tight" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
                O teu processo atual
              </h2>
              <p style={{ color: 'var(--text-2)' }}>Preenche os campos abaixo para calcular o impacto da automação.</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl p-8" style={{ background: 'var(--bg)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="space-y-8">
                {/* Process type */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-2)' }}>
                    Tipo de processo a automatizar
                  </label>
                  <select
                    className="form-input w-full"
                    value={form.processType}
                    onChange={e => setForm(f => ({ ...f, processType: e.target.value }))}
                  >
                    {Object.entries(PROCESS_TYPES).map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </select>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="badge badge-emerald">
                      Redução estimada: {Math.round(PROCESS_TYPES[form.processType].reduction * 100)}%
                    </span>
                    <span className="badge badge-indigo capitalize">
                      Complexidade: {PROCESS_TYPES[form.processType].complexity === 'simple' ? 'Simples' : PROCESS_TYPES[form.processType].complexity === 'medium' ? 'Média' : 'Alta'}
                    </span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <Slider
                    label="⏰ Horas gastas por semana"
                    min={1} max={80} step={1}
                    value={form.hoursPerWeek}
                    onChange={v => setForm(f => ({ ...f, hoursPerWeek: v }))}
                    format={fmtH}
                  />
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-2)' }}>
                      👥 Número de pessoas envolvidas
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setForm(f => ({ ...f, people: Math.max(1, f.people - 1) }))}
                        className="w-10 h-10 rounded-lg font-bold text-lg flex items-center justify-center"
                        style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.07)', color: 'var(--text)', cursor: 'pointer' }}
                      >−</button>
                      <div
                        className="flex-1 text-center text-2xl font-extrabold rounded-lg py-2"
                        style={{ background: 'var(--surface)', border: '1px solid #6366f1', color: 'var(--brand)' }}
                      >
                        {form.people}
                      </div>
                      <button
                        onClick={() => setForm(f => ({ ...f, people: Math.min(50, f.people + 1) }))}
                        className="w-10 h-10 rounded-lg font-bold text-lg flex items-center justify-center"
                        style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.07)', color: 'var(--text)', cursor: 'pointer' }}
                      >+</button>
                    </div>
                    <div className="text-xs mt-2 text-center" style={{ color: 'var(--text-2)' }}>1 a 50 pessoas</div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <Slider
                    label="💶 Custo médio por hora da equipa"
                    min={8} max={100} step={1}
                    value={form.hourCost}
                    onChange={v => setForm(f => ({ ...f, hourCost: v }))}
                    format={fmtEuro}
                  />
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium" style={{ color: 'var(--text-2)' }}>
                        🏷️ Custo estimado do projeto
                      </label>
                      <button
                        onClick={() => setForm(f => ({ ...f, autoEstimate: !f.autoEstimate }))}
                        className="text-xs px-2 py-1 rounded-lg font-semibold transition-all"
                        style={{
                          background: form.autoEstimate ? 'rgba(124,92,246,0.2)' : '#1e2436',
                          border: `1px solid ${form.autoEstimate ? '#6366f1' : '#1e2436'}`,
                          color: form.autoEstimate ? '#6366f1' : '#64748b',
                          cursor: 'pointer',
                        }}
                      >
                        {form.autoEstimate ? '✓ Auto' : 'Estimar auto'}
                      </button>
                    </div>
                    {form.autoEstimate ? (
                      <div
                        className="rounded-xl p-4 text-center"
                        style={{ background: 'rgba(124,92,246,0.08)', border: '1px solid rgba(124,92,246,0.3)' }}
                      >
                        <div className="text-2xl font-extrabold mb-1" style={{ color: 'var(--brand)' }}>
                          {fmtEuro(autoProjectCost)}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--text-2)' }}>Estimativa automática com base na complexidade</div>
                      </div>
                    ) : (
                      <Slider
                        label=""
                        helper="Sem certeza? Usa a estimativa auto"
                        min={500} max={30000} step={500}
                        value={form.projectCost}
                        onChange={v => setForm(f => ({ ...f, projectCost: v }))}
                        format={fmtEuro}
                      />
                    )}
                  </div>
                </div>

                <button
                  className="btn-primary btn-primary-lg w-full justify-center"
                  onClick={calcROI}
                  style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}
                >
                  Calcular Poupança
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M9 7l5 5-5 5" />
                  </svg>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Results */}
      {results && (
        <section
          id="roi-results"
          className="py-24"
          style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', scrollMarginTop: '80px' }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-12">
                <span className="badge badge-emerald mb-4">Resultados calculados</span>
                <h2
                  className="text-3xl font-extrabold tracking-tight"
                  style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
                >
                  O impacto real da automação
                </h2>
              </div>
            </Reveal>

            {/* 4 big metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              <MetricCard
                icon=""
                label="Horas poupadas por ano"
                value={results.horasPoupadas}
                suffix="h"
                color="#34d399"
                active={showResults}
                delay={0}
              />
              <MetricCard
                icon=""
                label="Poupança anual estimada"
                value={results.poupancaAnual}
                prefix="€"
                color="#22d3ee"
                active={showResults}
                delay={100}
              />
              <MetricCard
                icon=""
                label="ROI estimado"
                value={Math.max(0, results.roi)}
                suffix="%"
                color="#818cf8"
                active={showResults}
                delay={200}
              />
              <MetricCard
                icon=""
                label="Payback period"
                value={results.paybackMeses > 36 ? 36 : results.paybackMeses}
                suffix={results.paybackMeses > 36 ? '+ meses' : ' meses'}
                color="#fbbf24"
                active={showResults}
                delay={300}
              />
            </div>

            {/* Comparison chart + breakdown */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Before/after bars */}
              <div
                className="rounded-2xl p-6"
                style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <h3 className="font-bold mb-5" style={{ color: 'var(--text)' }}>
                  Comparação de horas anuais
                </h3>
                <ComparisonBar
                  label="Antes da automação"
                  value={results.horasAnuaisAtual}
                  maxValue={results.horasAnuaisAtual}
                  color="#ef4444"
                  animated={showResults}
                />
                <ComparisonBar
                  label="Depois da automação"
                  value={results.horasAnuaisApos}
                  maxValue={results.horasAnuaisAtual}
                  color="#10b981"
                  animated={showResults}
                />
                <div
                  className="mt-4 rounded-xl p-3 text-center"
                  style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}
                >
                  <span className="font-bold" style={{ color: '#10b981' }}>
                    ▼ {results.reduction}% redução · {results.horasSemanaisPoupadas}h poupadas por semana
                  </span>
                </div>
              </div>

              {/* Detailed breakdown */}
              <div
                className="rounded-2xl p-6"
                style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <h3 className="font-bold mb-5" style={{ color: 'var(--text)' }}>Breakdown detalhado</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Custo atual anual', value: `€${results.custoAtualAnual.toLocaleString('pt-PT')}`, color: '#ef4444' },
                    { label: 'Custo após automação', value: `€${results.custoAposAnual.toLocaleString('pt-PT')}`, color: '#10b981' },
                    { label: 'Investimento no projeto', value: `€${results.projectCost.toLocaleString('pt-PT')}`, color: 'var(--brand)' },
                    { label: 'Redução de erros estimada', value: '80–95%', color: '#f59e0b' },
                    { label: 'Horas libertadas / semana', value: `${results.horasSemanaisPoupadas}h`, color: '#06b6d4' },
                    { label: 'Equiv. a colaboradores part-time', value: `${results.equivalentPartTime} pessoa${results.equivalentPartTime !== 1 ? 's' : ''}`, color: '#8b5cf6' },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2"
                      style={{ borderBottom: i < 5 ? '1px solid #1e2436' : 'none' }}
                    >
                      <span className="text-sm" style={{ color: 'var(--text-2)' }}>{row.label}</span>
                      <span className="text-sm font-bold" style={{ color: row.color }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA inside results */}
            <div
              className="rounded-2xl p-8 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.08))',
                border: '1px solid rgba(16,185,129,0.3)',
                opacity: showResults ? 1 : 0,
                transform: showResults ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.5s ease 400ms, transform 0.5s ease 400ms',
              }}
            >
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-lg font-extrabold mb-2" style={{ color: 'var(--text)' }}>
                Com base nestes dados, recomendamos um projeto com orçamento entre{' '}
                <span style={{ color: '#10b981' }}>€{Math.round(results.projectCost * 0.8 / 500) * 500 > 500 ? (Math.round(results.projectCost * 0.8 / 500) * 500).toLocaleString('pt-PT') : 500}</span>
                {' '}e{' '}
                <span style={{ color: '#10b981' }}>€{(Math.round(results.projectCost * 1.3 / 500) * 500).toLocaleString('pt-PT')}</span>
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--text-2)' }}>
                Publica o teu projeto na Synk e recebe propostas de especialistas verificados em 48h.
              </p>
              <Link to={genericTo} className="btn-primary btn-primary-lg" style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}>
                {genericLabel} →
              </Link>
            </div>
          </div>
        </section>
      )}

      <CTABanner
        heading="Pronto para começar a poupar?"
        sub="Publica o teu projeto gratuitamente e recebe propostas de especialistas verificados em menos de 48 horas."
        primaryLabel="Publicar Projeto Grátis"
        primaryTo={empresaTo}
        secondaryLabel="Explorar o sistema de matching"
        secondaryTo="/matching"
      />
    </>
  )
}
