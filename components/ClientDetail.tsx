import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Client, ComplianceStatus } from '../types';
import { RISK_COLORS, COMPLIANCE_COLORS } from '../constants';
import Card from './Card';
import Chip from './Chip';

const portfolioData = [
  { name: 'Renda Fixa', value: 400 },
  { name: 'Ações BR', value: 300 },
  { name: 'Ações EUA', value: 300 },
  { name: 'Fundos Imobiliários', value: 200 },
];
const COLORS = ['#1E2A38', '#0088FE', '#00C49F', '#FFBB28'];

export const ClientDetail: React.FC<{ client: Client, onClose: () => void, showSnackbar: (msg: string, type?:'success'|'error')=>void, initialTab?: string }> = ({ client, onClose, showSnackbar, initialTab = 'Perfil' }) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    return (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose}>
            <div className="fixed top-0 right-0 h-full w-full max-w-2xl bg-[#F8F9FA] shadow-2xl animate-slide-in" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b flex justify-between items-center bg-white">
                    <div>
                        <h2 className="text-xl font-bold text-[#1E2A38]">{client.name}</h2>
                        <p className="text-sm text-gray-500">{client.email}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200"><span className="material-symbols-outlined">close</span></button>
                </div>

                <div className="p-6">
                    <div className="border-b border-gray-200 mb-6">
                        <nav className="-mb-px flex space-x-6">
                            {['Perfil', 'Carteira', 'Compliance'].map(tab => (
                                <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === tab ? 'border-[#1E2A38] text-[#1E2A38]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {activeTab === 'Perfil' && 
                        <Card>
                            <div className="p-6">
                                <h3 className="font-semibold text-lg mb-4">Informações do Cliente</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Nome</p>
                                        <p className="font-medium text-gray-800">{client.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium text-gray-800">{client.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Telefone</p>
                                        <p className="font-medium text-gray-800">{client.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Documento</p>
                                        <p className="font-medium text-gray-800">{client.document}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Endereço</p>
                                        <p className="font-medium text-gray-800">{client.address}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Assessor</p>
                                        <p className="font-medium text-gray-800">{client.advisor}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    }
                    {activeTab === 'Carteira' && (
                        <Card>
                            <h3 className="font-semibold text-lg mb-4">Composição da Carteira</h3>
                             <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                <Pie data={portfolioData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name">
                                    {portfolioData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Card>
                    )}
                    {activeTab === 'Compliance' && (
                         <div>
                            <h3 className="font-semibold text-lg mb-4">Checklist de Documentos (KYC)</h3>
                            <Card>
                                <ul className="space-y-3">
                                    <li className="flex justify-between items-center p-2 rounded-md bg-green-50">Documento de Identidade <span className="text-green-700 font-medium">Válido</span></li>
                                    <li className="flex justify-between items-center p-2 rounded-md bg-green-50">Comprovante de Residência <span className="text-green-700 font-medium">Válido</span></li>
                                    <li className="flex justify-between items-center p-2 rounded-md bg-yellow-50">Declaração de Renda <span className="text-yellow-700 font-medium">Pendente</span></li>
                                </ul>
                                { client.complianceStatus !== ComplianceStatus.APROVADO &&
                                <div className="mt-6 flex gap-4">
                                    <button onClick={() => showSnackbar('Documentos aprovados com sucesso!')} className="flex-1 py-2 px-4 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700">Aprovar</button>
                                    <button onClick={() => showSnackbar('Documentos rejeitados.', 'error')} className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700">Rejeitar</button>
                                </div>
                                }
                            </Card>
                        </div>
                    )}
                </div>
            </div>
             <style>{`.animate-slide-in { animation: slideIn 0.3s ease-out forwards; } @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
        </div>
    );
};

export default ClientDetail;
