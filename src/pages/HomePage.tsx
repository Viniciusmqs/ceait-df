import { MapPin, HandHeart, Users, ScrollText, Sprout } from 'lucide-react'
import type { Page } from '../types'
import { Btn } from '../components/ui-bits'

interface Props { navigate: (p: Page) => void }

const CITIES = [
  'Taguatinga',
  'Recanto das Emas',
  'Brazlândia',
  'Guará',
  'Vila Planalto',
  'Cruzeiro',
]

const FEATURES = [
  { Icon: HandHeart, label: 'Inclusão',       desc: 'Acesso ao esporte para todos, sem barreiras.' },
  { Icon: Users,     label: 'Cidadania',       desc: 'Formação de valores e protagonismo social.' },
  { Icon: ScrollText,label: 'Transparência',   desc: 'Gestão aberta e prestação de contas pública.' },
  { Icon: Sprout,    label: 'Desenvolvimento', desc: 'Crescimento humano através do esporte.' },
]

const STATS = [
  { value: '4.000+', label: 'Atletas atendidos' },
  { value: '8.000+', label: 'Famílias beneficiadas' },
  { value: '6',      label: 'Regiões do DF' },
  { value: '100%',   label: 'Gestão transparente' },
]

export default function HomePage({ navigate }: Props) {
  return (
    <div>
      {/* ── HERO ── */}
      <header
        className="relative overflow-hidden text-white"
        style={{ background: 'linear-gradient(135deg, #0D2D6B 0%, #0F2452 45%, #0F3B1F 100%)' }}
      >
        <div className="absolute inset-0 dot-pattern opacity-[0.06]" />

        {/* decorative rings */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 520, height: 520,
            top: '-180px', right: '-140px',
            border: '2px solid rgba(255,255,255,0.05)',
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 320, height: 320,
            top: '-60px', right: '-20px',
            border: '1px solid rgba(245,200,0,0.1)',
          }}
        />

        <div className="relative max-w-[1100px] mx-auto px-6 py-28 grid lg:grid-cols-[260px_1fr] gap-12 items-center">
          {/* Logo */}
          <div
            className="justify-self-center lg:justify-self-start rounded-full p-2"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 0 60px rgba(245,200,0,0.18)',
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}logo.svg`}
              alt="CEAIT"
              className="w-56 h-56 rounded-full object-contain"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <div
              className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full text-[11px] font-headline font-black uppercase tracking-widest"
              style={{ background: 'rgba(245,200,0,0.15)', border: '1px solid rgba(245,200,0,0.3)', color: 'var(--c-gold)' }}
            >
              OSC · Brasília / DF
            </div>

            <h1
              className="font-headline uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(40px, 6.5vw, 76px)', fontWeight: 900 }}
            >
              Transformando vidas pelo{' '}
              <span style={{ color: 'var(--c-gold)' }}>esporte</span>{' '}
              no Distrito Federal
            </h1>

            <p className="text-lg max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
              Desde 2005, o CEAIT leva esporte, educação e cidadania a comunidades do DF,
              com transparência e comprometimento social.
            </p>

            <div className="flex flex-wrap gap-3 mt-2">
              <Btn variant="gold" size="lg" onClick={() => navigate('sobre')}>
                Conheça o CEAIT
              </Btn>
              <Btn variant="outline-white" size="lg" onClick={() => navigate('transparencia')}>
                Ver Transparência
              </Btn>
            </div>
          </div>
        </div>
      </header>

      {/* ── ABOUT ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="flex flex-col gap-5">
            <span className="sec-label w-fit">Quem somos</span>
            <h2
              className="sec-heading"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
            >
              Uma OSC que transforma<br />
              <span style={{ color: 'var(--c-green)' }}>vidas pelo esporte</span>
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--c-muted)' }}>
              O Centro Esportivo Arco-Íris Taguatinga (CEAIT) é uma organização da sociedade
              civil sem fins lucrativos, fundada em 2005, dedicada ao desenvolvimento social
              por meio do esporte nas regiões administrativas do Distrito Federal.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--c-muted)' }}>
              Atuamos com projetos esportivos, educacionais e de inclusão social, atendendo
              crianças, adolescentes e adultos em situação de vulnerabilidade socioeconômica.
            </p>
            <div className="mt-2">
              <Btn variant="navy" size="lg" onClick={() => navigate('sobre')}>
                Nossa história
              </Btn>
            </div>
          </div>

          {/* Right — 2×2 feature cards */}
          <div className="grid grid-cols-2 gap-4">
            {FEATURES.map(({ Icon, label, desc }) => (
              <div key={label} className="card card-elev rounded-2xl p-5 flex flex-col gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--c-bg)' }}
                >
                  <Icon size={20} style={{ color: 'var(--c-green)' }} />
                </div>
                <div>
                  <p className="font-headline font-black uppercase text-sm tracking-wide" style={{ color: 'var(--c-navy)' }}>
                    {label}
                  </p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--c-muted)' }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITIES ── */}
      <section className="py-20" style={{ background: 'var(--c-bg)' }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="sec-label">Abrangência</span>
            <h2 className="sec-heading mt-1" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)' }}>
              Presente em 6 regiões do DF
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CITIES.map((city) => (
              <div
                key={city}
                className="card card-elev rounded-2xl p-5 flex flex-col items-center gap-3 text-center"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--c-navy)' }}
                >
                  <MapPin size={18} style={{ color: 'var(--c-gold)' }} />
                </div>
                <span
                  className="font-headline font-black uppercase text-xs tracking-wide leading-tight"
                  style={{ color: 'var(--c-navy)' }}
                >
                  {city}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="sec-label">Impacto</span>
            <h2 className="sec-heading mt-1" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)' }}>
              Resultados que mudam histórias
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl p-6 flex flex-col items-center gap-2 text-center"
                style={{ border: '2px solid var(--c-border)' }}
              >
                <span
                  className="stat-number"
                  style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: 'var(--c-navy)' }}
                >
                  {value}
                </span>
                <span
                  className="font-headline font-black uppercase text-[11px] tracking-widest"
                  style={{ color: 'var(--c-muted)' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOLDEN CTA ── */}
      <div style={{ background: 'var(--c-gold)' }}>
        <div className="max-w-[1100px] mx-auto px-6 py-16 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <h3
              className="font-headline font-black uppercase leading-tight"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--c-navy)' }}
            >
              Fale com o CEAIT
            </h3>
            <p className="mt-1 text-sm" style={{ color: 'rgba(13,45,107,0.7)' }}>
              Entre em contato e saiba como apoiar ou participar dos nossos projetos.
            </p>
          </div>
          <Btn variant="navy" size="lg" onClick={() => navigate('contato')}>
            Entrar em contato
          </Btn>
        </div>
      </div>
    </div>
  )
}
