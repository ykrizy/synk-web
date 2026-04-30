import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

export default function CandidatarModal({ projeto, onClose, onSucesso }) {
  const { user } = useAuth()
  const [mensagem, setMensagem] = useState('')
  const [preco, setPreco] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)
    setLoading(true)

    try {
      // Buscar id do especialista
      const { data: esp } = await supabase
        .from('especialistas')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle()

      if (!esp) throw new Error('Perfil de especialista não encontrado.')

      // Verificar se já se candidatou
      const { data: jaExiste } = await supabase
        .from('propostas')
        .select('id')
        .eq('projeto_id', projeto.id)
        .eq('especialista_id', esp.id)
        .maybeSingle()

      if (jaExiste) throw new Error('Já te candidataste a este projeto.')

      const { error } = await supabase.from('propostas').insert({
        projeto_id: projeto.id,
        especialista_id: esp.id,
        mensagem,
        preco_proposto: preco ? Number(preco) : null,
        estado: 'pendente',
      })

      if (error) throw error

      onSucesso()
    } catch (err) {
      setErro(err.message || 'Erro ao enviar candidatura. Tenta novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl p-8 w-full max-w-lg"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="font-heading text-xl mb-1" style={{ color: 'var(--text)' }}>
              Candidatar ao projeto
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>{projeto.titulo || projeto.title}</p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', fontSize: '20px', lineHeight: 1 }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-2)' }}>
              Mensagem de apresentação *
            </label>
            <textarea
              required
              rows={5}
              className="form-input"
              style={{ resize: 'vertical' }}
              placeholder="Apresenta-te, explica porque és a pessoa certa para este projeto e como o abordarias..."
              value={mensagem}
              onChange={e => setMensagem(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-2)' }}>
              Proposta de preço (€) <span style={{ color: 'var(--text-3)' }}>— opcional</span>
            </label>
            <input
              type="number"
              min={0}
              className="form-input"
              placeholder="ex: 2500"
              value={preco}
              onChange={e => setPreco(e.target.value)}
            />
          </div>

          {erro && (
            <p className="text-sm px-4 py-3 rounded-lg" style={{ color: '#f87171', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}>
              {erro}
            </p>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary btn-primary-lg flex-1 justify-center"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'A enviar…' : 'Enviar candidatura →'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost"
              style={{ fontSize: '14px', padding: '12px 20px' }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
