import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Briefcase, 
  Mail, 
  Settings, 
  Search, 
  Bot, 
  Database, 
  BarChart3, 
  Menu, 
  X,
  Globe,
  Zap
} from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: '/', icon: <Home className="w-5 h-5" />, label: 'Dashboard' },
    { path: '/campaigns', icon: <Mail className="w-5 h-5" />, label: 'Campagnes' },
    { path: '/influencers', icon: <Users className="w-5 h-5" />, label: 'Influenceurs' },
    { path: '/brands', icon: <Briefcase className="w-5 h-5" />, label: 'Marques' },
    { path: '/scraping', icon: <Globe className="w-5 h-5" />, label: 'Scraping' },
    { path: '/ai-agent', icon: <Bot className="w-5 h-5" />, label: 'Agent IA' },
    { path: '/database', icon: <Database className="w-5 h-5" />, label: 'Base de données' },
    { path: '/analytics', icon: <BarChart3 className="w-5 h-5" />, label: 'Analytique' },
    { path: '/settings', icon: <Settings className="w-5 h-5" />, label: 'Paramètres' }
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-full bg-blue-600 text-white"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <div className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 z-40 transition duration-200 ease-in-out w-64 bg-gray-800 bg-opacity-95 backdrop-blur-sm border-r border-gray-700`}>
        <div className="p-6 border-b border-gray-700 flex items-center space-x-2">
          <Zap className="w-6 h-6 text-blue-400" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Scrappy</h1>
        </div>
        
        <div className="p-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>
        
        <nav className="mt-2 px-2">
          <div className="mb-4 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Principal
          </div>
          <ul className="space-y-1">
            {menuItems.slice(0, 4).map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path) 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className={`mr-3 ${isActive(item.path) ? 'text-white' : 'text-gray-400'}`}>
                    {item.icon}
                  </span>
                  {item.label}
                  {isActive(item.path) && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-300"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="my-4 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Automatisation
          </div>
          <ul className="space-y-1">
            {menuItems.slice(4, 8).map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path) 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className={`mr-3 ${isActive(item.path) ? 'text-white' : 'text-gray-400'}`}>
                    {item.icon}
                  </span>
                  {item.label}
                  {isActive(item.path) && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-300"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="my-4 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Système
          </div>
          <ul className="space-y-1">
            {menuItems.slice(8).map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path) 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className={`mr-3 ${isActive(item.path) ? 'text-white' : 'text-gray-400'}`}>
                    {item.icon}
                  </span>
                  {item.label}
                  {isActive(item.path) && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-300"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="font-semibold text-white">SZ</span>
            </div>
            <div>
              <p className="text-sm font-medium">Stéphane Zayat</p>
              <p className="text-xs text-gray-400">Administrateur</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <Outlet /> {/* C'est ici que le contenu des routes enfants sera rendu */}
        </div>
      </div>
    </div>
  );
};

export default Layout;