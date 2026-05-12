import { useState, useRef, type ReactNode, type ChangeEvent } from 'react'
import {
  Plus, Pencil, Trash2, ArrowRight, FileText, Download, Camera,
  Building2, X, Save, Image as ImageIcon,
} from 'lucide-react'
import type { Page } from '../types'
import { Btn, Section, Label, PageHero, Pill } from '../components/ui-bits'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'

interface Props { navigate: (page: Page) => void }

/* ─── Shared primitives ─── */
function AdminToolbar({ onAdd, addLabel = 'Adicionar' }: { onAdd?: () => void; addLabel?: string }) {
  return (
    <div className="flex justify-end mb-4">
      <Btn variant="green" size="sm" onClick={onAdd}>
        <Plus className="w-4 h-4" /> {addLabel}
      </Btn>
    </div>
  )
}

function RowActions({ onEdit, onDelete }: { onEdit?: () => void; onDelete?: () => void }) {
  return (
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button title="Editar" onClick={onEdit}
        className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-black/5"
        style={{ color: 'var(--c-muted)' }}>
        <Pencil className="w-4 h-4" />
      </button>
      <button title="Excluir" onClick={onDelete}
        className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-red-50"
        style={{ color: 'var(--c-muted)' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-danger)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-muted)')}>
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}

function Modal({ open, title, onClose, children }: {
  open: boolean; title: string; onClose: () => void; children: ReactNode
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(10,15,30,0.55)' }}
      onClick={onClose}>
      <div className="bg-white rounded-[20px] w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 sticky top-0 bg-white z-10"
          style={{ borderBottom: '1px solid var(--c-border)' }}>
          <h3 className="font-headline uppercase" style={{ fontWeight: 900, color: 'var(--c-navy)', fontSize: '20px' }}>
            {title}
          </h3>
          <button onClick={onClose} className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-black/5">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block mb-4">
      <span className="block uppercase text-xs mb-1.5"
        style={{ color: 'var(--c-muted)', letterSpacing: '.12em', fontWeight: 700 }}>
        {label}
      </span>
      {children}
    </label>
  )
}

function ModalActions({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  return (
    <div className="flex justify-end gap-2 mt-2">
      <Btn variant="ghost" size="sm" onClick={onClose}>Cancelar</Btn>
      <Btn variant="green" size="sm" onClick={onSave}><Save className="w-4 h-4" /> Salvar</Btn>
    </div>
  )
}

const inputCls =
  'w-full px-4 h-11 rounded-lg bg-white border border-[var(--c-border)] focus:outline-none focus:border-[var(--c-navy)] focus:ring-2 focus:ring-[var(--c-navy)]/15 transition-all text-sm'

/* ─── Data types ─── */
type FinRow = { id: number; projeto: string; concedente: string; valor: string; vigencia: string; status: string; execucao: string }
type Partner = { id: number; name: string; type: string }
type Doc     = { id: number; name: string; ref: string; desc: string; size: string }
type Role    = { id: number; cargo: string; qtd: string; regime: string; status: string }
type Match   = { id: number; city: string; round: string; date: string; teamA: string; teamB: string; scoreA: string; scoreB: string; summary: string; photo?: string; sumula?: string }

let _id = 100
const uid = () => ++_id

const CITIES = ['Taguatinga', 'Recanto das Emas', 'Brazlândia', 'Guará', 'Vila Planalto', 'Cruzeiro']

/* ─── Initial data ─── */
const INIT_FIN: FinRow[] = [
  { id: 1, projeto: 'Festival Integração', concedente: 'SEL-DF / Distrital', valor: 'R$ 588.000,00', vigencia: '2025/2026', status: 'Em andamento', execucao: '42%' },
  { id: 2, projeto: 'ECREPT — Taguatinga', concedente: 'Adm. Regional / GDF', valor: 'R$ 198.810,75', vigencia: '2025', status: 'Em andamento', execucao: '55%' },
  { id: 3, projeto: 'Formação Esportiva 2024', concedente: 'GDF / SEL-DF', valor: 'R$ 145.000,00', vigencia: '2024', status: 'Concluído', execucao: '100%' },
]
const INIT_PARTNERS: Partner[] = [
  { id: 1, name: 'Secretaria de Esporte e Lazer do DF', type: 'Governo Distrital' },
  { id: 2, name: 'Administração Regional de Taguatinga', type: 'Apoio institucional' },
  { id: 3, name: 'Administração do Recanto das Emas', type: 'Apoio institucional' },
  { id: 4, name: 'Administração do Guará', type: 'Apoio institucional' },
  { id: 5, name: 'Federação de Futebol Amador do DF', type: 'Parceria técnica' },
  { id: 6, name: 'Comunidade Local', type: 'Voluntariado' },
]
const INIT_DOCS: Doc[] = [
  { id: 1, name: 'Estatuto Social', ref: 'REF-01', desc: 'Documento constitutivo da organização', size: '1.2 MB' },
  { id: 2, name: 'Ata de Fundação', ref: 'REF-02', desc: 'Registro oficial em cartório', size: '640 KB' },
  { id: 3, name: 'Prestação de Contas 2024', ref: 'PC-2024', desc: 'Relatório anual consolidado', size: '3.4 MB' },
  { id: 4, name: 'Termo de Fomento – Festival', ref: 'TF-976606', desc: 'Convênio com SEL-DF — R$ 588.000', size: '2.1 MB' },
  { id: 5, name: 'Termo de Fomento – ECREPT', ref: 'TF-9-SEL/2025', desc: 'Convênio com Adm. Taguatinga', size: '1.8 MB' },
  { id: 6, name: 'Comprovantes Fiscais 2024', ref: 'CF-2024', desc: 'Notas, recibos e demonstrativos', size: '5.6 MB' },
]
const INIT_ROLES: Role[] = [
  { id: 1, cargo: 'Coordenador Geral', qtd: '1', regime: 'PJ / 40h', status: 'Ativo' },
  { id: 2, cargo: 'Técnico Esportivo', qtd: '6', regime: 'PJ', status: 'Ativo' },
  { id: 3, cargo: 'Árbitros', qtd: '8', regime: 'Autônomo/jogo', status: 'Ativo' },
  { id: 4, cargo: 'Administrativo', qtd: '2', regime: 'CLT / 40h', status: 'Ativo' },
  { id: 5, cargo: 'Monitor de Polo', qtd: '12', regime: 'Prestação de Serviço', status: 'Em seleção' },
]
const INIT_MATCHES: Match[] = [
  { id: 1, city: 'Taguatinga', round: 'Rodada 1', date: '10 Jan 2026', teamA: 'Estrela FC', teamB: 'Unidos do Parque', scoreA: '3', scoreB: '1', summary: 'Partida inaugural do festival com grande público. Estrela FC dominou o segundo tempo.', photo: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600', sumula: 'https://images.unsplash.com/photo-1606513542745-97629752a13b?w=600' },
  { id: 2, city: 'Taguatinga', round: 'Rodada 2', date: '17 Jan 2026', teamA: 'Minas Gerais', teamB: 'Estrela FC', scoreA: '0', scoreB: '2', summary: 'Estrela FC confirma favoritismo e avança para as quartas em grande estilo.', photo: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600' },
  { id: 3, city: 'Recanto das Emas', round: 'Rodada 1', date: '11 Jan 2026', teamA: 'Recanto Jovem', teamB: 'Força Verde', scoreA: '2', scoreB: '2', summary: 'Empate emocionante na abertura do polo Recanto das Emas.', photo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600' },
  { id: 4, city: 'Brazlândia', round: 'Rodada 1', date: '13 Jan 2026', teamA: 'Braz FC', teamB: 'Rural Esporte', scoreA: '1', scoreB: '3', summary: 'Rural Esporte surpreende em Brazlândia com virada no segundo tempo.' },
  { id: 5, city: 'Guará', round: 'Rodada 1', date: '12 Jan 2026', teamA: 'Guará Atlético', teamB: 'Jovens do Guará', scoreA: '4', scoreB: '0', summary: 'Goleada no polo Guará com destaque para o atacante camisa 9.', photo: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600' },
  { id: 6, city: 'Cruzeiro', round: 'Rodada 1', date: '14 Jan 2026', teamA: 'Cruzeiro Sport', teamB: 'Vila Union', scoreA: '2', scoreB: '1', summary: 'Cruzeiro Sport estreia bem em casa na primeira rodada do polo.' },
]

/* ─── PAGE ─── */
export default function TransparenciaPage({ navigate }: Props) {
  /* Financial */
  const [fins, setFins] = useState<FinRow[]>(INIT_FIN)
  const [finModal, setFinModal] = useState(false)
  const [finEdit, setFinEdit] = useState<FinRow | null>(null)
  const [finForm, setFinForm] = useState({ projeto: '', concedente: '', valor: '', vigencia: '', status: 'Em andamento', execucao: '' })

  /* Partners */
  const [partners, setPartners] = useState<Partner[]>(INIT_PARTNERS)
  const [partModal, setPartModal] = useState(false)
  const [partEdit, setPartEdit] = useState<Partner | null>(null)
  const [partForm, setPartForm] = useState({ name: '', type: '' })

  /* Documents */
  const [docs, setDocs] = useState<Doc[]>(INIT_DOCS)
  const [docModal, setDocModal] = useState(false)
  const [docEdit, setDocEdit] = useState<Doc | null>(null)
  const [docForm, setDocForm] = useState({ name: '', ref: '', desc: '', size: '' })

  /* Team */
  const [roles, setRoles] = useState<Role[]>(INIT_ROLES)
  const [roleModal, setRoleModal] = useState(false)
  const [roleEdit, setRoleEdit] = useState<Role | null>(null)
  const [roleForm, setRoleForm] = useState({ cargo: '', qtd: '', regime: '', status: 'Ativo' })

  /* Matches / Gallery */
  const [matches, setMatches] = useState<Match[]>(INIT_MATCHES)
  const [matchModal, setMatchModal] = useState(false)
  const [matchEdit, setMatchEdit] = useState<Match | null>(null)
  const [matchForm, setMatchForm] = useState<Omit<Match, 'id'>>({ city: 'Taguatinga', round: '', date: '', teamA: '', teamB: '', scoreA: '0', scoreB: '0', summary: '', photo: undefined, sumula: undefined })
  const photoRef = useRef<HTMLInputElement>(null)
  const sumulaRef = useRef<HTMLInputElement>(null)

  const [activeCity, setActiveCity] = useState('Taguatinga')

  /* ── Financial helpers ── */
  function openFinAdd() {
    setFinEdit(null)
    setFinForm({ projeto: '', concedente: '', valor: '', vigencia: '', status: 'Em andamento', execucao: '' })
    setFinModal(true)
  }
  function openFinEdit(r: FinRow) {
    setFinEdit(r)
    setFinForm({ projeto: r.projeto, concedente: r.concedente, valor: r.valor, vigencia: r.vigencia, status: r.status, execucao: r.execucao })
    setFinModal(true)
  }
  function saveFin() {
    if (finEdit) {
      setFins(p => p.map(r => r.id === finEdit.id ? { ...r, ...finForm } : r))
    } else {
      setFins(p => [...p, { id: uid(), ...finForm }])
    }
    setFinModal(false)
  }

  /* ── Partner helpers ── */
  function openPartAdd() { setPartEdit(null); setPartForm({ name: '', type: '' }); setPartModal(true) }
  function openPartEdit(p: Partner) { setPartEdit(p); setPartForm({ name: p.name, type: p.type }); setPartModal(true) }
  function savePart() {
    if (partEdit) setPartners(p => p.map(r => r.id === partEdit.id ? { ...r, ...partForm } : r))
    else setPartners(p => [...p, { id: uid(), ...partForm }])
    setPartModal(false)
  }

  /* ── Document helpers ── */
  function openDocAdd() { setDocEdit(null); setDocForm({ name: '', ref: '', desc: '', size: '' }); setDocModal(true) }
  function openDocEdit(d: Doc) { setDocEdit(d); setDocForm({ name: d.name, ref: d.ref, desc: d.desc, size: d.size }); setDocModal(true) }
  function saveDoc() {
    if (docEdit) setDocs(p => p.map(r => r.id === docEdit.id ? { ...r, ...docForm } : r))
    else setDocs(p => [...p, { id: uid(), ...docForm }])
    setDocModal(false)
  }

  /* ── Team helpers ── */
  function openRoleAdd() { setRoleEdit(null); setRoleForm({ cargo: '', qtd: '', regime: '', status: 'Ativo' }); setRoleModal(true) }
  function openRoleEdit(r: Role) { setRoleEdit(r); setRoleForm({ cargo: r.cargo, qtd: r.qtd, regime: r.regime, status: r.status }); setRoleModal(true) }
  function saveRole() {
    if (roleEdit) setRoles(p => p.map(r => r.id === roleEdit.id ? { ...r, ...roleForm } : r))
    else setRoles(p => [...p, { id: uid(), ...roleForm }])
    setRoleModal(false)
  }

  /* ── Match helpers ── */
  function openMatchAdd() {
    setMatchEdit(null)
    setMatchForm({ city: activeCity, round: '', date: '', teamA: '', teamB: '', scoreA: '0', scoreB: '0', summary: '', photo: undefined, sumula: undefined })
    setMatchModal(true)
  }
  function openMatchEdit(m: Match) {
    setMatchEdit(m)
    setMatchForm({ city: m.city, round: m.round, date: m.date, teamA: m.teamA, teamB: m.teamB, scoreA: m.scoreA, scoreB: m.scoreB, summary: m.summary, photo: m.photo, sumula: m.sumula })
    setMatchModal(true)
  }
  function saveMatch() {
    if (matchEdit) setMatches(p => p.map(r => r.id === matchEdit.id ? { ...r, ...matchForm } : r))
    else setMatches(p => [...p, { id: uid(), ...matchForm }])
    setMatchModal(false)
  }
  function handleFile(e: ChangeEvent<HTMLInputElement>, field: 'photo' | 'sumula') {
    const file = e.target.files?.[0]
    if (file) setMatchForm(prev => ({ ...prev, [field]: URL.createObjectURL(file) }))
  }

  const cityMatches = matches.filter(m => m.city === activeCity)

  return (
    <div>
      <PageHero
        title="Transparência e"
        highlight="Prestação de Contas"
        badge="Gestão Pública dos Recursos"
        subtitle="Acesso aberto a convênios, repasses, documentos e resultados — em conformidade com as leis aplicáveis."
      >
        <div className="flex flex-wrap gap-2">
          <Pill dark>Lei 13.019/2014</Pill>
          <Pill dark>ADPF 854</Pill>
          <Pill dark>LAI 12.527/2011</Pill>
        </div>
      </PageHero>

      {/* ── PROJETOS EM EXECUÇÃO ── */}
      <Section className="bg-white">
        <Label>Convênios e parcerias</Label>
        <h2 className="font-headline uppercase mt-3 mb-10 leading-[0.95]"
          style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 900, color: 'var(--c-ink)' }}>
          Projetos em Execução
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: 'Festival de Futebol de Campo Amador Integração', concedente: 'Secretaria de Esporte e Lazer do DF · Distrital', year: '2025/2026', status: 'Em andamento', statusBg: 'rgba(245,200,0,0.18)', statusFg: '#8a6d05', value: 'R$ 588.000,00', progress: 42, target: 'festival-detail' as Page },
            { name: 'ECREPT — Escola de Cultura, Recreação e Esporte', concedente: 'Administração Regional de Taguatinga · GDF', year: '2025', status: 'Em andamento', statusBg: 'rgba(245,200,0,0.18)', statusFg: '#8a6d05', value: 'R$ 198.810,75', progress: 55, target: 'ecrept-detail' as Page },
          ].map(p => (
            <button key={p.name} onClick={() => navigate(p.target)}
              className="card-elev bg-white rounded-[20px] text-left overflow-hidden group hover:-translate-y-1 transition-transform"
              style={{ border: '1px solid var(--c-border)' }}>
              <div className="p-7">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="uppercase text-xs" style={{ color: 'var(--c-muted)', letterSpacing: '.14em', fontWeight: 700 }}>{p.concedente}</div>
                    <div className="font-headline uppercase mt-2 leading-tight" style={{ fontWeight: 900, fontSize: '22px', color: 'var(--c-navy)' }}>{p.name}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-headline uppercase tracking-wider whitespace-nowrap"
                    style={{ background: p.statusBg, color: p.statusFg, fontWeight: 800 }}>{p.status}</span>
                </div>
                <div className="mt-7">
                  <div className="font-headline leading-none" style={{ color: 'var(--c-green)', fontWeight: 900, fontSize: '36px' }}>{p.value}</div>
                  <div className="uppercase mt-1 text-[10px]" style={{ color: 'var(--c-muted)', letterSpacing: '.14em', fontWeight: 700 }}>Valor do repasse · {p.year}</div>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span style={{ color: 'var(--c-muted)', fontWeight: 600 }}>Execução financeira</span>
                    <span className="font-headline" style={{ color: 'var(--c-green)', fontWeight: 900 }}>{p.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: 'var(--c-bg)' }}>
                    <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: 'linear-gradient(to right, var(--c-green), var(--c-gold))' }} />
                  </div>
                </div>
                <div className="mt-7 inline-flex items-center gap-1.5 font-headline uppercase text-sm"
                  style={{ color: 'var(--c-navy)', letterSpacing: '.08em', fontWeight: 800 }}>
                  Ver detalhes completos
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* ── DADOS FINANCEIROS ── */}
      <Section style={{ background: 'var(--c-bg)' }}>
        <div className="flex items-end justify-between flex-wrap gap-4 mb-2">
          <div>
            <Label>Painel financeiro</Label>
            <h2 className="font-headline uppercase mt-3 leading-[0.95]"
              style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 900, color: 'var(--c-ink)' }}>
              Dados Financeiros
            </h2>
          </div>
        </div>
        <AdminToolbar addLabel="Adicionar entrada" onAdd={openFinAdd} />
        <div className="card-elev bg-white rounded-[20px] overflow-hidden" style={{ border: '1px solid var(--c-border)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'var(--c-bg)' }}>
                  {['Projeto', 'Concedente', 'Valor', 'Vigência', 'Status', 'Execução', ''].map(h => (
                    <th key={h} className="text-left px-5 py-3 uppercase text-[11px]"
                      style={{ color: 'var(--c-muted)', letterSpacing: '.12em', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fins.map(row => (
                  <tr key={row.id} className="group border-t" style={{ borderColor: 'var(--c-border)' }}>
                    <td className="px-5 py-4" style={{ color: 'var(--c-navy)', fontWeight: 700 }}>{row.projeto}</td>
                    <td className="px-5 py-4">{row.concedente}</td>
                    <td className="px-5 py-4">{row.valor}</td>
                    <td className="px-5 py-4">{row.vigencia}</td>
                    <td className="px-5 py-4">{row.status}</td>
                    <td className="px-5 py-4">{row.execucao}</td>
                    <td className="px-5 py-4 w-[1%]">
                      <RowActions onEdit={() => openFinEdit(row)} onDelete={() => setFins(p => p.filter(r => r.id !== row.id))} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ── PARCEIROS ── */}
      <Section className="bg-white">
        <div>
          <Label>Quem apoia</Label>
          <h2 className="font-headline uppercase mt-3 leading-[0.95]"
            style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 900, color: 'var(--c-ink)' }}>
            Parceiros e Apoiadores
          </h2>
        </div>
        <AdminToolbar onAdd={openPartAdd} />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {partners.map(p => (
            <div key={p.id} className="group card-elev bg-white rounded-[20px] p-6 flex items-center gap-4"
              style={{ border: '1px solid var(--c-border)' }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(13,45,107,0.06)', color: 'var(--c-navy)' }}>
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-headline uppercase" style={{ fontWeight: 900, color: 'var(--c-navy)', fontSize: '16px' }}>{p.name}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--c-muted)' }}>{p.type}</div>
              </div>
              <RowActions onEdit={() => openPartEdit(p)} onDelete={() => setPartners(prev => prev.filter(r => r.id !== p.id))} />
            </div>
          ))}
        </div>
      </Section>

      {/* ── DOCUMENTOS ── */}
      <Section style={{ background: 'var(--c-bg)' }}>
        <div>
          <Label>Acesso à informação</Label>
          <h2 className="font-headline uppercase mt-3 leading-[0.95]"
            style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 900, color: 'var(--c-ink)' }}>
            Documentos Públicos
          </h2>
        </div>
        <AdminToolbar addLabel="Incluir documento" onAdd={openDocAdd} />
        <ul className="space-y-3">
          {docs.map(d => (
            <li key={d.id} className="group card-elev bg-white rounded-[16px] p-5 flex items-center gap-4"
              style={{ border: '1px solid var(--c-border)' }}>
              <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'rgba(26,155,60,0.10)', color: 'var(--c-green)' }}>
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span style={{ color: 'var(--c-navy)', fontWeight: 700 }}>{d.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--c-bg)', color: 'var(--c-muted)', fontWeight: 600 }}>{d.ref}</span>
                </div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--c-muted)' }}>{d.desc} · {d.size}</div>
              </div>
              <Btn variant="outline" size="sm"><Download className="w-3.5 h-3.5" /> Ver</Btn>
              <RowActions onEdit={() => openDocEdit(d)} onDelete={() => setDocs(prev => prev.filter(r => r.id !== d.id))} />
            </li>
          ))}
        </ul>
      </Section>

      {/* ── EQUIPE ── */}
      <Section className="bg-white">
        <div>
          <Label>Recursos humanos</Label>
          <h2 className="font-headline uppercase mt-3 leading-[0.95]"
            style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 900, color: 'var(--c-ink)' }}>
            Equipe
          </h2>
        </div>
        <AdminToolbar addLabel="Incluir" onAdd={openRoleAdd} />
        <div className="card-elev bg-white rounded-[20px] overflow-hidden" style={{ border: '1px solid var(--c-border)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'var(--c-bg)' }}>
                  {['Cargo', 'Quantidade', 'Regime', 'Status', ''].map(h => (
                    <th key={h} className="text-left px-5 py-3 uppercase text-[11px]"
                      style={{ color: 'var(--c-muted)', letterSpacing: '.12em', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roles.map(row => (
                  <tr key={row.id} className="group border-t" style={{ borderColor: 'var(--c-border)' }}>
                    <td className="px-5 py-4" style={{ color: 'var(--c-navy)', fontWeight: 700 }}>{row.cargo}</td>
                    <td className="px-5 py-4">{row.qtd}</td>
                    <td className="px-5 py-4">{row.regime}</td>
                    <td className="px-5 py-4">{row.status}</td>
                    <td className="px-5 py-4 w-[1%]">
                      <RowActions onEdit={() => openRoleEdit(row)} onDelete={() => setRoles(p => p.filter(r => r.id !== row.id))} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ── GALERIA ── */}
      <Section style={{ background: 'var(--c-bg)' }}>
        <div>
          <Label>Festival de Futebol Integração</Label>
          <h2 className="font-headline uppercase mt-3 leading-[0.95]"
            style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 900, color: 'var(--c-ink)' }}>
            Galeria de Fotos dos Jogos
          </h2>
          <p className="mt-3 max-w-2xl" style={{ color: 'var(--c-muted)' }}>
            Registros das partidas do Festival, organizados por região administrativa atendida.
          </p>
        </div>
        <AdminToolbar addLabel="Adicionar partida" onAdd={openMatchAdd} />

        {/* City tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CITIES.map(c => {
            const active = c === activeCity
            return (
              <button key={c} onClick={() => setActiveCity(c)}
                className="px-4 h-10 rounded-lg font-headline uppercase text-xs transition-all"
                style={{ letterSpacing: '.08em', fontWeight: 800, background: active ? 'var(--c-navy)' : 'white', color: active ? 'white' : 'var(--c-navy)', border: active ? '1px solid var(--c-navy)' : '1px solid var(--c-border)' }}>
                {c}
              </button>
            )
          })}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cityMatches.map(m => (
            <div key={m.id} className="group card-elev bg-white rounded-[20px] overflow-hidden"
              style={{ border: '1px solid var(--c-border)' }}>
              <div className="px-5 py-3 flex items-center justify-between" style={{ background: 'var(--c-navy)', color: 'white' }}>
                <span className="font-headline uppercase text-xs" style={{ letterSpacing: '.1em', fontWeight: 800 }}>{m.round}</span>
                <span style={{ color: 'var(--c-gold)', fontWeight: 700, fontSize: '12px' }}>{m.date}</span>
              </div>
              <div className="grid grid-cols-2">
                {m.photo ? (
                  <ImageWithFallback src={m.photo} alt="Jogo" className="w-full h-32 object-cover" />
                ) : (
                  <div className="h-32 flex flex-col items-center justify-center gap-1"
                    style={{ background: 'var(--c-bg)', color: 'var(--c-muted)' }}>
                    <Camera className="w-6 h-6" />
                    <span className="text-[10px] font-headline uppercase" style={{ letterSpacing: '.08em' }}>Foto</span>
                  </div>
                )}
                {m.sumula ? (
                  <ImageWithFallback src={m.sumula} alt="Súmula" className="w-full h-32 object-cover" />
                ) : (
                  <div className="h-32 flex flex-col items-center justify-center gap-1"
                    style={{ background: 'var(--c-bg)', color: 'var(--c-muted)' }}>
                    <FileText className="w-6 h-6" />
                    <span className="text-[10px] font-headline uppercase" style={{ letterSpacing: '.08em' }}>Súmula</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center">
                  <div className="font-headline uppercase truncate" style={{ color: 'var(--c-navy)', fontWeight: 800, fontSize: '14px' }}>{m.teamA}</div>
                  <div className="font-headline" style={{ color: 'var(--c-ink)', fontWeight: 900, fontSize: '26px' }}>
                    {m.scoreA} <span style={{ color: 'var(--c-gold)' }}>×</span> {m.scoreB}
                  </div>
                  <div className="font-headline uppercase truncate" style={{ color: 'var(--c-navy)', fontWeight: 800, fontSize: '14px' }}>{m.teamB}</div>
                </div>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{m.summary}</p>
                <div className="mt-4 flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--c-border)' }}>
                  <span className="text-xs" style={{ color: 'var(--c-muted)' }}>
                    <ImageIcon className="inline w-3.5 h-3.5 -mt-0.5 mr-1" />
                    Foto + Súmula
                  </span>
                  <div className="flex items-center gap-1">
                    <button title="Editar" onClick={() => openMatchEdit(m)}
                      className="w-8 h-8 rounded-md hover:bg-black/5 flex items-center justify-center"
                      style={{ color: 'var(--c-muted)' }}>
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button title="Excluir" onClick={() => setMatches(p => p.filter(r => r.id !== m.id))}
                      className="w-8 h-8 rounded-md hover:bg-red-50 flex items-center justify-center"
                      style={{ color: 'var(--c-muted)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-danger)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-muted)')}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add card */}
          <button onClick={openMatchAdd}
            className="rounded-[20px] flex flex-col items-center justify-center p-10 min-h-[360px] transition-colors"
            style={{ border: '2px dashed var(--c-border)', background: 'white', color: 'var(--c-muted)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-green)'; e.currentTarget.style.color = 'var(--c-green)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.color = 'var(--c-muted)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
              style={{ background: 'rgba(26,155,60,0.1)', color: 'var(--c-green)' }}>
              <Plus className="w-7 h-7" />
            </div>
            <div className="font-headline uppercase" style={{ fontWeight: 900, color: 'var(--c-navy)', letterSpacing: '.06em' }}>
              Adicionar Partida
            </div>
            <div className="text-xs mt-1" style={{ color: 'var(--c-muted)' }}>Foto, súmula e resumo</div>
          </button>
        </div>
      </Section>

      {/* ════ MODALS ════ */}

      {/* Financial */}
      <Modal open={finModal} title={finEdit ? 'Editar entrada' : 'Nova entrada financeira'} onClose={() => setFinModal(false)}>
        <Field label="Projeto"><input className={inputCls} value={finForm.projeto} onChange={e => setFinForm(p => ({ ...p, projeto: e.target.value }))} placeholder="Nome do projeto" /></Field>
        <Field label="Concedente"><input className={inputCls} value={finForm.concedente} onChange={e => setFinForm(p => ({ ...p, concedente: e.target.value }))} placeholder="Ex: SEL-DF" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Valor"><input className={inputCls} value={finForm.valor} onChange={e => setFinForm(p => ({ ...p, valor: e.target.value }))} placeholder="R$" /></Field>
          <Field label="Vigência"><input className={inputCls} value={finForm.vigencia} onChange={e => setFinForm(p => ({ ...p, vigencia: e.target.value }))} placeholder="2025/2026" /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Status"><input className={inputCls} value={finForm.status} onChange={e => setFinForm(p => ({ ...p, status: e.target.value }))} /></Field>
          <Field label="Execução"><input className={inputCls} value={finForm.execucao} onChange={e => setFinForm(p => ({ ...p, execucao: e.target.value }))} placeholder="42%" /></Field>
        </div>
        <ModalActions onClose={() => setFinModal(false)} onSave={saveFin} />
      </Modal>

      {/* Partner */}
      <Modal open={partModal} title={partEdit ? 'Editar parceiro' : 'Novo parceiro'} onClose={() => setPartModal(false)}>
        <Field label="Nome"><input className={inputCls} value={partForm.name} onChange={e => setPartForm(p => ({ ...p, name: e.target.value }))} /></Field>
        <Field label="Tipo"><input className={inputCls} value={partForm.type} onChange={e => setPartForm(p => ({ ...p, type: e.target.value }))} placeholder="Governo / Apoio / Voluntariado" /></Field>
        <ModalActions onClose={() => setPartModal(false)} onSave={savePart} />
      </Modal>

      {/* Document */}
      <Modal open={docModal} title={docEdit ? 'Editar documento' : 'Incluir documento'} onClose={() => setDocModal(false)}>
        <Field label="Nome do documento"><input className={inputCls} value={docForm.name} onChange={e => setDocForm(p => ({ ...p, name: e.target.value }))} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Referência"><input className={inputCls} value={docForm.ref} onChange={e => setDocForm(p => ({ ...p, ref: e.target.value }))} placeholder="REF-XX" /></Field>
          <Field label="Tamanho"><input className={inputCls} value={docForm.size} onChange={e => setDocForm(p => ({ ...p, size: e.target.value }))} placeholder="1.2 MB" /></Field>
        </div>
        <Field label="Descrição"><textarea className={`${inputCls} h-24 py-2`} value={docForm.desc} onChange={e => setDocForm(p => ({ ...p, desc: e.target.value }))} /></Field>
        <Field label="Arquivo"><input type="file" className="text-sm" /></Field>
        <ModalActions onClose={() => setDocModal(false)} onSave={saveDoc} />
      </Modal>

      {/* Team role */}
      <Modal open={roleModal} title={roleEdit ? 'Editar cargo' : 'Novo cargo'} onClose={() => setRoleModal(false)}>
        <Field label="Cargo"><input className={inputCls} value={roleForm.cargo} onChange={e => setRoleForm(p => ({ ...p, cargo: e.target.value }))} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Quantidade"><input type="number" className={inputCls} value={roleForm.qtd} onChange={e => setRoleForm(p => ({ ...p, qtd: e.target.value }))} /></Field>
          <Field label="Regime"><input className={inputCls} value={roleForm.regime} onChange={e => setRoleForm(p => ({ ...p, regime: e.target.value }))} placeholder="CLT / PJ / Autônomo" /></Field>
        </div>
        <Field label="Status"><input className={inputCls} value={roleForm.status} onChange={e => setRoleForm(p => ({ ...p, status: e.target.value }))} /></Field>
        <ModalActions onClose={() => setRoleModal(false)} onSave={saveRole} />
      </Modal>

      {/* Match */}
      <Modal open={matchModal} title={matchEdit ? 'Editar partida' : 'Adicionar partida'} onClose={() => setMatchModal(false)}>
        <Field label="Cidade">
          <select className={inputCls} value={matchForm.city} onChange={e => setMatchForm(p => ({ ...p, city: e.target.value }))}>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Rodada"><input className={inputCls} value={matchForm.round} onChange={e => setMatchForm(p => ({ ...p, round: e.target.value }))} placeholder="Rodada 1" /></Field>
          <Field label="Data"><input className={inputCls} value={matchForm.date} onChange={e => setMatchForm(p => ({ ...p, date: e.target.value }))} placeholder="DD/MM/AAAA" /></Field>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
          <Field label="Time A"><input className={inputCls} value={matchForm.teamA} onChange={e => setMatchForm(p => ({ ...p, teamA: e.target.value }))} /></Field>
          <div className="mb-4">
            <span className="block uppercase text-xs mb-1.5" style={{ color: 'var(--c-muted)', letterSpacing: '.12em', fontWeight: 700 }}>Placar</span>
            <div className="flex items-center gap-2">
              <input type="number" className={`${inputCls} w-16 text-center`} value={matchForm.scoreA} onChange={e => setMatchForm(p => ({ ...p, scoreA: e.target.value }))} />
              <span className="font-headline" style={{ color: 'var(--c-gold)', fontWeight: 900 }}>×</span>
              <input type="number" className={`${inputCls} w-16 text-center`} value={matchForm.scoreB} onChange={e => setMatchForm(p => ({ ...p, scoreB: e.target.value }))} />
            </div>
          </div>
          <Field label="Time B"><input className={inputCls} value={matchForm.teamB} onChange={e => setMatchForm(p => ({ ...p, teamB: e.target.value }))} /></Field>
        </div>
        <Field label="Resumo">
          <textarea className={`${inputCls} h-24 py-2`} value={matchForm.summary} onChange={e => setMatchForm(p => ({ ...p, summary: e.target.value }))} placeholder="Como foi a partida..." />
        </Field>

        {/* Photo upload */}
        <div className="grid grid-cols-2 gap-4 mt-1">
          <div>
            <span className="block uppercase text-xs mb-2" style={{ color: 'var(--c-muted)', letterSpacing: '.12em', fontWeight: 700 }}>Foto do jogo</span>
            {matchForm.photo && <img src={matchForm.photo} alt="" className="w-full h-24 object-cover rounded-lg mb-2" />}
            <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={e => handleFile(e, 'photo')} />
            <button className="w-full h-10 rounded-lg border border-dashed flex items-center justify-center gap-2 text-xs font-headline uppercase transition-colors"
              style={{ borderColor: 'var(--c-border)', color: 'var(--c-muted)' }}
              onClick={() => photoRef.current?.click()}
              type="button">
              <Camera className="w-4 h-4" /> {matchForm.photo ? 'Trocar foto' : 'Selecionar foto'}
            </button>
          </div>
          <div>
            <span className="block uppercase text-xs mb-2" style={{ color: 'var(--c-muted)', letterSpacing: '.12em', fontWeight: 700 }}>Foto da súmula</span>
            {matchForm.sumula && <img src={matchForm.sumula} alt="" className="w-full h-24 object-cover rounded-lg mb-2" />}
            <input ref={sumulaRef} type="file" accept="image/*" className="hidden" onChange={e => handleFile(e, 'sumula')} />
            <button className="w-full h-10 rounded-lg border border-dashed flex items-center justify-center gap-2 text-xs font-headline uppercase transition-colors"
              style={{ borderColor: 'var(--c-border)', color: 'var(--c-muted)' }}
              onClick={() => sumulaRef.current?.click()}
              type="button">
              <FileText className="w-4 h-4" /> {matchForm.sumula ? 'Trocar súmula' : 'Selecionar súmula'}
            </button>
          </div>
        </div>

        <ModalActions onClose={() => setMatchModal(false)} onSave={saveMatch} />
      </Modal>
    </div>
  )
}
