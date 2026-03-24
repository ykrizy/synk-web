import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'

export default function FAQ({ faqs }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <Reveal key={i} delay={i * 50}>
          <div className="card-no-hover rounded-xl overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-5 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-semibold text-sm sm:text-base pr-4" style={{ color: '#f1f5f9' }}>
                {faq.q}
              </span>
              <span
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full font-bold text-sm"
                style={{
                  background: '#0f1117',
                  border: '1px solid #1e2436',
                  color: '#6366f1',
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }}
              >
                +
              </span>
            </button>
            <div className={`faq-content ${open === i ? 'open' : ''}`}>
              <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
                {faq.a}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
