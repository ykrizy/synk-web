import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useMeta from '@/hooks/useMeta'
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

function EmpresaDashboard({ dados }) {
  const [projetos, setProjetos] = useState([])

  useEffect(() => {
    if (!dados?.id) return
    supabase
      .from('projetos')
      .select('*')
      .eq('empresa_id', dados.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => setProjetos(data || []))
  }, [dados])

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatCard label="Projetos publicados" value={projetos.length} />
        <StatCard label="Projetos ativos" value={projetos.filter(p => p.estado === 'aberto').length} color="#10b981" />
        <StatCard label="Em andamento" value={projetos.filter(p => p.estado === 'em_andamento').length} color="#f59e0b" />
      </div>

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
        {projetos.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="text-4xl mb-3">📋</p>
            <p style={{ color: 'var(--text-2)' }}>Ainda não publicaste nenhum projeto.</p>
            <Link to="/publicar-projeto" className="btn-primary mt-4 inline-flex">Publicar primeiro projeto →</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {projetos.map(p => (
              <div key={p.id} className="card p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{p.titulo}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>{p.tipo_automacao} · €{p.orcamento?.toLocaleString('pt-PT')}</p>
                </div>
                <span className={`badge ${p.estado === 'aberto' ? 'badge-emerald' : p.estado === 'em_andamento' ? 'badge-amber' : 'badge-indigo'}`}>
                  {p.estado === 'aberto' ? 'Aberto' : p.estado === 'em_andamento' ? 'Em andamento' : 'Concluído'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function EspecialistaDashboard({ dados }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatCard label="Avaliação" value={dados?.rating ? `${dados.rating}★` : '—'} color="#f59e0b" />
        <StatCard label="Avaliações" value={dados?.num_avaliacoes ?? 0} />
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

      <div className="card p-6">
        <h3 className="font-heading text-lg mb-4" style={{ color: 'var(--text)' }}>O teu perfil</h3>
        <div className="space-y-3">
          {[
            { label: 'Nome', value: dados?.nome },
            { label: 'Email', value: dados?.email },
            { label: 'País', value: dados?.pais },
            { label: 'Experiência', value: dados?.anos_experiencia },
            { label: 'Skills', value: dados?.skills?.join(', ') },
          ].map(({ label, value }) => value ? (
            <div key={label} className="flex gap-3 text-sm">
              <span style={{ color: 'var(--text-3)', minWidth: '100px' }}>{label}</span>
              <span style={{ color: 'var(--text)' }}>{value}</span>
            </div>
          ) : null)}
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  useMeta({ title: 'Dashboard', description: 'A tua área pessoal na Synk.' })

  const { user, perfil } = useAuth()
  const [dados, setDados] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    if (!perfil) {
      // Sem perfil ainda (ex: utilizador criado antes da tabela profiles existir)
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
