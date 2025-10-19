import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SideNav from './components/navigation/SideNav';
import TopBar from './components/navigation/TopBar';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Opportunities from './pages/Opportunities';
import Transactions from './pages/Transactions';
import Activities from './pages/Activities';
import Reports from './pages/Reports';
import Compliance from './pages/Compliance';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import Partners from './pages/Partners';
import CommandPalette from './components/CommandPalette';
import { useAppContext } from './contexts/AppContext';

function App() {
  const [activeNavItem, setActiveNavItem] = useState<string>('Home');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const { notifications } = useAppContext();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderContent = () => {
    switch (activeNavItem) {
      case 'Dashboard': return <Dashboard />;
      case 'Clientes': return <Clients />;
      case 'Oportunidades': return <Opportunities />;
      case 'Parceiros': return <Partners />;
      case 'Transações': return <Transactions />;
      case 'Tarefas': return <Activities />;
      case 'Relatórios': return <Reports />;
      case 'Compliance': return <Compliance />;
      case 'Notificações': return <Notifications />;
      case 'Configurações': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
  <SideNav activePage={activeNavItem as any} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar notifications={notifications} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {renderContent()}
        </main>
      </div>
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
    </div>
  );
}

export default App;
