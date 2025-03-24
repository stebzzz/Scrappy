import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, MessageSquare, ChevronDown, User, Settings, LogOut, Menu } from 'lucide-react';

interface HeaderProps {
  user: any;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  return (
    <header className="bg-gray-800 border-b border-gray-700 h-16 flex items-center px-4 sticky top-0 z-10">
      <div className="flex-1 flex justify-between items-center">
        <div className="lg:hidden">
          <button className="text-gray-400 hover:text-white">
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex-1 ml-4 lg:ml-0">
          <h1 className="text-xl font-bold text-white">Tableau de bord</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button 
              className="relative text-gray-400 hover:text-white"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
            
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-1 z-20">
                <div className="px-4 py-2 border-b border-gray-700">
                  <h3 className="text-sm font-medium text-white">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {[1, 2, 3].map((notification) => (
                    <div key={notification} className="px-4 py-3 hover:bg-gray-700 border-b border-gray-700">
                      <p className="text-sm text-white">Nouvelle opportunité de campagne</p>
                      <p className="text-xs text-gray-400 mt-1">Il y a 2 heures</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 text-center">
                  <button className="text-sm text-indigo-400 hover:text-indigo-300">
                    Voir toutes les notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Messages */}
          <div className="relative">
            <button className="relative text-gray-400 hover:text-white">
              <MessageSquare className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </button>
          </div>
          
          {/* User dropdown */}
          <div className="relative">
            <button 
              className="flex items-center space-x-2 text-gray-400 hover:text-white focus:outline-none"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
              )}
              <span className="hidden md:block text-sm font-medium text-white">{user?.name || 'Utilisateur'}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-1 z-20">
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-sm text-white">{user?.name || 'Utilisateur'}</p>
                  <p className="text-xs text-gray-400 mt-1">{user?.email || 'exemple@email.com'}</p>
                </div>
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Profil
                  </div>
                </Link>
                <Link to="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Paramètres
                  </div>
                </Link>
                <button 
                  onClick={onLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
                >
                  <div className="flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}; 