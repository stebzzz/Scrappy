import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Brands from './pages/Brands';
import Influencers from './pages/Influencers';
import InfluencerDetails from './pages/InfluencerDetails';
import Campaigns from './pages/Campaigns';
import AIAgent from './pages/AIAgent';
import Scraping from './pages/Scraping';
import Database from './pages/Database';
import BrandForm from './components/brands/BrandForm';
import NotFound from './pages/NotFound';

// Importation du Provider correcte
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="brands" element={<Brands />} />
          <Route path="brands/new" element={<BrandForm />} />
          <Route path="brands/edit/:id" element={<BrandForm />} />
          <Route path="influencers" element={<Influencers />} />
          <Route path="influencer/:id" element={<InfluencerDetails />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="ai-agent" element={<AIAgent />} />
          <Route path="scraping" element={<Scraping />} />
          <Route path="database" element={<Database />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;