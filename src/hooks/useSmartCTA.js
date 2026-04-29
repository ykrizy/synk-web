import { useAuth } from '@/contexts/AuthContext'

/**
 * Returns smart CTA destinations based on auth state and profile type.
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

  // Logged in as especialista
  if (perfil === 'especialista') {
    return {
      empresaTo: '/dashboard',
      especialistaTo: '/dashboard',
      genericTo: '/dashboard',
    }
  }

  // Logged in as empresa (or perfil still loading)
  return {
    empresaTo: '/publicar-projeto',
    especialistaTo: '/dashboard',
    genericTo: '/dashboard',
  }
}
