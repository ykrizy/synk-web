import CTABanner from '@/components/ui/CTABanner'
import useSmartCTA from '@/hooks/useSmartCTA'
import { useAuth } from '@/contexts/AuthContext'

export default function HomeCTA() {
  const { perfil } = useAuth()

  if (perfil === 'especialista') {
    return (
      <CTABanner
        heading="Encontra o teu próximo projeto"
        sub="Explora projetos de automação publicados por empresas e candidata-te em segundos."
      />
    )
  }

  if (perfil === 'empresa') {
    return (
      <CTABanner
        heading="Publica o teu próximo projeto"
        sub="Recebe propostas de especialistas verificados em menos de 48 horas. Sem risco."
      />
    )
  }

  return (
    <CTABanner
      heading="Pronto para automatizar o teu negócio?"
      sub="Junta-te a centenas de empresas que já estão a poupar tempo e dinheiro com a Synk."
    />
  )
}
