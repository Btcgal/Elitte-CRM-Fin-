import React, { useState } from 'react';
import { CommercialPartner, CommissionType } from '../../types';
import Modal from '../Modal';

interface NewPartnerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPartner: (partner: Omit<CommercialPartner, 'id' | 'indicatedClientsCount' | 'totalVolume' | 'commissionHistory'>) => void;
}

const NewPartnerForm: React.FC<NewPartnerFormProps> = ({ isOpen, onClose, onAddPartner }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  // ... outros estados para endereço, responsáveis, contrato, etc.

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para construir o objeto partner e chamar onAddPartner
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Parceiro Comercial">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Nome do Parceiro" value={name} onChange={e => setName(e.target.value)} className="input-style" />
          <input type="tel" placeholder="Telefone" value={phone} onChange={e => setPhone(e.target.value)} className="input-style" />
          <input type="url" placeholder="Website" value={website} onChange={e => setWebsite(e.target.value)} className="input-style md:col-span-2" />
          
          {/* Seção de Contrato */}
          <h3 className="text-lg font-semibold text-gray-700 md:col-span-2 mt-4">Detalhes do Contrato</h3>
          <input type="text" placeholder="Tipo de Contrato" className="input-style" />
          <input type="date" aria-label="Data de Início" className="input-style" />
          <select aria-label="Tipo de Comissão" className="input-style">
            {Object.values(CommissionType).map(ct => <option key={ct} value={ct}>{ct}</option>)}
          </select>
          <input type="number" placeholder="Valor da Comissão (%)" className="input-style" />
          <div>
            <label htmlFor="contract-upload" className="block text-sm font-medium text-gray-700 mb-1">Documento do Contrato</label>
            <input id="contract-upload" type="file" className="input-style" />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300">Cancelar</button>
          <button type="submit" className="py-2 px-4 bg-[#1E2A38] text-white rounded-md font-semibold hover:bg-opacity-90">Adicionar</button>
        </div>
      </form>
    </Modal>
  );
};

export default NewPartnerForm;
