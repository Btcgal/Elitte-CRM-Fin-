import React, { useState, useMemo, useEffect } from 'react';
import { Opportunity, OpportunityStage, ALL_OPPORTUNITY_STAGES, Activity, ActivityType, ActivityPriority, ActivityStatus } from '../types';
import { MOCK_OPPORTUNITIES, PROBABILITY_COLORS } from '../constants';
import { useAppContext } from '../contexts/AppContext';
import Modal from '../components/Modal';
import NewOpportunityForm from '../components/forms/NewOpportunityForm';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const KanbanCard: React.FC<{ opportunity: Opportunity; onDragStart: (e: React.DragEvent<HTMLDivElement>, opp: Opportunity) => void }> = ({ opportunity, onDragStart }) => {
  const clientEmail = "cliente@email.com"; // Dado mocado, idealmente viria do cliente associado
  const meetingTitle = `Reunião: ${opportunity.title}`;
  
  const handleScheduleMeeting = () => {
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(meetingTitle)}&details=${encodeURIComponent(`Discussão sobre a oportunidade: ${opportunity.title}`)}`;
    window.open(googleCalendarUrl, '_blank');
  };

  const handleSendEmail = () => {
    const mailtoLink = `mailto:${clientEmail}?subject=${encodeURIComponent(opportunity.title)}`;
    window.location.href = mailtoLink;
  };

  return (
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
            <div className="flex items-center space-x-2">
              <button onClick={handleScheduleMeeting} title="Agendar Reunião" className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                <span className="material-symbols-outlined text-lg text-gray-600">calendar_today</span>
              </button>
              <button onClick={handleSendEmail} title="Enviar E-mail" className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                <span className="material-symbols-outlined text-lg text-gray-600">email</span>
              </button>
            </div>
        </div>
    </div>
  );
};

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
    return (
        <div 
            className="w-72 bg-gray-100 rounded-lg p-3 flex-shrink-0"
            onDrop={(e) => onDrop(e, stage)}
            {...dragHandlers}
        >
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-sm text-gray-700">{stage} ({opportunities.length})</h3>
            </div>
            <div className={`min-h-[200px] rounded-lg transition-colors ${isOver ? 'bg-blue-100' : ''}`}>
                {opportunities.map(opp => (
                    <KanbanCard key={opp.id} opportunity={opp} onDragStart={onDragStart} />
                ))}
            </div>
        </div>
    );
};

const Opportunities: React.FC = () => {
  const { showSnackbar, addActivity } = useAppContext();
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

    // Workflow de Automação
    if (newStage === OpportunityStage.ONBOARDING) {
      triggerOnboardingWorkflow(draggedOpp);
    }

    if (newStage === OpportunityStage.GANHO || newStage === OpportunityStage.PERDA) {
        setMoveDetails({ opp: draggedOpp, newStage });
        setIsModalOpen(true);
    } else {
        updateOpportunityStage(draggedOpp.id, newStage);
        showSnackbar(`Oportunidade movida para ${newStage}`);
    }
    
    setDraggedOpp(null);
    setDragOverStage(null);
  };
  
  const triggerOnboardingWorkflow = (opp: Opportunity) => {
    const today = new Date();
    const activitiesToCreate: Omit<Activity, 'id'>[] = [
      {
        title: `Coletar Documentos KYC - ${opp.clientName}`,
        type: ActivityType.OPERACIONAL,
        clientId: opp.clientId,
        assessor: opp.responsible,
        dueDate: new Date(today.setDate(today.getDate() + 2)).toISOString(),
        priority: ActivityPriority.ALTA,
        status: ActivityStatus.A_FAZER,
        notes: `Início do processo de onboarding para a oportunidade: ${opp.title}`,
      },
      {
        title: `Agendar Reunião de Boas-Vindas - ${opp.clientName}`,
        type: ActivityType.REUNIAO,
        clientId: opp.clientId,
        assessor: opp.responsible,
        dueDate: new Date(today.setDate(today.getDate() + 5)).toISOString(),
        priority: ActivityPriority.MEDIA,
        status: ActivityStatus.A_FAZER,
      },
      {
        title: `Preparar plano de alocação inicial - ${opp.clientName}`,
        type: ActivityType.OPERACIONAL,
        clientId: opp.clientId,
        assessor: opp.responsible,
        dueDate: new Date(today.setDate(today.getDate() + 7)).toISOString(),
        priority: ActivityPriority.ALTA,
        status: ActivityStatus.A_FAZER,
      }
    ];

    activitiesToCreate.forEach(addActivity);
    showSnackbar(`Workflow de Onboarding ativado! 3 atividades foram criadas para ${opp.clientName}.`, 'success');
  };

  const updateOpportunityStage = (oppId: string, newStage: OpportunityStage) => {
    setOpportunities(prev =>
      prev.map(o => (o.id === oppId ? { ...o, stage: newStage } : o))
    );
  };

  const handleConfirmMove = () => {
    if (moveDetails) {
      updateOpportunityStage(moveDetails.opp.id, moveDetails.newStage);
      showSnackbar(`Oportunidade movida para ${moveDetails.newStage}!`, 'success');
      setIsModalOpen(false);
      setMoveDetails(null);
    }
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
    const grouped: { [key in OpportunityStage]?: Opportunity[] } = {};
    for (const stage of ALL_OPPORTUNITY_STAGES) {
        grouped[stage] = [];
    }
    opportunities.forEach(opp => {
        if (grouped[opp.stage]) {
            grouped[opp.stage]!.push(opp);
        }
    });
    return grouped;
  }, [opportunities]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 px-1">
        <h1 className="text-2xl font-bold text-gray-800">Funil de Oportunidades</h1>
        <button onClick={() => setIsNewOpportunityModalOpen(true)} className="flex items-center justify-center py-2 px-4 bg-[#1E2A38] text-white rounded-md font-semibold text-sm hover:bg-opacity-90 transition-all shadow-sm">
          <span className="material-symbols-outlined mr-2 text-base">add</span>
          Nova Oportunidade
        </button>
      </div>
      <div className="flex-grow overflow-x-auto pb-4">
        <div className="flex space-x-4">
          {ALL_OPPORTUNITY_STAGES.map(stage => (
            <KanbanColumn
              key={stage}
              stage={stage}
              opportunities={opportunitiesByStage[stage] || []}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
              isOver={dragOverStage === stage}
              onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }}
              onDragEnter={() => setDragOverStage(stage)}
              onDragLeave={() => setDragOverStage(null)}
            />
          ))}
        </div>
      </div>
      
      {isModalOpen && moveDetails && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Mover para ${moveDetails.newStage}?`}>
          <p>Você tem certeza que deseja mover a oportunidade "{moveDetails.opp.title}" para "{moveDetails.newStage}"?</p>
          <p className="text-sm text-gray-500 mt-2">Esta ação é final e indica o resultado da negociação.</p>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setIsModalOpen(false)} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300">Cancelar</button>
            <button onClick={handleConfirmMove} className="py-2 px-4 bg-[#1E2A38] text-white rounded-md font-semibold hover:bg-opacity-90">Confirmar</button>
          </div>
        </Modal>
      )}

      <NewOpportunityForm 
        isOpen={isNewOpportunityModalOpen} 
        onClose={() => setIsNewOpportunityModalOpen(false)}
        onAddOpportunity={(newOpp) => {
          setOpportunities(prev => [...prev, { ...newOpp, id: `opp_${Date.now()}` }]);
          showSnackbar('Nova oportunidade criada com sucesso!', 'success');
        }}
      />
    </div>
  );
};

export default Opportunities;
