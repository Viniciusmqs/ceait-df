import type { Project, BudgetItem, HRPosition, Document, MatchCard, Partner } from '../types'

export const initialProjects: Project[] = [
  {
    id: 'festival',
    name: 'Festival de Integração Esportiva do DF',
    shortName: 'Festival de Integração',
    concedente: 'Secretaria de Esporte e Lazer do DF',
    tipo: 'distrital',
    termo: '976606',
    proposta: '026133/2025',
    processo: '71000.058350/2025-70',
    value: 588000,
    vigencia: '19 Dez 2025 – 18 Mai 2026',
    status: 'active',
    execucaoPct: 42,
    polo: 'Taguatinga, Recanto das Emas, Guará, Cruzeiro, Vila Planalto, Brazlândia',
    modalidades: ['Futebol Society', 'Futsal', 'Basquete', 'Vôlei', 'Atletismo'],
    publicoAlvo: 'Crianças e adolescentes de 8 a 17 anos em situação de vulnerabilidade social',
    inscricao: 'Inscrições abertas nas sedes dos polos esportivos',
    descricao: 'Torneio interdistrital que reúne 836 partidas em 6 cidades-satélite do DF, atendendo 4.000 beneficiários diretos e promovendo inclusão social pelo esporte.',
  },
  {
    id: 'ecrept',
    name: 'Escola de Cultura, Recreação e Esporte de Taguatinga',
    shortName: 'ECREPT',
    concedente: 'Administração Regional de Taguatinga',
    tipo: 'distrital',
    termo: 'TF-9-SEL/2025',
    processo: '00220-00002340/2025-74',
    value: 198810.75,
    vigencia: '2025 – Em andamento',
    status: 'active',
    execucaoPct: 55,
    modalidades: ['Futebol', 'Basquete', 'Natação'],
    publicoAlvo: 'Crianças, adolescentes e adultos da comunidade de Taguatinga',
    inscricao: 'Inscrições mediante cadastro na sede do CEAIT',
    descricao: 'Programa permanente de iniciação esportiva e formação de atletas na Administração Regional de Taguatinga, oferecendo aulas regulares de múltiplas modalidades.',
  },
]

