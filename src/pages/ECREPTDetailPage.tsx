import { useState } from 'react'
import { ArrowLeft, FileText, FileCheck, Folder, BarChart2, Check, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Page, BudgetItem, HRPosition, Document } from '../types'
import { initialBudgetItems, initialHRPositions, initialDocuments } from '../data'
import Modal from '../components/Modal'
import CrudToolbar from '../components/CrudToolbar'

interface Props { navigate: (p: Page) => void }

const iconMap: Record<string, LucideIcon> = {
  FileText, FileCheck, Folder, BarChart2,
}

const modalities = [
  { name: 'Futebol',   icon: '⚽', desc: 'Aulas regulares de futebol de campo e futebol society para todas as idades.' },
  { name: 'Basquete',  icon: '🏀', desc: 'Treinamento técnico e tático com foco em formação de base e competições regionais.' },
  { name: 'Natação',   icon: '🏊', desc: 'Aulas de iniciação e aperfeiçoamento técnico em piscina coberta.' },
]

function newId() { return Date.now().toString(36) }

export default function ECREPTDetailPage({ navigate }: Props) {
  const ecreptBudget = initialBudgetItems.filter(b => b.projectId === 'ecrept')
  const ecreptHR     = initialHRPositions.filter(h => h.projectId === 'ecrept')
  const ecreptDocs   = initialDocuments.filter(d => d.projectId === 'ecrept')

  // Budget CRUD
  const [budget, setBudget] = useState<BudgetItem[]>(ecreptBudget)
  const [selBudget, setSelBudget] = useState<string | null>(null)
  const [budgetModal, setBudgetModal] = useState<'add' | 'edit' | null>(null)
  const [budgetForm, setBudgetForm] = useState<Partial<BudgetItem>>({})

  const openAddBudget = () => { setBudgetForm({ tipo: 'Serviço' }); setBudgetModal('add') }
  const openEditBudget = () => {
    const item = budget.find(b => b.id === selBudget)
    if (item) { setBudgetForm(item); setBudgetModal('edit') }
  }
  const saveBudget = () => {
    if (budgetModal === 'add') {
      setBudget(prev => [...prev, { ...budgetForm, id: newId(), projectId: 'ecrept', n: prev.length + 1, item: budgetForm.item || '', tipo: budgetForm.tipo || 'Serviço', qtd: budgetForm.qtd || '', unitPrice: budgetForm.unitPrice || '', total: budgetForm.total || '' }])
    } else {
      setBudget(prev => prev.map(b => b.id === selBudget ? { ...b, ...budgetForm } as BudgetItem : b))
    }
    setBudgetModal(null); setSelBudget(null)
  }
  const deleteBudget = () => {
    if (!selBudget || !confirm('Excluir este item?')) return
    setBudget(prev => prev.filter(b => b.id !== selBudget)); setSelBudget(null)
  }

  // HR CRUD
  const [hr, setHr] = useState<HRPosition[]>(ecreptHR)
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
      setHr(prev => [...prev, { ...hrForm, id: newId(), projectId: 'ecrept', cargo: hrForm.cargo || '', qtd: hrForm.qtd || '1', regime: hrForm.regime || '', status: hrForm.status || '' }])
    } else {
      setHr(prev => prev.map(h => h.id === selHR ? { ...h, ...hrForm } as HRPosition : h))
    }
    setHrModal(null); setSelHR(null)
  }
  const deleteHR = () => {
    if (!selHR || !confirm('Excluir esta posição?')) return
    setHr(prev => prev.filter(h => h.id !== selHR)); setSelHR(null)
  }

  // Docs CRUD
  const [docs, setDocs] = useState<Document[]>(ecreptDocs)
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
      setDocs(prev => [...prev, { ...docForm, id: newId(), projectId: 'ecrept', icon: docForm.icon || 'FileText', name: docForm.name || '', ref: docForm.ref || '', desc: docForm.desc || '' }])
    } else {
      setDocs(prev => prev.map(d => d.id === selDoc ? { ...d, ...docForm } as Document : d))
    }
    setDocModal(null); setSelDoc(null)
  }
  const deleteDoc = () => {
    if (!selDoc || !confirm('Excluir este documento?')) return
    setDocs(prev => prev.filter(d => d.id !== selDoc)); setSelDoc(null)
  }

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden py-20" style={{ background: 'linear-gradient(135deg, #0f6326 0%, #1A9B3C 50%, #0a7a2a 100%)' }}>
        <div className="absolute inset-0 dot-pattern pointer-events-none" />
        <div className="arc-decoration" style={{ width: 500, height: 500, top: '-150px', right: '-100px', borderColor: 'rgba(255,255,255,0.08)' }} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-15"
               style={{ background: 'radial-gradient(circle, #47B4E8 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <button onClick={() => navigate('transparencia')} className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors group">
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" /> Transparência
          </button>
          <div className="flex flex-col lg:flex-row lg:items-end gap-8">
            <div className="flex-1">
              <span className="hero-badge mb-4">ECREPT</span>
              <h1 className="font-cond font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-none">
                Escola de Cultura,<br />
                <span style={{ color: '#F5C800' }}>Recreação e Esporte</span>
              </h1>
              <p className="text-white/60 mt-3">Administração Regional de Taguatinga — GDF</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Valor total',   value: 'R$ 198.810', color: 'text-[#F5C800]' },
                { label: 'Modalidades',   value: '3',          color: 'text-white' },
                { label: 'Profissionais', value: '4',          color: 'text-white' },
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
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-cond font-black text-2xl uppercase text-[#0D2D6B] mb-5">Identificação do Projeto</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Concedente',       'Administração Regional de Taguatinga – GDF'],
                  ['Termo de Fomento', 'TF-9-SEL/2025'],
                  ['Processo SEI',     '00220-00002340/2025-74'],
                  ['Valor total',      'R$ 198.810,75'],
                  ['Vigência',         '2025 – Em andamento'],
                  ['Público-alvo',     'Crianças, adolescentes e adultos da comunidade de Taguatinga'],
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

      {/* Modalities */}
      <section className="py-12 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-cond font-black text-2xl uppercase text-[#0D2D6B] mb-6">Modalidades Esportivas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modalities.map(m => (
              <div key={m.name} className="card p-7 text-center">
                <span className="text-5xl block mb-4">{m.icon}</span>
                <h3 className="font-cond font-black text-2xl uppercase text-[#0D2D6B] mb-2">{m.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget CRUD */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-cond font-black text-2xl uppercase text-[#0D2D6B] mb-2">Plano de Aplicação</h2>
          <p className="text-sm text-gray-500 mb-5">Recursos aprovados — R$ 198.810,75</p>

          <CrudToolbar
            onAdd={openAddBudget}
            onEdit={openEditBudget}
            onDelete={deleteBudget}
            addLabel="Novo item"
            hasSelection={!!selBudget}
          />

          <div className="overflow-x-auto rounded-2xl border border-gray-200">
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
              <tbody className="divide-y divide-gray-100 bg-white">
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
                  <td className="py-3 px-4 text-right font-cond font-black text-[#0D2D6B]">R$ 198.810,75</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* HR CRUD */}
      <section className="py-12 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-cond font-black text-2xl uppercase text-[#0D2D6B] mb-4">Equipe</h2>

          <CrudToolbar
            onAdd={openAddHR}
            onEdit={openEditHR}
            onDelete={deleteHR}
            addLabel="Nova posição"
            hasSelection={!!selHR}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hr.map(h => (
              <div
                key={h.id}
                onClick={() => setSelHR(s => s === h.id ? null : h.id)}
                className={`card p-5 cursor-pointer ${selHR === h.id ? 'ring-2 ring-[#0D2D6B]' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-cond font-700 text-base text-[#0D2D6B]">{h.cargo}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{h.regime}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-cond font-black text-xl text-[#0D2D6B]">{h.qtd}</p>
                    <span className={`text-xs font-cond font-700 uppercase px-2 py-0.5 rounded-full ${
                      h.status === 'Contratado' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>{h.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Docs CRUD */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-cond font-black text-2xl uppercase text-[#0D2D6B] mb-4">Documentos</h2>

          <CrudToolbar
            onAdd={openAddDoc}
            onEdit={openEditDoc}
            onDelete={deleteDoc}
            addLabel="Novo doc"
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
                    <div>
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

      {budgetModal && (
        <Modal title={budgetModal === 'add' ? 'Novo Item Orçamentário' : 'Editar Item'} onClose={() => setBudgetModal(null)}>
          <div className="space-y-4">
            <div>
              <label className="form-label">Descrição do item</label>
              <input className="form-input" value={budgetForm.item || ''} onChange={e => setBudgetForm(f => ({ ...f, item: e.target.value }))} />
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
                <input className="form-input" value={budgetForm.qtd || ''} onChange={e => setBudgetForm(f => ({ ...f, qtd: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Preço unitário</label>
                <input className="form-input" value={budgetForm.unitPrice || ''} onChange={e => setBudgetForm(f => ({ ...f, unitPrice: e.target.value }))} />
              </div>
              <div>
                <label className="form-label">Total</label>
                <input className="form-input" value={budgetForm.total || ''} onChange={e => setBudgetForm(f => ({ ...f, total: e.target.value }))} />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={saveBudget} className="btn-primary flex-1 justify-center"><Check size={15} /> Salvar</button>
              <button onClick={() => setBudgetModal(null)} className="btn-outline border-gray-200 text-gray-600 hover:bg-gray-100 flex-1 justify-center"><X size={15} /> Cancelar</button>
            </div>
          </div>
        </Modal>
      )}

      {hrModal && (
        <Modal title={hrModal === 'add' ? 'Nova Posição' : 'Editar Posição'} onClose={() => setHrModal(null)}>
          <div className="space-y-4">
            <div>
              <label className="form-label">Cargo</label>
              <input className="form-input" value={hrForm.cargo || ''} onChange={e => setHrForm(f => ({ ...f, cargo: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Quantidade</label>
                <input className="form-input" value={hrForm.qtd || ''} onChange={e => setHrForm(f => ({ ...f, qtd: e.target.value }))} />
              </div>
              <div>
                <label className="form-label">Status</label>
                <select className="form-input" value={hrForm.status || ''} onChange={e => setHrForm(f => ({ ...f, status: e.target.value }))}>
                  <option>Contratado</option><option>Em seleção</option><option>Pendente</option>
                </select>
              </div>
            </div>
            <div>
              <label className="form-label">Regime</label>
              <input className="form-input" value={hrForm.regime || ''} onChange={e => setHrForm(f => ({ ...f, regime: e.target.value }))} />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={saveHR} className="btn-primary flex-1 justify-center"><Check size={15} /> Salvar</button>
              <button onClick={() => setHrModal(null)} className="btn-outline border-gray-200 text-gray-600 hover:bg-gray-100 flex-1 justify-center"><X size={15} /> Cancelar</button>
            </div>
          </div>
        </Modal>
      )}

      {docModal && (
        <Modal title={docModal === 'add' ? 'Novo Documento' : 'Editar Documento'} onClose={() => setDocModal(null)}>
          <div className="space-y-4">
            <div>
              <label className="form-label">Nome</label>
              <input className="form-input" value={docForm.name || ''} onChange={e => setDocForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="form-label">Referência</label>
              <input className="form-input" value={docForm.ref || ''} onChange={e => setDocForm(f => ({ ...f, ref: e.target.value }))} />
            </div>
            <div>
              <label className="form-label">Descrição</label>
              <textarea className="form-input h-20 resize-none" value={docForm.desc || ''} onChange={e => setDocForm(f => ({ ...f, desc: e.target.value }))} />
            </div>
            <div>
              <label className="form-label">URL (opcional)</label>
              <input className="form-input" value={docForm.url || ''} onChange={e => setDocForm(f => ({ ...f, url: e.target.value }))} />
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
