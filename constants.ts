import { Client, Opportunity, Transaction, Task, Report, RiskProfile, ComplianceStatus, OpportunityStage, TransactionType, TransactionStatus, TaskPriority, TaskStatus, ALL_OPPORTUNITY_STAGES } from './types';

export const MOCK_CLIENTS: Client[] = [
  { id: 'cli_1', name: 'Investimentos Alfa Ltda', type: 'PJ', document: '12.345.678/0001-90', email: 'contato@alfa.com', phone: '(11) 98765-4321', address: 'Av. Paulista, 1000', riskProfile: RiskProfile.ARROJADO, creditScore: 850, complianceStatus: ComplianceStatus.APROVADO, advisor: 'Carlos Silva', lastActivity: '2024-07-20', walletValue: 2500000 },
  { id: 'cli_2', name: 'Maria Joaquina', type: 'PF', document: '123.456.789-00', email: 'maria.j@email.com', phone: '(21) 91234-5678', address: 'Rua Copacabana, 50', riskProfile: RiskProfile.MODERADO, creditScore: 720, complianceStatus: ComplianceStatus.PENDENTE, advisor: 'Ana Pereira', lastActivity: '2024-07-18', walletValue: 750000 },
  { id: 'cli_3', name: 'Tech Solutions S.A.', type: 'PJ', document: '98.765.432/0001-10', email: 'financeiro@tech.sa', phone: '(31) 99999-8888', address: 'Av. Afonso Pena, 200', riskProfile: RiskProfile.AGRESSIVO, creditScore: 910, complianceStatus: ComplianceStatus.APROVADO, advisor: 'Carlos Silva', lastActivity: '2024-07-22', walletValue: 15000000 },
  { id: 'cli_4', name: 'João da Silva', type: 'PF', document: '987.654.321-99', email: 'joao.silva@email.com', phone: '(41) 98888-7777', address: 'Rua das Flores, 150', riskProfile: RiskProfile.CONSERVADOR, creditScore: 650, complianceStatus: ComplianceStatus.ATRASADO, advisor: 'Sofia Costa', lastActivity: '2024-06-10', walletValue: 120000 },
];

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  { id: 'opp_1', title: 'Expansão de Carteira', clientId: 'cli_1', clientName: 'Investimentos Alfa Ltda', source: 'Indicação', estimatedValue: 500000, stage: OpportunityStage.NEGOCIACAO, probability: 75, expectedCloseDate: '2024-08-15', responsible: 'Carlos Silva', nextAction: 'Reunião de alinhamento' },
  { id: 'opp_2', title: 'Novo Aporte Internacional', clientId: 'cli_3', clientName: 'Tech Solutions S.A.', source: 'Marketing', estimatedValue: 2000000, stage: OpportunityStage.QUALIFICACAO, probability: 50, expectedCloseDate: '2024-09-01', responsible: 'Carlos Silva', nextAction: 'Enviar proposta' },
  { id: 'opp_3', title: 'Primeiro Investimento', clientId: 'cli_2', clientName: 'Maria Joaquina', source: 'Website', estimatedValue: 100000, stage: OpportunityStage.PROSPECT, probability: 20, expectedCloseDate: '2024-08-20', responsible: 'Ana Pereira', nextAction: 'Primeiro contato' },
  { id: 'opp_4', title: 'Aplicação em Renda Fixa', clientId: 'cli_4', clientName: 'João da Silva', source: 'Indicação', estimatedValue: 50000, stage: OpportunityStage.FECHADO, probability: 100, expectedCloseDate: '2024-07-10', responsible: 'Sofia Costa', nextAction: 'Concluído' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'trn_1', clientId: 'cli_1', clientName: 'Investimentos Alfa Ltda', type: TransactionType.APLICACAO, value: 150000, timestamp: '2024-07-20T10:30:00Z', status: TransactionStatus.CONCLUIDA, institution: 'Banco A' },
  { id: 'trn_2', clientId: 'cli_3', clientName: 'Tech Solutions S.A.', type: TransactionType.APLICACAO, value: 75000, timestamp: '2024-07-22T14:00:00Z', status: TransactionStatus.REQUER_APROVACAO, institution: 'Corretora B' },
  { id: 'trn_3', clientId: 'cli_2', clientName: 'Maria Joaquina', type: TransactionType.RESGATE, value: 20000, timestamp: '2024-07-18T11:00:00Z', status: TransactionStatus.CONCLUIDA, institution: 'Banco C' },
  { id: 'trn_4', clientId: 'cli_4', clientName: 'João da Silva', type: TransactionType.FEE, value: 150, timestamp: '2024-07-01T08:00:00Z', status: TransactionStatus.PENDENTE, institution: 'Elitte Capital' },
];

