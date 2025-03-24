import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Layout, BarChart2, Users, MessageSquare,
  Calendar, Settings, LogOut, Menu, X, Zap
} from 'lucide-react';
import { fetchCurrentUser, logout } from '../../services/authService';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface SidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

const InfluencerSidebar: React.FC<SidebarProps> = ({ onClose, isMobile = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetchCurrentUser();
        if (response.success && response.user) {
          setUser(response.user);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données utilisateur:', error);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const navItems = [
    {
      title: 'Tableau de bord',
      icon: <Layout className="w-5 h-5" />,
      path: '/influencer/dashboard',
    },
    {
      title: 'Analyse',
      icon: <BarChart2 className="w-5 h-5" />,
      path: '/influencer/analytics',
    },
    {
      title: 'Campagnes',
      icon: <Users className="w-5 h-5" />,
      path: '/influencer/campaigns',
    },
    {
      title: 'Messagerie',
      icon: <MessageSquare className="w-5 h-5" />,
      path: '/influencer/messages',
    },
    {
      title: 'Calendrier',
      icon: <Calendar className="w-5 h-5" />,
      path: '/influencer/calendar',
    },
    {
      title: 'Paramètres',
      icon: <Settings className="w-5 h-5" />,
      path: '/influencer/settings',
    },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside 
      className={`
        ${isCollapsed ? 'w-20' : 'w-64'} 
        ${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'} 
        flex flex-col bg-gray-900 border-r border-gray-800 transition-all duration-300
      `}
    >
      {isMobile && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
      )}
      
      <div className="flex items-center p-4 border-b border-gray-800">
        <div className="bg-indigo-900/30 p-2 rounded-lg mr-3">
          <Zap className={`h-6 w-6 text-indigo-400 ${isCollapsed ? 'mx-auto' : ''}`} />
        </div>
        {!isCollapsed && <span className="font-bold text-white">Scrappy Pro</span>}
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`
                  flex items-center px-3 py-2 rounded-lg text-sm font-medium
                  ${isActive(item.path) 
                    ? 'bg-indigo-900/30 text-indigo-400' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }
                `}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!isCollapsed && <span className="ml-3">{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-4 border-t border-gray-800">
        {!isCollapsed && user && (
          <div className="flex items-center mb-4">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="h-8 w-8 rounded-full mr-3"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
                <span className="text-white text-sm font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user.email}
              </p>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 rounded-lg hover:bg-gray-800"
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Déconnexion</span>}
          </button>
          
          <button
            onClick={toggleCollapse}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default InfluencerSidebar; 