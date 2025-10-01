import React, { useState } from 'react';
import { Transaction, TransactionType, TransactionStatus } from '../../types';
import Modal from '../Modal';

interface NewTransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const NewTransactionForm: React.FC<NewTransactionFormProps> = ({ isOpen, onClose, onAddTransaction }) => {
  const [type, setType] = useState<TransactionType>(TransactionType.APLICACAO);
  const [status, setStatus] = useState<TransactionStatus>(TransactionStatus.PENDENTE);
  const [value, setValue] = useState(0);
  const [clientName, setClientName] = useState('');
  const [institution, setInstitution] = useState('');
  const [docRef, setDocRef] = useState('');
  const [clientId, setClientId] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTransaction({
      type,
      status,
      value,
      clientName,
      institution,
      docRef,
      clientId,
      timestamp,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova Transação">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select value={type} onChange={e => setType(e.target.value as TransactionType)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm">
                {Object.values(TransactionType).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={status} onChange={e => setStatus(e.target.value as TransactionStatus)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm">
                {Object.values(TransactionStatus).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <input type="number" placeholder="Valor" value={value} onChange={e => setValue(Number(e.target.value))} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
            <input type="text" placeholder="Cliente" value={clientName} onChange={e => setClientName(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
            <input type="text" placeholder="Instituição" value={institution} onChange={e => setInstitution(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
            <input type="text" placeholder="Documento de Referência" value={docRef} onChange={e => setDocRef(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
            <input type="text" placeholder="ID do Cliente" value={clientId} onChange={e => setClientId(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
            <input type="date" placeholder="Data" value={timestamp} onChange={e => setTimestamp(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E2A38] focus:ring-[#1E2A38] sm:text-sm" />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300">Cancelar</button>
          <button type="submit" className="py-2 px-4 bg-[#1E2A38] text-white rounded-md font-semibold hover:bg-opacity-90">Adicionar</button>
        </div>
      </form>
    </Modal>
  );
};

export default NewTransactionForm;
