import React, { useState, useMemo, useEffect } from 'react';
import { Task, TaskStatus } from '../types';
import { MOCK_TASKS, TASK_PRIORITY_ICON, MOCK_CLIENTS, MOCK_OPPORTUNITIES } from '../constants';
import Card from '../components/Card';
import NewTaskForm from '../components/forms/NewTaskForm';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const TaskItem: React.FC<{ task: Task; onStatusChange: (id: string, status: TaskStatus) => void }> = ({ task, onStatusChange }) => {
  const isCompleted = task.status === TaskStatus.CONCLUIDA;
  return (
    <div className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-gray-50">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onStatusChange(task.id, isCompleted ? TaskStatus.A_FAZER : TaskStatus.CONCLUIDA)}
          className="h-5 w-5 rounded border-gray-300 text-[#1E2A38] focus:ring-[#1E2A38]"
        />
        <div className="ml-4">
          <p className={`font-medium ${isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            <span className="mr-2">{TASK_PRIORITY_ICON[task.priority]}</span>
            {task.description}
          </p>
          <p className="text-xs text-gray-500">
            Prazo: {new Date(task.dueDate).toLocaleDateString('pt-BR')}  &bull;  Responsável: {task.responsible}
          </p>
        </div>
      </div>
      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
        {task.status}
      </span>
    </div>
  );
};

const Tasks: React.FC<{ showSnackbar: (msg: string) => void }> = ({ showSnackbar }) => {
  const [tasks, setTasks] = useState<Task[]>(() => loadFromLocalStorage('tasks', MOCK_TASKS));
  const [activeView, setActiveView] = useState('Minha fila');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  useEffect(() => {
    saveToLocalStorage('tasks', tasks);
  }, [tasks]);

  const handleStatusChange = (id: string, status: TaskStatus) => {
    setTasks(prevTasks => prevTasks.map(t => t.id === id ? { ...t, status } : t));
    if(status === TaskStatus.CONCLUIDA){
        showSnackbar('Tarefa concluída!');
    }
  };

  const handleAddTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
    showSnackbar('Tarefa adicionada com sucesso!');
  };

  const views = ['Minha fila', 'Por cliente', 'Por oportunidade'];

  const groupedTasks = useMemo(() => {
    if (activeView === 'Por cliente') {
      return tasks.reduce((acc, task) => {
        const client = MOCK_CLIENTS.find(c => c.id === task.refId);
        const clientName = client ? client.name : 'Sem cliente';
        if (!acc[clientName]) {
          acc[clientName] = [];
        }
        acc[clientName].push(task);
        return acc;
      }, {} as Record<string, Task[]>);
    } else if (activeView === 'Por oportunidade') {
      return tasks.reduce((acc, task) => {
        const opportunity = MOCK_OPPORTUNITIES.find(o => o.id === task.refId);
        const opportunityTitle = opportunity ? opportunity.title : 'Sem oportunidade';
        if (!acc[opportunityTitle]) {
          acc[opportunityTitle] = [];
        }
        acc[opportunityTitle].push(task);
        return acc;
      }, {} as Record<string, Task[]>);
    } else {
      return { 'Minha fila': tasks };
    }
  }, [tasks, activeView]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Agenda / Tarefas</h1>
        <button onClick={() => setIsNewTaskModalOpen(true)} className="flex items-center justify-center py-2 px-4 bg-[#1E2A38] text-white rounded-md font-semibold text-sm hover:bg-opacity-90 transition-all shadow-sm">
          <span className="material-symbols-outlined mr-2 text-base">playlist_add</span>
          Nova Tarefa
        </button>
      </div>

      <div>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            {views.map(view => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                  activeView === view
                    ? 'border-[#1E2A38] text-[#1E2A38]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {view}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {Object.keys(groupedTasks).map(group => (
        <div key={group}>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">{group}</h2>
          <Card variant="outlined" className="p-0">
            <div>
              {groupedTasks[group].map(task => (
                <TaskItem key={task.id} task={task} onStatusChange={handleStatusChange} />
              ))}
            </div>
          </Card>
        </div>
      ))}

       {tasks.length === 0 && (
            <div className="text-center py-12">
                <span className="material-symbols-outlined text-6xl text-gray-300">task_alt</span>
                <h3 className="mt-2 text-lg font-medium text-gray-800">Nenhuma tarefa encontrada</h3>
                <p className="mt-1 text-sm text-gray-500">Crie uma nova tarefa para começar.</p>
            </div>
        )}
      <NewTaskForm isOpen={isNewTaskModalOpen} onClose={() => setIsNewTaskModalOpen(false)} onAddTask={handleAddTask} />
    </div>
  );
};

export default Tasks;
