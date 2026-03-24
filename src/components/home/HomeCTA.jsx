import CTABanner from '@/components/ui/CTABanner'

export default function HomeCTA() {
  return (
    <CTABanner
      heading="Pronto para automatizar o teu negócio?"
      sub="Junta-te a centenas de empresas que já estão a poupar tempo e dinheiro com a Synk."
      primaryLabel="Publicar o Meu Projeto"
      primaryTo="/registar"
      secondaryLabel="Sou especialista, quero registar-me"
      secondaryTo="/registar"
    />
  )
}
