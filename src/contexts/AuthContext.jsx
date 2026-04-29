import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [perfil, setPerfil] = useState(null) // 'empresa' | 'especialista'
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null
      setUser(u)

      if (u) {
        // 1. Lê o tipo diretamente dos user_metadata (guardado no signUp — instantâneo)
        const tipoMeta = u.user_metadata?.tipo ?? null
        if (tipoMeta) {
          setPerfil(tipoMeta)
          setLoading(false)
        } else {
          // 2. Fallback: query à tabela profiles (utilizadores antigos)
          fetchPerfil(u.id)
        }
      } else {
        setPerfil(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchPerfil(userId) {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('tipo')
        .eq('id', userId)
        .maybeSingle()
      setPerfil(data?.tipo ?? null)
    } catch {
      setPerfil(null)
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, perfil, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