export const initialBudgetItems: BudgetItem[] = [
  // Festival budget
  { id: 'f-b1',  projectId: 'festival', n: 1,  item: 'Coordenador Geral',           tipo: 'RH',       qtd: '1 profissional / 5 meses',  unitPrice: 'R$ 3.500,00/mês', total: 'R$ 17.500,00' },
  { id: 'f-b2',  projectId: 'festival', n: 2,  item: 'Assistente Administrativo',   tipo: 'RH',       qtd: '1 profissional / 5 meses',  unitPrice: 'R$ 2.500,00/mês', total: 'R$ 12.500,00' },
  { id: 'f-b3',  projectId: 'festival', n: 3,  item: 'Árbitros de Futebol Society', tipo: 'RH',       qtd: '40 jogos × 2 árbitros',     unitPrice: 'R$ 95,00/jogo',   total: 'R$ 7.600,00' },
  { id: 'f-b4',  projectId: 'festival', n: 4,  item: 'Árbitros de Futsal',          tipo: 'RH',       qtd: '32 jogos × 2 árbitros',     unitPrice: 'R$ 85,00/jogo',   total: 'R$ 5.440,00' },
  { id: 'f-b5',  projectId: 'festival', n: 5,  item: 'Árbitros demais modalidades', tipo: 'RH',       qtd: 'Serviços avulsos',           unitPrice: 'Variável',        total: 'R$ 7.760,00' },
  { id: 'f-b6',  projectId: 'festival', n: 6,  item: 'Bolas oficiais (várias mod.)',tipo: 'Material', qtd: '60 unidades',               unitPrice: 'R$ 280,00',       total: 'R$ 16.800,00' },
  { id: 'f-b7',  projectId: 'festival', n: 7,  item: 'Uniformes (camisas)',         tipo: 'Material', qtd: '400 unidades',              unitPrice: 'R$ 45,00',        total: 'R$ 18.000,00' },
  { id: 'f-b8',  projectId: 'festival', n: 8,  item: 'Troféus e medalhas',          tipo: 'Material', qtd: '1 lote',                    unitPrice: 'R$ 22.000,00',    total: 'R$ 22.000,00' },
  { id: 'f-b9',  projectId: 'festival', n: 9,  item: 'Material de escritório',      tipo: 'Material', qtd: '1 lote',                    unitPrice: 'R$ 3.200,00',     total: 'R$ 3.200,00' },
  { id: 'f-b10', projectId: 'festival', n: 10, item: 'Kits higiene e primeiros soc.',tipo:'Material', qtd: '6 kits (1 por polo)',        unitPrice: 'R$ 1.333,33',     total: 'R$ 8.000,00' },
  { id: 'f-b11', projectId: 'festival', n: 11, item: 'Equipamentos esportivos',     tipo: 'Material', qtd: '1 lote',                    unitPrice: 'R$ 72.000,00',    total: 'R$ 72.000,00' },
  { id: 'f-b12', projectId: 'festival', n: 12, item: 'Locação de estrutura (tendas)',tipo:'Serviço',  qtd: '6 eventos de abertura',      unitPrice: 'R$ 8.000,00',     total: 'R$ 48.000,00' },
  { id: 'f-b13', projectId: 'festival', n: 13, item: 'Sonorização e iluminação',    tipo: 'Serviço',  qtd: '6 eventos',                 unitPrice: 'R$ 5.000,00',     total: 'R$ 30.000,00' },
  { id: 'f-b14', projectId: 'festival', n: 14, item: 'Transporte de atletas',       tipo: 'Serviço',  qtd: '5 meses',                   unitPrice: 'R$ 18.000,00/mês',total: 'R$ 90.000,00' },
  { id: 'f-b15', projectId: 'festival', n: 15, item: 'Assessoria de imprensa/mídia', tipo:'Serviço',  qtd: '5 meses',                   unitPrice: 'R$ 6.000,00/mês', total: 'R$ 30.000,00' },
  { id: 'f-b16', projectId: 'festival', n: 16, item: 'Segurança patrimonial',       tipo: 'Serviço',  qtd: '40 diárias',                unitPrice: 'R$ 450,00/diária',total: 'R$ 18.000,00' },
  { id: 'f-b17', projectId: 'festival', n: 17, item: 'Limpeza e manutenção',        tipo: 'Serviço',  qtd: '5 meses',                   unitPrice: 'R$ 3.600,00/mês', total: 'R$ 18.000,00' },
  { id: 'f-b18', projectId: 'festival', n: 18, item: 'Seguro dos participantes',    tipo: 'Serviço',  qtd: '4.000 participantes',        unitPrice: 'R$ 12,00/pessoa', total: 'R$ 48.000,00' },
  { id: 'f-b19', projectId: 'festival', n: 19, item: 'Alimentação (refeições)',     tipo: 'Serviço',  qtd: '4.000 × 5 meses',           unitPrice: 'R$ 5,12/refeição',total: 'R$ 102.400,00' },
  { id: 'f-b20', projectId: 'festival', n: 20, item: 'Captação e edição de vídeo',  tipo: 'Serviço',  qtd: '1 lote',                    unitPrice: 'R$ 16.000,00',    total: 'R$ 16.000,00' },
  { id: 'f-b21', projectId: 'festival', n: 21, item: 'Impressão gráfica (banners)', tipo: 'Serviço',  qtd: '1 lote',                    unitPrice: 'R$ 9.840,04',     total: 'R$ 9.840,04' },

  // ECREPT budget
  { id: 'e-b1', projectId: 'ecrept', n: 1, item: 'Professores de Educação Física', tipo: 'RH',       qtd: '3 profissionais',  unitPrice: 'R$ 3.200,00/mês', total: 'R$ 57.600,00' },
  { id: 'e-b2', projectId: 'ecrept', n: 2, item: 'Auxiliar Administrativo',        tipo: 'RH',       qtd: '1 profissional',   unitPrice: 'R$ 2.200,00/mês', total: 'R$ 26.400,00' },
  { id: 'e-b3', projectId: 'ecrept', n: 3, item: 'Materiais esportivos diversos',  tipo: 'Material', qtd: '1 lote',           unitPrice: 'R$ 45.000,00',    total: 'R$ 45.000,00' },
  { id: 'e-b4', projectId: 'ecrept', n: 4, item: 'Manutenção de equipamentos',     tipo: 'Serviço',  qtd: '12 meses',         unitPrice: 'R$ 1.984,23/mês', total: 'R$ 23.810,75' },
  { id: 'e-b5', projectId: 'ecrept', n: 5, item: 'Locação de transporte',          tipo: 'Serviço',  qtd: '12 meses',         unitPrice: 'R$ 3.833,33/mês', total: 'R$ 46.000,00' },
]

