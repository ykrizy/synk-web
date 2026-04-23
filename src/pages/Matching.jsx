import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useMeta from '@/hooks/useMeta'
import PageHero from '@/components/ui/PageHero'
import CTABanner from '@/components/ui/CTABanner'
import Reveal from '@/components/ui/Reveal'
import SectionHeader from '@/components/ui/SectionHeader'

/* ── Specialists database ── */
const SPECIALISTS = [
  {
    id: 1,
    name: 'Ana Rodrigues',
    title: 'Especialista Make & Zapier',
    initials: 'AR',
    avatarColor: '#6366f1',
    tools: ['Zapier', 'Make'],
    sectors: ['E-commerce', 'Retalho'],
    pricePerHour: 45,
    rating: 4.9,
    reviewCount: 23,
    availableIn: 0,
    minBudget: 500,
    maxBudget: 8000,
  },
  {
    id: 2,
    name: 'Carlos Ferreira',
    title: 'Consultor RPA & UiPath Enterprise',
    initials: 'CF',
    avatarColor: '#06b6d4',
    tools: ['UiPath', 'RPA'],
    sectors: ['Logística', 'Finanças'],
    pricePerHour: 75,
    rating: 4.7,
    reviewCount: 31,
    availableIn: 5,
    minBudget: 3000,
    maxBudget: 20000,
  },
  {
    id: 3,
    name: 'Sofia Mendes',
    title: 'Python & Integração de APIs',
    initials: 'SM',
    avatarColor: '#10b981',
    tools: ['Python', 'Integração de APIs', 'API'],
    sectors: ['Tecnologia', 'Saúde'],
    pricePerHour: 65,
    rating: 4.8,
    reviewCount: 18,
    availableIn: 0,
    minBudget: 1000,
    maxBudget: 15000,
  },
  {
    id: 4,
    name: 'João Barbosa',
    title: 'Power Automate & Microsoft 365',
    initials: 'JB',
    avatarColor: '#8b5cf6',
    tools: ['Power Automate', 'Make'],
    sectors: ['Finanças', 'Retalho'],
    pricePerHour: 55,
    rating: 4.6,
    reviewCount: 42,
    availableIn: 3,
    minBudget: 500,
    maxBudget: 10000,
  },
  {
    id: 5,
    name: 'Marta Silva',
    title: 'Zapier & n8n · Workflow Automation',
    initials: 'MS',
    avatarColor: '#f59e0b',
    tools: ['Zapier', 'n8n'],
    sectors: ['E-commerce', 'Saúde'],
    pricePerHour: 40,
    rating: 4.9,
    reviewCount: 15,
    availableIn: 0,
    minBudget: 500,
    maxBudget: 5000,
  },
  {
    id: 6,
    name: 'Pedro Costa',
    title: 'RPA Enterprise · UiPath & Blue Prism',
    initials: 'PC',
    avatarColor: '#ef4444',
    tools: ['UiPath', 'RPA', 'Power Automate'],
    sectors: ['Logística', 'Indústria'],
    pricePerHour: 80,
    rating: 4.8,
    reviewCount: 27,
    availableIn: 7,
    minBudget: 5000,
    maxBudget: 20000,
  },
  {
    id: 7,
    name: 'Rita Alves',
    title: 'Python · Web Scraping & Data Pipelines',
    initials: 'RA',
    avatarColor: '#06b6d4',
    tools: ['Python', 'Web Scraping', 'Integração de APIs'],
    sectors: ['Tecnologia', 'Finanças'],
    pricePerHour: 60,
    rating: 4.7,
    reviewCount: 35,
    availableIn: 2,
    minBudget: 1000,
    maxBudget: 12000,
  },
  {
    id: 8,
    name: 'Tiago Sousa',
    title: 'Make · n8n · Automação Low-Code',
    initials: 'TS',
    avatarColor: '#10b981',
    tools: ['Make', 'n8n', 'Zapier'],
    sectors: ['E-commerce', 'Tecnologia'],
    pricePerHour: 50,
    rating: 4.8,
    reviewCount: 20,
    availableIn: 0,
    minBudget: 500,
    maxBudget: 8000,
  },
]

