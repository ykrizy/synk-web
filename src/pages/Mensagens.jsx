import { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import useMeta from '@/hooks/useMeta'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

// ─── Chat ────────────────────────────────────────────────────────────────────
function Chat({ projetoId, empresaId, especialistaId, userId, otherUserId, tituloProjeto }) {
  const [mensagens, setMensagens] = useState([])
  const [texto, setTexto] = useState('')
  const [enviando, setEnviando] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!projetoId || !empresaId || !especialistaId) return
    setMensagens([])

    supabase
      .from('mensagens')
      .select('*')
      .eq('projeto_id', projetoId)
      .eq('empresa_id', empresaId)
      .eq('especialista_id', especialistaId)
      .order('created_at', { ascending: true })
      .then(({ data }) => setMensagens(data || []))

    const channel = supabase
      .channel(`chat-${projetoId}-${especialistaId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensagens' }, (payload) => {
        const m = payload.new
        if (m.projeto_id === projetoId && m.empresa_id === empresaId && m.especialista_id === especialistaId) {
          setMensagens(prev => prev.find(x => x.id === m.id) ? prev : [...prev, m])
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [projetoId, empresaId, especialistaId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensagens])

  async function enviar(e) {
    e.preventDefault()
    if (!texto.trim() || enviando) return
    const conteudo = texto.trim()
    setTexto('')
    setEnviando(true)

    const { data, error } = await supabase
      .from('mensagens')
      .insert({
        projeto_id: projetoId,
        empresa_id: empresaId,
        especialista_id: especialistaId,
        remetente_id: userId,
        conteudo,
      })
      .select()
      .single()

    if (!error && data) {
      setMensagens(prev => prev.find(x => x.id === data.id) ? prev : [...prev, data])
      // Notificar o outro utilizador
      if (otherUserId) {
        supabase.from('notificacoes').insert({
          user_id: otherUserId,
          tipo: 'nova_mensagem',
          titulo: '💬 Nova mensagem',
          mensagem: conteudo.length > 60 ? conteudo.slice(0, 57) + '…' : conteudo,
          link: `/mensagens?projeto=${projetoId}`,
        })
      }
    }

    setEnviando(false)
    inputRef.current?.focus()
  }

  const grupos = []
  mensagens.forEach((msg, i) => {
    const prev = mensagens[i - 1]
    const mesmoDia = prev && new Date(prev.created_at).toDateString() === new Date(msg.created_at).toDateString()
    if (!mesmoDia) {
      grupos.push({ type: 'date', date: msg.created_at })
    }
    grupos.push({ type: 'msg', msg })
  })

  return (
    <div className="flex flex-col h-full">
      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1" style={{ scrollbarWidth: 'thin' }}>
        {grupos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <div className="text-5xl">👋</div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-2)' }}>Nenhuma mensagem ainda</p>
            <p className="text-xs" style={{ color: 'var(--text-3)' }}>Sê o primeiro a enviar uma mensagem!</p>
          </div>
        ) : grupos.map((item, i) => {
          if (item.type === 'date') {
            return (
              <div key={`date-${i}`} className="flex items-center gap-3 py-3">
                <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
                <span className="text-xs px-2" style={{ color: 'var(--text-3)' }}>
                  {new Date(item.date).toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
                <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
              </div>
            )
          }

          const { msg } = item
          const isMe = msg.remetente_id === userId
          const nextMsg = grupos[i + 1]
          const isLastInGroup = !nextMsg || nextMsg.type === 'date' || (nextMsg.type === 'msg' && nextMsg.msg.remetente_id !== msg.remetente_id)

          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} ${isLastInGroup ? 'mb-3' : 'mb-0.5'}`}>
              <div style={{ maxWidth: '70%' }}>
                <div
                  className="px-4 py-2.5 rounded-2xl"
                  style={{
                    background: isMe
                      ? 'linear-gradient(135deg, rgba(124,92,246,0.7), rgba(99,102,241,0.6))'
                      : 'var(--surface)',
                    border: isMe ? '1px solid rgba(124,92,246,0.4)' : '1px solid var(--border)',
                    borderBottomRightRadius: isMe ? (isLastInGroup ? '6px' : '18px') : '18px',
                    borderBottomLeftRadius: isMe ? '18px' : (isLastInGroup ? '6px' : '18px'),
                  }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: isMe ? '#fff' : 'var(--text)', wordBreak: 'break-word' }}>
                    {msg.conteudo}
                  </p>
                </div>
                {isLastInGroup && (
                  <p className={`text-xs mt-1 ${isMe ? 'text-right' : 'text-left'} px-1`} style={{ color: 'var(--text-3)' }}>
                    {new Date(msg.created_at).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={enviar}
        className="flex items-end gap-3 p-4"
        style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)' }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Escreve uma mensagem..."
          value={texto}
          onChange={e => setTexto(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) enviar(e) }}
          className="form-input flex-1"
          style={{ padding: '10px 14px', fontSize: '14px', borderRadius: '12px' }}
          autoFocus
        />
        <button
          type="submit"
          disabled={enviando || !texto.trim()}
          style={{
            width: 42, height: 42, borderRadius: '12px', flexShrink: 0, border: 'none',
            background: (enviando || !texto.trim()) ? 'rgba(124,92,246,0.2)' : 'linear-gradient(135deg, #7c5cf6, #6366f1)',
            cursor: (enviando || !texto.trim()) ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.15s ease',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  )
}

// ─── Conversa item ────────────────────────────────────────────────────────────
function ConversaItem({ conversa, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-3.5 transition-all"
      style={{
        background: isSelected ? 'rgba(124,92,246,0.12)' : 'transparent',
        borderLeft: isSelected ? '3px solid var(--brand)' : '3px solid transparent',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        cursor: 'pointer',
      }}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{
            background: isSelected ? 'rgba(124,92,246,0.3)' : 'rgba(124,92,246,0.12)',
            color: 'var(--brand-light)',
            border: `1px solid ${isSelected ? 'rgba(124,92,246,0.4)' : 'rgba(124,92,246,0.15)'}`,
          }}
        >
          {conversa.nomeOutro?.split(' ').map(w => w[0]).slice(0, 2).join('') || '?'}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold truncate" style={{ color: isSelected ? 'var(--text)' : 'var(--text-2)' }}>
              {conversa.nomeOutro}
            </p>
            {conversa.ultimaMensagem && (
              <span className="text-xs flex-shrink-0" style={{ color: 'var(--text-3)' }}>
                {new Date(conversa.ultimaMensagem.created_at).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
          <p className="text-xs truncate mt-0.5" style={{ color: 'var(--text-3)' }}>
            📋 {conversa.tituloProjeto}
          </p>
          {conversa.ultimaMensagem && (
            <p className="text-xs truncate mt-0.5" style={{ color: 'var(--text-3)' }}>
              {conversa.ultimaMensagem.conteudo}
            </p>
          )}
        </div>
      </div>
    </button>
  )
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function Mensagens() {
  useMeta({ title: 'Mensagens — Twonect', description: 'As tuas conversas na Twonect.' })

  const { user, perfil } = useAuth()
  const [searchParams] = useSearchParams()

  const [conversas, setConversas] = useState([])
  const [loading, setLoading] = useState(true)
  const [conversaSelecionada, setConversaSelecionada] = useState(null)
  const [showSidebar, setShowSidebar] = useState(true) // mobile toggle

  useEffect(() => {
    if (!user || !perfil) return
    loadConversas()
  }, [user, perfil])

  // Auto-selecionar a partir de URL params
  useEffect(() => {
    if (conversas.length === 0) return
    const projetoParam = searchParams.get('projeto')
    const espParam = searchParams.get('esp')
    if (projetoParam) {
      const match = conversas.find(c =>
        c.projetoId === projetoParam &&
        (espParam ? c.especialistaId === espParam : true)
      )
      if (match) { setConversaSelecionada(match); setShowSidebar(false) }
    }
  }, [conversas, searchParams])

  async function loadConversas() {
    setLoading(true)
    let lista = []

    if (perfil === 'empresa') {
      const { data: emp } = await supabase
        .from('empresas').select('id').eq('user_id', user.id).maybeSingle()
      if (!emp) { setLoading(false); return }

      const { data: props } = await supabase
        .from('propostas')
        .select('*, projetos(id, titulo, empresa_id), especialistas(id, nome, user_id)')
        .eq('estado', 'aceite')

      const minhasProps = (props || []).filter(p => p.projetos?.empresa_id === emp.id)

      lista = await Promise.all(minhasProps.map(async (prop) => {
        const { data: ultima } = await supabase
          .from('mensagens')
          .select('conteudo, created_at')
          .eq('projeto_id', prop.projetos?.id)
          .eq('empresa_id', emp.id)
          .eq('especialista_id', prop.especialistas?.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        return {
          id: `${prop.projetos?.id}-${prop.especialistas?.id}`,
          projetoId: prop.projetos?.id,
          empresaId: emp.id,
          especialistaId: prop.especialistas?.id,
          nomeOutro: prop.especialistas?.nome,
          tituloProjeto: prop.projetos?.titulo,
          ultimaMensagem: ultima,
          otherUserId: prop.especialistas?.user_id,
        }
      }))

    } else if (perfil === 'especialista') {
      const { data: esp } = await supabase
        .from('especialistas').select('id').eq('user_id', user.id).maybeSingle()
      if (!esp) { setLoading(false); return }

      const { data: props } = await supabase
        .from('propostas')
        .select('*, projetos(id, titulo, empresa_id, empresas(id, nome, user_id))')
        .eq('especialista_id', esp.id)
        .eq('estado', 'aceite')

      lista = await Promise.all((props || []).map(async (prop) => {
        const empId = prop.projetos?.empresa_id
        const { data: ultima } = await supabase
          .from('mensagens')
          .select('conteudo, created_at')
          .eq('projeto_id', prop.projetos?.id)
          .eq('empresa_id', empId)
          .eq('especialista_id', esp.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        return {
          id: `${prop.projetos?.id}-${empId}`,
          projetoId: prop.projetos?.id,
          empresaId: empId,
          especialistaId: esp.id,
          nomeOutro: prop.projetos?.empresas?.nome,
          tituloProjeto: prop.projetos?.titulo,
          ultimaMensagem: ultima,
          otherUserId: prop.projetos?.empresas?.user_id,
        }
      }))
    }

    // Sort by last message date
    lista.sort((a, b) => {
      const da = a.ultimaMensagem?.created_at ?? '0'
      const db = b.ultimaMensagem?.created_at ?? '0'
      return db.localeCompare(da)
    })

    setConversas(lista)
    setLoading(false)
  }

  function selecionarConversa(c) {
    setConversaSelecionada(c)
    setShowSidebar(false)
  }

  return (
    <div
      className="flex"
      style={{
        position: 'fixed',
        top: '60px',
        left: 0,
        right: 0,
        bottom: 0,
        background: 'var(--bg)',
        zIndex: 10,
      }}
    >
      {/* ── Sidebar ── */}
      <div
        className={`flex-shrink-0 flex flex-col ${showSidebar ? 'flex' : 'hidden'} lg:flex`}
        style={{
          width: '320px',
          borderRight: '1px solid var(--border)',
          background: 'var(--surface)',
          height: '100%',
        }}
      >
        {/* Header da sidebar */}
        <div className="px-4 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-lg" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
                💬 Mensagens
              </h1>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>
                {conversas.length} conversa{conversas.length !== 1 ? 's' : ''}
              </p>
            </div>
            <Link
              to="/dashboard"
              className="btn-ghost"
              style={{ fontSize: '12px', padding: '6px 12px', textDecoration: 'none' }}
            >
              ← Dashboard
            </Link>
          </div>
        </div>

        {/* Lista de conversas */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: 'var(--brand)', borderTopColor: 'transparent' }} />
            </div>
          ) : conversas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-3">
              <div className="text-4xl">💬</div>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-2)' }}>Sem conversas ainda</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
                {perfil === 'empresa'
                  ? 'Aceita uma proposta para começar a comunicar com especialistas.'
                  : 'As tuas conversas aparecerão aqui depois de uma proposta ser aceite.'}
              </p>
              <Link
                to={perfil === 'empresa' ? '/dashboard' : '/marketplace?tab=projetos'}
                className="btn-primary mt-2"
                style={{ fontSize: '12px', padding: '8px 16px', textDecoration: 'none' }}
              >
                {perfil === 'empresa' ? 'Ver projetos →' : 'Explorar projetos →'}
              </Link>
            </div>
          ) : conversas.map(c => (
            <ConversaItem
              key={c.id}
              conversa={c}
              isSelected={conversaSelecionada?.id === c.id}
              onClick={() => selecionarConversa(c)}
            />
          ))}
        </div>
      </div>

      {/* ── Área de chat ── */}
      <div className={`flex-1 flex flex-col ${showSidebar ? 'hidden lg:flex' : 'flex'}`} style={{ height: '100%', minWidth: 0 }}>
        {conversaSelecionada ? (
          <>
            {/* Header do chat */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
            >
              {/* Back (mobile) */}
              <button
                className="lg:hidden p-1.5 rounded-lg"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-2)' }}
                onClick={() => setShowSidebar(true)}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{ background: 'rgba(124,92,246,0.2)', color: 'var(--brand-light)', border: '1px solid rgba(124,92,246,0.3)' }}
              >
                {conversaSelecionada.nomeOutro?.split(' ').map(w => w[0]).slice(0, 2).join('') || '?'}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate" style={{ color: 'var(--text)' }}>
                  {conversaSelecionada.nomeOutro}
                </p>
                <p className="text-xs truncate" style={{ color: 'var(--text-3)' }}>
                  📋 {conversaSelecionada.tituloProjeto}
                </p>
              </div>

              <Link
                to={`/projeto/${conversaSelecionada.projetoId}`}
                className="btn-ghost flex-shrink-0"
                style={{ fontSize: '12px', padding: '6px 12px', textDecoration: 'none' }}
              >
                Ver projeto →
              </Link>
            </div>

            {/* Chat */}
            <div className="flex-1 overflow-hidden">
              <Chat
                projetoId={conversaSelecionada.projetoId}
                empresaId={conversaSelecionada.empresaId}
                especialistaId={conversaSelecionada.especialistaId}
                userId={user.id}
                otherUserId={conversaSelecionada.otherUserId}
                tituloProjeto={conversaSelecionada.tituloProjeto}
              />
            </div>
          </>
        ) : (
          // Empty state desktop
          <div className="hidden lg:flex flex-col items-center justify-center h-full gap-4">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(124,92,246,0.1)', border: '1px solid rgba(124,92,246,0.2)' }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--brand-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-semibold" style={{ color: 'var(--text)' }}>Seleciona uma conversa</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>
                Escolhe uma conversa à esquerda para começar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