export const initialHRPositions: HRPosition[] = [
  // Festival HR
  { id: 'f-h1', projectId: 'festival', cargo: 'Coordenador Geral',           qtd: '1', regime: 'CLT / 40h semanais', status: 'Contratado' },
  { id: 'f-h2', projectId: 'festival', cargo: 'Assistente Administrativo',   qtd: '1', regime: 'CLT / 40h semanais', status: 'Contratado' },
  { id: 'f-h3', projectId: 'festival', cargo: 'Coordenador de Polo',         qtd: '6', regime: 'Prestação de Serviço', status: 'Em seleção' },
  { id: 'f-h4', projectId: 'festival', cargo: 'Árbitro de Futebol Society',  qtd: '8', regime: 'Diarista / por jogo', status: 'Banco de árbitros' },
  { id: 'f-h5', projectId: 'festival', cargo: 'Árbitro de Futsal',           qtd: '6', regime: 'Diarista / por jogo', status: 'Banco de árbitros' },
  { id: 'f-h6', projectId: 'festival', cargo: 'Auxiliar de Árbitro',         qtd: '12',regime: 'Diarista / por jogo', status: 'Banco de árbitros' },
  { id: 'f-h7', projectId: 'festival', cargo: 'Monitor Esportivo',           qtd: '12',regime: 'Prestação de Serviço', status: 'Em seleção' },
  { id: 'f-h8', projectId: 'festival', cargo: 'Responsável de Comunicação',  qtd: '1', regime: 'Prestação de Serviço', status: 'Contratado' },
  { id: 'f-h9', projectId: 'festival', cargo: 'Auxiliar de Logística',       qtd: '3', regime: 'CLT / 44h semanais',  status: 'Em seleção' },
  { id: 'f-h10',projectId: 'festival', cargo: 'Apoio de Saúde (Fisio/Enf.)', qtd: '2', regime: 'Diarista / eventos',  status: 'Em seleção' },

  // ECREPT HR
  { id: 'e-h1', projectId: 'ecrept', cargo: 'Professor Ed. Física – Futebol',  qtd: '1', regime: 'CLT / 40h semanais', status: 'Contratado' },
  { id: 'e-h2', projectId: 'ecrept', cargo: 'Professor Ed. Física – Basquete', qtd: '1', regime: 'CLT / 40h semanais', status: 'Contratado' },
  { id: 'e-h3', projectId: 'ecrept', cargo: 'Professor Ed. Física – Natação',  qtd: '1', regime: 'CLT / 40h semanais', status: 'Contratado' },
  { id: 'e-h4', projectId: 'ecrept', cargo: 'Auxiliar Administrativo',         qtd: '1', regime: 'CLT / 40h semanais', status: 'Contratado' },
]