/* ── Tool keyword matching ── */
const TOOL_KEYWORDS = {
  'Zapier':                   ['Zapier'],
  'Make / n8n':               ['Make', 'n8n'],
  'UiPath / RPA Empresarial': ['UiPath', 'RPA'],
  'Python / Scripts Custom':  ['Python'],
  'Power Automate':           ['Power Automate'],
  'Integração de APIs':       ['Integração de APIs', 'API'],
  'Web Scraping':             ['Web Scraping'],
}

const RELATED_TOOLS = {
  'Zapier':                   ['Make', 'n8n'],
  'Make / n8n':               ['Zapier'],
  'UiPath / RPA Empresarial': ['Power Automate', 'RPA'],
  'Python / Scripts Custom':  ['Integração de APIs', 'API', 'Web Scraping'],
  'Power Automate':           ['UiPath', 'RPA'],
  'Integração de APIs':       ['Python', 'Web Scraping'],
  'Web Scraping':             ['Python', 'Integração de APIs'],
}

const DEADLINE_DAYS = { urgent: 0, short: 7, normal: 30, flexible: 90 }

/* ── Scoring algorithm ── */
function calcScore(specialist, project) {
  // 1. Tecnologia (35%)
  const keywords = TOOL_KEYWORDS[project.tool] || []
  const related = RELATED_TOOLS[project.tool] || []
  const hasExact = specialist.tools.some(t =>
    keywords.some(k => t.toLowerCase().includes(k.toLowerCase()))
  )
  const hasRelated = !hasExact && specialist.tools.some(t =>
    related.some(r => t.toLowerCase().includes(r.toLowerCase()))
  )
  const techScore = hasExact ? 100 : hasRelated ? 60 : 20

  // 2. Orçamento (25%)
  const budgetScore =
    project.budget >= specialist.minBudget && project.budget <= specialist.maxBudget ? 100
    : project.budget < specialist.minBudget
      ? Math.max(0, 100 - (specialist.minBudget - project.budget) / 100)
      : Math.max(0, 100 - (project.budget - specialist.maxBudget) / 200)

  // 3. Prazo (20%)
  const deadlineDays = DEADLINE_DAYS[project.deadline] ?? 30
  const prazoScore =
    specialist.availableIn <= deadlineDays ? 100
    : specialist.availableIn <= deadlineDays + 7 ? 70 : 30

  // 4. Avaliação (10%)
  const ratingScore = (specialist.rating / 5) * 100

  // 5. Setor (10%)
  const sectorScore = specialist.sectors.includes(project.sector) ? 100 : 40

  const total =
    techScore * 0.35 +
    budgetScore * 0.25 +
    prazoScore * 0.20 +
    ratingScore * 0.10 +
    sectorScore * 0.10

  return {
    total: Math.round(total),
    breakdown: {
      tech:   Math.round(techScore),
      budget: Math.round(budgetScore),
      prazo:  Math.round(prazoScore),
      rating: Math.round(ratingScore),
      sector: Math.round(sectorScore),
    },
  }
}

/* ── Star rating ── */
function Stars({ rating }) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#f59e0b' : 'rgba(255,255,255,0.07)', fontSize: '14px' }}>★</span>
      ))}
    </span>
  )
}

/* ── Score bar ── */
function ScoreBar({ label, value, color, animated }) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs mb-1" style={{ color: '#475569' }}>
        <span>{label}</span>
        <span style={{ color }}>{value}</span>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: '#080b12' }}>
        <div
          className="h-1.5 rounded-full"
          style={{
            background: color,
            width: animated ? `${value}%` : '0%',
            transition: 'width 0.8s ease',
          }}
        />
      </div>
    </div>
  )
}

