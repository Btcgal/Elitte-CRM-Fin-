import React from 'react';
import { MOCK_REPORTS, MOCK_CLIENTS } from '../constants';
import Card from '../components/Card';

const Reports: React.FC<{ showSnackbar: (msg: string, type?:'success'|'error')=>void }> = ({ showSnackbar }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Relatórios</h1>
        <div>
          <select className="rounded-md border-gray-300 shadow-sm mr-4">
            <option value="">Todos os Clientes</option>
            {MOCK_CLIENTS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button onClick={() => showSnackbar('Gerando relatório...')} className="flex items-center justify-center py-2 px-4 bg-[#1E2A38] text-white rounded-md font-semibold text-sm hover:bg-opacity-90 transition-all shadow-sm">
            <span className="material-symbols-outlined mr-2 text-base">add_chart</span>
            Gerar Relatório
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_REPORTS.map(report => (
          <Card key={report.id}>
            <div className="flex items-center text-[#1E2A38] mb-3">
                <span className="material-symbols-outlined text-3xl">picture_as_pdf</span>
                <div className="ml-3">
                    <h3 className="font-semibold">{report.type}</h3>
                    <p className="text-sm text-gray-500">{report.period}</p>
                </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Cliente: <span className="font-medium">{report.clientName}</span></p>
            <div className="w-full h-24 bg-gray-200 rounded-md flex items-center justify-center mb-4">
                <p className="text-xs text-gray-500">Preview Indisponível</p>
            </div>
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
          </Card>
        ))}
         {MOCK_REPORTS.length === 0 && (
            <div className="text-center py-12 col-span-full">
                <span className="material-symbols-outlined text-6xl text-gray-300">folder_off</span>
                <h3 className="mt-2 text-lg font-medium text-gray-800">Nenhum relatório encontrado</h3>
                <p className="mt-1 text-sm text-gray-500">Gere um novo relatório para começar.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
