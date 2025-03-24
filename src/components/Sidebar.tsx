import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  Globe,
  LogOut,
  Zap
} from 'lucide-react';

interface SidebarProps {
  user: any;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ user, onLogout }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
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
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gray-800 border-r border-gray-700 overflow-y-auto transition-all duration-300`}>
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <Zap className="w-6 h-6 text-indigo-400" />
          {!isCollapsed && (
            <h1 className="text-xl font-bold ml-2 text-white">Scrappy Pro</h1>
          )}
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="p-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>
      )}
      
      <nav className="mt-2 px-2">
        {!isCollapsed && (
          <div className="mb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Principal
          </div>
        )}
        <ul className="space-y-1">
          {menuItems.slice(0, 5).map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path) 
                    ? 'bg-indigo-900/30 text-indigo-400' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className={`${isActive(item.path) ? 'text-indigo-400' : 'text-gray-400'}`}>
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="ml-3">{item.label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {!isCollapsed && (
          <div className="my-4 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Système
          </div>
        )}
        <ul className="space-y-1">
          {menuItems.slice(5).map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path) 
                    ? 'bg-indigo-900/30 text-indigo-400'  
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className={`${isActive(item.path) ? 'text-indigo-400' : 'text-gray-400'}`}>
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="ml-3">{item.label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        {user && !isCollapsed ? (
          <div className="flex items-center mb-4">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-medium">
                  {user.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
            )}
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-gray-400">{user.role === 'admin' ? 'Administrateur' : user.role === 'manager' ? 'Manager' : 'Utilisateur'}</p>
            </div>
          </div>
        ) : (
          user && (
            <div className="flex justify-center mb-4">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          )
        )}
        
        <button
          onClick={onLogout}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : ''} px-4 py-2 rounded-lg text-red-400 hover:bg-gray-700 hover:text-red-300`}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="ml-3">Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
}; 