import React from 'react';
import { Notification } from '../../types'; // Corrigindo o caminho

const TopBar: React.FC<{ notifications: Notification[] }> = ({ notifications }) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input
            type="text"
            placeholder="Busca desativada temporariamente"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 border-transparent focus:border-gray-300 focus:bg-white focus:ring-0 transition"
            disabled
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <span className="material-symbols-outlined text-gray-600">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};

export default TopBar;