import React, { useState } from 'react';
import { Client, RiskProfile, ComplianceStatus } from '../../types';
import Modal from '../Modal';
import { MOCK_PARTNERS } from '../../constants';

interface NewClientFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClient: (client: Omit<Client, 'id' | 'lastActivity' | 'interactionHistory' | 'reminders'>) => void;
}

const NewClientForm: React.FC<NewClientFormProps> = ({ isOpen, onClose, onAddClient }) => {
  const [clientType, setClientType] = useState<'PF' | 'PJ'>('PF');
  const [activeTab, setActiveTab] = useState('info');

  // Estados para dados comuns
  const [commonData, setCommonData] = useState({
    name: '',
    email: '',
    phone: '',
    advisors: '',
    complianceStatus: ComplianceStatus.PENDENTE,
    walletValue: 0,
    partnerId: '', // Novo campo para ID do parceiro
  });

  const [addressData, setAddressData] = useState({
    street: '', number: '', complement: '', neighborhood: '', city: '', state: '', zipCode: '', country: '',
  });

  const [financialData, setFinancialData] = useState({
    investorProfile: RiskProfile.MODERADO,
    assetPreferences: '',
    financialNeeds: '',
  });

  // Estados específicos para PF
  const [pfData, setPfData] = useState({
    cpf: '',
    citizenship: '',
  });

  // Estados específicos para PJ
  const [pjData, setPjData] = useState({
    cnpj: '',
    sector: '',
    servicePreferences: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const baseClientData = {
      name: commonData.name,
      email: commonData.email,
      phone: commonData.phone,
      address: addressData,
      advisors: commonData.advisors.split(',').map(item => item.trim()),
      complianceStatus: commonData.complianceStatus,
      walletValue: commonData.walletValue,
      partnerId: commonData.partnerId || undefined,
      financialProfile: {
        investorProfile: financialData.investorProfile,
        assetPreferences: financialData.assetPreferences.split(',').map(item => item.trim()),
        financialNeeds: financialData.financialNeeds.split(',').map(item => item.trim()),
        meetingAgendaSuggestions: [],
      },
    };

    let clientData: Omit<Client, 'id' | 'lastActivity' | 'interactionHistory' | 'reminders'>;

    if (clientType === 'PF') {
      clientData = {
        ...baseClientData,
        type: 'PF',
        ...pfData,
      } as Omit<Client, 'id' | 'lastActivity' | 'interactionHistory' | 'reminders'>;
    } else {
      clientData = {
        ...baseClientData,
        type: 'PJ',
        ...pjData,
        partners: [], // Inicializando como arrays vazios
        contactPersons: [],
      } as Omit<Client, 'id' | 'lastActivity' | 'interactionHistory' | 'reminders'>;
    }

    onAddClient(clientData);
    onClose();
  };

  const renderTabs = () => (
    <div className="flex border-b mb-4">
      <button onClick={() => setActiveTab('info')} className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}>Informações</button>
      <button onClick={() => setActiveTab('address')} className={`tab-button ${activeTab === 'address' ? 'active' : ''}`}>Endereço</button>
      <button onClick={() => setActiveTab('financial')} className={`tab-button ${activeTab === 'financial' ? 'active' : ''}`}>Financeiro</button>
    </div>
  );

  const renderInfoTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="text" placeholder="Nome" value={commonData.name} onChange={e => setCommonData({ ...commonData, name: e.target.value })} className="input-style" />
      <select aria-label="Tipo de Cliente" value={clientType} onChange={e => setClientType(e.target.value as 'PF' | 'PJ')} className="input-style">
        <option value="PF">Pessoa Física</option>
        <option value="PJ">Pessoa Jurídica</option>
      </select>
      {clientType === 'PF' ? (
        <>
          <input type="text" placeholder="CPF" value={pfData.cpf} onChange={e => setPfData({ ...pfData, cpf: e.target.value })} className="input-style" />
          <input type="text" placeholder="Cidadania" value={pfData.citizenship} onChange={e => setPfData({ ...pfData, citizenship: e.target.value })} className="input-style" />
        </>
      ) : (
        <>
          <input type="text" placeholder="CNPJ" value={pjData.cnpj} onChange={e => setPjData({ ...pjData, cnpj: e.target.value })} className="input-style" />
          <input type="text" placeholder="Setor" value={pjData.sector} onChange={e => setPjData({ ...pjData, sector: e.target.value })} className="input-style" />
        </>
      )}
      <input type="email" placeholder="Email" value={commonData.email} onChange={e => setCommonData({ ...commonData, email: e.target.value })} className="input-style" />
      <input type="tel" placeholder="Telefone" value={commonData.phone} onChange={e => setCommonData({ ...commonData, phone: e.target.value })} className="input-style" />
      <select aria-label="Parceiro Indicador" value={commonData.partnerId} onChange={e => setCommonData({ ...commonData, partnerId: e.target.value })} className="input-style">
        <option value="">Nenhuma Indicação</option>
        {MOCK_PARTNERS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      <input type="text" placeholder="Assessores (separado por vírgula)" value={commonData.advisors} onChange={e => setCommonData({ ...commonData, advisors: e.target.value })} className="input-style md:col-span-2" />
    </div>
  );
  
  // renderAddressTab e renderFinancialTab permanecem similares, mas usando os novos estados
  const renderAddressTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="text" placeholder="Rua" value={addressData.street} onChange={e => setAddressData({ ...addressData, street: e.target.value })} className="input-style" />
      <input type="text" placeholder="Número" value={addressData.number} onChange={e => setAddressData({ ...addressData, number: e.target.value })} className="input-style" />
      <input type="text" placeholder="Bairro" value={addressData.neighborhood} onChange={e => setAddressData({ ...addressData, neighborhood: e.target.value })} className="input-style" />
      <input type="text" placeholder="Cidade" value={addressData.city} onChange={e => setAddressData({ ...addressData, city: e.target.value })} className="input-style" />
    </div>
  );

  const renderFinancialTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <select aria-label="Perfil de Risco" value={financialData.investorProfile} onChange={e => setFinancialData({ ...financialData, investorProfile: e.target.value as RiskProfile })} className="input-style">
        {Object.values(RiskProfile).map(rp => <option key={rp} value={rp}>{rp}</option>)}
      </select>
      <input type="number" placeholder="Valor em Carteira" value={commonData.walletValue} onChange={e => setCommonData({ ...commonData, walletValue: Number(e.target.value) })} className="input-style" />
      <input type="text" placeholder="Preferências de Ativos (separado por vírgula)" value={financialData.assetPreferences} onChange={e => setFinancialData({ ...financialData, assetPreferences: e.target.value })} className="input-style md:col-span-2" />
      {clientType === 'PJ' && <input type="text" placeholder="Preferências de Serviços (PJ)" value={pjData.servicePreferences} onChange={e => setPjData({ ...pjData, servicePreferences: e.target.value })} className="input-style md:col-span-2" />}
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Cliente">
      <style>{`
        .input-style { width: 100%; border-radius: 0.375rem; border: 1px solid #D1D5DB; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); padding: 0.5rem 0.75rem; }
        .tab-button { padding: 0.5rem 1rem; }
        .tab-button.active { border-bottom: 2px solid #1E2A38; font-weight: 600; }
      `}</style>
      <form onSubmit={handleSubmit}>
        {renderTabs()}
        <div className="p-1">
          {activeTab === 'info' && renderInfoTab()}
          {activeTab === 'address' && renderAddressTab()}
          {activeTab === 'financial' && renderFinancialTab()}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300">Cancelar</button>
          <button type="submit" className="py-2 px-4 bg-[#1E2A38] text-white rounded-md font-semibold hover:bg-opacity-90">Adicionar</button>
        </div>
      </form>
    </Modal>
  );
};

export default NewClientForm;
