import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import useMeta from '@/hooks/useMeta'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

const ADMIN_EMAIL = 'khalidshah1328@gmail.com'

function Badge({ children, color = '#6366f1' }) {
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-medium"
      style={{
        background: `${color}18`,
        color,
        border: `1px solid ${color}30`,
      }}
    >
      {children}
    </span>
  )
}

export default function Admin() {
  useMeta({ title: 'Admin · Synk', description: 'Painel de administração.' })

  const { user, loading: authLoading } = useAuth()
  const [especialistas, setEspecialistas] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const [tab, setTab] = useState('pendentes') // 'pendentes' | 'verificados'
  const [saving, setSaving] = useState({})
  const [toast, setToast] = useState(null)

  const isAdmin = user?.email === ADMIN_EMAIL

  useEffect(() => {
    if (!isAdmin) return
    fetchEspecialistas()
  }, [isAdmin])

  async function fetchEspecialistas() {
    setLoadingData(true)
    const { data } = await supabase
      .from('especialistas')
      .select('*')
      .order('created_at', { ascending: false })
    setEspecialistas(data || [])
    setLoadingData(false)
  }

  async function toggleVerificado(esp, novoValor) {
    setSaving(s => ({ ...s, [esp.id]: true }))
    const { error } = await supabase
      .from('especialistas')
      .update({ verificado: novoValor })
      .eq('id', esp.id)

    if (error) {
      showToast('Erro: ' + error.message, 'error')
    } else {
      setEspecialistas(prev =>
        prev.map(e => e.id === esp.id ? { ...e, verificado: novoValor } : e)
      )
      showToast(novoValor ? `✅ ${esp.nome} verificado!` : `❌ ${esp.nome} removido`, novoValor ? 'success' : 'warn')
    }
    setSaving(s => ({ ...s, [esp.id]: false }))
  }

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: 'var(--brand)', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />
  }

  const pendentes = especialistas.filter(e => !e.verificado)
  const verificados = especialistas.filter(e => e.verificado)
  const lista = tab === 'pendentes' ? pendentes : verificados

  return (
    <section className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm mb-1" style={{ color: 'var(--text-3)' }}>🔐 Painel de Administração</p>
            <h1 className="font-display text-3xl" style={{ color: 'var(--text)', letterSpacing: '-0.03em' }}>
              Verificação de Especialistas
            </h1>
          </div>
          <button
            onClick={fetchEspecialistas}
            className="btn-ghost"
            style={{ fontSize: '13px' }}
          >
            🔄 Atualizar
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="card p-5">
            <p className="text-sm mb-1" style={{ color: 'var(--text-3)' }}>Total de especialistas</p>
            <p className="text-3xl font-extrabold" style={{ color: 'var(--brand)', letterSpacing: '-0.03em' }}>{especialistas.length}</p>
          </div>
          <div className="card p-5">
            <p className="text-sm mb-1" style={{ color: 'var(--text-3)' }}>Pendentes</p>
            <p className="text-3xl font-extrabold" style={{ color: '#f59e0b', letterSpacing: '-0.03em' }}>{pendentes.length}</p>
          </div>
          <div className="card p-5">
            <p className="text-sm mb-1" style={{ color: 'var(--text-3)' }}>Verificados</p>
            <p className="text-3xl font-extrabold" style={{ color: '#10b981', letterSpacing: '-0.03em' }}>{verificados.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'pendentes', label: `⏳ Pendentes (${pendentes.length})` },
            { key: 'verificados', label: `✅ Verificados (${verificados.length})` },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={tab === t.key ? 'btn-primary' : 'btn-ghost'}
              style={{ fontSize: '13px', padding: '8px 18px' }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Lista */}
        {loadingData ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 rounded-full border-2 animate-spin mx-auto" style={{ borderColor: 'var(--brand)', borderTopColor: 'transparent' }} />
          </div>
        ) : lista.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="text-4xl mb-3">{tab === 'pendentes' ? '🎉' : '👤'}</p>
            <p style={{ color: 'var(--text-2)' }}>
              {tab === 'pendentes' ? 'Nenhum especialista pendente de verificação.' : 'Ainda não há especialistas verificados.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {lista.map(esp => (
              <div key={esp.id} className="card p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <h3 className="font-semibold text-base" style={{ color: 'var(--text)' }}>{esp.nome}</h3>
                      {esp.verificado
                        ? <Badge color="#10b981">✅ Verificado</Badge>
                        : <Badge color="#f59e0b">⏳ Pendente</Badge>
                      }
                      {esp.disponivel_agora && <Badge color="#6366f1">Disponível agora</Badge>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm mt-3">
                      {[
                        { label: 'Email', value: esp.email },
                        { label: 'País', value: esp.pais },
                        { label: 'Experiência', value: esp.anos_experiencia ? `${esp.anos_experiencia} anos` : null },
                        { label: 'Preço/hora', value: esp.preco_hora ? `€${esp.preco_hora}` : null },
                        { label: 'Registado', value: new Date(esp.created_at).toLocaleDateString('pt-PT') },
                        { label: 'Avaliação', value: esp.rating ? `${esp.rating}★ (${esp.num_avaliacoes})` : null },
                      ].filter(f => f.value).map(({ label, value }) => (
                        <div key={label} className="flex gap-2">
                          <span style={{ color: 'var(--text-3)', minWidth: '90px', flexShrink: 0 }}>{label}</span>
                          <span style={{ color: 'var(--text)' }}>{value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Skills */}
                    {esp.skills?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {esp.skills.map(s => (
                          <span
                            key={s}
                            className="text-xs px-2 py-1 rounded-lg"
                            style={{ background: 'rgba(124,92,246,0.1)', color: 'var(--brand)' }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Bio */}
                    {esp.bio && (
                      <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--text-2)' }}>
                        "{esp.bio}"
                      </p>
                    )}

                    {/* Links */}
                    <div className="flex gap-4 mt-3 flex-wrap">
                      {esp.linkedin && (
                        <a href={esp.linkedin} target="_blank" rel="noopener noreferrer"
                          className="text-xs flex items-center gap-1"
                          style={{ color: 'var(--brand)', textDecoration: 'none' }}>
                          🔗 LinkedIn
                        </a>
                      )}
                      {esp.portfolio && (
                        <a href={esp.portfolio} target="_blank" rel="noopener noreferrer"
                          className="text-xs flex items-center gap-1"
                          style={{ color: 'var(--brand)', textDecoration: 'none' }}>
                          🌐 Portfolio
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex-shrink-0">
                    {esp.verificado ? (
                      <button
                        onClick={() => toggleVerificado(esp, false)}
                        disabled={saving[esp.id]}
                        className="btn-ghost"
                        style={{ fontSize: '13px', padding: '8px 16px', color: '#f87171', borderColor: 'rgba(248,113,113,0.3)' }}
                      >
                        {saving[esp.id] ? '...' : '❌ Remover verificação'}
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleVerificado(esp, true)}
                        disabled={saving[esp.id]}
                        className="btn-primary"
                        style={{ fontSize: '13px', padding: '10px 20px' }}
                      >
                        {saving[esp.id] ? 'A verificar…' : '✅ Verificar conta'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 px-5 py-3 rounded-xl text-sm font-medium shadow-xl z-50"
          style={{
            background: toast.type === 'success' ? 'rgba(16,185,129,0.15)' : toast.type === 'error' ? 'rgba(248,113,113,0.15)' : 'rgba(245,158,11,0.15)',
            border: `1px solid ${toast.type === 'success' ? 'rgba(16,185,129,0.3)' : toast.type === 'error' ? 'rgba(248,113,113,0.3)' : 'rgba(245,158,11,0.3)'}`,
            color: toast.type === 'success' ? '#10b981' : toast.type === 'error' ? '#f87171' : '#f59e0b',
          }}
        >
          {toast.msg}
        </div>
      )}
    </section>
  )
}
