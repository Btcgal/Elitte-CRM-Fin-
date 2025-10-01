import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationItem } from '../../types';

interface BottomNavProps {
  activePage: NavigationItem;
}

const NavItem: React.FC<{ 
  icon: string;
  label: string;
  isActive: boolean;
  to: string;
}> = ({ icon, label, isActive, to }) => (
  <Link to={to} className="flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200">
    <span className="material-symbols-outlined">{icon}</span>
    <span className={`text-xs font-medium mt-1 ${isActive ? 'font-bold' : ''}`}>{label}</span>
  </Link>
);

const BottomNav: React.FC<BottomNavProps> = ({ activePage }) => {
  const mainNavItems: { icon: string; label: NavigationItem, path: string }[] = [
    { icon: 'home', label: 'Home', path: '/dashboard' },
    { icon: 'rocket_launch', label: 'Oportunidades', path: '/opportunities' },
    { icon: 'task_alt', label: 'Tarefas', path: '/tasks' },
    { icon: 'notifications', label: 'Notificações', path: '/notifications' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex md:hidden shadow-lg">
      {mainNavItems.map((item) => (
        <NavItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          to={item.path}
          isActive={activePage === item.label}
        />
      ))}
    </nav>
  );
};

export default BottomNav;
