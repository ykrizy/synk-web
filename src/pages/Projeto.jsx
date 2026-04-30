import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import useMeta from '@/hooks/useMeta'
import Reveal from '@/components/ui/Reveal'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

const TIPOS = ['RPA', 'Integrações', 'IA / LLMs', 'Marketing Automation', 'BI & Data', 'Custom Dev', 'Outro']
const SETORES = ['E-commerce', 'Logística', 'Saúde', 'Finanças', 'Tecnologia', 'Retalho', 'Indústria', 'Outro']
const PRAZOS = [
  { value: 'urgent', label: 'Urgente (menos de 1 semana)' },
  { value: 'short', label: 'Curto (1–2 semanas)' },
  { value: 'normal', label: 'Normal (1 mês)' },
  { value: 'flexible', label: 'Flexível (mais de 1 mês)' },
]
const ESTADOS = [
  { value: 'aberto', label: 'Aberto' },
  { value: 'em_andamento', label: 'Em andamento' },
  { value: 'concluido', label: 'Concluído' },
]

const ESTADO_STYLE = {
  aberto: { badge: 'badge-emerald', label: 'Aberto' },
  em_andamento: { badge: 'badge-amber', label: 'Em andamento' },
  concluido: { badge: 'badge-indigo', label: 'Concluído' },
}

