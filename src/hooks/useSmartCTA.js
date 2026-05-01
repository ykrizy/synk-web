import { useAuth } from '@/contexts/AuthContext'

/**
 * Returns smart CTA destinations AND labels based on auth state and profile type.
 */
export default function useSmartCTA() {
  const { user, perfil } = useAuth()

  if (!user) {
    return {
      empresaTo: '/registar',
      especialistaTo: '/registar',
      genericTo: '/registar',
      primaryLabel: 'Publicar Projeto Grátis',
      secondaryLabel: 'Sou especialista, quero registar-me',
      genericLabel: 'Começar Grátis',
    }
  }

  if (perfil === 'especialista') {
    return {
      empresaTo: '/marketplace',
      especialistaTo: '/marketplace',
      genericTo: '/marketplace',
      primaryLabel: 'Ver Projetos Disponíveis',
      secondaryLabel: 'Ir para o Dashboard',
      genericLabel: 'Ver Projetos',
    }
  }

  // empresa (ou perfil ainda a carregar)
  return {
    empresaTo: '/publicar-projeto',
    especialistaTo: '/dashboard',
    genericTo: '/publicar-projeto',
    primaryLabel: 'Publicar Projeto',
    secondaryLabel: 'Ir para o Dashboard',
    genericLabel: 'Publicar Projeto',
  }
}
