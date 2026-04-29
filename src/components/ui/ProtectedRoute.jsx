import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="text-center">
          <div
            className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-4"
            style={{ borderColor: 'var(--brand)', borderTopColor: 'transparent' }}
          />
          <p style={{ color: 'var(--text-2)' }}>A carregar…</p>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return children
}
