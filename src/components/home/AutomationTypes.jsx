import Reveal from '@/components/ui/Reveal'
import SectionHeader from '@/components/ui/SectionHeader'

const ICONS = {
  rpa: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
  ),
  ai: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 0 2h-1a7 7 0 0 1-7 7H9a7 7 0 0 1-7-7H1a1 1 0 0 1 0-2h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
    </svg>
  ),
  integration: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  bi: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  marketing: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  custom: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
}

const TYPES = [
  { icon: ICONS.rpa, title: 'RPA & Workflow', desc: 'Automatiza tarefas repetitivas com RPA, Zapier, Make, UiPath', tools: ['Zapier', 'Make', 'n8n'], badge: 'badge-indigo' },
  { icon: ICONS.ai, title: 'IA & Machine Learning', desc: 'Implementa modelos de IA nos teus processos de negócio', tools: ['OpenAI', 'Python', 'TensorFlow'], badge: 'badge-violet' },
  { icon: ICONS.integration, title: 'Integração de Sistemas', desc: 'Conecta as tuas ferramentas: CRM, ERP, e-commerce, APIs', tools: ['Salesforce', 'SAP', 'REST API'], badge: 'badge-cyan' },
  { icon: ICONS.bi, title: 'Business Intelligence', desc: 'Automatiza relatórios, dashboards e fluxos de dados', tools: ['Power BI', 'Tableau', 'dbt'], badge: 'badge-emerald' },
  { icon: ICONS.marketing, title: 'Marketing Automation', desc: 'Sequências de email, lead scoring, CRM automation', tools: ['HubSpot', 'Mailchimp', 'ActiveCampaign'], badge: 'badge-amber' },
  { icon: ICONS.custom, title: 'Automação Custom', desc: 'Soluções à medida para os teus processos únicos', tools: ['Node.js', 'Python', 'SQL'], badge: 'badge-indigo' },
]

const BADGE_COLORS = {
  'badge-indigo': '#818cf8',
  'badge-violet': '#a78bfa',
  'badge-cyan': '#22d3ee',
  'badge-emerald': '#34d399',
  'badge-amber': '#fbbf24',
}

export default function AutomationTypes() {
  return (
    <section className="py-24" style={{ background: '#080b12' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          heading="Todos os tipos de automação,"
          highlight="num só lugar"
          sub="Seja qual for o processo que queres otimizar, temos o especialista certo."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TYPES.map((t, i) => {
            const color = BADGE_COLORS[t.badge] || '#818cf8'
            return (
              <Reveal key={i} delay={i * 60}>
                <div className="card p-6 h-full flex flex-col">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
                  >
                    {t.icon}
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}>{t.title}</h3>
                  <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: '#475569', letterSpacing: '-0.01em' }}>{t.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.tools.map((tool, j) => (
                      <span key={j} className={`badge ${t.badge}`}>{tool}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