/* ── Specialist result card ── */
function SpecialistCard({ specialist, animated }) {
  const { score } = specialist
  const scoreColor = score.total >= 80 ? '#10b981' : '#f59e0b'

  return (
    <div
      className="card-no-hover rounded-xl p-6"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: `1px solid ${scoreColor}33`,
        opacity: animated ? 1 : 0,
        transform: animated ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${specialist.avatarColor}, ${specialist.avatarColor}88)`, color: '#fff', boxShadow: `0 0 16px ${specialist.avatarColor}44` }}
        >
          {specialist.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-sm" style={{ color: '#e2e8f0' }}>{specialist.name}</div>
          <div className="text-xs" style={{ color: '#475569' }}>{specialist.title}</div>
          <div className="flex items-center gap-2 mt-1">
            <Stars rating={specialist.rating} />
            <span className="text-xs" style={{ color: '#475569' }}>{specialist.rating} ({specialist.reviewCount})</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-lg font-extrabold" style={{ color: scoreColor }}>
            {score.total}
          </div>
          <div className="text-xs" style={{ color: '#475569' }}>score</div>
        </div>
      </div>

      {/* Total score bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1.5" style={{ color: '#475569' }}>
          <span>Score total</span>
          <span style={{ color: scoreColor }}>{score.total}%</span>
        </div>
        <div className="h-2.5 rounded-full" style={{ background: '#080b12' }}>
          <div
            className="h-2.5 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${scoreColor}, ${scoreColor}88)`,
              width: animated ? `${score.total}%` : '0%',
              transition: 'width 1s ease',
            }}
          />
        </div>
      </div>

      {/* Tool badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {specialist.tools.map((t, i) => (
          <span key={i} className="badge badge-indigo">{t}</span>
        ))}
        {specialist.sectors.map((s, i) => (
          <span key={i} className="badge badge-violet">{s}</span>
        ))}
      </div>

      {/* Sub-scores */}
      <div className="mb-5">
        <ScoreBar label="Tecnologia" value={score.breakdown.tech} color="#6366f1" animated={animated} />
        <ScoreBar label="Orçamento" value={score.breakdown.budget} color="#06b6d4" animated={animated} />
        <ScoreBar label="Prazo" value={score.breakdown.prazo} color="#10b981" animated={animated} />
        <ScoreBar label="Avaliação" value={score.breakdown.rating} color="#f59e0b" animated={animated} />
        <ScoreBar label="Setor" value={score.breakdown.sector} color="#8b5cf6" animated={animated} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #1e2436' }}>
        <div>
          <span className="font-bold text-sm" style={{ color: '#e2e8f0' }}>€{specialist.pricePerHour}/h</span>
          <div className="mt-1">
            {specialist.availableIn === 0 ? (
              <span className="badge badge-emerald">● Disponível agora</span>
            ) : (
              <span className="badge badge-amber">Disponível em {specialist.availableIn} dias</span>
            )}
          </div>
        </div>
        <button
          className="btn-primary"
          style={{ padding: '8px 16px', fontSize: '13px', cursor: 'default' }}
        >
          Ver Perfil
        </button>
      </div>
    </div>
  )
}

/* ── Slider with live value ── */
function Slider({ label, min, max, step, value, onChange, format }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium" style={{ color: '#475569' }}>{label}</label>
        <span className="text-sm font-bold" style={{ color: '#6366f1' }}>{format(value)}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={e => onChange(+e.target.value)}
      />
      <div className="flex justify-between text-xs mt-1" style={{ color: '#475569' }}>
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  )
}

/* ── Criteria explanation ── */
const CRITERIA = [
  { label: 'Tipo de Automação', weight: '35%', color: '#6366f1' },
  { label: 'Orçamento', weight: '25%', color: '#06b6d4' },
  { label: 'Prazo', weight: '20%', color: '#10b981' },
  { label: 'Avaliação', weight: '10%', color: '#f59e0b' },
  { label: 'Setor de Experiência', weight: '10%', color: '#8b5cf6' },
]

