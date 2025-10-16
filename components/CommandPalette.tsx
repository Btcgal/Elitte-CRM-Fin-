import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_CLIENTS, MOCK_OPPORTUNITIES, MOCK_PARTNERS } from '../constants';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    if (!searchTerm) {
      return { clients: [], opportunities: [], partners: [], actions: [] };
    }

    const lowerCaseTerm = searchTerm.toLowerCase();

    const clients = MOCK_CLIENTS.filter(c => c.name.toLowerCase().includes(lowerCaseTerm));
    const opportunities = MOCK_OPPORTUNITIES.filter(o => o.title.toLowerCase().includes(lowerCaseTerm));
    const partners = MOCK_PARTNERS.filter(p => p.name.toLowerCase().includes(lowerCaseTerm));
    
    // Ações estáticas por enquanto
    const actions = [
      { name: 'Nova Oportunidade', action: () => console.log('Abrir form de nova oportunidade') },
      { name: 'Novo Cliente', action: () => console.log('Abrir form de novo cliente') },
    ].filter(a => a.name.toLowerCase().includes(lowerCaseTerm));

    return { clients, opportunities, partners, actions };
  }, [searchTerm]);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start pt-20" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <div className="p-3 border-b">
          <input
            type="text"
            placeholder="Buscar ou ir para..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
            autoFocus
          />
        </div>
        <div className="max-h-96 overflow-y-auto">
          {/* Renderizar resultados aqui */}
          {searchResults.clients.length > 0 && (
            <div>
              <h3 className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">Clientes</h3>
              <ul>
                {searchResults.clients.map(client => (
                  <li key={client.id} className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
                    {client.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Adicionar renderização para oportunidades, parceiros e ações */}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
