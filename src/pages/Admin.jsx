import { useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import useMeta from '@/hooks/useMeta'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

const ADMIN_EMAIL = 'khalidshah1328@gmail.com'

function Badge({ children, color = '#6366f1' }) {
  return (
    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
      {children}
    </span>
  )
}

const TABS = [
  { key: 'especialistas', label: '👤 Especialistas' },
  { key: 'projetos',      label: '📋 Projetos' },
  { key: 'pagamentos',    label: '💰 Pagamentos' },
]

export default function Admin() {
  useMeta({ title: 'Admin · Twonect', description: 'Painel de administração.' })

  const { user, loading: authLoading } = useAuth()
  const [tab, setTab] = useState('especialistas')
  const [toast, setToast] = useState(null)

  // ── especialistas ──────────────────────────────────────────────────────────
  const [especialistas, setEspecialistas] = useState([])
  const [loadingEsp, setLoadingEsp] = useState(true)
  const [saving, setSaving] = useState({})
  const [espTab, setEspTab] = useState('pendentes')

  // ── projetos ───────────────────────────────────────────────────────────────
  const [projetos, setProjetos] = useState([])
  const [loadingProj, setLoadingProj] = useState(true)

  // ── pagamentos ─────────────────────────────────────────────────────────────
  const [pagamentos, setPagamentos] = useState([])
  const [loadingPag, setLoadingPag] = useState(true)
  const [libertando, setLibertando] = useState({})

  const isAdmin = user?.email === ADMIN_EMAIL

  useEffect(() => { if (isAdmin) { fetchEspecialistas(); fetchProjetos(); fetchPagamentos() } }, [isAdmin])

  // ── fetches ────────────────────────────────────────────────────────────────
  async function fetchEspecialistas() {
    setLoadingEsp(true)
    const { data } = await supabase.from('especialistas').select('*').order('created_at', { ascending: false })
    setEspecialistas(data || [])
    setLoadingEsp(false)
  }

  async function fetchProjetos() {
    setLoadingProj(true)
    const { data } = await supabase
      .from('projetos')
      .select('*, empresas(nome)')
      .order('created_at', { ascending: false })
    setProjetos(data || [])
    setLoadingProj(false)
  }

  async function fetchPagamentos() {
    setLoadingPag(true)
    const { data } = await supabase
      .from('pagamentos')
      .select('*, projetos(titulo), empresas(nome), especialistas(nome)')
      .order('created_at', { ascending: false })
    setPagamentos(data || [])
    setLoadingPag(false)
  }

  // ── actions ────────────────────────────────────────────────────────────────
  async function toggleVerificado(esp, novoValor) {
    setSaving(s => ({ ...s, [esp.id]: true }))
    const { error } = await supabase.from('especialistas').update({ verificado: novoValor }).eq('id', esp.id)
    if (error) { showToast('Erro: ' + error.message, 'error') }
    else {
      setEspecialistas(prev => prev.map(e => e.id === esp.id ? { ...e, verificado: novoValor } : e))
      showToast(novoValor ? `✅ ${esp.nome} verificado!` : `❌ ${esp.nome} removido`, novoValor ? 'success' : 'warn')
    }
    setSaving(s => ({ ...s, [esp.id]: false }))
  }

  async function libertarPagamento(pg) {
    setLibertando(s => ({ ...s, [pg.id]: true }))
    const { error } = await supabase.from('pagamentos').update({ estado: 'libertado' }).eq('id', pg.id)
    if (error) { showToast('Erro: ' + error.message, 'error') }
    else {
      setPagamentos(prev => prev.map(p => p.id === pg.id ? { ...p, estado: 'libertado' } : p))
      showToast(`💰 Pagamento de €${pg.valor} libertado para ${pg.especialistas?.nome}`, 'success')
    }
    setLibertando(s => ({ ...s, [pg.id]: false }))
  }

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: 'var(--brand)', borderTopColor: 'transparent' }} />
    </div>
  )
  if (!user || !isAdmin) return <Navigate to="/" replace />

  const pendentes  = especialistas.filter(e => !e.verificado)
  const verificados = especialistas.filter(e => e.verificado)
  const listaEsp   = espTab === 'pendentes' ? pendentes : verificados

  const totalEscrow = pagamentos.filter(p => p.estado === 'escrow').reduce((s, p) => s + Number(p.valor), 0)
  const totalLibertado = pagamentos.filter(p => p.estado === 'libertado').reduce((s, p) => s + Number(p.valor), 0)

  const ESTADO_PROJ = {
    aberto:            { color: '#10b981', label: 'Aberto' },
    em_andamento:      { color: '#f59e0b', label: 'Em andamento' },
    concluido:         { color: '#6366f1', label: 'Concluído' },
    pendente_pagamento:{ color: '#f87171', label: 'Pendente pagamento' },
    cancelado:         { color: '#6b7280', label: 'Cancelado' },
  }

  return (
    <section className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm mb-1" style={{ color: 'var(--text-3)' }}>🔐 Painel de Administração</p>
            <h1 className="font-display text-3xl" style={{ color: 'var(--text)', letterSpacing: '-0.03em' }}>Twonect Admin</h1>
          </div>
          <button onClick={() => { fetchEspecialistas(); fetchProjetos(); fetchPagamentos() }} className="btn-ghost" style={{ fontSize: '13px' }}>
            🔄 Atualizar tudo
          </button>
        </div>

        {/* Stats globais */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Especialistas',  value: especialistas.length,        color: 'var(--brand)' },
            { label: 'Pendentes verif.', value: pendentes.length,          color: '#f59e0b' },
            { label: 'Projetos totais', value: projetos.length,            color: '#6366f1' },
            { label: 'Em escrow (€)',  value: `€${totalEscrow.toLocaleString('pt-PT')}`, color: '#10b981' },
          ].map(s => (
            <div key={s.label} className="card p-5">
              <p className="text-xs mb-1" style={{ color: 'var(--text-3)' }}>{s.label}</p>
              <p className="text-2xl font-extrabold" style={{ color: s.color, letterSpacing: '-0.03em' }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs principais */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={tab === t.key ? 'btn-primary' : 'btn-ghost'}
              style={{ fontSize: '13px', padding: '8px 18px' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── TAB: Especialistas ─────────────────────────────────────────────── */}
        {tab === 'especialistas' && (
          <>
            <div className="flex gap-2 mb-5">
              {[
                { key: 'pendentes',   label: `⏳ Pendentes (${pendentes.length})` },
                { key: 'verificados', label: `✅ Verificados (${verificados.length})` },
              ].map(t => (
                <button key={t.key} onClick={() => setEspTab(t.key)}
                  className={espTab === t.key ? 'btn-primary' : 'btn-ghost'}
                  style={{ fontSize: '12px', padding: '7px 16px' }}>
                  {t.label}
                </button>
              ))}
            </div>

            {loadingEsp ? <Spinner /> : listaEsp.length === 0 ? (
              <Empty icon={espTab === 'pendentes' ? '🎉' : '👤'}
                msg={espTab === 'pendentes' ? 'Nenhum especialista pendente.' : 'Nenhum verificado ainda.'} />
            ) : (
              <div className="space-y-4">
                {listaEsp.map(esp => (
                  <div key={esp.id} className="card p-6">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap mb-2">
                          <h3 className="font-semibold text-base" style={{ color: 'var(--text)' }}>{esp.nome}</h3>
                          <Badge color={esp.verificado ? '#10b981' : '#f59e0b'}>
                            {esp.verificado ? '✅ Verificado' : '⏳ Pendente'}
                          </Badge>
                          {esp.disponivel_agora && <Badge color="#6366f1">Disponível</Badge>}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm mt-2">
                          {[
                            { label: 'Email',      value: esp.email },
                            { label: 'País',       value: esp.pais },
                            { label: 'Exp.',       value: esp.anos_experiencia ? `${esp.anos_experiencia} anos` : null },
                            { label: 'Preço/h',    value: esp.preco_hora ? `€${esp.preco_hora}` : null },
                            { label: 'Registado',  value: new Date(esp.created_at).toLocaleDateString('pt-PT') },
                          ].filter(f => f.value).map(({ label, value }) => (
                            <div key={label} className="flex gap-2">
                              <span style={{ color: 'var(--text-3)', minWidth: '70px', flexShrink: 0 }}>{label}</span>
                              <span style={{ color: 'var(--text)' }}>{value}</span>
                            </div>
                          ))}
                        </div>
                        {esp.skills?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {esp.skills.map(s => (
                              <span key={s} className="text-xs px-2 py-0.5 rounded-lg"
                                style={{ background: 'rgba(124,92,246,0.1)', color: 'var(--brand)' }}>{s}</span>
                            ))}
                          </div>
                        )}
                        {esp.bio && <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-2)' }}>"{esp.bio.slice(0, 120)}{esp.bio.length > 120 ? '…' : ''}"</p>}
                        <div className="flex gap-4 mt-2">
                          {esp.linkedin && <a href={esp.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: 'var(--brand)' }}>🔗 LinkedIn</a>}
                          {esp.portfolio && <a href={esp.portfolio} target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: 'var(--brand)' }}>🌐 Portfolio</a>}
                          <Link to={`/especialista/${esp.id}`} className="text-xs" style={{ color: 'var(--brand)' }}>↗ Ver perfil público</Link>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {esp.verificado ? (
                          <button onClick={() => toggleVerificado(esp, false)} disabled={saving[esp.id]}
                            className="btn-ghost" style={{ fontSize: '12px', padding: '7px 14px', color: '#f87171' }}>
                            {saving[esp.id] ? '…' : '❌ Remover'}
                          </button>
                        ) : (
                          <button onClick={() => toggleVerificado(esp, true)} disabled={saving[esp.id]}
                            className="btn-primary" style={{ fontSize: '12px', padding: '9px 18px' }}>
                            {saving[esp.id] ? 'A verificar…' : '✅ Verificar'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── TAB: Projetos ─────────────────────────────────────────────────── */}
        {tab === 'projetos' && (
          <>
            {loadingProj ? <Spinner /> : projetos.length === 0 ? (
              <Empty icon="📋" msg="Nenhum projeto ainda." />
            ) : (
              <div className="space-y-3">
                {projetos.map(p => {
                  const ei = ESTADO_PROJ[p.estado] ?? { color: '#6b7280', label: p.estado }
                  return (
                    <Link key={p.id} to={`/projeto/${p.id}`}
                      className="card p-5 flex items-center justify-between gap-4"
                      style={{ textDecoration: 'none', display: 'flex' }}>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate" style={{ color: 'var(--text)' }}>{p.titulo}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>
                          {p.empresas?.nome} · €{Number(p.orcamento).toLocaleString('pt-PT')} · {new Date(p.created_at).toLocaleDateString('pt-PT')}
                        </p>
                      </div>
                      <Badge color={ei.color}>{ei.label}</Badge>
                    </Link>
                  )
                })}
              </div>
            )}
          </>
        )}

        {/* ── TAB: Pagamentos ───────────────────────────────────────────────── */}
        {tab === 'pagamentos' && (
          <>
            {/* Resumo financeiro */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Em escrow',   value: `€${totalEscrow.toLocaleString('pt-PT')}`,     color: '#f59e0b' },
                { label: 'Libertado',   value: `€${totalLibertado.toLocaleString('pt-PT')}`,   color: '#10b981' },
                { label: 'Transações',  value: pagamentos.length,                              color: 'var(--brand)' },
              ].map(s => (
                <div key={s.label} className="card p-5">
                  <p className="text-xs mb-1" style={{ color: 'var(--text-3)' }}>{s.label}</p>
                  <p className="text-2xl font-extrabold" style={{ color: s.color, letterSpacing: '-0.03em' }}>{s.value}</p>
                </div>
              ))}
            </div>

            {loadingPag ? <Spinner /> : pagamentos.length === 0 ? (
              <Empty icon="💰" msg="Nenhum pagamento registado ainda." />
            ) : (
              <div className="space-y-3">
                {pagamentos.map(pg => (
                  <div key={pg.id} className="card p-5 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                        {pg.projetos?.titulo || 'Projeto'}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>
                        Empresa: {pg.empresas?.nome} → Especialista: {pg.especialistas?.nome}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>
                        {new Date(pg.created_at).toLocaleDateString('pt-PT')}
                        {pg.stripe_session_id && (
                          <span className="ml-2 font-mono" style={{ color: 'var(--text-3)' }}>
                            {pg.stripe_session_id.slice(0, 20)}…
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="font-bold text-base" style={{ color: 'var(--brand-light)' }}>
                        €{Number(pg.valor).toLocaleString('pt-PT')}
                      </span>
                      <Badge color={
                        pg.estado === 'escrow' ? '#f59e0b' :
                        pg.estado === 'libertado' ? '#10b981' : '#6b7280'
                      }>
                        {pg.estado === 'escrow' ? '🔐 Em escrow' : pg.estado === 'libertado' ? '✅ Libertado' : pg.estado}
                      </Badge>
                      {pg.estado === 'escrow' && (
                        <button
                          onClick={() => libertarPagamento(pg)}
                          disabled={libertando[pg.id]}
                          className="btn-primary"
                          style={{ fontSize: '12px', padding: '7px 14px', whiteSpace: 'nowrap' }}
                        >
                          {libertando[pg.id] ? '…' : '💸 Libertar'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 px-5 py-3 rounded-xl text-sm font-medium shadow-xl z-50"
          style={{
            background: toast.type === 'success' ? 'rgba(16,185,129,0.15)' : toast.type === 'error' ? 'rgba(248,113,113,0.15)' : 'rgba(245,158,11,0.15)',
            border: `1px solid ${toast.type === 'success' ? 'rgba(16,185,129,0.3)' : toast.type === 'error' ? 'rgba(248,113,113,0.3)' : 'rgba(245,158,11,0.3)'}`,
            color: toast.type === 'success' ? '#10b981' : toast.type === 'error' ? '#f87171' : '#f59e0b',
          }}>
          {toast.msg}
        </div>
      )}
    </section>
  )
}

function Spinner() {
  return (
    <div className="py-16 flex justify-center">
      <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: 'var(--brand)', borderTopColor: 'transparent' }} />
    </div>
  )
}

function Empty({ icon, msg }) {
  return (
    <div className="card p-12 text-center">
      <p className="text-4xl mb-3">{icon}</p>
      <p style={{ color: 'var(--text-2)' }}>{msg}</p>
    </div>
  )
}