export const initialDocuments: Document[] = [
  // Festival documents
  { id: 'f-d1', projectId: 'festival', icon: 'FileText',    name: 'Termo de Fomento',         ref: 'Nº 976606',              desc: 'Instrumento de parceria celebrado com a SEL-DF', url: '#' },
  { id: 'f-d2', projectId: 'festival', icon: 'FileCheck',   name: 'Proposta de Plano de Ação', ref: 'Proposta 026133/2025',   desc: 'Plano de trabalho aprovado pela concedente', url: '#' },
  { id: 'f-d3', projectId: 'festival', icon: 'Folder',      name: 'Processo SEI',              ref: '71000.058350/2025-70',   desc: 'Processo administrativo no sistema SEI-GDF', url: '#' },
  { id: 'f-d4', projectId: 'festival', icon: 'BarChart2',   name: 'Plano de Aplicação',        ref: 'Orçamento aprovado',     desc: 'Detalhamento financeiro por rubrica', url: '#' },
  { id: 'f-d5', projectId: 'festival', icon: 'Users',       name: 'Lista de Beneficiários',    ref: 'Atualizado jan/2026',    desc: 'Relação nominal dos 4.000 beneficiários diretos', url: '#' },
  { id: 'f-d6', projectId: 'festival', icon: 'Shield',      name: 'Relatório Parcial',         ref: '1º Bimestre 2026',       desc: 'Prestação de contas parcial – fase 1 concluída', url: '#' },

  // ECREPT documents
  { id: 'e-d1', projectId: 'ecrept', icon: 'FileText',  name: 'Termo de Fomento ECREPT',  ref: 'TF-9-SEL/2025',              desc: 'Instrumento de parceria com a Adm. Taguatinga', url: '#' },
  { id: 'e-d2', projectId: 'ecrept', icon: 'Folder',    name: 'Processo SEI ECREPT',      ref: '00220-00002340/2025-74',     desc: 'Processo administrativo SEI', url: '#' },
  { id: 'e-d3', projectId: 'ecrept', icon: 'BarChart2', name: 'Plano de Aplicação',       ref: 'Orçamento R$ 198.810,75',    desc: 'Detalhamento financeiro aprovado', url: '#' },
]

export const initialMatches: MatchCard[] = [
  { id: 'm1', cidade: 'Taguatinga',      rodada: 'Rodada 1', data: '10 Jan 2026', timeA: 'Estrela FC',     timeB: 'Unidos do Parque',  golsA: 3, golsB: 1, resumo: 'Partida inaugural do festival com grande público. Estrela FC dominou o segundo tempo.' },
  { id: 'm2', cidade: 'Recanto',         rodada: 'Rodada 1', data: '11 Jan 2026', timeA: 'Recanto Jovem',  timeB: 'Força Verde',       golsA: 2, golsB: 2, resumo: 'Empate emocionante na abertura do polo Recanto das Emas.' },
  { id: 'm3', cidade: 'Guará',           rodada: 'Rodada 1', data: '12 Jan 2026', timeA: 'Guará Atlético', timeB: 'Jovens do Guará',   golsA: 4, golsB: 0, resumo: 'Goleada no polo Guará com destaque para o atacante camisa 9.' },
  { id: 'm4', cidade: 'Brazlândia',      rodada: 'Rodada 1', data: '13 Jan 2026', timeA: 'Braz FC',        timeB: 'Rural Esporte',     golsA: 1, golsB: 3, resumo: 'Rural Esporte surpreende em Brazlândia com virada no segundo tempo.' },
  { id: 'm5', cidade: 'Taguatinga',      rodada: 'Rodada 2', data: '17 Jan 2026', timeA: 'Minas Gerais',   timeB: 'Estrela FC',        golsA: 0, golsB: 2, resumo: 'Estrela FC confirma favoritismo e avança para as quartas.' },
  { id: 'm6', cidade: 'Cruzeiro',        rodada: 'Rodada 1', data: '14 Jan 2026', timeA: 'Cruzeiro Sport', timeB: 'Vila Union',        golsA: 2, golsB: 1, resumo: 'Cruzeiro Sport estreia bem em casa na primeira rodada.' },
  { id: 'm7', cidade: 'Vila Planalto',   rodada: 'Rodada 1', data: '15 Jan 2026', timeA: 'Planalto FC',    timeB: 'Capital Sub-17',    golsA: null, golsB: null, resumo: 'Partida suspensa por chuva. Remarcada para próxima semana.' },
]

export const initialPartners: Partner[] = [
  { id: 'p1', name: 'Secretaria de Esporte e Lazer – GDF', type: 'Governo' },
  { id: 'p2', name: 'Administração Regional de Taguatinga', type: 'Governo' },
  { id: 'p3', name: 'Confederação Brasileira de Futsal',    type: 'Esporte' },
  { id: 'p4', name: 'Federação de Atletismo do DF',         type: 'Esporte' },
]
