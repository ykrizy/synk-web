import { Link } from 'react-router-dom'
import useMeta from '@/hooks/useMeta'

export default function NotFound() {
  useMeta({ title: '404 — Página não encontrada' })

  return (
    <section
      className="min-h-screen flex items-center justify-center text-center relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #1a1f2e 0%, #0f1117 70%)' }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          style={{
            width: '500px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <div className="relative px-4">
        <div
          className="text-[120px] sm:text-[180px] font-extrabold leading-none mb-6 select-none text-gradient"
          style={{ letterSpacing: '-0.05em' }}
        >
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-4" style={{ color: '#f1f5f9', letterSpacing: '-0.02em' }}>
          Esta página foi automatizada para outro lugar 😅
        </h1>
        <p className="text-lg mb-8 max-w-md mx-auto" style={{ color: '#94a3b8' }}>
          Talvez tenhas um link errado ou a página foi movida.
        </p>
        <Link to="/" className="btn-primary btn-primary-lg">
          ← Voltar ao Início
        </Link>
      </div>
    </section>
  )
}
