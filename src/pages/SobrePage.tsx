import {
  MapPin, Phone, Mail,
  Target, Eye, Heart,
  Trophy, GraduationCap, Shield, Calendar,
  Baby, User, UserCircle2,
} from 'lucide-react'
import type { Page } from '../types'
import { PageHero } from '../components/ui-bits'

interface Props { navigate: (p: Page) => void }

const TIMELINE = [
  { year: '2005', label: 'Fundação', desc: 'Fundação do CEAIT em Taguatinga com foco em esporte social.' },
  { year: '2008', label: 'Expansão', desc: 'Ampliação para novas modalidades e regiões do DF.' },
  { year: '2014', label: 'Parceria GDF', desc: 'Formalização da parceria com o Governo do Distrito Federal.' },
  { year: '2019', label: 'Festival Integração', desc: 'Lançamento do Festival de Integração Esportiva do DF.' },
  { year: '2025', label: '20 Anos', desc: 'Celebração de duas décadas de transformação social.' },
]

const ACTIVITIES = [
  { Icon: Trophy,         label: 'Campeonatos',      desc: 'Organização de torneios e competições esportivas no DF.', color: 'var(--ceait-green)' },
  { Icon: GraduationCap, label: 'Formação',          desc: 'Capacitação esportiva e educação integral para jovens.', color: 'var(--ceait-yellow)' },
  { Icon: Shield,         label: 'Proteção Social',  desc: 'Atendimento a crianças e adolescentes em vulnerabilidade.', color: 'var(--ceait-navy)' },
  { Icon: Calendar,       label: 'Eventos',          desc: 'Festivais, mostras culturais e eventos comunitários.', color: 'var(--ceait-green)' },
]

const AUDIENCE = [
  { Icon: Baby,        label: 'Crianças e Adolescentes', desc: '6 a 17 anos',  bg: 'var(--ceait-green)' },
  { Icon: User,        label: 'Adultos',                  desc: '18 a 59 anos', bg: 'var(--ceait-yellow)' },
  { Icon: UserCircle2, label: 'Idosos',                   desc: '60+ anos',     bg: 'var(--ceait-navy)' },
]

const VALUES_PILLS = ['Transparência', 'Inclusão', 'Ética', 'Cidadania', 'Excelência', 'Solidariedade']

