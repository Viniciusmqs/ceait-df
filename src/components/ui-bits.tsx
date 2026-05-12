import type { ReactNode, CSSProperties, ButtonHTMLAttributes } from 'react'

/* ── Btn ── */
type BtnVariant = 'green' | 'navy' | 'outline' | 'ghost' | 'danger' | 'gold' | 'outline-white'
type BtnSize    = 'sm' | 'md' | 'lg'

const btnBase =
  'inline-flex items-center justify-center gap-1.5 font-headline uppercase font-black rounded-lg transition-all focus:outline-none select-none'

const btnVariants: Record<BtnVariant, string> = {
  green:         'bg-[var(--c-green)]  text-white hover:opacity-90',
  navy:          'bg-[var(--c-navy)]   text-white hover:opacity-90',
  outline:       'border border-[var(--c-border)] text-[var(--c-ink)] hover:bg-black/5',
  ghost:         'text-[var(--c-muted)] hover:bg-black/5',
  danger:        'bg-red-50 text-[var(--c-danger)] hover:bg-red-100 border border-red-200',
  gold:          'bg-[var(--c-gold)] text-[var(--c-navy)] hover:opacity-90',
  'outline-white': 'border-2 border-white/60 text-white hover:bg-white/10',
}

const btnSizes: Record<BtnSize, string> = {
  sm:  'text-[11px] tracking-[.1em] px-3.5 h-9',
  md:  'text-xs    tracking-[.08em] px-5   h-10',
  lg:  'text-sm    tracking-[.08em] px-6   h-12',
}

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant
  size?: BtnSize
  children: ReactNode
}

export function Btn({ variant = 'navy', size = 'md', className = '', children, ...rest }: BtnProps) {
  return (
    <button
      className={`${btnBase} ${btnVariants[variant]} ${btnSizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

/* ── Section ── */
interface SectionProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function Section({ children, className = '', style }: SectionProps) {
  return (
    <section className={`py-16 ${className}`} style={style}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}

/* ── Label ── */
export function Label({ children }: { children: ReactNode }) {
  return (
    <div
      className="uppercase text-[11px] font-black tracking-[.14em]"
      style={{ color: 'var(--c-green)', fontFamily: "'Barlow Condensed', sans-serif" }}
    >
      {children}
    </div>
  )
}

/* ── PageHero ── */
interface PageHeroProps {
  badge?: string
  title: string
  highlight?: string
  subtitle?: string
  children?: ReactNode
}

export function PageHero({ badge, title, highlight, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative bg-hero overflow-hidden py-24">
      <div className="absolute inset-0 dot-pattern opacity-[0.06]" />
      <div className="arc-decoration" style={{ width: 600, height: 600, top: '-200px', right: '-150px' }} />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, var(--c-green) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {badge && (
          <div className="hero-badge mb-6 w-fit">{badge}</div>
        )}
        <h1
          className="font-headline uppercase leading-none tracking-tight"
          style={{ fontWeight: 900, fontSize: 'clamp(36px, 5vw, 60px)', color: 'white' }}
        >
          {title}{' '}
          {highlight && (
            <span className="text-gradient-gold">{highlight}</span>
          )}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  )
}

/* ── Pill ── */
interface PillProps {
  dark?: boolean
  children: ReactNode
}

export function Pill({ dark, children }: PillProps) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-headline uppercase tracking-widest"
      style={{
        fontWeight: 800,
        background: dark ? 'rgba(255,255,255,0.12)' : 'var(--c-bg)',
        color: dark ? 'white' : 'var(--c-navy)',
        border: dark ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--c-border)',
      }}
    >
      {children}
    </span>
  )
}
