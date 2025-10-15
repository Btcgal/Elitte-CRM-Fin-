import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationItem } from '../../types';

interface SideNavProps {
  activePage: NavigationItem;
}

const NavLink: React.FC<{ 
  icon: string;
  label: NavigationItem;
  isActive: boolean;
  to: string;
}> = ({ icon, label, isActive, to }) => (
  <Link to={to}>
    <li
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
        isActive
          ? 'bg-[#1E2A38] text-white'
          : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
      }`}
    >
      <span className="material-symbols-outlined text-xl w-6 h-6">{icon}</span>
      <span className="ml-4 font-medium">{label}</span>
    </li>
  </Link>
);

const SideNav: React.FC<SideNavProps> = ({ activePage }) => {
  const navItems: { icon: string; label: NavigationItem, path: string }[] = [
    { icon: 'dashboard', label: 'Home', path: '/dashboard' },
    { icon: 'groups', label: 'Clientes', path: '/clients' },
    { icon: 'rocket_launch', label: 'Oportunidades', path: '/opportunities' },
    { icon: 'handshake', label: 'Parceiros', path: '/partners' },
    { icon: 'receipt_long', label: 'Transações', path: '/transactions' },
    { icon: 'task_alt', label: 'Tarefas', path: '/tasks' },
    { icon: 'analytics', label: 'Relatórios', path: '/reports' },
    { icon: 'verified_user', label: 'Compliance', path: '/compliance' },
    { icon: 'settings', label: 'Configurações', path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-[#1E2A38]">Elitte Capital</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              icon={item.icon}
              label={item.label}
              to={item.path}
              isActive={activePage === item.label}
            />
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
          <div className="flex items-center p-3 rounded-lg bg-gray-100">
              <img src="https://picsum.photos/id/237/40/40" alt="User" className="w-10 h-10 rounded-full"/>
              <div className="ml-3">
                  <p className="font-semibold text-sm text-gray-800">Carlos Silva</p>
                  <p className="text-xs text-gray-500">Assessor Sênior</p>
              </div>
          </div>
      </div>
    </aside>
  );
};

export default SideNav;
