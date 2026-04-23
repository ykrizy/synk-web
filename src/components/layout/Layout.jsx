import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from '@/components/ui/ScrollToTop'
import ChatBot from '@/components/ui/ChatBot'

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
    </>
  )
}
