import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Client, ComplianceStatus } from '../types';
import { RISK_COLORS, COMPLIANCE_COLORS } from '../constants';
import Card from './Card';
import Chip from './Chip';
import { Recurrence, Reminder, ReminderType } from '../types';

// Mock data - idealmente viria da API
const portfolioData = [
  { name: 'Renda Fixa', value: 400 },
  { name: 'Ações BR', value: 300 },
  { name: 'Ações EUA', value: 300 },
  { name: 'Fundos Imobiliários', value: 200 },
];
const COLORS = ['#1E2A38', '#0088FE', '#00C49F', '#FFBB28'];

const InfoItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value || '-'}</p>
  </div>
);

export const ClientDetail: React.FC<{ client: Client, onClose: () => void, showSnackbar: (msg: string, type?:'success'|'error')=>void, initialTab?: string }> = ({ client, onClose, showSnackbar, initialTab = 'Perfil' }) => {
    const [activeTab, setActiveTab] = useState(initialTab);
    const [showNewReminder, setShowNewReminder] = useState(false);

    const renderTabs = () => {
      const tabs = ['Perfil', 'Financeiro', 'Relacionamento', 'Histórico', 'Lembretes', 'Compliance'];
      return (
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-6 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === tab ? 'border-[#1E2A38] text-[#1E2A38]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                {tab}
              </button>
            ))}
          </nav>
        </div>
      );
    };

    const renderProfileTab = () => (
      <Card>
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-4">Informações Gerais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="Nome" value={client.name} />
            <InfoItem label="Tipo" value={client.type} />
            <InfoItem label="Email" value={client.email} />
            <InfoItem label="Telefone" value={client.phone} />
            <InfoItem label="Assessores" value={client.advisors.join(', ')} />
          </div>

          {client.type === 'PF' && (
            <>
              <h3 className="font-semibold text-lg mt-6 mb-4">Detalhes Pessoais (PF)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem label="CPF" value={client.cpf} />
                <InfoItem label="Cidadania" value={client.citizenship} />
                {client.spouse && <InfoItem label="Cônjuge" value={`${client.spouse.name} (${client.spouse.marriageRegime})`} />}
              </div>
            </>
          )}

          {client.type === 'PJ' && (
            <>
              <h3 className="font-semibold text-lg mt-6 mb-4">Detalhes da Empresa (PJ)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem label="CNPJ" value={client.cnpj} />
                <InfoItem label="Setor" value={client.sector} />
              </div>
              <h4 className="font-semibold mt-4 mb-2">Sócios</h4>
              <ul className="list-disc list-inside">
                {client.partners.map(p => <li key={p.name}>{p.name} ({p.role})</li>)}
              </ul>
              <h4 className="font-semibold mt-4 mb-2">Contatos</h4>
              <ul className="list-disc list-inside">
                {client.contactPersons.map(c => <li key={c.name}>{c.name} ({c.role}) - {c.email}</li>)}
              </ul>
            </>
          )}

          <h3 className="font-semibold text-lg mt-6 mb-4">Endereço</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="Logradouro" value={`${client.address.street}, ${client.address.number}`} />
            <InfoItem label="Bairro" value={client.address.neighborhood} />
            <InfoItem label="Cidade / Estado" value={`${client.address.city} / ${client.address.state}`} />
            <InfoItem label="CEP" value={client.address.zipCode} />
          </div>
        </div>
      </Card>
    );

    const renderFinancialTab = () => (
      <Card>
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-4">Perfil Financeiro</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="Perfil de Investidor" value={<Chip text={client.financialProfile.investorProfile} color={RISK_COLORS[client.financialProfile.investorProfile]} />} />
            <InfoItem label="Valor em Carteira" value={client.walletValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
            <InfoItem label="Preferência de Ativos" value={client.financialProfile.assetPreferences.join(', ')} />
            {client.type === 'PJ' && <InfoItem label="Preferência de Serviços" value={client.servicePreferences.join(', ')} />}
            <InfoItem label="Necessidades Financeiras" value={client.financialProfile.financialNeeds.join(', ')} />
          </div>
          <h3 className="font-semibold text-lg mt-6 mb-4">Composição da Carteira</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={portfolioData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name">
                {portfolioData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    );

    const renderRelationshipTab = () => (
      <Card>
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-4">Relacionamento</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {client.referral && <InfoItem label="Indicado por" value={`${client.referral.name} ${client.referral.isPartner ? '(Parceiro)' : ''}`} />}
            {client.referral?.isPartner && <InfoItem label="Comissão" value={`${client.referral.commission}%`} />}
            {client.type === 'PF' && <InfoItem label="Hobbies" value={client.hobbies?.join(', ')} />}
          </div>
          {client.type === 'PF' && client.familyMembers && client.familyMembers.length > 0 && (
            <>
              <h3 className="font-semibold text-lg mt-6 mb-4">Membros da Família</h3>
              <ul className="space-y-2">
                {client.familyMembers.map(member => (
                  <li key={member.name} className="flex justify-between p-2 bg-gray-50 rounded">
                    <span>{member.name} ({member.relationship})</span>
                    <span className="text-sm text-gray-600">Aniversário: {new Date(member.birthDate).toLocaleDateString('pt-BR')}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </Card>
    );

    const renderHistoryTab = () => (
      <Card>
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-4">Histórico de Interações</h3>
          <div className="space-y-4">
            {client.interactionHistory?.map((item, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">{item.type}</span>
                  <span className="text-sm text-gray-500">{new Date(item.date).toLocaleString('pt-BR')}</span>
                </div>
                <p>{item.summary}</p>
                {item.nextSteps && <p className="text-sm mt-2 text-blue-600"><strong>Próximos Passos:</strong> {item.nextSteps}</p>}
              </div>
            ))}
          </div>
        </div>
      </Card>
    );

    const renderRemindersTab = () => (
      <Card>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Lembretes</h3>
            <button onClick={() => setShowNewReminder(true)} className="py-2 px-4 bg-[#1E2A38] text-white rounded-md font-semibold text-sm hover:bg-opacity-90">Novo Lembrete</button>
          </div>
          <div className="space-y-3">
            {client.reminders?.map(reminder => (
              <div key={reminder.id} className="p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{reminder.title} ({reminder.type})</p>
                    <p className="text-sm text-gray-600">Data: {new Date(reminder.date).toLocaleDateString('pt-BR')} - Recorrência: {reminder.recurrence}</p>
                  </div>
                  <button className="p-1 rounded-full hover:bg-gray-200"><span className="material-symbols-outlined text-base">more_vert</span></button>
                </div>
              </div>
            ))}
            {(!client.reminders || client.reminders.length === 0) && <p className="text-center text-gray-500 py-4">Nenhum lembrete agendado.</p>}
          </div>
        </div>
        {showNewReminder && <NewReminderModal onClose={() => setShowNewReminder(false)} />}
      </Card>
    );

    const renderComplianceTab = () => (
      <div>
        <h3 className="font-semibold text-lg mb-4">Checklist de Documentos (KYC)</h3>
        <Card>
          <ul className="space-y-3 p-6">
            <li className="flex justify-between items-center p-2 rounded-md bg-green-50">Documento de Identidade <span className="text-green-700 font-medium">Válido</span></li>
            <li className="flex justify-between items-center p-2 rounded-md bg-green-50">Comprovante de Residência <span className="text-green-700 font-medium">Válido</span></li>
            <li className="flex justify-between items-center p-2 rounded-md bg-yellow-50">Declaração de Renda <span className="text-yellow-700 font-medium">Pendente</span></li>
          </ul>
          {client.complianceStatus !== ComplianceStatus.APROVADO &&
            <div className="p-6 border-t flex gap-4">
              <button onClick={() => showSnackbar('Documentos aprovados com sucesso!')} className="flex-1 py-2 px-4 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700">Aprovar</button>
              <button onClick={() => showSnackbar('Documentos rejeitados.', 'error')} className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700">Rejeitar</button>
            </div>
          }
        </Card>
      </div>
    );

    return (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose}>
            <div className="fixed top-0 right-0 h-full w-full max-w-2xl bg-[#F8F9FA] shadow-2xl animate-slide-in overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-[#1E2A38]">{client.name}</h2>
                        <p className="text-sm text-gray-500">{client.email}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200"><span className="material-symbols-outlined">close</span></button>
                </div>

                <div className="p-6">
                    {renderTabs()}
                    {activeTab === 'Perfil' && renderProfileTab()}
                    {activeTab === 'Financeiro' && renderFinancialTab()}
                    {activeTab === 'Relacionamento' && renderRelationshipTab()}
                    {activeTab === 'Histórico' && renderHistoryTab()}
                    {activeTab === 'Lembretes' && renderRemindersTab()}
                    {activeTab === 'Compliance' && renderComplianceTab()}
                </div>
            </div>
        </div>
    );
};

const NewReminderModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h3 className="font-semibold text-lg mb-4">Novo Lembrete</h3>
        <div className="space-y-4">
          <input type="text" placeholder="Título" className="input-style" />
          <select aria-label="Tipo de Lembrete" className="input-style">
            {Object.values(ReminderType).map(rt => <option key={rt} value={rt}>{rt}</option>)}
          </select>
          <input type="date" aria-label="Data do Lembrete" className="input-style" />
          <select aria-label="Recorrência" className="input-style">
            {Object.values(Recurrence).map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <textarea placeholder="Notas" className="input-style" />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300">Cancelar</button>
          <button onClick={onClose} className="py-2 px-4 bg-[#1E2A38] text-white rounded-md font-semibold hover:bg-opacity-90">Salvar</button>
        </div>
      </div>
    </div>
  );
}

export default ClientDetail;
