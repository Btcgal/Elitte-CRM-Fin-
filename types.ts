export enum RiskProfile {
  CONSERVADOR = 'Conservador',
  MODERADO = 'Moderado',
  ARROJADO = 'Arrojado',
  AGRESSIVO = 'Agressivo',
}

export enum ComplianceStatus {
  APROVADO = 'Aprovado',
  PENDENTE = 'Pendente',
  REJEITADO = 'Rejeitado',
  ATRASADO = 'Atrasado',
}

export enum OpportunityStage {
  PROSPECT = 'Prospect',
  QUALIFICACAO = 'Qualificação',
  NEGOCIACAO = 'Negociação',
  FECHADO = 'Fechado',
  PERDIDO = 'Perdido',
}

export enum TransactionType {
  APLICACAO = 'Aplicação',
  RESGATE = 'Resgate',
  FEE = 'Taxa',
  FATURA = 'Fatura',
}

export enum TransactionStatus {
  CONCLUIDA = 'Concluída',
  PENDENTE = 'Pendente',
  CANCELADA = 'Cancelada',
  REQUER_APROVACAO = 'Requer Aprovação',
}

export enum TaskPriority {
  ALTA = 'Alta',
  MEDIA = 'Média',
  BAIXA = 'Baixa',
}

export enum TaskStatus {
  A_FAZER = 'A Fazer',
  EM_ANDAMENTO = 'Em Andamento',
  CONCLUIDA = 'Concluída',
}

export interface Client {
  id: string;
  name: string;
  type: 'PF' | 'PJ';
  document: string;
  email: string;
  phone: string;
  address: string;
  riskProfile: RiskProfile;
  creditScore: number;
  complianceStatus: ComplianceStatus;
  advisor: string;
  attachments?: any[];
  lastActivity: string;
  walletValue: number;
}

export interface Opportunity {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  source: string;
  estimatedValue: number;
  stage: OpportunityStage;
  probability: number;
  expectedCloseDate: string;
  responsible: string;
  nextAction: string;
}

export interface Transaction {
  id: string;
  clientId: string;
  clientName: string;
  type: TransactionType;
  value: number;
  timestamp: string;
  status: TransactionStatus;
  institution: string;
  docRef?: string;
}

export interface Task {
  id: string;
  refId: string; // Client or Opportunity ID
  responsible: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
}

export interface ComplianceDoc {
  id: string;
  clientId: string;
  type: 'KYC' | 'Contrato' | 'Procuração';
  validity: string;
  status: 'Válido' | 'Vencido' | 'Pendente';
}

export interface Report {
  id: string;
  clientId: string;
  clientName: string;
  period: string;
  type: 'Performance' | 'Compliance' | 'Taxas' | 'Inadimplência';
  fileUrl: string;
}

export interface Notification {
  id: string;
  type: 'new_opportunity' | 'task_assigned' | 'compliance_alert';
  message: string;
  date: string;
  read: boolean;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  date: string;
  details: string;
}

export type NavigationItem = 'Home' | 'Clientes' | 'Oportunidades' | 'Transações' | 'Tarefas' | 'Relatórios' | 'Compliance' | 'Configurações' | 'Notificações';

export const ALL_OPPORTUNITY_STAGES: OpportunityStage[] = [
  OpportunityStage.PROSPECT,
  OpportunityStage.QUALIFICACAO,
  OpportunityStage.NEGOCIACAO,
  OpportunityStage.FECHADO,
  OpportunityStage.PERDIDO,
];
