import React, { useState } from 'react';
import Card from '../components/Card';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Perfil');

  const renderContent = () => {
    switch (activeTab) {
      case 'Perfil':
        return <ProfileSettings />;
      case 'Segurança':
        return <SecuritySettings />;
      case 'Notificações':
        return <NotificationSettings />;
      case 'Tema':
        return <ThemeSettings />;
      default:
        return null;
    }
  };

  const handleConnectGoogle = () => {
    // Redireciona o usuário para a rota de autenticação do backend
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
        <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
          <nav className="space-y-1">
            {['Perfil', 'Segurança', 'Notificações', 'Tema'].map(tab => (
              <a
                key={tab}
                href="#"
                onClick={(e) => { e.preventDefault(); setActiveTab(tab); }}
                className={`group rounded-md px-3 py-2 flex items-center text-sm font-medium ${
                  activeTab === tab
                    ? 'bg-gray-50 text-orange-600 hover:bg-white'
                    : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="truncate">{tab}</span>
              </a>
            ))}
          </nav>
        </aside>

        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          {renderContent()}
        </div>
      </div>

      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Integrações</h2>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-bold">Google Agenda & Gmail</h3>
              <p className="text-sm text-gray-600">Sincronize suas reuniões e e-mails automaticamente.</p>
            </div>
            <button
              onClick={handleConnectGoogle}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Conectar com Google
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

const ProfileSettings = () => (
  <Card>
    <div className="p-6">
      <h2 className="text-lg font-medium leading-6 text-gray-900">Perfil</h2>
      <p className="mt-1 text-sm text-gray-600">Atualize sua foto e detalhes pessoais.</p>
    </div>
    <div className="p-6">
        <div className="flex items-center">
            <img className="h-24 w-24 rounded-full" src="https://picsum.photos/id/237/200/200" alt="" />
            <div className="ml-5">
                <button className="py-2 px-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Alterar</button>
            </div>
        </div>
        <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-6">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Nome</label>
                <input type="text" name="first-name" id="first-name" defaultValue="Carlos" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
            </div>
            <div className="col-span-12 sm:col-span-6">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Sobrenome</label>
                <input type="text" name="last-name" id="last-name" defaultValue="Silva" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
            </div>
        </div>
    </div>
    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button className="bg-orange-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-orange-700">Salvar</button>
    </div>
  </Card>
);

const SecuritySettings = () => (
    <Card>
        <div className="p-6">
            <h2 className="text-lg font-medium leading-6 text-gray-900">Segurança</h2>
            <p className="mt-1 text-sm text-gray-600">Altere sua senha e gerencie a autenticação de dois fatores.</p>
        </div>
        <div className="p-6">
            <div className="mt-6 grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Senha Atual</label>
                    <input type="password" name="current-password" id="current-password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                </div>
                <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">Nova Senha</label>
                    <input type="password" name="new-password" id="new-password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                </div>
                <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
                    <input type="password" name="confirm-password" id="confirm-password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Autenticação de Dois Fatores</h3>
                <div className="mt-2 flex items-center">
                    <input id="two-factor-auth" name="two-factor-auth" type="checkbox" className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" />
                    <label htmlFor="two-factor-auth" className="ml-2 block text-sm text-gray-900">Habilitar autenticação de dois fatores</label>
                </div>
            </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button className="bg-orange-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-orange-700">Salvar</button>
        </div>
    </Card>
);

const NotificationSettings = () => (
    <Card>
        <div className="p-6">
            <h2 className="text-lg font-medium leading-6 text-gray-900">Notificações</h2>
            <p className="mt-1 text-sm text-gray-600">Gerencie as notificações que você recebe.</p>
        </div>
        <div className="p-6">
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-medium text-gray-900">Novas Oportunidades</h3>
                        <p className="text-sm text-gray-500">Receba notificações sobre novas oportunidades de negócio.</p>
                    </div>
                    <input id="new-opportunities" name="new-opportunities" type="checkbox" className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-medium text-gray-900">Tarefas Atribuídas</h3>
                        <p className="text-sm text-gray-500">Receba notificações quando uma nova tarefa for atribuída a você.</p>
                    </div>
                    <input id="assigned-tasks" name="assigned-tasks" type="checkbox" className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-medium text-gray-900">Alertas de Compliance</h3>
                        <p className="text-sm text-gray-500">Receba notificações sobre pendências de compliance.</p>
                    </div>
                    <input id="compliance-alerts" name="compliance-alerts" type="checkbox" className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" />
                </div>
            </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button className="bg-orange-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-orange-700">Salvar</button>
        </div>
    </Card>
);

const ThemeSettings = () => (
    <Card>
        <div className="p-6">
            <h2 className="text-lg font-medium leading-6 text-gray-900">Tema</h2>
            <p className="mt-1 text-sm text-gray-600">Escolha entre o tema claro ou escuro.</p>
        </div>
        <div className="p-6">
            <div className="mt-2 flex items-center">
                <input id="theme-toggle" name="theme-toggle" type="checkbox" className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" />
                <label htmlFor="theme-toggle" className="ml-2 block text-sm text-gray-900">Usar tema escuro</label>
            </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button className="bg-orange-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-orange-700">Salvar</button>
        </div>
    </Card>
);

export default Settings;
