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
  PESQUISA = 'Pesquisa',
  PRIMEIRA_REUNIAO = 'Primeira Reunião',
  APRESENTACAO_PORTFOLIO = 'Apresentação de Portfólio',
  ONBOARDING = 'Onboarding',
  ALOCACAO = 'Alocação',
  FOLLOW_UP = 'Follow up',
  GANHO = 'Ganho',
  PERDA = 'Perda',
}

export enum ProductType {
  FUNDO_INVESTIMENTO = 'Fundo de Investimento',
  ACOES = 'Ações',
  RENDA_FIXA = 'Renda Fixa',
  FII = "FII's",
  INTERNACIONAL = 'Internacional',
  PREVIDENCIA = 'Previdência',
  CAMBIO = 'Câmbio',
  OUTRO = 'Outro',
}

export enum TransactionType {
  APLICACAO = 'Aplicação',
  RESGATE = 'Resgate',
  FEE = 'Taxa',
  FATURA = 'Fatura',
}

export enum TransactionStatus {
  CONCLUIDA = 'Conclucluída',
  PENDENTE = 'Pendente',
  CANCELADA = 'Cancelada',
  REQUER_APROVACAO = 'Requer Aprovação',
}

export enum ActivityType {
  LIGACAO = 'Ligação',
  REUNIAO = 'Reunião',
  EMAIL = 'E-mail',
  OPERACIONAL = 'Operacional',
  OUTRO = 'Outro',
}

export enum ActivityPriority {
  ALTA = 'Alta',
  MEDIA = 'Média',
  BAIXA = 'Baixa',
}

export enum ActivityStatus {
  A_FAZER = 'A Fazer',
  EM_ANDAMENTO = 'Em Andamento',
  CONCLUIDA = 'Concluída',
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  lat?: number;
  lng?: number;
}

export interface FamilyMember {
  name: string;
  relationship: string;
  birthDate: string;
}

export interface SocialMedia {
  platform: 'LinkedIn' | 'Instagram' | 'Facebook' | 'Twitter' | 'Other';
  url: string;
}

export interface Interaction {
  date: string;
  type: 'Meeting' | 'Call' | 'Email' | 'Note';
  summary: string;
  nextSteps?: string;
}

export interface FinancialProfile {
  investorProfile: RiskProfile;
  assetPreferences: string[];
  financialNeeds: string[];
  meetingAgendaSuggestions: string[];
}

export enum CommissionType {
  PERCENTAGE = 'Percentual da Receita',
  FIXED = 'Valor Fixo por Indicação',
}

export interface ContractDetails {
  type: string;
  startDate: string;
  endDate?: string;
  commissionType: CommissionType;
  commissionValue: number;
  documentUrl?: string;
}

export interface CommissionStatement {
  month: string; // ex: "2023-10"
  totalRevenue: number;
  commissionCalculated: number;
  clientsBreakdown: Array<{
    clientId: string;
    clientName: string;
    revenueGenerated: number;
    commission: number;
  }>;
}

export interface ContactPerson {
  name: string;
  role: string;
  email: string;
  phone: string;
}

export interface CommercialPartner {
  id: string;
  name: string;
  website?: string;
  address: Address;
  phone: string;
  socialMedia?: SocialMedia[];
  responsiblePersons: ContactPerson[];
  contract: ContractDetails;
  indicatedClientsCount: number;
  totalVolume: number;
  commissionHistory?: CommissionStatement[];
}

export enum ReminderType {
  ANIVERSARIO = 'Aniversário',
  REUNIAO = 'Reunião',
  FOLLOW_UP = 'Follow-up',
  DOCUMENTO = 'Documento',
}

export enum Recurrence {
  NENHUMA = 'Nenhuma',
  MENSAL = 'Mensal',
  BIMESTRAL = 'Bimestral',
  TRIMESTRAL = 'Trimestral',
  SEMESTRAL = 'Semestral',
  ANUAL = 'Anual',
}

export interface Reminder {
  id: string;
  clientId: string;
  type: ReminderType;
  title: string;
  date: string;
  recurrence: Recurrence;
  notes?: string;
}

interface BaseClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  socialMedia?: SocialMedia[];
  notes?: string;
  partnerId?: string; // Substitui a estrutura 'referral'
  financialProfile: FinancialProfile;
  interactionHistory?: Interaction[];
  complianceStatus: ComplianceStatus;
  advisors: string[]; // Alterado para suportar múltiplos assessores
  attachments?: any[];
  lastActivity: string;
  walletValue: number;
  reminders?: Reminder[];
}

export interface ClientPF extends BaseClient {
  type: 'PF';
  cpf: string;
  spouse?: {
    name: string;
    marriageRegime: string;
  };
  citizenship: string;
  familyMembers?: FamilyMember[];
  hobbies?: string[];
}

interface Partner {
  name: string;
  role: string;
  email?: string;
}

export interface ClientPJ extends BaseClient {
  type: 'PJ';
  cnpj: string;
  sector: string;
  partners: Partner[];
  contactPersons: ContactPerson[];
  servicePreferences: string[];
}

export type Client = ClientPF | ClientPJ;

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
  product: {
    type: ProductType;
    description: string;
  };
  value: number; // Valor total da transação
  unitValue?: number; // Valor unitário do ativo
  quantity?: number; // Quantidade de cotas/ações
  reservationDate?: string;
  liquidationDate?: string;
  timestamp: string;
  status: TransactionStatus;
  institution: string;
  docRef?: string;
}

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  clientId?: string;
  opportunityId?: string;
  assessor: string;
  guests?: string[]; // Emails dos convidados
  location?: string; // URL da reunião online ou endereço físico
  dueDate: string;
  priority: ActivityPriority;
  status: ActivityStatus;
  notes?: string;
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
  type: 'new_opportunity' | 'task_assigned' | 'compliance_alert' | 'mention';
  message: string;
  date: string;
  read: boolean;
  author?: string; // Quem originou a notificação (ex: em uma menção)
  link?: string; // Link para a página relevante (ex: a página do cliente onde a menção ocorreu)
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  date: string;
  details: string;
}

export type NavigationItem = 'Home' | 'Clientes' | 'Oportunidades' | 'Parceiros' | 'Transações' | 'Tarefas' | 'Relatórios' | 'Compliance' | 'Configurações' | 'Notificações';

export const ALL_OPPORTUNITY_STAGES: OpportunityStage[] = [
  OpportunityStage.PESQUISA,
  OpportunityStage.PRIMEIRA_REUNIAO,
  OpportunityStage.APRESENTACAO_PORTFOLIO,
  OpportunityStage.ONBOARDING,
  OpportunityStage.ALOCACAO,
  OpportunityStage.FOLLOW_UP,
  OpportunityStage.GANHO,
  OpportunityStage.PERDA,
];
