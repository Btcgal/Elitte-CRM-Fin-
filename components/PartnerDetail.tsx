import React from 'react';
import { CommercialPartner } from '../types';
import Card from './Card';

interface PartnerDetailProps {
  partner: CommercialPartner;
  onClose: () => void;
}

const InfoItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value || '-'}</p>
  </div>
);

const PartnerDetail: React.FC<PartnerDetailProps> = ({ partner, onClose }) => {
  // Mock do extrato de comissão
  const mockStatement = {
    month: "Outubro 2025",
    totalRevenue: 15000,
    commissionCalculated: 3000,
    clientsBreakdown: [
      { clientId: '1', clientName: 'Investimentos Alfa Ltda', revenueGenerated: 10000, commission: 2000 },
      { clientId: '2', clientName: 'Maria Joaquina', revenueGenerated: 5000, commission: 1000 },
    ]
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose}>
      <div className="fixed top-0 right-0 h-full w-full max-w-3xl bg-[#F8F9FA] shadow-2xl animate-slide-in overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-[#1E2A38]">{partner.name}</h2>
            <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">{partner.website}</a>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200"><span className="material-symbols-outlined">close</span></button>
        </div>

        <div className="p-6 space-y-6">
          {/* Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card><div className="p-4 text-center"><h4 className="font-semibold text-2xl">{partner.indicatedClientsCount}</h4><p className="text-sm text-gray-500">Clientes Indicados</p></div></Card>
            <Card><div className="p-4 text-center"><h4 className="font-semibold text-2xl">{partner.totalVolume.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4><p className="text-sm text-gray-500">Volume Total</p></div></Card>
            <Card><div className="p-4 text-center"><h4 className="font-semibold text-2xl">{partner.contract.commissionValue}%</h4><p className="text-sm text-gray-500">Comissão</p></div></Card>
          </div>

          {/* Detalhes do Parceiro */}
          <Card>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">Informações do Parceiro</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem label="Telefone" value={partner.phone} />
                <InfoItem label="Responsável" value={partner.responsiblePersons[0].name} />
                <InfoItem label="Contrato" value={`${partner.contract.type} (Início: ${new Date(partner.contract.startDate).toLocaleDateString('pt-BR')})`} />
              </div>
            </div>
          </Card>

          {/* Extrato de Comissão */}
          <Card>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">Extrato de Comissão - {mockStatement.month}</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Cliente</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Receita Gerada</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Comissão</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockStatement.clientsBreakdown.map(item => (
                      <tr key={item.clientId}>
                        <td className="py-3 px-3">{item.clientName}</td>
                        <td className="py-3 px-3">{item.revenueGenerated.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                        <td className="py-3 px-3">{item.commission.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-100">
                    <tr>
                      <td className="py-3 px-3 font-bold">Total</td>
                      <td className="py-3 px-3 font-bold">{mockStatement.totalRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                      <td className="py-3 px-3 font-bold">{mockStatement.commissionCalculated.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetail;
