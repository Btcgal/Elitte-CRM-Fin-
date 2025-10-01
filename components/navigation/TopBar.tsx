import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_CLIENTS, MOCK_OPPORTUNITIES, MOCK_TASKS } from '../../constants';
import { Client, Opportunity, Task } from '../../types';
import { searchWithGemini } from '../../utils/gemini';

const TopBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<{ clients: Client[], opportunities: Opportunity[], tasks: Task[] }>({ clients: [], opportunities: [], tasks: [] });
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.trim().length > 1) {
      const context = {
        clients: MOCK_CLIENTS,
        opportunities: MOCK_OPPORTUNITIES,
        tasks: MOCK_TASKS,
      };
      const searchResults = await searchWithGemini(query, context);
      setResults(searchResults);
    } else {
      setResults({ clients: [], opportunities: [], tasks: [] });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  const handleResultClick = (item: Client | Opportunity | Task, type: string) => {
    setSearchTerm('');
    setResults({ clients: [], opportunities: [], tasks: [] });
    setIsFocused(false);

    switch (type) {
      case 'client':
        navigate(`/clients`);
        break;
      case 'opportunity':
        navigate(`/opportunities`);
        break;
      case 'task':
        navigate(`/tasks`);
        break;
    }
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 flex-shrink-0 z-20">
      <div className="relative flex items-center w-full max-w-md" ref={searchRef}>
        <span className="material-symbols-outlined text-gray-500 mr-2">search</span>
        <input
          type="text"
          placeholder="Buscar com IA..."
          className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
        />
        {isFocused && searchTerm.trim().length > 1 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
            {results.clients.length === 0 && results.opportunities.length === 0 && results.tasks.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500">
                Nenhum resultado encontrado.
              </div>
            ) : (
              <div>
                {results.clients.length > 0 && (
                  <div>
                    <h3 className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">Clientes</h3>
                    <ul>
                      {results.clients.map(client => (
                        <li
                          key={client.id}
                          className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                          onClick={() => handleResultClick(client, 'client')}
                        >
                          <p className="font-semibold text-sm text-gray-800">{client.name}</p>
                          <p className="text-xs text-gray-500">{client.document}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {results.opportunities.length > 0 && (
                  <div>
                    <h3 className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">Oportunidades</h3>
                    <ul>
                      {results.opportunities.map(opportunity => (
                        <li
                          key={opportunity.id}
                          className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                          onClick={() => handleResultClick(opportunity, 'opportunity')}
                        >
                          <p className="font-semibold text-sm text-gray-800">{opportunity.title}</p>
                          <p className="text-xs text-gray-500">{opportunity.clientName}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {results.tasks.length > 0 && (
                  <div>
                    <h3 className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">Tarefas</h3>
                    <ul>
                      {results.tasks.map(task => (
                        <li
                          key={task.id}
                          className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                          onClick={() => handleResultClick(task, 'task')}
                        >
                          <p className="font-semibold text-sm text-gray-800">{task.description}</p>
                          <p className="text-xs text-gray-500">Responsável: {task.responsible}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined text-gray-600">notifications</span>
        </button>
        <div className="ml-2 hidden md:flex items-center p-2 rounded-lg">
            <img src="https://picsum.photos/id/237/32/32" alt="User" className="w-8 h-8 rounded-full"/>
            <div className="ml-3">
                <p className="font-semibold text-sm text-gray-800">Carlos Silva</p>
            </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;