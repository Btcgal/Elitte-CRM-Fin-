import { Client, Opportunity, Transaction, Report, ComplianceStatus, RiskProfile, OpportunityStage, TransactionType, ActivityStatus, ActivityPriority, CommercialPartner, CommissionType, Address, ContactPerson, ContractDetails, TransactionStatus, Notification, AuditLog, Activity, ActivityType, ProductType } from "./types";

const mockAddress: Address = {
  street: 'Av. Principal',
  number: '123',
  city: 'São Paulo',
  state: 'SP',
  zipCode: '01000-000',
  country: 'Brasil',
};

const mockContract: ContractDetails = {
  type: 'Contrato de Parceria Padrão',
  startDate: '2023-01-15',
  commissionType: CommissionType.PERCENTAGE,
  commissionValue: 20,
};

export const MOCK_PARTNERS: CommercialPartner[] = [
  {
    id: 'partner-1',
    name: 'XP Investimentos',
    address: mockAddress,
    phone: '(11) 98765-4321',
    responsiblePersons: [{ name: 'João Silva', role: 'Gerente de Contas', email: 'joao.silva@xp.com.br', phone: '11999999999' }],
    contract: mockContract,
    indicatedClientsCount: 15,
    totalVolume: 7500000,
  },
  {
    id: 'partner-2',
    name: 'BTG Pactual',
    address: { ...mockAddress, street: 'Rua Secundária' },
    phone: '(21) 12345-6789',
    responsiblePersons: [{ name: 'Maria Oliveira', role: 'Diretora', email: 'maria.o@btg.com', phone: '21988888888' }],
    contract: { ...mockContract, commissionValue: 25 },
    indicatedClientsCount: 10,
    totalVolume: 12000000,
  },
];

export const MOCK_CLIENTS: Client[] = [
  {
    id: '1',
    type: 'PJ',
    name: 'Investimentos Alfa Ltda',
    cnpj: '12.345.678/0001-90',
    email: 'contato@alfa.com',
    phone: '(11) 98765-4321',
    address: { street: 'Av. Paulista', number: '1000', city: 'São Paulo', state: 'SP', zipCode: '01310-100', country: 'Brasil', neighborhood: 'Bela Vista' },
    financialProfile: { investorProfile: RiskProfile.ARROJADO, assetPreferences: ['Ações BR', 'Fundos Imobiliários'], financialNeeds: ['Crescimento de capital'], meetingAgendaSuggestions: [] },
    complianceStatus: ComplianceStatus.APROVADO,
    advisors: ['Ana Beatriz'],
    walletValue: 5000000,
    lastActivity: '2024-07-28T10:00:00Z',
    sector: 'Tecnologia',
    partners: [],
    contactPersons: [],
    servicePreferences: ['Gestão de Ativos'],
  },
  {
    id: '2',
    type: 'PF',
    name: 'Maria Joaquina',
    cpf: '123.456.789-00',
    email: 'maria.j@email.com',
    phone: '(21) 91234-5678',
    address: { street: 'Rua Copacabana', number: '50', city: 'Rio de Janeiro', state: 'RJ', zipCode: '22020-001', country: 'Brasil', neighborhood: 'Copacabana' },
    financialProfile: { investorProfile: RiskProfile.MODERADO, assetPreferences: ['Renda Fixa', 'Ações BR'], financialNeeds: ['Preservação de capital'], meetingAgendaSuggestions: [] },
    complianceStatus: ComplianceStatus.APROVADO,
    advisors: ['Carlos Pereira'],
    walletValue: 1500000,
    lastActivity: '2024-07-25T14:30:00Z',
    citizenship: 'Brasileira',
  },
];

export const MOCK_ACTIVITIES: Activity[] = [
  { id: 'act_1', title: 'Reunião de Alinhamento', type: ActivityType.REUNIAO, clientId: '1', assessor: 'Ana Beatriz', dueDate: '2025-10-20T10:00:00Z', priority: ActivityPriority.ALTA, status: ActivityStatus.A_FAZER },
  { id: 'act_2', title: 'Ligar para Follow-up', type: ActivityType.LIGACAO, clientId: '2', assessor: 'Carlos Pereira', dueDate: '2025-10-22T15:00:00Z', priority: ActivityPriority.MEDIA, status: ActivityStatus.A_FAZER },
  { id: 'act_3', title: 'Verificar Documentação Onboarding', type: ActivityType.OPERACIONAL, clientId: '1', assessor: 'Ana Beatriz', dueDate: '2025-10-18T09:00:00Z', priority: ActivityPriority.ALTA, status: ActivityStatus.CONCLUIDA },
  { id: 'act_4', title: 'Reunião Trimestral', type: ActivityType.REUNIAO, clientId: '2', assessor: 'Carlos Pereira', dueDate: '2025-09-15T11:00:00Z', priority: ActivityPriority.MEDIA, status: ActivityStatus.CONCLUIDA },
  { id: 'act_5', title: 'Enviar E-mail com Portfólio', type: ActivityType.EMAIL, clientId: '1', assessor: 'Ana Beatriz', dueDate: '2025-09-30T17:00:00Z', priority: ActivityPriority.BAIXA, status: ActivityStatus.CONCLUIDA },
];

