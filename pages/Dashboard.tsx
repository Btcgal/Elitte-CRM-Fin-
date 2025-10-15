import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts';
import Card from '../components/Card';
import NewOpportunityForm from '../components/forms/NewOpportunityForm';
import { Opportunity, ActivityType } from '../types';
import { MOCK_OPPORTUNITIES, MOCK_ACTIVITIES } from '../constants';

interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: string;
  color: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, changeType, icon, color }) => (
  <Card className="flex flex-col">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className={`p-2 rounded-full ${color}`}>
        <span className="material-symbols-outlined text-white">{icon}</span>
      </div>
    </div>
    <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
    {change && (
      <div className="flex items-center text-xs text-gray-500 mt-1">
        <span className={`material-symbols-outlined text-sm ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
          {changeType === 'increase' ? 'arrow_upward' : 'arrow_downward'}
        </span>
        <span className={`font-semibold ml-1 ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
        <span className="ml-1">vs mês anterior</span>
      </div>
    )}
  </Card>
);

const chartData = [
  { name: 'Jan', aplicacoes: 4000, resgates: 2400, meta: 3000 },
  { name: 'Fev', aplicacoes: 3000, resgates: 1398, meta: 3000 },
  { name: 'Mar', aplicacoes: 2000, resgates: 9800, meta: 3000 },
  { name: 'Abr', aplicacoes: 2780, resgates: 3908, meta: 3000 },
  { name: 'Mai', aplicacoes: 1890, resgates: 4800, meta: 3000 },
  { name: 'Jun', aplicacoes: 2390, resgates: 3800, meta: 3000 },
  { name: 'Jul', aplicacoes: 3490, resgates: 4300, meta: 3000 },
];

const Dashboard: React.FC<{ showSnackbar: (msg: string, type?:'success'|'error')=>void }> = ({ showSnackbar }) => {
  const [isNewOpportunityModalOpen, setIsNewOpportunityModalOpen] = useState(false);

  const handleAddOpportunity = (opportunity: Omit<Opportunity, 'id'>) => {
    const newOpportunity: Opportunity = {
      ...opportunity,
      id: new Date().toISOString(),
    };
    MOCK_OPPORTUNITIES.unshift(newOpportunity);
    showSnackbar('Oportunidade adicionada com sucesso!');
  };

  const advisorRanking = useMemo(() => {
    const activitiesCount = MOCK_ACTIVITIES.reduce((acc, activity) => {
      if (activity.type === ActivityType.REUNIAO || activity.type === ActivityType.LIGACAO) {
        acc[activity.assessor] = (acc[activity.assessor] || 0) + 1;
      }
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(activitiesCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3); // Top 3
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Receita Projetada (30d)" value="R$ 1.2M" change="5.2%" changeType="increase" icon="trending_up" color="bg-blue-500" />
        <KpiCard title="Conversão Pipeline" value="28%" change="1.5%" changeType="decrease" icon="percent" color="bg-orange-500" />
        <KpiCard title="Inadimplência" value="R$ 45k" change="3.0%" changeType="increase" icon="money_off" color="bg-red-500" />
        <KpiCard title="Pendências KYC" value="12" icon="shield_question" color="bg-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="font-semibold text-gray-800 mb-4">Aplicações vs. Resgates (Mensal)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} dy={10} />
              <YAxis tickLine={false} axisLine={false} dx={-10} />
              <Tooltip />
              <Legend wrapperStyle={{paddingTop: '20px'}} />
              <Bar dataKey="aplicacoes" fill="#1E2A38" name="Aplicações" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resgates" fill="#E74C3C" name="Resgates" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="meta" stroke="#2ECC71" strokeWidth={2} name="Meta" dot={false} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold text-gray-800 mb-4">Ranking de Assessores (Atividades)</h3>
            <ul className="space-y-3">
              {advisorRanking.map(([name, count], index) => (
                <li key={name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`font-bold text-lg ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-orange-400'}`}>{index + 1}º</span>
                    <span className="ml-3 font-medium text-gray-700">{name}</span>
                  </div>
                  <span className="font-bold text-gray-800">{count}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="font-semibold text-gray-800 mb-4">Alertas e Ações Rápidas</h3>
            <div className="space-y-3">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start">
                <span className="material-symbols-outlined text-yellow-600 mr-3 mt-1">error</span>
                <div>
                  <p className="font-semibold text-sm text-yellow-800">KYC Atrasado</p>
                  <p className="text-xs text-yellow-700">Cliente João da Silva há 17 dias.</p>
                  <Link to="/clients" className="text-xs font-bold text-yellow-800 hover:underline mt-1">Ver Cliente</Link>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start">
                <span className="material-symbols-outlined text-red-600 mr-3 mt-1">dangerous</span>
                <div>
                  <p className="font-semibold text-sm text-red-800">Aprovação Necessária</p>
                  <p className="text-xs text-red-700">Transação de R$ 75.000,00 para Tech Solutions S.A.</p>
                  <Link to="/compliance" className="text-xs font-bold text-red-800 hover:underline mt-1">Aprovar/Rejeitar</Link>
                </div>
              </div>
               <div className="mt-4 pt-4 border-t space-y-2">
                   <button onClick={() => setIsNewOpportunityModalOpen(true)} className="w-full flex items-center justify-center py-2 px-4 bg-[#1E2A38] text-white rounded-md font-semibold text-sm hover:bg-opacity-90 transition-all">
                       <span className="material-symbols-outlined mr-2 text-base">add_circle</span>
                       Nova Oportunidade
                   </button>
                   <button onClick={() => showSnackbar('Gerando relatório...')} className="w-full flex items-center justify-center py-2 px-4 bg-gray-200 text-gray-800 rounded-md font-semibold text-sm hover:bg-gray-300 transition-all">
                       <span className="material-symbols-outlined mr-2 text-base">summarize</span>
                       Gerar Relatório Rápido
                   </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <NewOpportunityForm isOpen={isNewOpportunityModalOpen} onClose={() => setIsNewOpportunityModalOpen(false)} onAddOpportunity={handleAddOpportunity} />
    </div>
  );
};

export default Dashboard;
