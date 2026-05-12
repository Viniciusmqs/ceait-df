import { MapPin, Phone, Mail, Instagram, Facebook, ArrowUpRight } from 'lucide-react'
import type { Page } from '../types'

interface Props {
  navigate: (p: Page) => void
}

export default function Footer({ navigate }: Props) {
  return (
    <footer className="bg-[#071a42] text-white relative overflow-hidden">
      {/* Top divider accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#0D2D6B] via-[#1A9B3C] to-[#F5C800]" />

      {/* Decorative arc */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full border border-white/5 pointer-events-none"
           style={{ transform: 'translate(40%, -40%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo.svg" alt="CEAIT" className="h-14 w-14 rounded-full object-cover ring-2 ring-white/10" />
              <div>
                <p className="font-cond font-black text-xl uppercase tracking-widest">CEAIT</p>
                <p className="text-sm text-white/50 leading-tight">Centro Esportivo<br />Arco-Íris Taguatinga</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Transformando vidas pelo esporte no Distrito Federal desde 2014.
            </p>
            <div className="flex gap-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                 className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors">
                <Instagram size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer"
                 className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-cond font-bold text-xs uppercase tracking-widest text-white/40 mb-5">Navegação</p>
            <ul className="space-y-3">
              {([
                { page: 'home'         as Page, label: 'Início' },
                { page: 'sobre'        as Page, label: 'Sobre Nós' },
                { page: 'transparencia'as Page, label: 'Transparência' },
                { page: 'contato'      as Page, label: 'Contato' },
              ]).map(item => (
                <li key={item.page}>
                  <button
                    onClick={() => navigate(item.page)}
                    className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors group"
                  >
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-cond font-bold text-xs uppercase tracking-widest text-white/40 mb-5">Contato</p>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#1A9B3C]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={14} className="text-[#1A9B3C]" />
                </div>
                <span>QNA 23, Área Especial A/B<br />Taguatinga Norte — DF, CEP 72.115-510</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#1A9B3C]/20 flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-[#1A9B3C]" />
                </div>
                <span>(61) 3563-1400</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#1A9B3C]/20 flex items-center justify-center shrink-0">
                  <Mail size={14} className="text-[#1A9B3C]" />
                </div>
                <span>ceait.df@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <span>© {new Date().getFullYear()} CEAIT — Centro Esportivo Arco-Íris Taguatinga. Todos os direitos reservados.</span>
          <span className="text-white/20">CNPJ: 19.630.XXX/0001-XX</span>
        </div>
      </div>
    </footer>
  )
}
