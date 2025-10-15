import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import SideNav from './components/navigation/SideNav';
import BottomNav from './components/navigation/BottomNav';
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
import Snackbar from './components/Snackbar';
import { Activity } from './types';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
};

const App: React.FC = () => {
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const location = useLocation();

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const showSnackbar = (message: string, type: 'success' | 'error' = 'success') => {
    setSnackbar({ message, type });
    setTimeout(() => setSnackbar(null), 3000);
  };

  const addActivity = (newActivity: Omit<Activity, 'id'>) => {
    const activityWithId: Activity = { ...newActivity, id: `act_${Date.now()}` };
    setActivities(prev => [...prev, activityWithId]);
  };

  const getActivePageFromPath = (path: string) => {
    const page = path.split('/')[1];
    if (!page) return 'Home';
    return page.charAt(0).toUpperCase() + page.slice(1);
  };

  const activePage = getActivePageFromPath(location.pathname);

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-[#1E2A38]">
      {isDesktop && <SideNav activePage={activePage} />}
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard showSnackbar={showSnackbar} />} />
            <Route path="/clients" element={<Clients showSnackbar={showSnackbar} />} />
            <Route path="/opportunities" element={<Opportunities showSnackbar={showSnackbar} />} />
            <Route path="/transactions" element={<Transactions showSnackbar={showSnackbar} addActivity={addActivity} />} />
            <Route path="/activities" element={<Activities activities={activities} addActivity={addActivity} showSnackbar={showSnackbar} />} />
            <Route path="/reports" element={<Reports showSnackbar={showSnackbar} />} />
            <Route path="/compliance" element={<Compliance showSnackbar={showSnackbar} />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/partners" element={<Partners />} />
          </Routes>
        </main>

        {!isDesktop && <BottomNav activePage={activePage} />}
      </div>
      
      {snackbar && <Snackbar message={snackbar.message} type={snackbar.type} onDismiss={() => setSnackbar(null)} />}
    </div>
  );
};

export default App;
