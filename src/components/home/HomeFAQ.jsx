import SectionHeader from '@/components/ui/SectionHeader'
import FAQ from '@/components/ui/FAQ'

const FAQS = [
  {
    q: 'Como funciona o pagamento Escrow?',
    a: 'Quando uma empresa aceita uma proposta, o pagamento fica retido na plataforma. O valor só é libertado para o especialista quando a empresa aprova o trabalho entregue. Isto garante segurança para ambas as partes.',
  },
  {
    q: 'Quanto tempo demora a encontrar um especialista?',
    a: 'Na maioria dos casos, recebes as primeiras propostas em menos de 48 horas após publicar o projeto. O nosso algoritmo de matching garante que só chegam especialistas qualificados para o teu projeto.',
  },
  {
    q: 'Como são verificados os especialistas?',
    a: 'Cada especialista passa por uma avaliação do perfil, revisão de portfolio e, em alguns casos, um teste técnico na sua área de especialização. A verificação é concluída em até 24 horas.',
  },
  {
    q: 'Que tipos de automação posso encontrar na Synk?',
    a: 'RPA, automação de workflows, integração de sistemas, IA aplicada a processos, marketing automation, Business Intelligence e muito mais.',
  },
  {
    q: 'Posso trabalhar com especialistas de outros países?',
    a: 'Sim. A plataforma tem especialistas em Portugal, Espanha e América Latina. Todos os projetos são geridos remotamente através da nossa plataforma.',
  },
  {
    q: 'O que acontece se não ficar satisfeito com o trabalho?',
    a: 'O pagamento em Escrow garante que tens sempre poder negocial. Se o trabalho não corresponder ao acordado, a equipa Synk medeia a resolução.',
  },
]

export default function HomeFAQ() {
  return (
    <section className="py-24" style={{ background: '#0f1117' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHeader heading="Perguntas" highlight="frequentes" />
        <FAQ faqs={FAQS} />
      </div>
    </section>
  )
}
