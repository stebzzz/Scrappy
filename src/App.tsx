import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Influencers from './pages/Influencers';
import Brands from './pages/Brands';
import Campaigns from './pages/Campaigns';
import Settings from './pages/Settings';
import AIAgent from './pages/AIAgent';
import Scraping from './pages/Scraping';
import LayoutComponent from './components/Layout';
import './App.css';

// Composant Layout temporaire si le vrai n'existe pas
const TempLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="app">
      <div className="flex h-screen">
        <div className="w-64 bg-white border-r">
          <div className="p-4">
            <h1 className="text-xl font-bold">Scrappy</h1>
          </div>
          <nav className="mt-4">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-100">
                <a href="/" className="block">Dashboard</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <a href="/campaigns" className="block">Campagnes</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <a href="/influencers" className="block">Influenceurs</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <a href="/brands" className="block">Marques</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <a href="/settings" className="block">Paramètres</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

function App() {
  // Utiliser directement le composant Layout importé
  const AppLayout = LayoutComponent;

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/influencers" element={<Influencers />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/scraping" element={<Scraping />} />
        <Route path="/ai-agent" element={<AIAgent />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AppLayout>
  );
}

export default App;