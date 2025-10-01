import React, { useState, useMemo, useEffect } from 'react';
import { Client, ComplianceStatus, RiskProfile } from '../types';
import { MOCK_CLIENTS, RISK_COLORS, COMPLIANCE_COLORS } from '../constants';
import Card from '../components/Card';
import Chip from '../components/Chip';
import NewClientForm from '../components/forms/NewClientForm';
import ClientDetail from '../components/ClientDetail';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const ClientCard: React.FC<{ client: Client, onClick: () => void }> = ({ client, onClick }) => (
  <Card onClick={onClick} className="hover:border-[#1E2A38] border-transparent border-2">
    <div className="flex justify-between items-start">
      <div>
        <p className="font-bold text-lg text-[#1E2A38]">{client.name}</p>
        <p className="text-sm text-gray-500">{client.type === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'} - {client.document}</p>
      </div>
      <Chip label={client.complianceStatus} colorClasses={COMPLIANCE_COLORS[client.complianceStatus]} />
    </div>
    <div className="mt-4 flex justify-between items-end">
      <div>
        <p className="text-xs text-gray-500">Perfil de Risco</p>
        <Chip label={client.riskProfile} colorClasses={RISK_COLORS[client.riskProfile]} />
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-500">Score</p>
        <p className="font-semibold text-gray-800">{client.creditScore}</p>
      </div>
       <div className="text-right">
        <p className="text-xs text-gray-500">Valor em Carteira</p>
        <p className="font-semibold text-gray-800">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(client.walletValue)}</p>
      </div>
    </div>
  </Card>
);

const Clients: React.FC<{showSnackbar: (msg: string, type?:'success'|'error')=>void}> = ({showSnackbar}) => {
  const [clients, setClients] = useState<Client[]>(() => loadFromLocalStorage('clients', MOCK_CLIENTS));
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    risk: 'all',
    compliance: 'all',
    type: 'all',
  });

  useEffect(() => {
    saveToLocalStorage('clients', clients);
  }, [clients]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleAddClient = (client: Omit<Client, 'id' | 'lastActivity'>) => {
    const newClient: Client = {
      ...client,
      id: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
    };
    setClients(prev => [newClient, ...prev]);
    showSnackbar('Cliente adicionado com sucesso!');
  };

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const riskMatch = filters.risk === 'all' || client.riskProfile === filters.risk;
      const complianceMatch = filters.compliance === 'all' || client.complianceStatus === filters.compliance;
      const typeMatch = filters.type === 'all' || client.type === filters.type;
      return riskMatch && complianceMatch && typeMatch;
    });
  }, [filters, clients]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
        <button onClick={() => setIsNewClientModalOpen(true)} className="flex items-center justify-center py-2 px-4 bg-[#1E2A38] text-white rounded-md font-semibold text-sm hover:bg-opacity-90 transition-all shadow-sm">
          <span className="material-symbols-outlined mr-2 text-base">add</span>
          Novo Cliente
        </button>
      </div>
      
      <Card variant="outlined" className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          <h3 className="text-md font-semibold text-gray-700 col-span-1">Filtros:</h3>
          
          <div className="col-span-1">
            <label htmlFor="risk-filter" className="sr-only">Perfil de Risco</label>
            <select id="risk-filter" name="risk" value={filters.risk} onChange={handleFilterChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm">
              <option value="all">Todo Perfil de Risco</option>
              {Object.values(RiskProfile).map(rp => <option key={rp} value={rp}>{rp}</option>)}
            </select>
          </div>

          <div className="col-span-1">
            <label htmlFor="compliance-filter" className="sr-only">Status de Compliance</label>
            <select id="compliance-filter" name="compliance" value={filters.compliance} onChange={handleFilterChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm">
              <option value="all">Todo Status Compliance</option>
              {Object.values(ComplianceStatus).map(cs => <option key={cs} value={cs}>{cs}</option>)}
            </select>
          </div>

          <div className="col-span-1">
            <label htmlFor="type-filter" className="sr-only">Tipo de Cliente</label>
            <select id="type-filter" name="type" value={filters.type} onChange={handleFilterChange} className="w-full rounded-md border-ray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm">
              <option value="all">Todo Tipo de Cliente</option>
              <option value="PF">Pessoa Física</option>
              <option value="PJ">Pessoa Jurídica</option>
            </select>
          </div>
        </div>
      </Card>
      
      {filteredClients.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClients.map(client => (
            <ClientCard key={client.id} client={client} onClick={() => setSelectedClient(client)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-gray-300">search_off</span>
            <h3 className="mt-2 text-lg font-medium text-gray-800">Nenhum cliente encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">Tente ajustar seus filtros para encontrar o que procura.</p>
        </div>
      )}
      
      {selectedClient && <ClientDetail client={selectedClient} onClose={() => setSelectedClient(null)} showSnackbar={showSnackbar} />}
      <NewClientForm isOpen={isNewClientModalOpen} onClose={() => setIsNewClientModalOpen(false)} onAddClient={handleAddClient} />
    </div>
  );
};

export default Clients;