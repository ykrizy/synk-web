import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import ComoFunciona from '@/pages/ComoFunciona'
import ParaEmpresas from '@/pages/ParaEmpresas'
import ParaEspecialistas from '@/pages/ParaEspecialistas'
import Precos from '@/pages/Precos'
import SobreNos from '@/pages/SobreNos'
import Registar from '@/pages/Registar'
import Login from '@/pages/Login'
import Matching from '@/pages/Matching'
import Calculadora from '@/pages/Calculadora'
import Marketplace from '@/pages/Marketplace'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="como-funciona" element={<ComoFunciona />} />
          <Route path="para-empresas" element={<ParaEmpresas />} />
          <Route path="para-especialistas" element={<ParaEspecialistas />} />
          <Route path="precos" element={<Precos />} />
          <Route path="sobre-nos" element={<SobreNos />} />
          <Route path="registar" element={<Registar />} />
          <Route path="login" element={<Login />} />
          <Route path="matching" element={<Matching />} />
          <Route path="calculadora" element={<Calculadora />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
