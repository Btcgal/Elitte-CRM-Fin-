import React, { useState, useEffect } from 'react';
import { Transaction, TransactionStatus, TransactionType } from '../types';
import { MOCK_TRANSACTIONS, TRANSACTION_STATUS_COLORS } from '../constants';
import Card from '../components/Card';
import Chip from '../components/Chip';
import NewTransactionForm from '../components/forms/NewTransactionForm';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const TransactionIcon: React.FC<{ type: TransactionType }> = ({ type }) => {
  const iconMap = {
    [TransactionType.APLICACAO]: { icon: 'add_card', color: 'text-green-500' },
    [TransactionType.RESGATE]: { icon: 'credit_card_off', color: 'text-red-500' },
    [TransactionType.FEE]: { icon: 'percent', color: 'text-yellow-500' },
    [TransactionType.FATURA]: { icon: 'receipt_long', color: 'text-blue-500' },
  };
  return <span className={`material-symbols-outlined ${iconMap[type].color}`}>{iconMap[type].icon}</span>;
};

const Transactions: React.FC<{ showSnackbar: (msg: string, type?:'success'|'error')=>void }> = ({showSnackbar}) => {
    const [transactions, setTransactions] = useState<Transaction[]>(() => loadFromLocalStorage('transactions', MOCK_TRANSACTIONS));
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

    useEffect(() => {
        saveToLocalStorage('transactions', transactions);
    }, [transactions]);

    const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
        const newTransaction: Transaction = {
            ...transaction,
            id: new Date().toISOString(),
        };
        setTransactions(prev => [newTransaction, ...prev]);
        showSnackbar('Transação adicionada com sucesso!');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Transações</h1>
                <button onClick={() => setIsNewTransactionModalOpen(true)} className="flex items-center justify-center py-2 px-4 bg-[#1E2A38] text-white rounded-md font-semibold text-sm hover:bg-opacity-90 transition-all shadow-sm">
                    <span className="material-symbols-outlined mr-2 text-base">add_box</span>
                    Nova Transação
                </button>
            </div>
            
            <div className="flex items-center space-x-2">
                <Chip label="Últimos 7 dias" colorClasses="bg-blue-100 text-blue-800 cursor-pointer" />
                <Chip label="Últimos 30 dias" colorClasses="bg-gray-200 text-gray-800 cursor-pointer" />
                <Chip label="Últimos 90 dias" colorClasses="bg-gray-200 text-gray-800 cursor-pointer" />
            </div>

            <Card variant="outlined" className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Tipo</th>
                            <th scope="col" className="px-6 py-3">Cliente</th>
                            <th scope="col" className="px-6 py-3">Valor</th>
                            <th scope="col" className="px-6 py-3">Data</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(tx => (
                            <tr key={tx.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <TransactionIcon type={tx.type} />
                                        <span className="ml-2 font-medium">{tx.type}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">{tx.clientName}</td>
                                <td className="px-6 py-4">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(tx.value)}</td>
                                <td className="px-6 py-4">{new Date(tx.timestamp).toLocaleDateString('pt-BR')}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <span className={`h-2 w-2 rounded-full mr-2 ${TRANSACTION_STATUS_COLORS[tx.status].replace('text-', 'bg-')}`}></span>
                                        <span className={TRANSACTION_STATUS_COLORS[tx.status]}>{tx.status}</span>
                                    </div>
                                </td>
                                 <td className="px-6 py-4">
                                    {tx.status === TransactionStatus.REQUER_APROVACAO ? (
                                        <button onClick={() => showSnackbar('Ação realizada!')} className="font-medium text-blue-600 hover:underline text-xs">Analisar</button>
                                    ) : (
                                        <button className="font-medium text-gray-400 text-xs">Detalhes</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
            <NewTransactionForm isOpen={isNewTransactionModalOpen} onClose={() => setIsNewTransactionModalOpen(false)} onAddTransaction={handleAddTransaction} />
        </div>
    );
};

export default Transactions;
