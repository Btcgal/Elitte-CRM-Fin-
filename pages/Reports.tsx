import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOCK_REPORTS, MOCK_CLIENTS, MOCK_TRANSACTIONS, MOCK_ACTIVITIES } from '../constants';
import Card from '../components/Card';
import { Client, RiskProfile, ProductType, ActivityType } from '../types';
import { useAppContext } from '../contexts/AppContext';

const Reports: React.FC = () => {
  const { showSnackbar } = useAppContext();
  const [riskProfileFilter, setRiskProfileFilter] = useState<RiskProfile | 'todos'>('todos');
  const [assetFilter, setAssetFilter] = useState('');
  const [productTypeFilter, setProductTypeFilter] = useState<ProductType | 'todos'>('todos');
  const [advisorFilter, setAdvisorFilter] = useState('todos');
  const [activityAdvisorFilter, setActivityAdvisorFilter] = useState('todos');

  const filteredClients = useMemo(() => {
    return MOCK_CLIENTS.filter(client => {
      const riskProfileMatch = riskProfileFilter === 'todos' || client.financialProfile.investorProfile === riskProfileFilter;
      const assetMatch = assetFilter === '' || client.financialProfile.assetPreferences.some(pref => pref.toLowerCase().includes(assetFilter.toLowerCase()));
      return riskProfileMatch && assetMatch;
    });
  }, [riskProfileFilter, assetFilter]);

  const assetReportData = useMemo(() => {
    const filteredTransactions = MOCK_TRANSACTIONS.filter(tx => {
      const productMatch = productTypeFilter === 'todos' || tx.product.type === productTypeFilter;
      // A lógica de filtro por assessor precisaria que a transação tivesse essa informação.
      // Por enquanto, vamos simular que todas as transações pertencem a todos os assessores.
      return productMatch;
    });

    // Agrupa por cliente
    const byClient = filteredTransactions.reduce((acc, tx) => {
      acc[tx.clientName] = (acc[tx.clientName] || 0) + tx.value;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(byClient).map(([clientName, totalValue]) => ({ clientName, totalValue }));
  }, [productTypeFilter, advisorFilter]);

  const activityReportData = useMemo(() => {
    const filteredActivities = MOCK_ACTIVITIES.filter(act => {
      const advisorMatch = activityAdvisorFilter === 'todos' || act.assessor === activityAdvisorFilter;
      // Aqui poderia haver um filtro de período (semanal, mensal, etc.)
      return advisorMatch && (act.type === ActivityType.REUNIAO || act.type === ActivityType.LIGACAO);
    });

    const byAssessor = filteredActivities.reduce((acc, act) => {
      if (!acc[act.assessor]) {
        acc[act.assessor] = { name: act.assessor, reuniões: 0, ligações: 0 };
      }
      if (act.type === ActivityType.REUNIAO) acc[act.assessor].reuniões++;
      if (act.type === ActivityType.LIGACAO) acc[act.assessor].ligações++;
      return acc;
    }, {} as { [key: string]: { name: string; reuniões: number; ligações: number } });

    return Object.values(byAssessor);
  }, [activityAdvisorFilter]);

  const uniqueAdvisors = useMemo(() => {
    const advisors = new Set<string>();
    MOCK_CLIENTS.forEach(c => c.advisors.forEach(a => advisors.add(a)));
    return Array.from(advisors);
  }, []);

  return (
    <div className="space-y-8">
      {/* Seção de Relatórios de Perfil */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Relatório de Perfil de Cliente</h2>
        <Card>
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex-1">
                <label htmlFor="riskProfile" className="block text-sm font-medium text-gray-700 mb-1">Perfil de Risco</label>
                <select id="riskProfile" value={riskProfileFilter} onChange={e => setRiskProfileFilter(e.target.value as RiskProfile | 'todos')} className="w-full rounded-md border-gray-300 shadow-sm">
                  <option value="todos">Todos</option>
                  {Object.values(RiskProfile).map(rp => <option key={rp} value={rp}>{rp}</option>)}
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="assetPreference" className="block text-sm font-medium text-gray-700 mb-1">Preferência de Ativo</label>
                <input id="assetPreference" type="text" placeholder="Ex: Ações BR" value={assetFilter} onChange={e => setAssetFilter(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Perfil</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferências</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredClients.map(client => (
                    <tr key={client.id}>
                      <td className="py-4 px-4 whitespace-nowrap">{client.name}</td>
                      <td className="py-4 px-4 whitespace-nowrap">{client.financialProfile.investorProfile}</td>
                      <td className="py-4 px-4 whitespace-nowrap">{client.financialProfile.assetPreferences.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>

      {/* Seção de Relatório de Ativos */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Relatório de Ativos</h2>
        <Card>
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex-1">
                <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Produto</label>
                <select id="productType" value={productTypeFilter} onChange={e => setProductTypeFilter(e.target.value as ProductType | 'todos')} className="w-full rounded-md border-gray-300 shadow-sm">
                  <option value="todos">Todos</option>
                  {Object.values(ProductType).map(pt => <option key={pt} value={pt}>{pt}</option>)}
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="advisor" className="block text-sm font-medium text-gray-700 mb-1">Assessor</label>
                <select id="advisor" value={advisorFilter} onChange={e => setAdvisorFilter(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm">
                  <option value="todos">Todos</option>
                  {uniqueAdvisors.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Alocado no Ativo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {assetReportData.map(item => (
                    <tr key={item.clientName}>
                      <td className="py-4 px-4 whitespace-nowrap">{item.clientName}</td>
                      <td className="py-4 px-4 whitespace-nowrap">{item.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>

      {/* Seção de Relatório de Atividades */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Relatório de Atividades</h2>
        <Card>
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1">
                <label htmlFor="activityAdvisor" className="block text-sm font-medium text-gray-700 mb-1">Assessor</label>
                <select id="activityAdvisor" value={activityAdvisorFilter} onChange={e => setActivityAdvisorFilter(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm">
                  <option value="todos">Todos</option>
                  {uniqueAdvisors.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              {/* Adicionar filtro de período aqui no futuro */}
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityReportData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="reuniões" fill="#1E2A38" name="Reuniões" />
                <Bar dataKey="ligações" fill="#0088FE" name="Ligações" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Seção de Relatórios Gerados */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Relatórios Gerados</h2>
          <button onClick={() => showSnackbar('Gerando relatório...')} className="flex items-center justify-center py-2 px-4 bg-[#1E2A38] text-white rounded-md font-semibold text-sm hover:bg-opacity-90 transition-all shadow-sm">
            <span className="material-symbols-outlined mr-2 text-base">add_chart</span>
            Gerar Novo Relatório
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_REPORTS.map(report => (
            <Card key={report.id}>
              <div className="p-4">
                <div className="flex items-center text-[#1E2A38] mb-3">
                  <span className="material-symbols-outlined text-3xl">picture_as_pdf</span>
                  <div className="ml-3">
                      <h3 className="font-semibold">{report.type}</h3>
                      <p className="text-sm text-gray-500">{report.period}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">Cliente: <span className="font-medium">{report.clientName}</span></p>
                <div className="flex space-x-2">
                    <button onClick={() => showSnackbar('Baixando PDF...')} className="flex-1 flex items-center justify-center py-1.5 px-3 bg-gray-200 text-gray-800 rounded-md font-semibold text-xs hover:bg-gray-300 transition-all">
                        <span className="material-symbols-outlined mr-1.5 text-sm">download</span>
                        PDF
                    </button>
                    <button onClick={() => showSnackbar('Baixando CSV...')} className="flex-1 flex items-center justify-center py-1.5 px-3 bg-gray-200 text-gray-800 rounded-md font-semibold text-xs hover:bg-gray-300 transition-all">
                        <span className="material-symbols-outlined mr-1.5 text-sm">grid_on</span>
                        CSV
                    </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
