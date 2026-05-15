import Hero from '@/components/home/Hero'
import TrustedBy from '@/components/home/TrustedBy'
import HowItWorks from '@/components/home/HowItWorks'
import AutomationTypes from '@/components/home/AutomationTypes'
import WhyTwonect from '@/components/home/WhySynk'
import Stats from '@/components/home/Stats'
import Testimonials from '@/components/home/Testimonials'
import HomePricing from '@/components/home/HomePricing'
import HomeFAQ from '@/components/home/HomeFAQ'
import HomeCTA from '@/components/home/HomeCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <HowItWorks />
      <AutomationTypes />
      <WhyTwonect />
      <Stats />
      <Testimonials />
      <HomePricing />
      <HomeFAQ />
      <HomeCTA />
    </>
  )
}
