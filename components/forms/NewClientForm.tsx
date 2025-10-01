import React, { useState } from 'react';
import { Client, RiskProfile, ComplianceStatus } from '../../types';
import Modal from '../Modal';

interface NewClientFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClient: (client: Omit<Client, 'id' | 'lastActivity'>) => void;
}

const NewClientForm: React.FC<NewClientFormProps> = ({ isOpen, onClose, onAddClient }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [document, setDocument] = useState('');
  const [type, setType] = useState<'PF' | 'PJ'>('PF');
  const [riskProfile, setRiskProfile] = useState<RiskProfile>(RiskProfile.MODERADO);
  const [complianceStatus, setComplianceStatus] = useState<ComplianceStatus>(ComplianceStatus.PENDENTE);
  const [creditScore, setCreditScore] = useState(0);
  const [walletValue, setWalletValue] = useState(0);
  const [address, setAddress] = useState('');
  const [advisor, setAdvisor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddClient({
      name,
      email,
      phone,
      document,
      type,
      riskProfile,
      complianceStatus,
      creditScore,
      walletValue,
      address,
      advisor,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Cliente">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
          <input type="tel" placeholder="Telefone" value={phone} onChange={e => setPhone(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
          <input type="text" placeholder="Documento" value={document} onChange={e => setDocument(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
          <select value={type} onChange={e => setType(e.target.value as 'PF' | 'PJ')} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm">
            <option value="PF">Pessoa Física</option>
            <option value="PJ">Pessoa Jurídica</option>
          </select>
          <select value={riskProfile} onChange={e => setRiskProfile(e.target.value as RiskProfile)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm">
            {Object.values(RiskProfile).map(rp => <option key={rp} value={rp}>{rp}</option>)}
          </select>
          <select value={complianceStatus} onChange={e => setComplianceStatus(e.target.value as ComplianceStatus)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm">
            {Object.values(ComplianceStatus).map(cs => <option key={cs} value={cs}>{cs}</option>)}
          </select>
          <input type="number" placeholder="Credit Score" value={creditScore} onChange={e => setCreditScore(Number(e.target.value))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
          <input type="number" placeholder="Valor em Carteira" value={walletValue} onChange={e => setWalletValue(Number(e.target.value))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
          <input type="text" placeholder="Endereço" value={address} onChange={e => setAddress(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
          <input type="text" placeholder="Assessor" value={advisor} onChange={e => setAdvisor(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300">Cancelar</button>
          <button type="submit" className="py-2 px-4 bg-[#1E2A38] text-white rounded-md font-semibold hover:bg-opacity-90">Adicionar</button>
        </div>
      </form>
    </Modal>
  );
};

export default NewClientForm;
