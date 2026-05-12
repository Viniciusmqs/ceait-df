import { useState } from 'react'
import type { Page } from './types'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SobrePage from './pages/SobrePage'
import TransparenciaPage from './pages/TransparenciaPage'
import ContatoPage from './pages/ContatoPage'
import FestivalDetailPage from './pages/FestivalDetailPage'
import ECREPTDetailPage from './pages/ECREPTDetailPage'

export default function App() {
  const [page, setPage] = useState<Page>('home')

  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar page={page} navigate={navigate} />
      <main className="flex-1">
        {page === 'home'            && <HomePage   navigate={navigate} />}
        {page === 'sobre'           && <SobrePage  navigate={navigate} />}
        {page === 'transparencia'   && <TransparenciaPage navigate={navigate} />}
        {page === 'contato'         && <ContatoPage />}
        {page === 'festival-detail' && <FestivalDetailPage navigate={navigate} />}
        {page === 'ecrept-detail'   && <ECREPTDetailPage   navigate={navigate} />}
      </main>
      <Footer navigate={navigate} />
    </div>
  )
}