/* ══════════════════════════════ */
export default function Matching() {
  useMeta({
    title: 'Sistema de Matching',
    description: 'Experimenta o simulador de matching da Synk e descobre como o algoritmo encontra o especialista certo para o teu projeto.',
  })

  const [form, setForm] = useState({
    tool: 'Zapier',
    budget: 3000,
    deadline: 'normal',
    sector: 'E-commerce',
  })
  const [results, setResults] = useState(null)
  const [animated, setAnimated] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  function runMatching() {
    setAnimated(false)
    const scored = SPECIALISTS
      .map(s => ({ ...s, score: calcScore(s, form) }))
      .filter(s => s.score.total >= 60)
      .sort((a, b) => b.score.total - a.score.total)
      .slice(0, 3)

    setResults(scored)
    setHasSearched(true)
    setTimeout(() => setAnimated(true), 80)

    // Scroll to results
    setTimeout(() => {
      document.getElementById('match-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const fmtEuro = v => `€${v.toLocaleString('pt-PT')}`

  return (
    <>
      <PageHero
        badge="Sistema de Matching"
        badgeVariant="badge-violet"
        heading="Como a Synk encontra o"
        highlight="especialista certo para ti"
        sub="O nosso algoritmo multidimensional analisa 5 critérios em simultâneo para garantir que o especialista certo chega ao projeto certo."
      />

      {/* How the algorithm works */}
      <section className="py-20" style={{ background: '#080b12' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            heading="Os 5 critérios do"
            highlight="algoritmo"
            sub="Cada critério gera uma pontuação de 0 a 100. A pontuação final é uma média ponderada. Só são apresentados especialistas com score ≥ 60."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CRITERIA.map((c, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="card p-5 text-center">
                  <div className="font-bold text-sm mb-2" style={{ color: '#e2e8f0', letterSpacing: '-0.01em' }}>{c.label}</div>
                  <div
                    className="text-2xl font-extrabold"
                    style={{ color: c.color, letterSpacing: '-0.03em' }}
                  >
                    {c.weight}
                  </div>
                  <div className="text-xs mt-1" style={{ color: '#334155' }}>peso</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Simulator */}
      <section
        id="simulador"
        className="py-24"
        style={{ background: 'rgba(255,255,255,0.025)', borderTop: '1px solid #1e2436', borderBottom: '1px solid #1e2436' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <span className="badge badge-indigo mb-4">Simulador Interativo</span>
              <h2
                className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight"
                style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}
              >
                Experimenta o simulador
              </h2>
              <p className="text-lg" style={{ color: '#475569' }}>
                Preenche o teu projeto e vê como o algoritmo classifica os candidatos em tempo real.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl p-8" style={{ background: '#080b12', border: '1px solid #1e2436' }}>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                {/* Tool */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#475569' }}>
                    ⚙️ Tipo de Automação
                  </label>
                  <select
                    className="form-input w-full"
                    value={form.tool}
                    onChange={e => setForm(f => ({ ...f, tool: e.target.value }))}
                  >
                    {Object.keys(TOOL_KEYWORDS).map(t => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Sector */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#475569' }}>
                    🏢 Setor da empresa
                  </label>
                  <select
                    className="form-input w-full"
                    value={form.sector}
                    onChange={e => setForm(f => ({ ...f, sector: e.target.value }))}
                  >
                    {['E-commerce', 'Logística', 'Saúde', 'Finanças', 'Tecnologia', 'Retalho', 'Indústria', 'Outro'].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Budget slider */}
                <div>
                  <Slider
                    label="💰 Orçamento estimado"
                    min={500} max={20000} step={500}
                    value={form.budget}
                    onChange={v => setForm(f => ({ ...f, budget: v }))}
                    format={fmtEuro}
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#475569' }}>
                    📅 Prazo
                  </label>
                  <select
                    className="form-input w-full"
                    value={form.deadline}
                    onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
                  >
                    <option value="urgent">Urgente (&lt; 1 semana)</option>
                    <option value="short">Curto (1–2 semanas)</option>
                    <option value="normal">Normal (1 mês)</option>
                    <option value="flexible">Flexível (&gt; 1 mês)</option>
                  </select>
                </div>
              </div>

              <button
                className="btn-primary btn-primary-lg w-full justify-center"
                onClick={runMatching}
              >
                Encontrar Especialistas
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </button>
            </div>
          </Reveal>

          {/* Results */}
          <div id="match-results" style={{ scrollMarginTop: '80px' }}>
            {hasSearched && (
              <div className="mt-10">
                {results && results.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold" style={{ color: '#e2e8f0' }}>
                        {results.length} especialista{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                      </h3>
                      <span className="badge badge-emerald">Ordenados por score</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-5">
                      {results.map((s, i) => (
                        <div key={s.id} style={{ transitionDelay: `${i * 100}ms` }}>
                          <SpecialistCard specialist={s} animated={animated} />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16 rounded-2xl" style={{ background: '#080b12', border: '1px solid #1e2436' }}>
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#e2e8f0' }}>
                      Nenhum especialista encontrado para estes critérios
                    </h3>
                    <p className="text-sm" style={{ color: '#475569' }}>
                      Tenta ajustar o orçamento, o prazo ou o tipo de automação.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Encontra o especialista certo para o teu projeto"
        sub="Publica o teu projeto gratuitamente e recebe propostas de especialistas verificados em menos de 48 horas."
        primaryLabel="Publicar Projeto Grátis"
        primaryTo="/registar"
        secondaryLabel="Ver como funciona"
        secondaryTo="/como-funciona"
      />
    </>
  )
}
