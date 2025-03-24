import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Brands from './pages/Brands';
import Influencers from './pages/Influencers';
import InfluencerDetails from './pages/InfluencerDetails';
import InfluencerEdit from './pages/InfluencerEdit';
import InfluencerNew from './pages/InfluencerNew';
import Campaigns from './pages/Campaigns';
import CampaignNew from './pages/CampaignNew';
import CampaignEdit from './pages/CampaignEdit';
import AIAgent from './pages/AIAgent';
import Scraping from './pages/Scraping';
import Database from './pages/Database';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import BrandForm from './components/brands/BrandForm';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { useAppContext } from './context/AppContext';

// Importation du Provider correcte
import { AppProvider } from './context/AppContext';
import { validateApiKeys } from './config/api-keys';

// Nouvelles interfaces
import AdminDashboard from './pages/AdminDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import InfluencerDashboard from './pages/InfluencerDashboard';
import AdminTest from './pages/AdminTest';
import TestPage from './pages/TestPage';

function App() {
  const { darkMode } = useAppContext();

  useEffect(() => {
    // Vérifier que les clés API sont configurées
    validateApiKeys();
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <AppProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Routes protégées */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="brands" element={<Brands />} />
              <Route path="brands/new" element={<BrandForm />} />
              <Route path="brands/edit/:id" element={<BrandForm />} />
              <Route path="influencers" element={<Influencers />} />
              <Route path="influencers/new" element={<InfluencerNew />} />
              <Route path="influencers/edit/:id" element={<InfluencerEdit />} />
              <Route path="influencer/:id" element={<InfluencerDetails />} />
              <Route path="campaigns" element={<Campaigns />} />
              <Route path="campaigns/new" element={<CampaignNew />} />
              <Route path="campaigns/edit/:id" element={<CampaignEdit />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="ai-agent" element={<AIAgent />} />
              <Route path="scraping" element={<Scraping />} />
              <Route path="database" element={<Database />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
          
          {/* Nouvelles routes pour les interfaces */}
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/manager" element={<PrivateRoute><ManagerDashboard /></PrivateRoute>} />
          <Route path="/influencer" element={<PrivateRoute><InfluencerDashboard /></PrivateRoute>} />
          
          {/* Routes pour les sections internes de chaque interface */}
          <Route path="/admin/*" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/manager/*" element={<PrivateRoute><ManagerDashboard /></PrivateRoute>} />
          <Route path="/influencer/*" element={<PrivateRoute><InfluencerDashboard /></PrivateRoute>} />
          <Route path="/admin-test" element={<AdminTest />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </AppProvider>
    </div>
  );
}

export default App;