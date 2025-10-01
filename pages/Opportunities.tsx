import React, { useState, useMemo, useEffect } from 'react';
import { Opportunity, OpportunityStage, ALL_OPPORTUNITY_STAGES } from '../types';
import { MOCK_OPPORTUNITIES, PROBABILITY_COLORS, STAGE_WIP_LIMITS } from '../constants';
import Modal from '../components/Modal';
import NewOpportunityForm from '../components/forms/NewOpportunityForm';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const KanbanCard: React.FC<{ opportunity: Opportunity; onDragStart: (e: React.DragEvent<HTMLDivElement>, opp: Opportunity) => void }> = ({ opportunity, onDragStart }) => (
    <div
        draggable
        onDragStart={(e) => onDragStart(e, opportunity)}
        className="bg-white p-3 rounded-md shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing mb-3"
    >
        <div className="flex justify-between items-start">
            <p className="font-semibold text-sm text-gray-800 break-words">{opportunity.title}</p>
            <div className={`w-3 h-3 rounded-full flex-shrink-0 ml-2 ${PROBABILITY_COLORS(opportunity.probability)}`} title={`Probabilidade: ${opportunity.probability}%`}></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">{opportunity.clientName}</p>
        <div className="flex justify-between items-end mt-3">
            <p className="text-sm font-bold text-[#1E2A38]">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(opportunity.estimatedValue)}
            </p>
            <div className="text-right">
                <p className="text-xs text-gray-500">Próx. Ação:</p>
                <p className="text-xs font-semibold text-gray-700">{opportunity.nextAction}</p>
            </div>
        </div>
    </div>
);

const KanbanColumn: React.FC<{
  stage: OpportunityStage;
  opportunities: Opportunity[];
  onDragStart: (e: React.DragEvent<HTMLDivElement>, opp: Opportunity) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, stage: OpportunityStage) => void;
  isOver: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
}> = ({ stage, opportunities, onDragStart, onDrop, isOver, ...dragHandlers }) => {
    const wipLimit = STAGE_WIP_LIMITS[stage];
    const isOverLimit = wipLimit !== undefined && opportunities.length > wipLimit;

    return (
        <div 
            className="w-72 bg-gray-100 rounded-lg p-3 flex-shrink-0"
            onDrop={(e) => onDrop(e, stage)}
            {...dragHandlers}
        >
            <div className="flex justify-between items-center mb-3">
                <h3 className={`font-semibold text-sm text-gray-700 ${isOverLimit ? 'text-red-600' : ''}`}>{stage} ({opportunities.length})</h3>
                {wipLimit && <span className={`text-xs font-bold ${isOverLimit ? 'text-red-600' : 'text-gray-400'}`}>Max: {wipLimit}</span>}
            </div>
            <div className={`min-h-[200px] rounded-lg transition-colors ${isOver ? 'bg-blue-100' : ''}`}>
                {opportunities.map(opp => (
                    <KanbanCard key={opp.id} opportunity={opp} onDragStart={onDragStart} />
                ))}
            </div>
        </div>
    );
};

const Opportunities: React.FC<{ showSnackbar: (msg: string, type?:'success'|'error')=>void }> = ({showSnackbar}) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => loadFromLocalStorage('opportunities', MOCK_OPPORTUNITIES));
  const [draggedOpp, setDraggedOpp] = useState<Opportunity | null>(null);
  const [dragOverStage, setDragOverStage] = useState<OpportunityStage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewOpportunityModalOpen, setIsNewOpportunityModalOpen] = useState(false);
  const [moveDetails, setMoveDetails] = useState<{ opp: Opportunity, newStage: OpportunityStage } | null>(null);

  useEffect(() => {
    saveToLocalStorage('opportunities', opportunities);
  }, [opportunities]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, opp: Opportunity) => {
    setDraggedOpp(opp);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStage: OpportunityStage) => {
    e.preventDefault();
    if (!draggedOpp || draggedOpp.stage === newStage) return;

    if (newStage === OpportunityStage.FECHADO || newStage === OpportunityStage.PERDIDO) {
        setMoveDetails({ opp: draggedOpp, newStage });
        setIsModalOpen(true);
    } else {
        updateOpportunityStage(draggedOpp.id, newStage);
        showSnackbar(`Oportunidade movida para ${newStage}`);
    }
    
    setDraggedOpp(null);
    setDragOverStage(null);
  };
  
  const updateOpportunityStage = (oppId: string, newStage: OpportunityStage) => {
    setOpportunities(prev =>
      prev.map(o => (o.id === oppId ? { ...o, stage: newStage } : o))
    );
  };
  
  const confirmMove = () => {
    if (moveDetails) {
        updateOpportunityStage(moveDetails.opp.id, moveDetails.newStage);
        showSnackbar(`Oportunidade movida para ${moveDetails.newStage} com sucesso!`);
    }
    setIsModalOpen(false);
    setMoveDetails(null);
  };

  const handleAddOpportunity = (opportunity: Omit<Opportunity, 'id'>) => {
    const newOpportunity: Opportunity = {
      ...opportunity,
      id: new Date().toISOString(),
    };
    setOpportunities(prev => [newOpportunity, ...prev]);
    showSnackbar('Oportunidade adicionada com sucesso!');
  };

  const opportunitiesByStage = useMemo(() => {
    return ALL_OPPORTUNITY_STAGES.reduce((acc, stage) => {
        acc[stage] = opportunities.filter(opp => opp.stage === stage);
        return acc;
    }, {} as Record<OpportunityStage, Opportunity[]>);
  }, [opportunities]);

  return (
    <div className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Pipeline de Oportunidades</h1>
            <button onClick={() => setIsNewOpportunityModalOpen(true)} className="flex items-center justify-center py-2 px-4 bg-[#1E2A38] text-white rounded-md font-semibold text-sm hover:bg-opacity-90 transition-all shadow-sm">
            <span className="material-symbols-outlined mr-2 text-base">add</span>
            Nova Oportunidade
            </button>
        </div>
        <div className="flex-1 overflow-x-auto pb-4">
            <div className="flex space-x-4">
                {ALL_OPPORTUNITY_STAGES.map(stage => (
                    <KanbanColumn
                        key={stage}
                        stage={stage}
                        opportunities={opportunitiesByStage[stage]}
                        onDragStart={handleDragStart}
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={() => setDragOverStage(stage)}
                        onDragLeave={() => setDragOverStage(null)}
                        isOver={dragOverStage === stage}
                    />
                ))}
            </div>
        </div>
        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={`Confirmar Movimentação`}
        >
            <p>Você está movendo a oportunidade <span className="font-bold">{moveDetails?.opp.title}</span> para <span className="font-bold">{moveDetails?.newStage}</span>.</p>
            {moveDetails?.newStage === OpportunityStage.PERDIDO && (
                 <div className="mt-4">
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Motivo da Perda (opcional)</label>
                    <textarea id="reason" rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
                 </div>
            )}
            <div className="mt-6 flex justify-end gap-3">
                 <button onClick={() => setIsModalOpen(false)} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300">Cancelar</button>
                 <button onClick={confirmMove} className="py-2 px-4 bg-[#1E2A38] text-white rounded-md font-semibold hover:bg-opacity-90">Confirmar</button>
            </div>
        </Modal>
        <NewOpportunityForm isOpen={isNewOpportunityModalOpen} onClose={() => setIsNewOpportunityModalOpen(false)} onAddOpportunity={handleAddOpportunity} />
    </div>
  );
};

export default Opportunities;