export const MOCK_TASKS: Task[] = [
    { id: 'tsk_1', refId: 'cli_2', description: 'Coletar documentos KYC', priority: TaskPriority.ALTA, status: TaskStatus.EM_ANDAMENTO, dueDate: '2024-07-30', responsible: 'Ana Pereira' },
    { id: 'tsk_2', refId: 'opp_1', description: 'Preparar proposta comercial', priority: TaskPriority.ALTA, status: TaskStatus.A_FAZER, dueDate: '2024-07-28', responsible: 'Carlos Silva' },
    { id: 'tsk_3', refId: 'cli_1', description: 'Agendar reunião de performance trimestral', priority: TaskPriority.MEDIA, status: TaskStatus.A_FAZER, dueDate: '2024-08-10', responsible: 'Carlos Silva' },
    { id: 'tsk_4', refId: 'cli_4', description: 'Follow-up sobre perfil de risco', priority: TaskPriority.BAIXA, status: TaskStatus.CONCLUIDA, dueDate: '2024-07-15', responsible: 'Sofia Costa' },
];

export const MOCK_REPORTS: Report[] = [
    { id: 'rep_1', clientId: 'cli_1', clientName: 'Investimentos Alfa Ltda', period: 'Q2 2024', type: 'Performance', fileUrl: '#' },
    { id: 'rep_2', clientId: 'cli_1', clientName: 'Investimentos Alfa Ltda', period: 'Jun 2024', type: 'Taxas', fileUrl: '#' },
    { id: 'rep_3', clientId: 'cli_3', clientName: 'Tech Solutions S.A.', period: 'Q2 2024', type: 'Performance', fileUrl: '#' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 'not_1', type: 'new_opportunity', message: 'Nova oportunidade de R$ 500.000,00 para Investimentos Alfa Ltda', date: '2024-07-28T10:00:00Z', read: false },
    { id: 'not_2', type: 'task_assigned', message: 'Nova tarefa: Preparar proposta comercial para Investimentos Alfa Ltda', date: '2024-07-28T09:00:00Z', read: false },
    { id: 'not_3', type: 'compliance_alert', message: 'KYC de João da Silva está atrasado há 18 dias', date: '2024-07-27T15:00:00Z', read: true },
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
    { id: 'log_1', user: 'Carlos Silva', action: 'Aprovou transação', date: '2024-07-28T11:00:00Z', details: 'Transação de R$ 75.000,00 para Tech Solutions S.A.' },
    { id: 'log_2', user: 'Ana Pereira', action: 'Atualizou cliente', date: '2024-07-28T10:30:00Z', details: 'Atualizou o perfil de risco de Maria Joaquina para Moderado' },
    { id: 'log_3', user: 'Sofia Costa', action: 'Rejeitou documento', date: '2024-07-27T18:00:00Z', details: 'Rejeitou o comprovante de residência de João da Silva' },
];




export const RISK_COLORS: { [key in RiskProfile]: string } = {
  [RiskProfile.CONSERVADOR]: 'bg-blue-100 text-blue-800',
  [RiskProfile.MODERADO]: 'bg-yellow-100 text-yellow-800',
  [RiskProfile.ARROJADO]: 'bg-orange-100 text-orange-800',
  [RiskProfile.AGRESSIVO]: 'bg-red-100 text-red-800',
};

export const COMPLIANCE_COLORS: { [key in ComplianceStatus]: string } = {
  [ComplianceStatus.APROVADO]: 'bg-green-100 text-green-800',
  [ComplianceStatus.PENDENTE]: 'bg-yellow-100 text-yellow-800',
  [ComplianceStatus.REJEITADO]: 'bg-red-100 text-red-800',
  [ComplianceStatus.ATRASADO]: 'bg-purple-100 text-purple-800',
};

export const TRANSACTION_STATUS_COLORS: { [key in TransactionStatus]: string } = {
    [TransactionStatus.CONCLUIDA]: 'text-green-500',
    [TransactionStatus.PENDENTE]: 'text-yellow-500',
    [TransactionStatus.CANCELADA]: 'text-red-500',
    [TransactionStatus.REQUER_APROVACAO]: 'text-orange-500',
};

export const TASK_PRIORITY_ICON: { [key in TaskPriority]: string } = {
    [TaskPriority.ALTA]: '⚠️',
    [TaskPriority.MEDIA]: '➖',
    [TaskPriority.BAIXA]: '✅',
};

export const PROBABILITY_COLORS = (prob: number): string => {
    if (prob > 70) return 'bg-green-500';
    if (prob > 40) return 'bg-yellow-500';
    return 'bg-red-500';
};

export const STAGE_WIP_LIMITS: { [key in OpportunityStage]?: number } = {
    [OpportunityStage.QUALIFICACAO]: 5,
    [OpportunityStage.NEGOCIACAO]: 3,
};
