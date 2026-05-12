import { useState } from 'react'
import {
  ArrowLeft, MapPin, Trophy, Users, Calendar, FileText,
  FileCheck, Folder, BarChart2, Shield, Check, X
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Page, BudgetItem, HRPosition, Document, MatchCard } from '../types'
import { initialBudgetItems, initialHRPositions, initialDocuments, initialMatches } from '../data'
import Modal from '../components/Modal'
import CrudToolbar from '../components/CrudToolbar'

interface Props { navigate: (p: Page) => void }

const iconMap: Record<string, LucideIcon> = {
  FileText, FileCheck, Folder, BarChart2, Shield, Users,
}

const polos = [
  { name: 'Taguatinga',    partidas: 222, color: '#0D2D6B' },
  { name: 'Recanto',       partidas: 248, color: '#1A9B3C' },
  { name: 'Guará',         partidas: 132, color: '#F5C800' },
  { name: 'Cruzeiro',      partidas: 68,  color: '#47B4E8' },
  { name: 'Vila Planalto', partidas: 68,  color: '#9B59B6' },
  { name: 'Brazlândia',    partidas: 98,  color: '#E67E22' },
]

const timeline = [
  { phase: '1ª Fase', period: '19 Dez 2025 – 18 Jan 2026', desc: 'Fase de grupos — partidas classificatórias nos 6 polos', status: 'done'    },
  { phase: '2ª Fase', period: '19 Jan – 18 Mai 2026',       desc: 'Eliminatórias e quartas de final interpolos',           status: 'active'   },
  { phase: '3ª Fase', period: 'Até 18 Mai 2026',            desc: 'Semifinais, 3º lugar e Grande Final',                  status: 'pending'  },
]

function newId() { return Date.now().toString(36) }

