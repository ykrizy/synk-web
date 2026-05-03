import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
// useSearchParams mantido para ler ?pagamento=cancelado se necessário
import useMeta from '@/hooks/useMeta'
import CandidatarModal from '@/components/ui/CandidatarModal'
import Reveal from '@/components/ui/Reveal'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

function StatCard({ label, value, color = 'var(--brand-light)' }) {
  return (
    <div className="card p-6">
      <p className="text-sm mb-2" style={{ color: 'var(--text-3)' }}>{label}</p>
      <p className="text-3xl font-extrabold" style={{ color, letterSpacing: '-0.03em' }}>{value}</p>
    </div>
  )
}

const AUTOMATION_TYPES = ['RPA', 'Integrações', 'IA / LLMs', 'Marketing Automation', 'BI & Data', 'Custom Dev', 'Outro']
const COMPANY_SIZES = ['1–10', '11–50', '51–200', '200+']
const SECTORS = ['Retalho', 'Saúde', 'Finanças', 'Logística', 'Imobiliário', 'Educação', 'Tecnologia', 'Indústria', 'Outro']

function EmpresaDashboard({ dados: dadosIniciais }) {
  const [dados, setDados] = useState(dadosIniciais)
  const [projetos, setProjetos] = useState([])
  const [editandoPerfil, setEditandoPerfil] = useState(false)
  const [form, setForm] = useState({})
  const [savingPerfil, setSavingPerfil] = useState(false)
  const [erroPerfil, setErroPerfil] = useState(null)
  const [toastPerfil, setToastPerfil] = useState(false)

  useEffect(() => { setDados(dadosIniciais) }, [dadosIniciais])

  useEffect(() => {
    if (!dados?.id) return
    supabase
      .from('projetos')
      .select('*, propostas(id)')
      .eq('empresa_id', dados.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => setProjetos(data || []))
  }, [dados])

  const projetosAtivos = projetos.filter(p => p.estado !== 'pendente_pagamento')
  const projetosPendentes = projetos.filter(p => p.estado === 'pendente_pagamento')

  function abrirEdicao() {
    setForm({
      nome: dados?.nome ?? '',
      nome_responsavel: dados?.nome_responsavel ?? '',
      telefone: dados?.telefone ?? '',
      pais: dados?.pais ?? 'Portugal',
      tamanho: dados?.tamanho ?? '1–10',
      setor: dados?.setor ?? '',
      website: dados?.website ?? '',
      descricao: dados?.descricao ?? '',
      nif: dados?.nif ?? '',
      cidade: dados?.cidade ?? '',
      tipos_automacao: dados?.tipos_automacao ?? [],
    })
    setErroPerfil(null)
    setEditandoPerfil(true)
  }

  function toggleAutomacao(val) {
    setForm(f => ({
      ...f,
      tipos_automacao: f.tipos_automacao.includes(val)
        ? f.tipos_automacao.filter(x => x !== val)
        : [...f.tipos_automacao, val]
    }))
  }

  async function guardarPerfil(e) {
    e.preventDefault()
    setSavingPerfil(true)
    setErroPerfil(null)
    const { error } = await supabase
      .from('empresas')
      .update({
        nome: form.nome,
        nome_responsavel: form.nome_responsavel,
        telefone: form.telefone || null,
        pais: form.pais,
        tamanho: form.tamanho,
        setor: form.setor || null,
        website: form.website || null,
        descricao: form.descricao || null,
        nif: form.nif || null,
        cidade: form.cidade || null,
        tipos_automacao: form.tipos_automacao,
      })
      .eq('id', dados.id)
    setSavingPerfil(false)
    if (error) {
      setErroPerfil('Erro ao guardar. Tenta novamente.')
    } else {
      setDados(prev => ({ ...prev, ...form }))
      setEditandoPerfil(false)
      setToastPerfil(true)
      setTimeout(() => setToastPerfil(false), 3000)
    }
  }

  return (
    <div className="space-y-8">
      {/* Aviso projetos com pagamento pendente */}
      {projetosPendentes.length > 0 && (
        <div className="px-4 py-3 rounded-xl text-sm flex items-center justify-between gap-4" style={{ color: '#f59e0b', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
          <span>⚠️ Tens {projetosPendentes.length} projeto{projetosPendentes.length > 1 ? 's' : ''} aguardando pagamento.</span>
          <Link to="/publicar-projeto" style={{ color: '#f59e0b', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>Pagar agora →</Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatCard label="Projetos publicados" value={projetosAtivos.length} />
        <StatCard label="Projetos ativos" value={projetosAtivos.filter(p => p.estado === 'aberto').length} color="#10b981" />
        <StatCard label="Em andamento" value={projetosAtivos.filter(p => p.estado === 'em_andamento').length} color="#f59e0b" />
      </div>

      {/* Perfil da empresa */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg" style={{ color: 'var(--text)' }}>Perfil da empresa</h3>
          {!editandoPerfil && (
            <button onClick={abrirEdicao} className="btn-ghost" style={{ fontSize: '13px', padding: '6px 14px' }}>
              ✏️ Editar perfil
            </button>
          )}
        </div>

        {editandoPerfil ? (
          <form onSubmit={guardarPerfil} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Nome da empresa *</label>
                <input required className="form-input" value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Nome do responsável *</label>
                <input required className="form-input" value={form.nome_responsavel} onChange={e => setForm(f => ({ ...f, nome_responsavel: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Telefone</label>
                <input className="form-input" placeholder="+351 900 000 000" value={form.telefone} onChange={e => setForm(f => ({ ...f, telefone: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>NIF</label>
                <input className="form-input" placeholder="PT123456789" value={form.nif} onChange={e => setForm(f => ({ ...f, nif: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>País</label>
                <input className="form-input" value={form.pais} onChange={e => setForm(f => ({ ...f, pais: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Cidade</label>
                <input className="form-input" placeholder="Lisboa" value={form.cidade} onChange={e => setForm(f => ({ ...f, cidade: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Nº de funcionários</label>
                <select className="form-input" value={form.tamanho} onChange={e => setForm(f => ({ ...f, tamanho: e.target.value }))}>
                  {COMPANY_SIZES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Setor</label>
                <select className="form-input" value={form.setor} onChange={e => setForm(f => ({ ...f, setor: e.target.value }))}>
                  <option value="">Selecionar...</option>
                  {SECTORS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Website</label>
                <input className="form-input" placeholder="https://empresa.pt" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Descrição da empresa</label>
              <textarea rows={3} className="form-input" style={{ resize: 'vertical' }} placeholder="O que faz a vossa empresa, principais áreas de negócio..." value={form.descricao} onChange={e => setForm(f => ({ ...f, descricao: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs mb-2" style={{ color: 'var(--text-3)' }}>Tipos de automação de interesse</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {AUTOMATION_TYPES.map(opt => (
                  <label key={opt} className="checkbox-item" style={{ fontSize: '12px' }}>
                    <input type="checkbox" checked={form.tipos_automacao.includes(opt)} onChange={() => toggleAutomacao(opt)} />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            {erroPerfil && (
              <p className="text-sm px-4 py-3 rounded-lg" style={{ color: '#f87171', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}>
                {erroPerfil}
              </p>
            )}
            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={savingPerfil} className="btn-primary" style={{ opacity: savingPerfil ? 0.7 : 1 }}>
                {savingPerfil ? 'A guardar…' : 'Guardar alterações →'}
              </button>
              <button type="button" onClick={() => setEditandoPerfil(false)} className="btn-ghost" style={{ fontSize: '14px' }}>
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            {[
              { label: 'Empresa', value: dados?.nome },
              { label: 'Responsável', value: dados?.nome_responsavel },
              { label: 'Email', value: dados?.email },
              { label: 'Telefone', value: dados?.telefone },
              { label: 'NIF', value: dados?.nif },
              { label: 'País', value: dados?.pais },
              { label: 'Cidade', value: dados?.cidade },
              { label: 'Dimensão', value: dados?.tamanho ? `${dados.tamanho} pessoas` : null },
              { label: 'Setor', value: dados?.setor },
              { label: 'Website', value: dados?.website },
              { label: 'Descrição', value: dados?.descricao },
              { label: 'Automação', value: dados?.tipos_automacao?.join(', ') },
            ].map(({ label, value }) => value ? (
              <div key={label} className="flex gap-3 text-sm">
                <span style={{ color: 'var(--text-3)', minWidth: '100px', flexShrink: 0 }}>{label}</span>
                <span style={{ color: 'var(--text)' }}>{value}</span>
              </div>
            ) : null)}
          </div>
        )}
      </div>

      {/* Toast */}
      {toastPerfil && (
        <div className="fixed bottom-6 right-6 px-5 py-3 rounded-xl text-sm font-medium shadow-xl z-50"
          style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981' }}>
          ✅ Perfil atualizado!
        </div>
      )}

      {/* Ação principal */}
      <div
        className="rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        style={{ background: 'linear-gradient(135deg, rgba(124,92,246,0.12), rgba(99,102,241,0.08))', border: '1px solid rgba(124,92,246,0.2)' }}
      >
        <div>
          <h3 className="font-heading text-xl mb-1" style={{ color: 'var(--text)' }}>Publica o teu próximo projeto</h3>
          <p style={{ color: 'var(--text-2)', fontSize: '14px' }}>Recebe propostas de especialistas verificados em menos de 48h.</p>
        </div>
        <Link to="/publicar-projeto" className="btn-primary btn-primary-lg flex-shrink-0">
          + Publicar Projeto
        </Link>
      </div>

      {/* Lista de projetos */}
      <div>
        <h3 className="font-heading text-lg mb-4" style={{ color: 'var(--text)' }}>Os teus projetos</h3>
        {projetosAtivos.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="text-4xl mb-3">📋</p>
            <p style={{ color: 'var(--text-2)' }}>Ainda não publicaste nenhum projeto.</p>
            <Link to="/publicar-projeto" className="btn-primary mt-4 inline-flex">Publicar primeiro projeto →</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {projetosAtivos.map(p => (
              <Link
                key={p.id}
                to={`/projeto/${p.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="card p-5 flex items-center justify-between gap-4 transition-all"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(124,92,246,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{p.titulo}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>
                      {p.tipo_automacao} · €{p.orcamento?.toLocaleString('pt-PT')} · {p.setor}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {p.propostas?.length > 0 && (
                      <span className="badge badge-violet" style={{ fontSize: '11px' }}>
                        {p.propostas.length} proposta{p.propostas.length !== 1 ? 's' : ''}
                      </span>
                    )}
                    <span className={`badge ${p.estado === 'aberto' ? 'badge-emerald' : p.estado === 'em_andamento' ? 'badge-amber' : 'badge-indigo'}`}>
                      {p.estado === 'aberto' ? 'Aberto' : p.estado === 'em_andamento' ? 'Em andamento' : 'Concluído'}
                    </span>
                    <span style={{ color: 'var(--text-3)', fontSize: '16px' }}>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function EspecialistaDashboard({ dados: dadosIniciais }) {
  const [dados, setDados] = useState(dadosIniciais)
  const [propostas, setPropostas] = useState([])
  const [editarProposta, setEditarProposta] = useState(null)
  const [cancelarProposta, setCancelarProposta] = useState(null)
  const [cancelando, setCancelando] = useState(false)
  const [editandoPerfil, setEditandoPerfil] = useState(false)
  const [form, setForm] = useState({})
  const [savingPerfil, setSavingPerfil] = useState(false)
  const [erroPerfil, setErroPerfil] = useState(null)
  const [toastPerfil, setToastPerfil] = useState(false)

  useEffect(() => { setDados(dadosIniciais) }, [dadosIniciais])

  useEffect(() => {
    if (!dados?.id) return
    supabase
      .from('propostas')
      .select('*, projetos(titulo, orcamento, tipo_automacao)')
      .eq('especialista_id', dados.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => setPropostas(data || []))
  }, [dados])

  function abrirEdicao() {
    setForm({
      nome: dados?.nome ?? '',
      telefone: dados?.telefone ?? '',
      pais: dados?.pais ?? '',
      anos_experiencia: dados?.anos_experiencia ?? '',
      preco_hora: dados?.preco_hora ?? '',
      bio: dados?.bio ?? '',
      linkedin: dados?.linkedin ?? '',
      portfolio: dados?.portfolio ?? '',
      skills: dados?.skills?.join(', ') ?? '',
      disponivel_agora: dados?.disponivel_agora ?? true,
    })
    setErroPerfil(null)
    setEditandoPerfil(true)
  }

  async function confirmarCancelamento() {
    if (!cancelarProposta) return
    setCancelando(true)
    const { error } = await supabase
      .from('propostas')
      .delete()
      .eq('id', cancelarProposta.id)
    setCancelando(false)
    if (!error) {
      setPropostas(prev => prev.filter(p => p.id !== cancelarProposta.id))
      setCancelarProposta(null)
    }
  }

  async function guardarPerfil(e) {
    e.preventDefault()
    setSavingPerfil(true)
    setErroPerfil(null)
    const skillsArray = form.skills
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
    const { error } = await supabase
      .from('especialistas')
      .update({
        nome: form.nome,
        telefone: form.telefone || null,
        pais: form.pais,
        anos_experiencia: form.anos_experiencia || null,
        preco_hora: form.preco_hora ? Number(form.preco_hora) : null,
        bio: form.bio || null,
        linkedin: form.linkedin || null,
        portfolio: form.portfolio || null,
        skills: skillsArray,
        disponivel_agora: form.disponivel_agora,
      })
      .eq('id', dados.id)
    setSavingPerfil(false)
    if (error) {
      setErroPerfil('Erro ao guardar. Tenta novamente.')
    } else {
      setDados(prev => ({ ...prev, ...form, skills: skillsArray, preco_hora: form.preco_hora ? Number(form.preco_hora) : null }))
      setEditandoPerfil(false)
      setToastPerfil(true)
      setTimeout(() => setToastPerfil(false), 3000)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatCard label="Avaliação" value={dados?.rating ? `${dados.rating}★` : '—'} color="#f59e0b" />
        <StatCard label="Candidaturas" value={propostas.length} />
        <StatCard label="Estado" value={dados?.verificado ? 'Verificado' : 'Pendente'} color={dados?.verificado ? '#10b981' : '#f59e0b'} />
      </div>

      <div
        className="rounded-2xl p-8"
        style={{ background: 'linear-gradient(135deg, rgba(124,92,246,0.12), rgba(99,102,241,0.08))', border: '1px solid rgba(124,92,246,0.2)' }}
      >
        <h3 className="font-heading text-xl mb-1" style={{ color: 'var(--text)' }}>
          {dados?.verificado ? '✅ Perfil verificado' : '⏳ Verificação pendente'}
        </h3>
        <p style={{ color: 'var(--text-2)', fontSize: '14px' }}>
          {dados?.verificado
            ? 'O teu perfil está visível no Marketplace.'
            : 'A equipa Synk irá verificar o teu perfil em 24h úteis.'}
        </p>
      </div>

      {/* Perfil — modo leitura ou edição */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg" style={{ color: 'var(--text)' }}>O teu perfil</h3>
          {!editandoPerfil && (
            <button onClick={abrirEdicao} className="btn-ghost" style={{ fontSize: '13px', padding: '6px 14px' }}>
              ✏️ Editar perfil
            </button>
          )}
        </div>

        {editandoPerfil ? (
          <form onSubmit={guardarPerfil} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Nome *</label>
                <input required className="form-input" value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Telefone</label>
                <input className="form-input" value={form.telefone} onChange={e => setForm(f => ({ ...f, telefone: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>País</label>
                <input className="form-input" value={form.pais} onChange={e => setForm(f => ({ ...f, pais: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Anos de experiência</label>
                <input className="form-input" value={form.anos_experiencia} onChange={e => setForm(f => ({ ...f, anos_experiencia: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Preço/hora (€)</label>
                <input type="number" min={0} className="form-input" value={form.preco_hora} onChange={e => setForm(f => ({ ...f, preco_hora: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>LinkedIn</label>
                <input className="form-input" placeholder="https://linkedin.com/in/..." value={form.linkedin} onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Portfolio / Website</label>
                <input className="form-input" placeholder="https://..." value={form.portfolio} onChange={e => setForm(f => ({ ...f, portfolio: e.target.value }))} />
              </div>
              <div className="flex items-center gap-3 pt-4">
                <input
                  type="checkbox"
                  id="disponivel"
                  checked={form.disponivel_agora}
                  onChange={e => setForm(f => ({ ...f, disponivel_agora: e.target.checked }))}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--brand)', cursor: 'pointer' }}
                />
                <label htmlFor="disponivel" className="text-sm" style={{ color: 'var(--text-2)', cursor: 'pointer' }}>
                  Disponível para projetos agora
                </label>
              </div>
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Skills <span style={{ color: 'var(--text-3)' }}>(separadas por vírgula)</span></label>
              <input className="form-input" placeholder="RPA (UiPath), Python, IA / LLMs" value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Bio</label>
              <textarea rows={3} className="form-input" style={{ resize: 'vertical' }} placeholder="Apresenta-te brevemente..." value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} />
            </div>
            {erroPerfil && (
              <p className="text-sm px-4 py-3 rounded-lg" style={{ color: '#f87171', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}>
                {erroPerfil}
              </p>
            )}
            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={savingPerfil} className="btn-primary" style={{ opacity: savingPerfil ? 0.7 : 1 }}>
                {savingPerfil ? 'A guardar…' : 'Guardar alterações →'}
              </button>
              <button type="button" onClick={() => setEditandoPerfil(false)} className="btn-ghost" style={{ fontSize: '14px' }}>
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            {[
              { label: 'Nome', value: dados?.nome },
              { label: 'Email', value: dados?.email },
              { label: 'País', value: dados?.pais },
              { label: 'Telefone', value: dados?.telefone },
              { label: 'Experiência', value: dados?.anos_experiencia ? `${dados.anos_experiencia} anos` : null },
              { label: 'Preço/hora', value: dados?.preco_hora ? `€${dados.preco_hora}` : null },
              { label: 'LinkedIn', value: dados?.linkedin },
              { label: 'Portfolio', value: dados?.portfolio },
              { label: 'Skills', value: dados?.skills?.join(', ') },
              { label: 'Bio', value: dados?.bio },
            ].map(({ label, value }) => value ? (
              <div key={label} className="flex gap-3 text-sm">
                <span style={{ color: 'var(--text-3)', minWidth: '100px', flexShrink: 0 }}>{label}</span>
                <span style={{ color: 'var(--text)' }}>{value}</span>
              </div>
            ) : null)}
            <div className="flex gap-3 text-sm">
              <span style={{ color: 'var(--text-3)', minWidth: '100px' }}>Disponível</span>
              <span style={{ color: dados?.disponivel_agora ? '#10b981' : 'var(--text-3)' }}>
                {dados?.disponivel_agora ? '✅ Sim' : '❌ Não'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Toast */}
      {toastPerfil && (
        <div className="fixed bottom-6 right-6 px-5 py-3 rounded-xl text-sm font-medium shadow-xl z-50"
          style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981' }}>
          ✅ Perfil atualizado!
        </div>
      )}

      {/* Candidaturas enviadas */}
      <div>
        <h3 className="font-heading text-lg mb-4" style={{ color: 'var(--text)' }}>As tuas candidaturas</h3>
        {propostas.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-3xl mb-3">📨</p>
            <p style={{ color: 'var(--text-2)' }}>Ainda não te candidataste a nenhum projeto.</p>
            <Link to="/marketplace" className="btn-primary mt-4 inline-flex">Ver projetos →</Link>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {propostas.map(prop => (
                <div key={prop.id} className="card p-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{prop.projetos?.titulo}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>
                      {prop.projetos?.tipo_automacao}
                      {prop.preco_proposto && ` · €${Number(prop.preco_proposto).toLocaleString('pt-PT')}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
                    <span className={`badge ${prop.estado === 'aceite' ? 'badge-emerald' : prop.estado === 'rejeitado' ? 'badge-red' : 'badge-amber'}`}>
                      {prop.estado === 'aceite' ? '✅ Aceite' : prop.estado === 'rejeitado' ? '❌ Rejeitado' : '⏳ Pendente'}
                    </span>
                    <Link
                      to={prop.estado === 'aceite' ? `/mensagens?projeto=${prop.projeto_id}` : `/projeto/${prop.projeto_id}`}
                      className="btn-ghost"
                      style={{ fontSize: '12px', padding: '5px 12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      {prop.estado === 'aceite' ? '💬 Chat' : '📋 Ver projeto'}
                    </Link>
                    {prop.estado === 'pendente' && (
                      <>
                        <button
                          onClick={() => setEditarProposta(prop)}
                          className="btn-ghost"
                          style={{ fontSize: '12px', padding: '5px 12px' }}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => setCancelarProposta(prop)}
                          className="btn-ghost"
                          style={{ fontSize: '12px', padding: '5px 12px', color: '#f87171', borderColor: 'rgba(248,113,113,0.3)' }}
                        >
                          🗑️ Cancelar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {cancelarProposta && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center px-4"
                style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
                onClick={() => setCancelarProposta(null)}
              >
                <div
                  className="rounded-2xl p-8 w-full max-w-md text-center"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  onClick={e => e.stopPropagation()}
                >
                  <p className="text-4xl mb-4">🗑️</p>
                  <h3 className="font-heading text-xl mb-2" style={{ color: 'var(--text)' }}>Cancelar candidatura?</h3>
                  <p className="text-sm mb-6" style={{ color: 'var(--text-2)' }}>
                    Vais retirar a candidatura ao projeto <strong style={{ color: 'var(--text)' }}>"{cancelarProposta.projetos?.titulo}"</strong>. Esta ação não pode ser desfeita.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={confirmarCancelamento}
                      disabled={cancelando}
                      className="btn-primary"
                      style={{ background: '#ef4444', opacity: cancelando ? 0.7 : 1 }}
                    >
                      {cancelando ? 'A cancelar…' : 'Sim, cancelar'}
                    </button>
                    <button
                      onClick={() => setCancelarProposta(null)}
                      className="btn-ghost"
                    >
                      Manter candidatura
                    </button>
                  </div>
                </div>
              </div>
            )}

            {editarProposta && (
              <CandidatarModal
                projeto={{ id: editarProposta.projeto_id, titulo: editarProposta.projetos?.titulo }}
                proposta={editarProposta}
                onClose={() => setEditarProposta(null)}
                onSucesso={(dadosAtualizados) => {
                  setPropostas(prev => prev.map(p =>
                    p.id === editarProposta.id
                      ? { ...p, ...dadosAtualizados }
                      : p
                  ))
                  setEditarProposta(null)
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function Dashboard() {
  useMeta({ title: 'Dashboard', description: 'A tua área pessoal na Synk.' })

  const { user, perfil } = useAuth()
  const [dados, setDados] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (!user) return
    if (!perfil) {
      setLoading(false)
      return
    }
    const tabela = perfil === 'empresa' ? 'empresas' : 'especialistas'
    supabase
      .from(tabela)
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => { setDados(data); setLoading(false) })
  }, [user, perfil])


  return (
    <section className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-8">
            <p className="text-sm mb-1" style={{ color: 'var(--text-3)' }}>
              {perfil === 'empresa' ? '🏢 Empresa' : '⚡ Especialista'}
            </p>
            <h1 className="font-display text-3xl" style={{ color: 'var(--text)', letterSpacing: '-0.03em' }}>
              Olá, {dados?.nome_responsavel || dados?.nome || user?.email?.split('@')[0]} 👋
            </h1>
          </div>
        </Reveal>

        <Reveal delay={80}>
          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mx-auto" style={{ borderColor: 'var(--brand)', borderTopColor: 'transparent' }} />
            </div>
          ) : !perfil ? (
            <div className="card p-10 text-center">
              <p className="text-4xl mb-4">⚠️</p>
              <h2 className="font-heading text-xl mb-2" style={{ color: 'var(--text)' }}>Perfil incompleto</h2>
              <p className="mb-6" style={{ color: 'var(--text-2)' }}>
                A tua conta existe mas o perfil não foi criado corretamente. Regista-te novamente para completar.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link to="/registar" className="btn-primary">Completar registo →</Link>
              </div>
            </div>
          ) : perfil === 'empresa' ? (
            <EmpresaDashboard dados={dados} />
          ) : (
            <EspecialistaDashboard dados={dados} />
          )}
        </Reveal>
      </div>
    </section>
  )
}
