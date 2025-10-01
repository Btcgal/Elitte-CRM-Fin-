import React, { useState } from 'react';
import { Opportunity, OpportunityStage } from '../../types';
import Modal from '../Modal';

interface NewOpportunityFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddOpportunity: (opportunity: Omit<Opportunity, 'id'>) => void;
}

const NewOpportunityForm: React.FC<NewOpportunityFormProps> = ({ isOpen, onClose, onAddOpportunity }) => {
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [estimatedValue, setEstimatedValue] = useState(0);
  const [stage, setStage] = useState<OpportunityStage>(OpportunityStage.PROSPECT);
  const [probability, setProbability] = useState(0);
  const [expectedCloseDate, setExpectedCloseDate] = useState('');
  const [responsible, setResponsible] = useState('');
  const [nextAction, setNextAction] = useState('');
  const [source, setSource] = useState('');
  const [clientId, setClientId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddOpportunity({
      title,
      clientName,
      estimatedValue,
      stage,
      probability,
      expectedCloseDate,
      responsible,
      nextAction,
      source,
      clientId,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova Oportunidade">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
          <input type="text" placeholder="Cliente" value={clientName} onChange={e => setClientName(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
          <input type="number" placeholder="Valor Estimado" value={estimatedValue} onChange={e => setEstimatedValue(Number(e.target.value))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
          <select value={stage} onChange={e => setStage(e.target.value as OpportunityStage)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm">
            {Object.values(OpportunityStage).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <input type="number" placeholder="Probabilidade (%)" value={probability} onChange={e => setProbability(Number(e.target.value))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
          <input type="date" placeholder="Data de Fechamento" value={expectedCloseDate} onChange={e => setExpectedCloseDate(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
          <input type="text" placeholder="Responsável" value={responsible} onChange={e => setResponsible(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
          <input type="text" placeholder="Próxima Ação" value={nextAction} onChange={e => setNextAction(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
          <input type="text" placeholder="Fonte" value={source} onChange={e => setSource(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
          <input type="text" placeholder="ID do Cliente" value={clientId} onChange={e => setClientId(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300">Cancelar</button>
          <button type="submit" className="py-2 px-4 bg-[#1E2A38] text-white rounded-md font-semibold hover:bg-opacity-90">Adicionar</button>
        </div>
      </form>
    </Modal>
  );
};

export default NewOpportunityForm;