export default function SobrePage({ navigate: _navigate }: Props) {
  return (
    <div>
      <PageHero
        badge="Sobre Nós"
        title="Centro Esportivo"
        highlight="Arco-Íris Taguatinga"
        subtitle="20 anos transformando vidas pelo esporte no Distrito Federal"
      />

      {/* ── INSTITUTIONAL DATA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6 grid lg:grid-cols-2 gap-8">
          {/* Card 1 — Identificação */}
          <div
            className="rounded-2xl p-7"
            style={{
              background: 'white',
              boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
              borderLeft: '4px solid var(--ceait-green)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(26,155,60,0.1)' }}
              >
                <Shield size={18} style={{ color: 'var(--ceait-green)' }} />
              </div>
              <h3
                className="font-headline font-black uppercase text-lg"
                style={{ color: 'var(--ceait-navy)' }}
              >
                Identificação
              </h3>
            </div>

            <table className="w-full text-sm">
              <tbody>
                {[
                  ['Razão Social', 'Centro Esportivo Arco-Íris Taguatinga'],
                  ['CNPJ', '06.300.730/0001-94'],
                  ['Fundação', '2005'],
                  ['Natureza Jurídica', 'Associação Sem Fins Lucrativos'],
                ].map(([k, v]) => (
                  <tr key={k} className="border-b last:border-0" style={{ borderColor: 'var(--c-border)' }}>
                    <td className="py-3 pr-4 font-headline font-black uppercase text-[11px] tracking-wide w-36" style={{ color: 'var(--c-muted)' }}>
                      {k}
                    </td>
                    <td className="py-3" style={{ color: 'var(--c-ink)' }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card 2 — Localização */}
          <div
            className="rounded-2xl p-7"
            style={{
              background: 'white',
              boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
              borderLeft: '4px solid var(--ceait-navy)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(13,45,107,0.1)' }}
              >
                <MapPin size={18} style={{ color: 'var(--ceait-navy)' }} />
              </div>
              <h3
                className="font-headline font-black uppercase text-lg"
                style={{ color: 'var(--ceait-navy)' }}
              >
                Localização e Contato
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--ceait-green)' }} />
                <p className="text-sm" style={{ color: 'var(--c-ink)' }}>
                  QNL 28, Conjunto D, Casa 21<br />
                  Taguatinga / Distrito Federal
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="shrink-0" style={{ color: 'var(--ceait-green)' }} />
                <p className="text-sm" style={{ color: 'var(--c-ink)' }}>(61) 98566-1049</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="shrink-0" style={{ color: 'var(--ceait-green)' }} />
                <p className="text-sm" style={{ color: 'var(--c-ink)' }}>sidney.ceait@hotmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MVV ── */}
      <section className="py-20" style={{ background: 'var(--ceait-bg)' }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="sec-label">Identidade Institucional</span>
            <h2 className="sec-heading mt-1" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)' }}>
              Missão, Visão e Valores
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Missão */}
            <div
              className="rounded-2xl p-7 text-white relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, var(--ceait-green), var(--ceait-green-dark))' }}
            >
              <div className="absolute inset-0 dot-pattern opacity-25" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <Target size={22} className="text-white" />
                </div>
                <h3 className="font-headline font-black uppercase text-xl mb-3">Missão</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  Promover o desenvolvimento humano e social por meio do esporte, oferecendo
                  oportunidades de formação cidadã e inclusão social às comunidades do DF.
                </p>
              </div>
            </div>

            {/* Visão */}
            <div
              className="rounded-2xl p-7 text-white relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, var(--ceait-navy), var(--ceait-navy-dark))' }}
            >
              <div className="absolute inset-0 dot-pattern opacity-25" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <Eye size={22} className="text-white" />
                </div>
                <h3 className="font-headline font-black uppercase text-xl mb-3">Visão</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  Ser reconhecida como referência em gestão transparente e impacto social pelo
                  esporte no Distrito Federal até 2030.
                </p>
              </div>
            </div>

            {/* Valores */}
            <div
              className="rounded-2xl p-7 text-white relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #2A5A8A, var(--ceait-navy))' }}
            >
              <div className="absolute inset-0 dot-pattern opacity-25" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <Heart size={22} className="text-white" />
                </div>
                <h3 className="font-headline font-black uppercase text-xl mb-3">Valores</h3>
                <div className="flex flex-wrap gap-2">
                  {VALUES_PILLS.map((v) => (
                    <span
                      key={v}
                      className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-headline font-black uppercase tracking-widest"
                      style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE + ACTIVITIES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6 grid lg:grid-cols-2 gap-16">
          {/* Timeline */}
          <div>
            <span className="sec-label">Trajetória</span>
            <h2 className="sec-heading mt-1 mb-8" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
              Nossa História
            </h2>

            <div className="relative">
              {/* gradient vertical line */}
              <div
                className="absolute left-4 top-0 bottom-0 w-0.5"
                style={{ background: 'linear-gradient(to bottom, var(--ceait-green), var(--ceait-yellow))' }}
              />

              <div className="flex flex-col gap-8 pl-12">
                {TIMELINE.map(({ year, label, desc }) => (
                  <div key={year} className="relative">
                    {/* dot */}
                    <div
                      className="absolute -left-[2.15rem] top-1 w-3 h-3 rounded-full border-2 border-white"
                      style={{ background: 'var(--ceait-yellow)', boxShadow: '0 0 0 3px rgba(245,200,0,0.3)' }}
                    />
                    <span
                      className="font-headline font-black text-xs uppercase tracking-widest"
                      style={{ color: 'var(--ceait-green)' }}
                    >
                      {year}
                    </span>
                    <p className="font-headline font-black uppercase text-base mt-0.5" style={{ color: 'var(--c-navy)' }}>
                      {label}
                    </p>
                    <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--c-muted)' }}>
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activities */}
          <div>
            <span className="sec-label">Atuação</span>
            <h2 className="sec-heading mt-1 mb-8" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
              O que realizamos
            </h2>

            <div className="flex flex-col gap-4">
              {ACTIVITIES.map(({ Icon, label, desc, color }) => (
                <div
                  key={label}
                  className="rounded-2xl p-5 flex items-start gap-4"
                  style={{
                    background: 'white',
                    boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
                    borderLeft: `3px solid ${color}`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}20` }}
                  >
                    <Icon size={18} style={{ color }} />
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
        </div>
      </section>

      {/* ── TARGET AUDIENCE ── */}
      <section className="py-20" style={{ background: 'var(--ceait-bg)' }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="sec-label">Público-Alvo</span>
            <h2 className="sec-heading mt-1" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)' }}>
              Para quem trabalhamos
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {AUDIENCE.map(({ Icon, label, desc, bg }) => (
              <div
                key={label}
                className="card card-elev rounded-2xl p-7 flex flex-col items-center gap-4 text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: bg }}
                >
                  <Icon size={28} className="text-white" />
                </div>
                <div>
                  <p className="font-headline font-black uppercase text-sm tracking-wide" style={{ color: 'var(--c-navy)' }}>
                    {label}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--c-muted)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
