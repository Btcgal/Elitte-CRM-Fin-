import React, { useState, useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts';
import Card from '../components/Card';
import { ActivityType } from '../types';
import { MOCK_ACTIVITIES } from '../constants';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const ResponsiveGridLayout = WidthProvider(Responsive);

// --- Componentes Individuais do Dashboard ---

const KpiCard = ({ title, value, icon, color }: { title: string, value: string, icon: string, color: string }) => (
  <Card className="h-full flex flex-col justify-center">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className={`p-2 rounded-full ${color}`}><span className="material-symbols-outlined text-white">{icon}</span></div>
    </div>
    <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
  </Card>
);

const MainChart = () => {
  const chartData = [
    { name: 'Jan', aplicacoes: 4000, resgates: 2400 }, { name: 'Fev', aplicacoes: 3000, resgates: 1398 },
    { name: 'Mar', aplicacoes: 2000, resgates: 9800 }, { name: 'Abr', aplicacoes: 2780, resgates: 3908 },
  ];
  return (
    <Card className="h-full flex flex-col">
      <h3 className="font-semibold text-gray-800 mb-4 p-4">Aplicações vs. Resgates</h3>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="aplicacoes" fill="#1E2A38" name="Aplicações" />
            <Bar dataKey="resgates" fill="#E74C3C" name="Resgates" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

const AdvisorRanking = () => {
  const ranking = useMemo(() => {
    const counts = MOCK_ACTIVITIES.reduce((acc, act) => {
      if (act.type === ActivityType.REUNIAO || act.type === ActivityType.LIGACAO) {
        acc[act.assessor] = (acc[act.assessor] || 0) + 1;
      }
      return acc;
    }, {} as { [key: string]: number });
    return Object.entries(counts).sort(([, a], [, b]) => b - a).slice(0, 3);
  }, []);

  return (
    <Card className="h-full">
      <h3 className="font-semibold text-gray-800 mb-4 p-4">Ranking de Assessores</h3>
      <ul className="space-y-3 px-4">
        {ranking.map(([name, count], i) => (
          <li key={name} className="flex items-center justify-between">
            <span className="font-medium text-gray-700">{i + 1}. {name}</span>
            <span className="font-bold text-gray-800">{count} atividades</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

// --- Componente Principal do Dashboard ---

const defaultLayouts = {
  lg: [
    { i: 'kpi-receita', x: 0, y: 0, w: 1, h: 1 },
    { i: 'kpi-conversao', x: 1, y: 0, w: 1, h: 1 },
    { i: 'kpi-inadimplencia', x: 2, y: 0, w: 1, h: 1 },
    { i: 'kpi-kyc', x: 3, y: 0, w: 1, h: 1 },
    { i: 'main-chart', x: 0, y: 1, w: 3, h: 2 },
    { i: 'ranking', x: 3, y: 1, w: 1, h: 2 },
  ],
};

const Dashboard: React.FC = () => {
  const { showSnackbar } = useAppContext();
  const [isEditMode, setIsEditMode] = useState(false);
  const [layouts, setLayouts] = useState(() => loadFromLocalStorage('dashboardLayouts', defaultLayouts));

  const onLayoutChange = (_: any, newLayouts: any) => {
    saveToLocalStorage('dashboardLayouts', newLayouts);
    setLayouts(newLayouts);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button onClick={() => setIsEditMode(!isEditMode)} className={`py-2 px-4 rounded-md font-semibold text-sm ${isEditMode ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
          {isEditMode ? 'Salvar Layout' : 'Personalizar'}
        </button>
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 4, md: 3, sm: 2, xs: 1, xxs: 1 }}
        rowHeight={150}
        onLayoutChange={onLayoutChange}
        isDraggable={isEditMode}
        isResizable={isEditMode}
      >
        <div key="kpi-receita"><KpiCard title="Receita Projetada (30d)" value="R$ 1.2M" icon="trending_up" color="bg-blue-500" /></div>
        <div key="kpi-conversao"><KpiCard title="Conversão Pipeline" value="28%" icon="percent" color="bg-orange-500" /></div>
        <div key="kpi-inadimplencia"><KpiCard title="Inadimplência" value="R$ 45k" icon="money_off" color="bg-red-500" /></div>
        <div key="kpi-kyc"><KpiCard title="Pendências KYC" value="12" icon="shield_question" color="bg-yellow-500" /></div>
        <div key="main-chart"><MainChart /></div>
        <div key="ranking"><AdvisorRanking /></div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