export const MOCK_REPORTS: Report[] = [
  { id: 'rep_1', clientId: '1', clientName: 'Investimentos Alfa Ltda', period: 'Q3 2025', type: 'Performance', fileUrl: '#' },
  { id: 'rep_2', clientId: '2', clientName: 'Maria Joaquina', period: 'Q3 2025', type: 'Performance', fileUrl: '#' },
];

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  { id: 'opp_1', title: 'Expansão de Carteira', clientId: '1', clientName: 'Investimentos Alfa Ltda', source: 'Indicação', estimatedValue: 500000, stage: OpportunityStage.APRESENTACAO_PORTFOLIO, probability: 75, expectedCloseDate: '2025-11-30', responsible: 'Ana Beatriz', nextAction: 'Enviar proposta' },
  { id: 'opp_2', title: 'Novo Aporte Internacional', clientId: '2', clientName: 'Maria Joaquina', source: 'Marketing', estimatedValue: 2000000, stage: OpportunityStage.PRIMEIRA_REUNIAO, probability: 50, expectedCloseDate: '2025-12-15', responsible: 'Carlos Pereira', nextAction: 'Ligar para follow-up' },
  { id: 'opp_3', title: 'Primeiro Investimento', clientId: '2', clientName: 'Maria Joaquina', source: 'Website', estimatedValue: 100000, stage: OpportunityStage.PESQUISA, probability: 20, expectedCloseDate: '2026-01-10', responsible: 'Sofia Lima', nextAction: 'Qualificar lead' },
  { id: 'opp_4', title: 'Aplicação em Renda Fixa', clientId: '1', clientName: 'Investimentos Alfa Ltda', source: 'Indicação', estimatedValue: 50000, stage: OpportunityStage.GANHO, probability: 100, expectedCloseDate: '2025-10-15', responsible: 'Ana Beatriz', nextAction: 'Finalizado' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'trn_1', clientId: '1', clientName: 'Investimentos Alfa Ltda', type: TransactionType.APLICACAO, product: { type: ProductType.ACOES, description: 'PETR4' }, value: 150000, liquidationDate: '2025-10-20', timestamp: '2025-10-18T10:30:00Z', status: TransactionStatus.CONCLUIDA, institution: 'Banco XP' },
  { id: 'trn_2', clientId: '2', clientName: 'Maria Joaquina', type: TransactionType.APLICACAO, product: { type: ProductType.FUNDO_INVESTIMENTO, description: 'Alaska Black' }, value: 75000, liquidationDate: '2025-11-05', timestamp: '2025-11-01T14:00:00Z', status: TransactionStatus.PENDENTE, institution: 'BTG Pactual' },
  { id: 'trn_3', clientId: '2', clientName: 'Maria Joaquina', type: TransactionType.RESGATE, product: { type: ProductType.RENDA_FIXA, description: 'Tesouro Selic' }, value: 20000, timestamp: '2025-10-10T11:00:00Z', status: TransactionStatus.CONCLUIDA, institution: 'Banco Itaú' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 'not_1', type: 'new_opportunity', message: 'Nova oportunidade de R$ 500.000,00 para Investimentos Alfa Ltda', date: '2024-07-28T10:00:00Z', read: false },
    { id: 'not_2', type: 'task_assigned', message: 'Nova tarefa: Preparar proposta comercial para Investimentos Alfa Ltda', date: '2024-07-28T09:00:00Z', read: false },
    { id: 'not_3', type: 'compliance_alert', message: 'KYC de João da Silva está atrasado há 18 dias', date: '2024-07-27T15:00:00Z', read: true },
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
    { id: 'log_1', user: 'Ana Beatriz', action: ' criou a oportunidade "Expansão de Carteira"', date: '2024-07-28T09:00:00Z', details: 'Valor estimado: R$ 500.000,00' },
    { id: 'log_2', user: 'Carlos Pereira', action: 'atualizou o status do cliente "João da Silva" para "Pendente"', date: '2024-07-27T15:00:00Z', details: 'Motivo: KYC atrasado' },
    { id: 'log_3', user: 'Sofia Lima', action: 'adicionou a tarefa "Follow-up com Tech Solutions S.A."', date: '2024-07-26T11:00:00Z', details: 'Prioridade: Média' },
];

export const RISK_COLORS: { [key in RiskProfile]: string } = {
  [RiskProfile.CONSERVADOR]: 'bg-blue-100 text-blue-800',
  [RiskProfile.MODERADO]: 'bg-yellow-100 text-yellow-800',
  [RiskProfile.ARROJADO]: 'bg-orange-100 text-orange-800',
  [RiskProfile.AGRESSIVO]: 'bg-red-100 text-red-800',
};

export const TRANSACTION_STATUS_COLORS: { [key in TransactionStatus]: string } = {
    [TransactionStatus.CONCLUIDA]: 'text-green-500',
    [TransactionStatus.PENDENTE]: 'text-yellow-500',
    [TransactionStatus.CANCELADA]: 'text-red-500',
    [TransactionStatus.REQUER_APROVACAO]: 'text-orange-500',
};

export const PROBABILITY_COLORS = (prob: number): string => {
    if (prob > 70) return 'bg-green-500';
    if (prob > 40) return 'bg-yellow-500';
    return 'bg-red-500';
};

export const COMPLIANCE_COLORS: { [key in ComplianceStatus]: string } = {
    [ComplianceStatus.APROVADO]: 'bg-green-100 text-green-800',
    [ComplianceStatus.PENDENTE]: 'bg-yellow-100 text-yellow-800',
    [ComplianceStatus.REJEITADO]: 'bg-red-100 text-red-800',
    [ComplianceStatus.ATRASADO]: 'bg-orange-100 text-orange-800',
};
