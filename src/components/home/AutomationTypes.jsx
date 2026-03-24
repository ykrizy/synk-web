import Reveal from '@/components/ui/Reveal'
import SectionHeader from '@/components/ui/SectionHeader'

const TYPES = [
  { icon: '⚙️', title: 'RPA & Workflow', desc: 'Automatiza tarefas repetitivas com RPA, Zapier, Make, UiPath', tools: ['Zapier', 'Make', 'n8n'], badge: 'badge-indigo' },
  { icon: '🤖', title: 'IA & Machine Learning', desc: 'Implementa modelos de IA nos teus processos de negócio', tools: ['OpenAI', 'Python', 'TensorFlow'], badge: 'badge-violet' },
  { icon: '🔗', title: 'Integração de Sistemas', desc: 'Conecta as tuas ferramentas: CRM, ERP, e-commerce, APIs', tools: ['Salesforce', 'SAP', 'REST API'], badge: 'badge-cyan' },
  { icon: '📊', title: 'Business Intelligence', desc: 'Automatiza relatórios, dashboards e fluxos de dados', tools: ['Power BI', 'Tableau', 'dbt'], badge: 'badge-emerald' },
  { icon: '📧', title: 'Marketing Automation', desc: 'Sequências de email, lead scoring, CRM automation', tools: ['HubSpot', 'Mailchimp', 'ActiveCampaign'], badge: 'badge-amber' },
  { icon: '🛠️', title: 'Automação Custom', desc: 'Soluções à medida para os teus processos únicos', tools: ['Node.js', 'Python', 'SQL'], badge: 'badge-indigo' },
]

export default function AutomationTypes() {
  return (
    <section className="py-24" style={{ background: '#0f1117' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          heading="Todos os tipos de automação,"
          highlight="num só lugar"
          sub="Seja qual for o processo que queres otimizar, temos o especialista certo."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TYPES.map((t, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="card p-6 h-full flex flex-col">
                <div className="text-3xl mb-4">{t.icon}</div>
                <h3 className="text-base font-bold mb-2" style={{ color: '#f1f5f9' }}>{t.title}</h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: '#94a3b8' }}>{t.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {t.tools.map((tool, j) => (
                    <span key={j} className={`badge ${t.badge}`}>{tool}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
