export type Page = 'home' | 'sobre' | 'transparencia' | 'contato' | 'festival-detail' | 'ecrept-detail'

export interface Project {
  id: string
  name: string
  shortName: string
  concedente: string
  tipo: 'federal' | 'distrital'
  termo: string
  proposta?: string
  processo: string
  value: number
  vigencia: string
  status: 'active' | 'done' | 'pending'
  execucaoPct: number
  polo?: string
  modalidades?: string[]
  publicoAlvo: string
  inscricao: string
  descricao: string
}

export interface BudgetItem {
  id: string
  projectId: string
  n: number
  item: string
  tipo: 'RH' | 'Material' | 'Serviço'
  qtd: string
  unitPrice: string
  total: string
}

export interface HRPosition {
  id: string
  projectId: string
  cargo: string
  qtd: string
  regime: string
  status: string
}

export interface Document {
  id: string
  projectId: string
  icon: string
  name: string
  ref: string
  desc: string
  url?: string
}

export interface MatchCard {
  id: string
  cidade: string
  rodada: string
  data: string
  timeA: string
  timeB: string
  golsA: number | null
  golsB: number | null
  resumo: string
  fotoJogo?: string
  fotoSumula?: string
}

export interface Partner {
  id: string
  name: string
  type: string
  logo?: string
}
