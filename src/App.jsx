import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import './App.css';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './components/Dashboard';
import AccountPage from './components/Account';
import ResearchPage from './components/Research';


const AppRoutes = () => {
  const location = useLocation();
  useEffect(() => {
    let intervalId;
    const shouldRefresh = location.pathname === '/' || location.pathname.startsWith('/account');
    if (shouldRefresh) {
      intervalId = setInterval(() => {
        window.dispatchEvent(new Event('refresh-data'));
      }, 300000);
    }
    return () => clearInterval(intervalId);
  }, [location]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/account/:idplayer" element={<AccountPage />} />
        <Route path="/account" element={<ResearchPage />} />
      </Routes>
    </MainLayout>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
