import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import SocialStrip from './SocialStrip'
import ScrollToTop from '@/components/ui/ScrollToTop'

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <SocialStrip />
      <Footer />
    </>
  )
}
