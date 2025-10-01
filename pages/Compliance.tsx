import React, { useState } from 'react';
import Card from '../components/Card';
import { MOCK_CLIENTS, MOCK_TRANSACTIONS } from '../constants';
import { Client, ComplianceStatus, TransactionStatus, RiskProfile } from '../types';
import ClientDetail from '../components/ClientDetail';

const Compliance: React.FC<{ showSnackbar: (msg: string, type?: 'success' | 'error') => void }> = ({ showSnackbar }) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [initialTab, setInitialTab] = useState('Perfil');

  const handleOpenClientDetail = (client: Client, tab: string) => {
    setSelectedClient(client);
    setInitialTab(tab);
  };

  const pendingDocsClients = MOCK_CLIENTS.filter(c => c.complianceStatus === ComplianceStatus.PENDENTE || c.complianceStatus === ComplianceStatus.ATRASADO);
  const highRiskClients = MOCK_CLIENTS.filter(c => c.riskProfile === RiskProfile.AGRESSIVO || c.riskProfile === RiskProfile.ARROJADO);
  const pendingTransactions = MOCK_TRANSACTIONS.filter(t => t.status === TransactionStatus.REQUER_APROVACAO && t.value > 50000);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Painel de Compliance</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <Card>
          <h3 className="font-semibold text-gray-800 mb-4">Documentos Vencidos/Pendentes</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {pendingDocsClients.length > 0 ? pendingDocsClients.map(client => (
              <div key={client.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm text-gray-900">{client.name}</p>
                  <p className={`text-xs font-bold ${client.complianceStatus === ComplianceStatus.ATRASADO ? 'text-red-600' : 'text-yellow-600'}`}>{client.complianceStatus}</p>
                </div>
                <button onClick={() => handleOpenClientDetail(client, 'Compliance')} className="text-blue-600 hover:underline text-sm font-medium">Analisar</button>
              </div>
            )) : <p className="text-sm text-gray-500">Nenhuma pendência.</p>}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-800 mb-4">Clientes PEP / Alto Risco</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {highRiskClients.length > 0 ? highRiskClients.map(client => (
              <div key={client.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                 <div>
                  <p className="font-medium text-sm text-gray-900">{client.name}</p>
                  <p className="text-xs font-bold text-orange-600">{client.riskProfile}</p>
                </div>
                <button onClick={() => handleOpenClientDetail(client, 'Perfil')} className="text-blue-600 hover:underline text-sm font-medium">Ver Detalhes</button>
              </div>
            )) : <p className="text-sm text-gray-500">Nenhum cliente de alto risco.</p>}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-800 mb-4">Transações Pendentes &gt; R$50k</h3>
           <div className="space-y-3 max-h-96 overflow-y-auto">
            {pendingTransactions.length > 0 ? pendingTransactions.map(tx => (
              <div key={tx.id} className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-medium text-sm text-gray-900">{tx.clientName}</p>
                        <p className="text-sm font-bold text-yellow-800">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(tx.value)}</p>
                    </div>
                    <span className="text-xs text-yellow-700">{tx.type}</span>
                </div>
                <div className="mt-3 flex gap-2">
                    <button onClick={() => showSnackbar('Transação aprovada!')} className="flex-1 text-xs font-bold py-1 px-2 bg-green-500 text-white rounded hover:bg-green-600">Aprovar</button>
                    <button onClick={() => showSnackbar('Transação rejeitada!', 'error')} className="flex-1 text-xs font-bold py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600">Rejeitar</button>
                </div>
              </div>
            )) : <p className="text-sm text-gray-500">Nenhuma transação pendente.</p>}
          </div>
        </Card>
      </div>
       <Card>
            <h3 className="font-semibold text-gray-800 mb-4">Log de Auditoria Recente</h3>
            <table className="w-full min-w-[600px] text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Usuário</th>
                        <th scope="col" className="px-6 py-3">Ação</th>
                        <th scope="col" className="px-6 py-3">Data</th>
                        <th scope="col" className="px-6 py-3">Detalhes</th>
                    </tr>
                </thead>
                <tbody>
                    {MOCK_AUDIT_LOGS.map(log => (
                        <tr key={log.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{log.user}</td>
                            <td className="px-6 py-4">{log.action}</td>
                            <td className="px-6 py-4">{new Date(log.date).toLocaleString('pt-BR')}</td>
                            <td className="px-6 py-4">{log.details}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
        {selectedClient && <ClientDetail client={selectedClient} onClose={() => setSelectedClient(null)} showSnackbar={showSnackbar} initialTab={initialTab} />}
    </div>
  );
};

export default Compliance;
