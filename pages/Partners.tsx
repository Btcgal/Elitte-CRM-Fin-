import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { MOCK_PARTNERS } from '../constants';
import Card from '../components/Card';
import NewPartnerForm from '../components/forms/NewPartnerForm';
import PartnerDetail from '../components/PartnerDetail';
import { CommercialPartner } from '../types';

const Partners: React.FC = () => {
  const { showSnackbar } = useAppContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<CommercialPartner | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Parceiros Comerciais</h1>
        <button onClick={() => setIsFormOpen(true)} className="flex items-center justify-center py-2 px-4 bg-[#1E2A38] text-white rounded-md font-semibold text-sm hover:bg-opacity-90 transition-all shadow-sm">
          <span className="material-symbols-outlined mr-2 text-base">add</span>
          Novo Parceiro
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PARTNERS.map(partner => (
          <Card key={partner.id} onClick={() => setSelectedPartner(partner)} className="cursor-pointer hover:shadow-lg transition-shadow">
            <div className="p-5">
              <h3 className="font-bold text-lg text-[#1E2A38]">{partner.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{partner.contract.type}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Clientes: <strong>{partner.indicatedClientsCount}</strong></span>
                <span className="text-gray-600">Volume: <strong>{partner.totalVolume.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <NewPartnerForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onAddPartner={(partner) => {
          console.log('Novo parceiro:', partner);
          // Aqui adicionaremos a lógica para adicionar o parceiro à lista
        }}
      />

      {selectedPartner && (
        <PartnerDetail 
          partner={selectedPartner}
          onClose={() => setSelectedPartner(null)}
        />
      )}
    </div>
  );
};

export default Partners;
