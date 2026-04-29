import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import useMeta from '@/hooks/useMeta'
import Reveal from '@/components/ui/Reveal'
import { login, resetPassword } from '@/lib/api/auth'
import { useAuth } from '@/contexts/AuthContext'

export default function Login() {
  useMeta({
    title: 'Entrar',
    description: 'Acede à tua conta Synk.',
  })

  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const [fields, setFields] = useState({ email: '', password: '' })
  const [erro, setErro] = useState(null)
  const [loading, setLoading] = useState(false)
  const [resetMode, setResetMode] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  const set = (k) => (e) => setFields(f => ({ ...f, [k]: e.target.value }))

  async function handleLogin(e) {
    e.preventDefault()
    setErro(null)
    setLoading(true)
    try {
      await login(fields.email, fields.password)
      navigate('/dashboard')
    } catch (err) {
      setErro(err.message || 'Email ou password incorretos.')
    } finally {
      setLoading(false)
    }
  }

  async function handleReset(e) {
    e.preventDefault()
    setErro(null)
    setLoading(true)
    try {
      await resetPassword(fields.email)
      setResetSent(true)
    } catch (err) {
      setErro(err.message || 'Não foi possível enviar o email. Tenta novamente.')
    } finally {
      setLoading(false)
    }
  }

  // Já autenticado → vai para o dashboard
  if (!loading && user) return <Navigate to="/dashboard" replace />

  return (
    <section
      className="min-h-screen pt-20 pb-24 relative flex items-center"
      style={{ background: 'var(--bg)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(124,92,246,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-md mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-8 pt-8">
            <h1 className="font-display mb-2" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--text)' }}>
              Bem-vindo de volta
            </h1>
            <p style={{ color: 'var(--text-2)' }}>
              {resetMode ? 'Envia um link para recuperar a tua password.' : 'Entra na tua conta Synk.'}
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div
            className="rounded-2xl p-8"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            {resetSent ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-4">📬</div>
                <h2 className="font-heading text-lg mb-2" style={{ color: 'var(--text)' }}>Email enviado!</h2>
                <p className="text-sm mb-6" style={{ color: 'var(--text-2)' }}>
                  Verifica a tua caixa de correio e segue o link para redefinir a password.
                </p>
                <button onClick={() => { setResetMode(false); setResetSent(false) }} className="btn-ghost" style={{ fontSize: '14px' }}>
                  ← Voltar ao login
                </button>
              </div>
            ) : resetMode ? (
              <form onSubmit={handleReset} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-2)' }}>Email *</label>
                  <input
                    type="email" required className="form-input"
                    placeholder="o-teu@email.pt"
                    value={fields.email} onChange={set('email')}
                  />
                </div>
                {erro && (
                  <p className="text-sm px-4 py-3 rounded-lg" style={{ color: '#f87171', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}>
                    {erro}
                  </p>
                )}
                <button type="submit" disabled={loading} className="btn-primary btn-primary-lg w-full justify-center" style={{ opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'A enviar…' : 'Enviar link de recuperação →'}
                </button>
                <button type="button" onClick={() => setResetMode(false)} className="w-full text-sm text-center" style={{ color: 'var(--text-2)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  ← Voltar ao login
                </button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-2)' }}>Email *</label>
                  <input
                    type="email" required className="form-input"
                    placeholder="o-teu@email.pt"
                    value={fields.email} onChange={set('email')}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium" style={{ color: 'var(--text-2)' }}>Password *</label>
                    <button type="button" onClick={() => setResetMode(true)} className="text-xs" style={{ color: 'var(--brand-light)', background: 'none', border: 'none', cursor: 'pointer' }}>
                      Esqueceste a password?
                    </button>
                  </div>
                  <input
                    type="password" required className="form-input"
                    placeholder="A tua password"
                    value={fields.password} onChange={set('password')}
                  />
                </div>
                {erro && (
                  <p className="text-sm px-4 py-3 rounded-lg" style={{ color: '#f87171', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}>
                    {erro}
                  </p>
                )}
                <button type="submit" disabled={loading} className="btn-primary btn-primary-lg w-full justify-center" style={{ opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'A entrar…' : 'Entrar →'}
                </button>
              </form>
            )}
          </div>
        </Reveal>

        {!resetMode && !resetSent && (
          <Reveal delay={140}>
            <p className="text-center text-sm mt-6" style={{ color: 'var(--text-2)' }}>
              Ainda não tens conta?{' '}
              <Link to="/registar" style={{ color: 'var(--brand-light)', textDecoration: 'none', fontWeight: 600 }}>
                Regista-te grátis →
              </Link>
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
