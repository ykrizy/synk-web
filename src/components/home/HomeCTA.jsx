import CTABanner from '@/components/ui/CTABanner'
import useSmartCTA from '@/hooks/useSmartCTA'

export default function HomeCTA() {
  const { primaryLabel, secondaryLabel, genericTo } = useSmartCTA()

  return (
    <CTABanner
      heading="Pronto para automatizar o teu negócio?"
      sub="Junta-te a centenas de empresas que já estão a poupar tempo e dinheiro com a Synk."
    />
  )
}
