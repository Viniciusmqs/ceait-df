import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import type { Page } from '../types'

interface Props {
  page: Page
  navigate: (p: Page) => void
}

const links: { label: string; page: Page }[] = [
  { label: 'Início',        page: 'home' },
  { label: 'Sobre Nós',     page: 'sobre' },
  { label: 'Transparência', page: 'transparencia' },
  { label: 'Contato',       page: 'contato' },
]

export default function Navbar({ page, navigate }: Props) {
  const [open, setOpen] = useState(false)

  const isActive = (p: Page) =>
    p === page ||
    (p === 'transparencia' && (page === 'festival-detail' || page === 'ecrept-detail'))

  const go = (p: Page) => {
    navigate(p)
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button onClick={() => go('home')} className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src={`${import.meta.env.BASE_URL}logo.svg`}
                alt="CEAIT"
                className="h-10 w-10 rounded-full object-cover ring-2 ring-[#0D2D6B]/10 group-hover:ring-[#1A9B3C]/40 transition-all"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0D2D6B]/5 to-transparent" />
            </div>
            <div className="hidden sm:block text-left leading-none">
              <p className="font-cond font-black text-sm uppercase tracking-wider text-[#0D2D6B]">CEAIT</p>
              <p className="text-xs text-gray-400 mt-0.5">Centro Esportivo Arco-Íris</p>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <button
                key={l.page}
                onClick={() => go(l.page)}
                className={`relative px-4 py-2 rounded-lg font-cond font-700 text-sm uppercase tracking-wide transition-all ${
                  isActive(l.page)
                    ? 'bg-[#0D2D6B] text-white shadow-sm'
                    : 'text-gray-500 hover:text-[#0D2D6B] hover:bg-gray-50'
                }`}
              >
                {l.label}
                {isActive(l.page) && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1A9B3C]" />
                )}
              </button>
            ))}
          </nav>

          {/* CTA + mobile */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => go('transparencia')}
              className="hidden sm:flex items-center gap-1.5 text-xs font-cond font-800 uppercase tracking-wide bg-[#1A9B3C] text-white px-4 py-2 rounded-lg hover:bg-[#0f6326] transition-colors"
            >
              Transparência
            </button>
            <button
              onClick={() => setOpen(o => !o)}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur border-t border-gray-100 px-4 pb-5 pt-3 space-y-1">
          {links.map(l => (
            <button
              key={l.page}
              onClick={() => go(l.page)}
              className={`flex w-full items-center text-left px-4 py-3 rounded-xl font-cond font-700 text-sm uppercase tracking-wide transition-all ${
                isActive(l.page)
                  ? 'bg-[#0D2D6B] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
