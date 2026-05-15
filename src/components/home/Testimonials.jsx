import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'
import SectionHeader from '@/components/ui/SectionHeader'

const ITEMS = [
  {
    quote: 'Em menos de 3 dias encontrámos um especialista que automatizou o nosso processo de faturação. Poupámos 20 horas de trabalho por semana.',
    name: 'Ana Costa',
    role: 'COO · TechRetail Lda',
    initials: 'AC',
    color: '#6366f1',
  },
  {
    quote: 'Como especialista em RPA, a Twonect deu-me acesso a projetos que nunca conseguiria sozinho. O sistema de escrow dá-me total confiança.',
    name: 'Miguel Santos',
    role: 'RPA Developer · Freelancer',
    initials: 'MS',
    color: '#8b5cf6',
  },
  {
    quote: 'A qualidade dos especialistas na plataforma é impressionante. Já fizemos 4 projetos e todos foram entregues a tempo e dentro do orçamento.',
    name: 'Pedro Alves',
    role: 'CEO · Logística Express',
    initials: 'PA',
    color: '#06b6d4',
  },
]

function TestimonyCard({ item }) {
  return (
    <div className="card p-6 h-full flex flex-col">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: '#f59e0b', fontSize: '14px' }}>★</span>
        ))}
      </div>
      <blockquote className="text-sm leading-relaxed italic mb-6 flex-1" style={{ color: '#94a3b8' }}>
        "{item.quote}"
      </blockquote>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}99)`, color: '#fff' }}
        >
          {item.initials}
        </div>
        <div>
          <div className="font-semibold text-sm" style={{ color: '#f1f5f9' }}>{item.name}</div>
          <div className="text-xs" style={{ color: '#64748b' }}>{item.role}</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <section className="py-24" style={{ background: '#0f1117' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader heading="O que dizem" highlight="os nossos clientes" />

        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {ITEMS.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <TestimonyCard item={t} />
            </Reveal>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div className="overflow-hidden">
            <div style={{ transform: `translateX(-${active * 100}%)`, transition: 'transform 0.4s ease', display: 'flex' }}>
              {ITEMS.map((t, i) => (
                <div key={i} style={{ minWidth: '100%' }}>
                  <TestimonyCard item={t} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  background: i === active ? '#6366f1' : '#1e2436',
                  transform: i === active ? 'scale(1.3)' : 'scale(1)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
