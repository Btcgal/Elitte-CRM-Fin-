import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Notification } from '../types';
import Card from '../components/Card';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const NotificationIcon: React.FC<{ type: Notification['type'] }> = ({ type }) => {
  const iconMap = {
    new_opportunity: 'work',
    task_assigned: 'task_alt',
    compliance_alert: 'shield_question',
    mention: 'alternate_email',
  };
  return <span className="material-symbols-outlined text-2xl">{iconMap[type]}</span>;
};

const Notifications: React.FC = () => {
  const { notifications } = useAppContext(); // Usando o contexto
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    saveToLocalStorage('notifications', notifications);
  }, [notifications]);

  // A lógica para marcar como lida precisaria de um `setNotifications` no contexto
  const handleMarkAsRead = (id: string) => {
    console.log(`Marcar notificação ${id} como lida.`);
  };

  const filteredNotifications = useMemo(() => {
    if (filter === 'unread') {
      return notifications.filter(n => !n.read);
    }
    return notifications;
  }, [notifications, filter]);

  const groupedNotifications = useMemo(() => {
    return filteredNotifications.reduce((acc, notification) => {
      const date = new Date(notification.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(notification);
      return acc;
    }, {} as Record<string, Notification[]>);
  }, [filteredNotifications]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Notificações</h1>
        <div className="flex items-center space-x-2">
          <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'all' ? 'bg-gray-200 text-gray-800' : 'text-gray-500'}`}>Todas</button>
          <button onClick={() => setFilter('unread')} className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'unread' ? 'bg-gray-200 text-gray-800' : 'text-gray-500'}`}>Não Lidas</button>
        </div>
      </div>

      {Object.keys(groupedNotifications).map(date => (
        <div key={date}>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">{date}</h2>
          <Card className="p-0">
            <ul className="divide-y divide-gray-200">
              {groupedNotifications[date].map(notification => (
                <li key={notification.id} onClick={() => handleMarkAsRead(notification.id)} className={`p-4 flex items-start cursor-pointer hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                  <div className="mr-4 text-blue-500"><NotificationIcon type={notification.type} /></div>
                  <div>
                    <p className="text-sm text-gray-800">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(notification.date).toLocaleString('pt-BR')}</p>
                  </div>
                </li>
              ))}
              {notifications.length === 0 && <li className="p-4 text-center text-gray-500">Nenhuma notificação.</li>}
            </ul>
          </Card>
        </div>
      ))}

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-6xl text-gray-300">notifications_off</span>
          <h3 className="mt-2 text-lg font-medium text-gray-800">Nenhuma notificação</h3>
          <p className="mt-1 text-sm text-gray-500">Você está em dia!</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
