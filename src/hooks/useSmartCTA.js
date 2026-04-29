import { useAuth } from '@/contexts/AuthContext'

/**
 * Returns smart CTA destinations based on auth state.
 * - empresaTo: for "empresa" actions (e.g. publicar projeto)
 * - especialistaTo: for "especialista" actions (e.g. criar perfil)
 * - genericTo: for general auth actions
 */
export default function useSmartCTA() {
  const { user, perfil } = useAuth()

  if (!user) {
    return {
      empresaTo: '/registar',
      especialistaTo: '/registar',
      genericTo: '/registar',
    }
  }

  return {
    empresaTo: '/publicar-projeto',
    especialistaTo: '/dashboard',
    genericTo: '/dashboard',
  }
}
