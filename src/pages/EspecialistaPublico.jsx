import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useMeta from '@/hooks/useMeta'
import Reveal from '@/components/ui/Reveal'
import { supabase } from '@/lib/supabase'

function Stars({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

export default function EspecialistaPublico() {
  const { id } = useParams()
  const [esp, setEsp] = useState(null)
  const [avaliacoes, setAvaliacoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useMeta({
    title: esp ? `${esp.nome} — Especialista Synk` : 'Especialista — Synk',
    description: esp?.bio ?? 'Perfil de especialista em automação na Synk.',
  })

  useEffect(() => {
    async function load() {
      const [{ data: espData }, { data: avs }] = await Promise.all([
        supabase.from('especialistas').select('*').eq('id', id).maybeSingle(),
        supabase.from('avaliacoes').select('*, empresas(nome)').eq('especialista_id', id).order('created_at', { ascending: false }),
      ])
      if (!espData) { setNotFound(true); setLoading(false); return }
      setEsp(espData)
      setAvaliacoes(avs || [])
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: 'var(--brand)', borderTopColor: 'transparent' }} />
    </div>
  )

  if (notFound) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: 'var(--bg)' }}>
      <p className="text-5xl">🔍</p>
      <h1 className="font-display text-2xl" style={{ color: 'var(--text)' }}>Especialista não encontrado</h1>
      <Link to="/marketplace?tab=especialistas" className="btn-primary" style={{ textDecoration: 'none' }}>← Ver todos os especialistas</Link>
    </div>
  )

  const avgRating = avaliacoes.length > 0
    ? (avaliacoes.reduce((sum, a) => sum + a.rating, 0) / avaliacoes.length).toFixed(1)
    : null

  const initials = esp.nome?.split(' ').map(w => w[0]).slice(0, 2).join('') || '?'

  return (
    <section className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(124,92,246,0.06) 0%, transparent 70%)' }} />
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb */}
        <Reveal>
          <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: 'var(--text-3)' }}>
            <Link
              to="/marketplace?tab=especialistas"
              style={{ color: 'var(--text-3)', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--brand-light)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
            >← Marketplace</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-2)' }}>{esp.nome}</span>
          </div>
        </Reveal>

        {/* Hero card */}
        <Reveal>
          <div className="rounded-2xl p-8 mb-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-start gap-5">
              {/* Avatar */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0"
                style={{ background: 'rgba(124,92,246,0.15)', color: 'var(--brand-light)', border: '1px solid rgba(124,92,246,0.25)', letterSpacing: '-0.02em' }}
              >
                {initials}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h1 className="font-display text-2xl" style={{ color: 'var(--text)', letterSpacing: '-0.03em' }}>{esp.nome}</h1>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      {esp.pais && (
                        <span className="text-sm" style={{ color: 'var(--text-3)' }}>📍 {esp.pais}</span>
                      )}
                      {esp.verificado && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
                          ✅ Verificado
                        </span>
                      )}
                      {esp.disponivel_agora && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(124,92,246,0.1)', color: 'var(--brand-light)', border: '1px solid rgba(124,92,246,0.2)' }}>
                          ⚡ Disponível agora
                        </span>
                      )}
                    </div>
                  </div>

                  {avgRating && (
                    <div className="text-right flex-shrink-0">
                      <p className="text-2xl font-extrabold" style={{ color: '#f59e0b', letterSpacing: '-0.03em' }}>{avgRating}★</p>
                      <p className="text-xs" style={{ color: 'var(--text-3)' }}>{avaliacoes.length} avaliação{avaliacoes.length !== 1 ? 'ões' : ''}</p>
                    </div>
                  )}
                </div>

                {esp.bio && (
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{esp.bio}</p>
                )}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
              {esp.anos_experiencia && (
                <div className="rounded-xl p-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-3)' }}>Experiência</p>
                  <p className="font-bold text-lg" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>{esp.anos_experiencia} anos</p>
                </div>
              )}
              {esp.preco_hora && (
                <div className="rounded-xl p-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-3)' }}>Preço/hora</p>
                  <p className="font-bold text-lg" style={{ color: 'var(--brand-light)', letterSpacing: '-0.02em' }}>€{esp.preco_hora}</p>
                </div>
              )}
              {avaliacoes.length > 0 && (
                <div className="rounded-xl p-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-3)' }}>Projetos concluídos</p>
                  <p className="font-bold text-lg" style={{ color: '#10b981', letterSpacing: '-0.02em' }}>{avaliacoes.length}</p>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* Skills */}
        {esp.skills?.length > 0 && (
          <Reveal delay={60}>
            <div className="rounded-2xl p-6 mb-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h2 className="font-heading text-base mb-4" style={{ color: 'var(--text)' }}>Competências</h2>
              <div className="flex flex-wrap gap-2">
                {esp.skills.map(s => (
                  <span key={s} className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: 'rgba(124,92,246,0.1)', color: 'var(--brand-light)', border: '1px solid rgba(124,92,246,0.2)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Links */}
        {(esp.linkedin || esp.portfolio) && (
          <Reveal delay={80}>
            <div className="rounded-2xl p-6 mb-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h2 className="font-heading text-base mb-4" style={{ color: 'var(--text)' }}>Links</h2>
              <div className="flex flex-col gap-2">
                {esp.linkedin && (
                  <a href={esp.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm"
                    style={{ color: 'var(--brand-light)', textDecoration: 'none' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                    LinkedIn
                  </a>
                )}
                {esp.portfolio && (
                  <a href={esp.portfolio} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm"
                    style={{ color: 'var(--brand-light)', textDecoration: 'none' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    Portfolio / Website
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        )}

        {/* Reviews */}
        <Reveal delay={100}>
          <div className="rounded-2xl p-6 mb-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-base" style={{ color: 'var(--text)' }}>
                Avaliações
                {avaliacoes.length > 0 && (
                  <span className="ml-2 text-sm font-normal" style={{ color: 'var(--text-3)' }}>({avaliacoes.length})</span>
                )}
              </h2>
              {avgRating && <Stars rating={parseFloat(avgRating)} />}
            </div>

            {avaliacoes.length === 0 ? (
              <p className="text-sm" style={{ color: 'var(--text-3)' }}>Ainda sem avaliações. Será o primeiro a trabalhar com este especialista?</p>
            ) : (
              <div className="space-y-4">
                {avaliacoes.map(av => (
                  <div key={av.id} className="rounded-xl p-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                        {av.empresas?.nome ?? 'Empresa'}
                      </p>
                      <div className="flex items-center gap-2">
                        <Stars rating={av.rating} size={12} />
                        <span className="text-xs" style={{ color: 'var(--text-3)' }}>
                          {new Date(av.created_at).toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    {av.comentario && (
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>"{av.comentario}"</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={120}>
          <div
            className="rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{ background: 'linear-gradient(135deg, rgba(124,92,246,0.12), rgba(99,102,241,0.08))', border: '1px solid rgba(124,92,246,0.2)' }}
          >
            <div>
              <h3 className="font-heading text-lg mb-1" style={{ color: 'var(--text)' }}>Queres trabalhar com {esp.nome.split(' ')[0]}?</h3>
              <p className="text-sm" style={{ color: 'var(--text-2)' }}>Publica um projeto e recebe a proposta em menos de 48h.</p>
            </div>
            <Link to="/publicar-projeto" className="btn-primary flex-shrink-0" style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Publicar projeto →
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