export default function Projeto() {
  useMeta({ title: 'Detalhes do Projeto', description: 'Ver e editar os detalhes do teu projeto.' })

  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [projeto, setProjeto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [fields, setFields] = useState({})
  const [saving, setSaving] = useState(false)
  const [erro, setErro] = useState(null)
  const [sucesso, setSucesso] = useState(false)

  useEffect(() => {
    if (!id) return
    supabase
      .from('projetos')
      .select('*, empresas(nome, nome_responsavel)')
      .eq('id', id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error || !data) {
          navigate('/dashboard')
          return
        }
        setProjeto(data)
        setFields({
          titulo: data.titulo,
          descricao: data.descricao,
          tipo_automacao: data.tipo_automacao,
          orcamento: data.orcamento,
          prazo: data.prazo,
          setor: data.setor,
          estado: data.estado,
        })
        setLoading(false)
      })
  }, [id, navigate])

  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [propostas, setPropostas] = useState([])

  // Carregar propostas deste projeto
  useEffect(() => {
    if (!id) return
    supabase
      .from('propostas')
      .select('*, especialistas(nome, email, pais, anos_experiencia, skills)')
      .eq('projeto_id', id)
      .order('created_at', { ascending: false })
      .then(({ data }) => setPropostas(data || []))
  }, [id])

  async function handleProposta(propostaId, estado) {
    await supabase.from('propostas').update({ estado }).eq('id', propostaId)
    setPropostas(prev => prev.map(p => p.id === propostaId ? { ...p, estado } : p))
  }

  const set = (k) => (e) => setFields(f => ({ ...f, [k]: e.target.value }))

  async function handleDelete() {
    setDeleting(true)
    const { error } = await supabase.from('projetos').delete().eq('id', id)
    if (error) {
      setErro('Erro ao apagar o projeto. Tenta novamente.')
      setDeleting(false)
      setConfirmDelete(false)
    } else {
      navigate('/dashboard')
    }
  }

  async function handleSave(e) {
    e.preventDefault()
    setErro(null)
    setSaving(true)
    setSucesso(false)

    const { error } = await supabase
      .from('projetos')
      .update({
        titulo: fields.titulo,
        descricao: fields.descricao,
        tipo_automacao: fields.tipo_automacao,
        orcamento: Number(fields.orcamento),
        prazo: fields.prazo,
        setor: fields.setor,
        estado: fields.estado,
      })
      .eq('id', id)

    if (error) {
      setErro('Erro ao guardar as alterações. Tenta novamente.')
    } else {
      setProjeto(prev => ({ ...prev, ...fields, orcamento: Number(fields.orcamento) }))
      setEditMode(false)
      setSucesso(true)
      setTimeout(() => setSucesso(false), 3000)
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--brand)', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  const estadoInfo = ESTADO_STYLE[projeto.estado] ?? { badge: 'badge-indigo', label: projeto.estado }
  const prazoLabel = PRAZOS.find(p => p.value === projeto.prazo)?.label ?? projeto.prazo

  return (
    <section className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(124,92,246,0.06) 0%, transparent 70%)' }} />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb */}
        <Reveal>
          <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: 'var(--text-3)' }}>
            <Link to="/dashboard" style={{ color: 'var(--text-3)', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--brand-light)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
            >
              ← Dashboard
            </Link>
            <span>/</span>
            <span style={{ color: 'var(--text-2)' }}>{projeto.titulo}</span>
          </div>
        </Reveal>

        {/* Header */}
        <Reveal>
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <span className={`badge ${estadoInfo.badge} mb-3`}>{estadoInfo.label}</span>
              <h1 className="font-display text-2xl" style={{ color: 'var(--text)', letterSpacing: '-0.03em' }}>
                {projeto.titulo}
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>
                Criado em {new Date(projeto.created_at).toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            </div>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="btn-ghost flex-shrink-0"
                style={{ fontSize: '13.5px', padding: '8px 16px' }}
              >
                ✏️ Editar
              </button>
            )}
          </div>
        </Reveal>

        {/* Sucesso */}
        {sucesso && (
          <Reveal>
            <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ color: '#10b981', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
              ✅ Projeto atualizado com sucesso.
            </div>
          </Reveal>
        )}

        <Reveal delay={80}>
          <div className="rounded-2xl p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>

            {editMode ? (
              /* ── Modo Edição ── */
              <form onSubmit={handleSave} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-2)' }}>Título *</label>
                  <input type="text" required className="form-input" value={fields.titulo} onChange={set('titulo')} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-2)' }}>Descrição *</label>
                  <textarea required rows={4} className="form-input" style={{ resize: 'vertical' }} value={fields.descricao} onChange={set('descricao')} />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-2)' }}>Tipo de automação</label>
                    <select className="form-input w-full" value={fields.tipo_automacao} onChange={set('tipo_automacao')}>
                      {TIPOS.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-2)' }}>Setor</label>
                    <select className="form-input w-full" value={fields.setor} onChange={set('setor')}>
                      {SETORES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-2)' }}>Orçamento (€)</label>
                    <input type="number" min={500} className="form-input" value={fields.orcamento} onChange={set('orcamento')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-2)' }}>Prazo</label>
                    <select className="form-input w-full" value={fields.prazo} onChange={set('prazo')}>
                      {PRAZOS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-2)' }}>Estado</label>
                  <select className="form-input w-full" value={fields.estado} onChange={set('estado')}>
                    {ESTADOS.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
                  </select>
                </div>

                {erro && (
                  <p className="text-sm px-4 py-3 rounded-lg" style={{ color: '#f87171', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}>
                    {erro}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving} className="btn-primary btn-primary-lg" style={{ opacity: saving ? 0.7 : 1 }}>
                    {saving ? 'A guardar…' : 'Guardar alterações →'}
                  </button>
                  <button type="button" onClick={() => { setEditMode(false); setErro(null) }} className="btn-ghost" style={{ fontSize: '14px', padding: '12px 20px' }}>
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              /* ── Modo Detalhe ── */
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-3)' }}>Descrição</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)', whiteSpace: 'pre-wrap' }}>{projeto.descricao}</p>
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {[
                      { label: 'Tipo de automação', value: projeto.tipo_automacao },
                      { label: 'Setor', value: projeto.setor },
                      { label: 'Orçamento', value: `€${Number(projeto.orcamento).toLocaleString('pt-PT')}` },
                      { label: 'Prazo', value: prazoLabel },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-3)' }}>{label}</p>
                        <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Propostas recebidas */}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                  <h3 className="font-heading text-lg mb-4" style={{ color: 'var(--text)' }}>
                    Propostas recebidas
                    <span className="ml-2 text-sm font-normal" style={{ color: 'var(--text-3)' }}>({propostas.length})</span>
                  </h3>
                  {propostas.length === 0 ? (
                    <p className="text-sm" style={{ color: 'var(--text-3)' }}>Ainda não recebeste nenhuma proposta.</p>
                  ) : (
                    <div className="space-y-4">
                      {propostas.map(prop => (
                        <div key={prop.id} className="rounded-xl p-5" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                              <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{prop.especialistas?.nome}</p>
                              <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>
                                {prop.especialistas?.pais} · {prop.especialistas?.anos_experiencia}
                                {prop.preco_proposto && <span className="ml-2 font-semibold" style={{ color: 'var(--brand-light)' }}>€{Number(prop.preco_proposto).toLocaleString('pt-PT')}</span>}
                              </p>
                            </div>
                            <span className={`badge flex-shrink-0 ${prop.estado === 'aceite' ? 'badge-emerald' : prop.estado === 'rejeitado' ? 'badge-red' : 'badge-amber'}`}>
                              {prop.estado === 'aceite' ? '✅ Aceite' : prop.estado === 'rejeitado' ? '❌ Rejeitado' : '⏳ Pendente'}
                            </span>
                          </div>
                          <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-2)', whiteSpace: 'pre-wrap' }}>{prop.mensagem}</p>
                          {prop.especialistas?.skills?.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {prop.especialistas.skills.slice(0, 4).map(s => (
                                <span key={s} className="badge badge-indigo" style={{ fontSize: '10px' }}>{s}</span>
                              ))}
                            </div>
                          )}
                          {prop.estado === 'pendente' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleProposta(prop.id, 'aceite')}
                                className="btn-primary"
                                style={{ fontSize: '12px', padding: '6px 16px' }}
                              >
                                ✅ Aceitar
                              </button>
                              <button
                                onClick={() => handleProposta(prop.id, 'rejeitado')}
                                style={{ fontSize: '12px', padding: '6px 16px', borderRadius: '8px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171', cursor: 'pointer' }}
                              >
                                ❌ Rejeitar
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }} className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => setEditMode(true)}
                    className="btn-primary"
                    style={{ fontSize: '14px', padding: '10px 20px' }}
                  >
                    ✏️ Editar projeto
                  </button>
                  <button
                    onClick={() => setConfirmDelete(true)}
                    style={{
                      fontSize: '14px', padding: '10px 20px', borderRadius: '10px',
                      background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)',
                      color: '#f87171', cursor: 'pointer', fontWeight: 500,
                    }}
                  >
                    🗑️ Apagar projeto
                  </button>
                  <Link to="/dashboard" className="btn-ghost" style={{ fontSize: '14px', padding: '10px 20px' }}>
                    ← Voltar
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
      {/* Modal de confirmação de eliminação */}
      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => setConfirmDelete(false)}
        >
          <div
            className="rounded-2xl p-8 w-full max-w-sm"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-4xl mb-4 text-center">🗑️</div>
            <h2 className="font-heading text-xl text-center mb-2" style={{ color: 'var(--text)' }}>Apagar projeto?</h2>
            <p className="text-sm text-center mb-6" style={{ color: 'var(--text-2)' }}>
              Esta ação é <strong>irreversível</strong>. O projeto "<span style={{ color: 'var(--text)' }}>{projeto?.titulo}</span>" será apagado permanentemente.
            </p>
            {erro && (
              <p className="text-sm px-4 py-3 rounded-lg mb-4" style={{ color: '#f87171', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}>
                {erro}
              </p>
            )}
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={deleting}
                style={{
                  flex: 1, padding: '12px', borderRadius: '10px', fontWeight: 600, fontSize: '14px',
                  background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.3)',
                  color: '#f87171', cursor: deleting ? 'not-allowed' : 'pointer', opacity: deleting ? 0.7 : 1,
                }}
              >
                {deleting ? 'A apagar…' : 'Sim, apagar'}
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="btn-ghost flex-1"
                style={{ fontSize: '14px', padding: '12px' }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