export default function FestivalDetailPage({ navigate }: Props) {
  const festivalBudget  = initialBudgetItems.filter(b => b.projectId === 'festival')
  const festivalHR      = initialHRPositions.filter(h => h.projectId === 'festival')
  const festivalDocs    = initialDocuments.filter(d => d.projectId === 'festival')

  // Budget CRUD
  const [budget, setBudget] = useState<BudgetItem[]>(festivalBudget)
  const [selBudget, setSelBudget] = useState<string | null>(null)
  const [budgetModal, setBudgetModal] = useState<'add' | 'edit' | null>(null)
  const [budgetForm, setBudgetForm] = useState<Partial<BudgetItem>>({})

  const openAddBudget = () => {
    setBudgetForm({ tipo: 'Serviço', n: budget.length + 1 })
    setBudgetModal('add')
  }
  const openEditBudget = () => {
    const item = budget.find(b => b.id === selBudget)
    if (item) { setBudgetForm(item); setBudgetModal('edit') }
  }
  const saveBudget = () => {
    if (budgetModal === 'add') {
      setBudget(prev => [...prev, { ...budgetForm, id: newId(), projectId: 'festival', n: prev.length + 1, item: budgetForm.item || '', tipo: budgetForm.tipo || 'Serviço', qtd: budgetForm.qtd || '', unitPrice: budgetForm.unitPrice || '', total: budgetForm.total || '' }])
    } else {
      setBudget(prev => prev.map(b => b.id === selBudget ? { ...b, ...budgetForm } as BudgetItem : b))
    }
    setBudgetModal(null); setSelBudget(null)
  }
  const deleteBudget = () => {
    if (!selBudget) return
    if (!confirm('Excluir este item do orçamento?')) return
    setBudget(prev => prev.filter(b => b.id !== selBudget))
    setSelBudget(null)
  }

  // HR CRUD
  const [hr, setHr] = useState<HRPosition[]>(festivalHR)
  const [selHR, setSelHR] = useState<string | null>(null)
  const [hrModal, setHrModal] = useState<'add' | 'edit' | null>(null)
  const [hrForm, setHrForm] = useState<Partial<HRPosition>>({})

  const openAddHR = () => { setHrForm({}); setHrModal('add') }
  const openEditHR = () => {
    const item = hr.find(h => h.id === selHR)
    if (item) { setHrForm(item); setHrModal('edit') }
  }
  const saveHR = () => {
    if (hrModal === 'add') {
      setHr(prev => [...prev, { ...hrForm, id: newId(), projectId: 'festival', cargo: hrForm.cargo || '', qtd: hrForm.qtd || '1', regime: hrForm.regime || '', status: hrForm.status || '' }])
    } else {
      setHr(prev => prev.map(h => h.id === selHR ? { ...h, ...hrForm } as HRPosition : h))
    }
    setHrModal(null); setSelHR(null)
  }
  const deleteHR = () => {
    if (!selHR) return
    if (!confirm('Excluir esta posição?')) return
    setHr(prev => prev.filter(h => h.id !== selHR))
    setSelHR(null)
  }

  // Docs CRUD
  const [docs, setDocs] = useState<Document[]>(festivalDocs)
  const [selDoc, setSelDoc] = useState<string | null>(null)
  const [docModal, setDocModal] = useState<'add' | 'edit' | null>(null)
  const [docForm, setDocForm] = useState<Partial<Document>>({})

  const openAddDoc = () => { setDocForm({ icon: 'FileText' }); setDocModal('add') }
  const openEditDoc = () => {
    const item = docs.find(d => d.id === selDoc)
    if (item) { setDocForm(item); setDocModal('edit') }
  }
  const saveDoc = () => {
    if (docModal === 'add') {
      setDocs(prev => [...prev, { ...docForm, id: newId(), projectId: 'festival', icon: docForm.icon || 'FileText', name: docForm.name || '', ref: docForm.ref || '', desc: docForm.desc || '' }])
    } else {
      setDocs(prev => prev.map(d => d.id === selDoc ? { ...d, ...docForm } as Document : d))
    }
    setDocModal(null); setSelDoc(null)
  }
  const deleteDoc = () => {
    if (!selDoc) return
    if (!confirm('Excluir este documento?')) return
    setDocs(prev => prev.filter(d => d.id !== selDoc))
    setSelDoc(null)
  }

  // Matches CRUD
  const [matches, setMatches] = useState<MatchCard[]>(initialMatches)
  const [selMatch, setSelMatch] = useState<string | null>(null)
  const [matchModal, setMatchModal] = useState<'add' | 'edit' | null>(null)
  const [matchForm, setMatchForm] = useState<Partial<MatchCard>>({})

  const openAddMatch = () => { setMatchForm({ golsA: null, golsB: null }); setMatchModal('add') }
  const openEditMatch = () => {
    const item = matches.find(m => m.id === selMatch)
    if (item) { setMatchForm(item); setMatchModal('edit') }
  }
  const saveMatch = () => {
    if (matchModal === 'add') {
      setMatches(prev => [...prev, { ...matchForm, id: newId(), cidade: matchForm.cidade || '', rodada: matchForm.rodada || '', data: matchForm.data || '', timeA: matchForm.timeA || '', timeB: matchForm.timeB || '', golsA: matchForm.golsA ?? null, golsB: matchForm.golsB ?? null, resumo: matchForm.resumo || '' }])
    } else {
      setMatches(prev => prev.map(m => m.id === selMatch ? { ...m, ...matchForm } as MatchCard : m))
    }
    setMatchModal(null); setSelMatch(null)
  }
  const deleteMatch = () => {
    if (!selMatch) return
    if (!confirm('Excluir esta partida?')) return
    setMatches(prev => prev.filter(m => m.id !== selMatch))
    setSelMatch(null)
  }

  return (
    <>
      {/* Header */}
      <section className="relative bg-hero overflow-hidden py-20">
        <div className="absolute inset-0 dot-pattern opacity-[0.06]" />
        <div className="arc-decoration" style={{ width: 600, height: 600, top: '-200px', right: '-150px' }} />
        <div className="arc-decoration" style={{ width: 200, height: 200, bottom: '20px', left: '200px', borderColor: 'rgba(245,200,0,0.12)' }} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-20"
               style={{ background: 'radial-gradient(circle, #F5C800 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <button onClick={() => navigate('transparencia')} className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors group">
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" /> Transparência
          </button>
          <div className="flex flex-col lg:flex-row lg:items-end gap-8">
            <div className="flex-1">
              <span className="hero-badge mb-4">Festival de Integração</span>
              <h1 className="font-cond font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-none">
                Festival de Integração<br />
                <span className="text-gradient-gold">Esportiva do DF</span>
              </h1>
              <p className="text-white/60 mt-3 max-w-xl">
                Torneio interdistrital em 6 cidades-satélite do Distrito Federal, com 836 partidas e 4.000 beneficiários.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Valor total',    value: 'R$ 588.000', color: 'text-[#F5C800]' },
                { label: 'Beneficiários',  value: '4.000',      color: 'text-white' },
                { label: 'Partidas',       value: '836',        color: 'text-[#1A9B3C]' },
                { label: 'Polos',          value: '6',          color: 'text-[#47B4E8]' },
              ].map(s => (
                <div key={s.label} className="glass-card px-4 py-3 text-center min-w-[90px]">
                  <p className={`stat-number text-2xl ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Identification */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="sec-line !mb-0 !w-6" />
            <h2 className="font-cond font-black text-2xl uppercase text-[#0D2D6B]">Identificação do Projeto</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Concedente',   'Secretaria de Esporte e Lazer do Distrito Federal'],
                  ['Termo de Fomento', '976606'],
                  ['Proposta',     '026133/2025'],
                  ['Processo SEI', '71000.058350/2025-70'],
                  ['Vigência',     '19 de Dezembro de 2025 a 18 de Maio de 2026'],
                  ['Valor total',  'R$ 588.000,00'],
                  ['Público-alvo', 'Crianças e adolescentes de 8 a 17 anos em situação de vulnerabilidade social'],
                ].map(([key, val]) => (
                  <tr key={key} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-6 font-cond font-700 text-xs uppercase tracking-wide text-gray-400 w-48 whitespace-nowrap">{key}</td>
                    <td className="py-3 text-gray-700">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Polos */}
      <section className="py-12 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-cond font-black text-2xl uppercase text-[#0D2D6B] mb-6">Polos Esportivos <span className="text-gray-300 font-light text-xl">/ 6 cidades</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {polos.map(p => (
              <div key={p.name} className="card p-5 text-center">
                <div className="w-3 h-3 rounded-full mx-auto mb-3" style={{ background: p.color }} />
                <p className="font-cond font-black text-3xl" style={{ color: p.color }}>{p.partidas}</p>
                <p className="text-xs text-gray-400 mt-0.5">partidas</p>
                <p className="font-cond font-700 text-sm text-gray-700 mt-2">{p.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-cond font-black text-2xl uppercase text-[#0D2D6B] mb-6">Fases do Festival</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {timeline.map(t => (
              <div key={t.phase} className={`card p-6 border-t-4 ${t.status === 'done' ? 'border-[#1A9B3C]' : t.status === 'active' ? 'border-[#F5C800]' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2 mb-3">
                  {t.status === 'done'   && <Check size={16} className="text-[#1A9B3C]" />}
                  {t.status === 'active' && <div className="w-3 h-3 rounded-full bg-[#F5C800] animate-pulse" />}
                  {t.status === 'pending'&& <div className="w-3 h-3 rounded-full bg-gray-300" />}
                  <span className={`text-xs font-cond font-700 uppercase tracking-widest ${t.status === 'done' ? 'text-[#1A9B3C]' : t.status === 'active' ? 'text-amber-600' : 'text-gray-400'}`}>
                    {t.status === 'done' ? 'Concluída' : t.status === 'active' ? 'Em andamento' : 'Aguardando'}
                  </span>
                </div>
                <p className="font-cond font-black text-xl text-[#0D2D6B]">{t.phase}</p>
                <p className="text-xs text-gray-400 font-cond font-700 mt-0.5 mb-3">{t.period}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget CRUD */}
      <section className="py-12 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-cond font-black text-2xl uppercase text-[#0D2D6B] mb-2">Plano de Aplicação</h2>
          <p className="text-sm text-gray-500 mb-5">Todos os itens do orçamento aprovado — R$ 588.000,00</p>

          <CrudToolbar
            onAdd={openAddBudget}
            onEdit={openEditBudget}
            onDelete={deleteBudget}
            addLabel="Novo item"
            editLabel="Editar item"
            deleteLabel="Excluir"
            hasSelection={!!selBudget}
          />

          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-3 px-4 text-left font-cond font-700 text-xs uppercase tracking-wide text-gray-400 w-8">#</th>
                  <th className="py-3 px-4 text-left font-cond font-700 text-xs uppercase tracking-wide text-gray-400">Item</th>
                  <th className="py-3 px-4 text-left font-cond font-700 text-xs uppercase tracking-wide text-gray-400">Tipo</th>
                  <th className="py-3 px-4 text-left font-cond font-700 text-xs uppercase tracking-wide text-gray-400">Qtd</th>
                  <th className="py-3 px-4 text-left font-cond font-700 text-xs uppercase tracking-wide text-gray-400">Unit.</th>
                  <th className="py-3 px-4 text-right font-cond font-700 text-xs uppercase tracking-wide text-gray-400">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {budget.map(b => (
                  <tr
                    key={b.id}
                    onClick={() => setSelBudget(s => s === b.id ? null : b.id)}
                    className={`cursor-pointer transition-colors hover:bg-blue-50/50 ${selBudget === b.id ? 'bg-blue-50' : ''}`}
                  >
                    <td className="py-3 px-4 text-gray-400 font-cond">{b.n}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{b.item}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-cond font-700 uppercase px-2 py-0.5 rounded-full ${
                        b.tipo === 'RH' ? 'bg-blue-100 text-blue-700' :
                        b.tipo === 'Material' ? 'bg-amber-100 text-amber-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>{b.tipo}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-xs">{b.qtd}</td>
                    <td className="py-3 px-4 text-gray-600 text-xs">{b.unitPrice}</td>
                    <td className="py-3 px-4 text-right font-cond font-700 text-[#0D2D6B]">{b.total}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 border-t-2 border-[#0D2D6B]/20">
                <tr>
                  <td colSpan={5} className="py-3 px-4 font-cond font-black text-sm uppercase tracking-wide text-[#0D2D6B]">Total Geral</td>
                  <td className="py-3 px-4 text-right font-cond font-black text-[#0D2D6B]">R$ 588.000,04</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* HR CRUD */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-cond font-black text-2xl uppercase text-[#0D2D6B] mb-2">Equipe de Recursos Humanos</h2>

          <CrudToolbar
            onAdd={openAddHR}
            onEdit={openEditHR}
            onDelete={deleteHR}
            addLabel="Nova posição"
            editLabel="Editar"
            deleteLabel="Excluir"
            hasSelection={!!selHR}
          />

          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-3 px-4 text-left font-cond font-700 text-xs uppercase tracking-wide text-gray-400">Cargo</th>
                  <th className="py-3 px-4 text-left font-cond font-700 text-xs uppercase tracking-wide text-gray-400">Qtd</th>
                  <th className="py-3 px-4 text-left font-cond font-700 text-xs uppercase tracking-wide text-gray-400">Regime</th>
                  <th className="py-3 px-4 text-left font-cond font-700 text-xs uppercase tracking-wide text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {hr.map(h => (
                  <tr
                    key={h.id}
                    onClick={() => setSelHR(s => s === h.id ? null : h.id)}
                    className={`cursor-pointer transition-colors hover:bg-blue-50/50 ${selHR === h.id ? 'bg-blue-50' : ''}`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">{h.cargo}</td>
                    <td className="py-3 px-4 font-cond font-700 text-[#0D2D6B]">{h.qtd}</td>
                    <td className="py-3 px-4 text-gray-600 text-xs">{h.regime}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-cond font-700 uppercase px-2 py-0.5 rounded-full ${
                        h.status === 'Contratado' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>{h.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Matches CRUD */}
      <section className="py-12 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-cond font-black text-2xl uppercase text-[#0D2D6B] mb-2">Partidas e Resultados</h2>
          <p className="text-sm text-gray-500 mb-5">836 partidas programadas nos 6 polos do DF</p>

          <CrudToolbar
            onAdd={openAddMatch}
            onEdit={openEditMatch}
            onDelete={deleteMatch}
            addLabel="Nova partida"
            editLabel="Editar"
            deleteLabel="Excluir"
            hasSelection={!!selMatch}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map(m => (
              <div
                key={m.id}
                onClick={() => setSelMatch(s => s === m.id ? null : m.id)}
                className={`card p-5 cursor-pointer transition-all ${selMatch === m.id ? 'ring-2 ring-[#0D2D6B]' : ''}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-cond font-700 uppercase text-[#0D2D6B] bg-[#0D2D6B]/8 px-2 py-0.5 rounded-full">{m.cidade}</span>
                  <span className="text-xs text-gray-400">{m.data}</span>
                </div>
                <p className="text-xs text-gray-400 font-cond font-700 uppercase mb-2">{m.rodada}</p>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-cond font-black text-sm text-gray-800 flex-1 truncate">{m.timeA}</p>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {m.golsA !== null && m.golsB !== null ? (
                      <span className="font-cond font-black text-xl text-[#0D2D6B]">{m.golsA} – {m.golsB}</span>
                    ) : (
                      <span className="text-xs text-gray-400 font-cond">vs</span>
                    )}
                  </div>
                  <p className="font-cond font-black text-sm text-gray-800 flex-1 truncate text-right">{m.timeB}</p>
                </div>
                {m.resumo && <p className="text-xs text-gray-500 mt-3 leading-relaxed line-clamp-2">{m.resumo}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents CRUD */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-cond font-black text-2xl uppercase text-[#0D2D6B] mb-2">Documentos</h2>

          <CrudToolbar
            onAdd={openAddDoc}
            onEdit={openEditDoc}
            onDelete={deleteDoc}
            addLabel="Novo doc"
            editLabel="Editar"
            deleteLabel="Excluir"
            hasSelection={!!selDoc}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {docs.map(d => {
              const Icon = iconMap[d.icon] || FileText
              return (
                <div
                  key={d.id}
                  onClick={() => setSelDoc(s => s === d.id ? null : d.id)}
                  className={`card p-5 cursor-pointer ${selDoc === d.id ? 'ring-2 ring-[#0D2D6B]' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0D2D6B]/8 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-[#0D2D6B]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-cond font-700 text-sm text-[#0D2D6B] uppercase tracking-wide">{d.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{d.ref}</p>
                      <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ───── MODALS ───── */}

      {/* Budget modal */}
      {budgetModal && (
        <Modal title={budgetModal === 'add' ? 'Novo Item Orçamentário' : 'Editar Item'} onClose={() => setBudgetModal(null)}>
          <div className="space-y-4">
            <div>
              <label className="form-label">Descrição do item</label>
              <input className="form-input" value={budgetForm.item || ''} onChange={e => setBudgetForm(f => ({ ...f, item: e.target.value }))} placeholder="Ex: Árbitros de Futebol" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Tipo</label>
                <select className="form-input" value={budgetForm.tipo || 'Serviço'} onChange={e => setBudgetForm(f => ({ ...f, tipo: e.target.value as BudgetItem['tipo'] }))}>
                  <option>RH</option><option>Material</option><option>Serviço</option>
                </select>
              </div>
              <div>
                <label className="form-label">Quantidade</label>
                <input className="form-input" value={budgetForm.qtd || ''} onChange={e => setBudgetForm(f => ({ ...f, qtd: e.target.value }))} placeholder="Ex: 40 jogos" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Preço unitário</label>
                <input className="form-input" value={budgetForm.unitPrice || ''} onChange={e => setBudgetForm(f => ({ ...f, unitPrice: e.target.value }))} placeholder="R$ 0,00" />
              </div>
              <div>
                <label className="form-label">Total</label>
                <input className="form-input" value={budgetForm.total || ''} onChange={e => setBudgetForm(f => ({ ...f, total: e.target.value }))} placeholder="R$ 0,00" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={saveBudget} className="btn-primary flex-1 justify-center"><Check size={15} /> Salvar</button>
              <button onClick={() => setBudgetModal(null)} className="btn-outline border-gray-200 text-gray-600 hover:bg-gray-100 flex-1 justify-center"><X size={15} /> Cancelar</button>
            </div>
          </div>
        </Modal>
      )}

      {/* HR modal */}
      {hrModal && (
        <Modal title={hrModal === 'add' ? 'Nova Posição' : 'Editar Posição'} onClose={() => setHrModal(null)}>
          <div className="space-y-4">
            <div>
              <label className="form-label">Cargo</label>
              <input className="form-input" value={hrForm.cargo || ''} onChange={e => setHrForm(f => ({ ...f, cargo: e.target.value }))} placeholder="Nome do cargo" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Quantidade</label>
                <input className="form-input" value={hrForm.qtd || ''} onChange={e => setHrForm(f => ({ ...f, qtd: e.target.value }))} placeholder="1" />
              </div>
              <div>
                <label className="form-label">Status</label>
                <select className="form-input" value={hrForm.status || ''} onChange={e => setHrForm(f => ({ ...f, status: e.target.value }))}>
                  <option>Contratado</option><option>Em seleção</option><option>Banco de árbitros</option><option>Pendente</option>
                </select>
              </div>
            </div>
            <div>
              <label className="form-label">Regime de contratação</label>
              <input className="form-input" value={hrForm.regime || ''} onChange={e => setHrForm(f => ({ ...f, regime: e.target.value }))} placeholder="Ex: CLT / 40h semanais" />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={saveHR} className="btn-primary flex-1 justify-center"><Check size={15} /> Salvar</button>
              <button onClick={() => setHrModal(null)} className="btn-outline border-gray-200 text-gray-600 hover:bg-gray-100 flex-1 justify-center"><X size={15} /> Cancelar</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Match modal */}
      {matchModal && (
        <Modal title={matchModal === 'add' ? 'Nova Partida' : 'Editar Partida'} onClose={() => setMatchModal(null)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Cidade/Polo</label>
                <input className="form-input" value={matchForm.cidade || ''} onChange={e => setMatchForm(f => ({ ...f, cidade: e.target.value }))} placeholder="Taguatinga" />
              </div>
              <div>
                <label className="form-label">Rodada</label>
                <input className="form-input" value={matchForm.rodada || ''} onChange={e => setMatchForm(f => ({ ...f, rodada: e.target.value }))} placeholder="Rodada 1" />
              </div>
            </div>
            <div>
              <label className="form-label">Data</label>
              <input className="form-input" value={matchForm.data || ''} onChange={e => setMatchForm(f => ({ ...f, data: e.target.value }))} placeholder="10 Jan 2026" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Time A</label>
                <input className="form-input" value={matchForm.timeA || ''} onChange={e => setMatchForm(f => ({ ...f, timeA: e.target.value }))} />
              </div>
              <div>
                <label className="form-label">Time B</label>
                <input className="form-input" value={matchForm.timeB || ''} onChange={e => setMatchForm(f => ({ ...f, timeB: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Gols Time A</label>
                <input type="number" min="0" className="form-input" value={matchForm.golsA ?? ''} onChange={e => setMatchForm(f => ({ ...f, golsA: e.target.value ? parseInt(e.target.value) : null }))} placeholder="–" />
              </div>
              <div>
                <label className="form-label">Gols Time B</label>
                <input type="number" min="0" className="form-input" value={matchForm.golsB ?? ''} onChange={e => setMatchForm(f => ({ ...f, golsB: e.target.value ? parseInt(e.target.value) : null }))} placeholder="–" />
              </div>
            </div>
            <div>
              <label className="form-label">Resumo</label>
              <textarea className="form-input h-20 resize-none" value={matchForm.resumo || ''} onChange={e => setMatchForm(f => ({ ...f, resumo: e.target.value }))} placeholder="Breve descrição da partida..." />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={saveMatch} className="btn-primary flex-1 justify-center"><Check size={15} /> Salvar</button>
              <button onClick={() => setMatchModal(null)} className="btn-outline border-gray-200 text-gray-600 hover:bg-gray-100 flex-1 justify-center"><X size={15} /> Cancelar</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Doc modal */}
      {docModal && (
        <Modal title={docModal === 'add' ? 'Novo Documento' : 'Editar Documento'} onClose={() => setDocModal(null)}>
          <div className="space-y-4">
            <div>
              <label className="form-label">Nome do documento</label>
              <input className="form-input" value={docForm.name || ''} onChange={e => setDocForm(f => ({ ...f, name: e.target.value }))} placeholder="Ex: Termo de Fomento" />
            </div>
            <div>
              <label className="form-label">Referência</label>
              <input className="form-input" value={docForm.ref || ''} onChange={e => setDocForm(f => ({ ...f, ref: e.target.value }))} placeholder="Nº do documento" />
            </div>
            <div>
              <label className="form-label">Descrição</label>
              <textarea className="form-input h-20 resize-none" value={docForm.desc || ''} onChange={e => setDocForm(f => ({ ...f, desc: e.target.value }))} />
            </div>
            <div>
              <label className="form-label">URL (opcional)</label>
              <input className="form-input" value={docForm.url || ''} onChange={e => setDocForm(f => ({ ...f, url: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={saveDoc} className="btn-primary flex-1 justify-center"><Check size={15} /> Salvar</button>
              <button onClick={() => setDocModal(null)} className="btn-outline border-gray-200 text-gray-600 hover:bg-gray-100 flex-1 justify-center"><X size={15} /> Cancelar</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
