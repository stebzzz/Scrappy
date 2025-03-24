import React, { useState } from 'react';
import { 
  Menu, Bell, Search, ChevronDown, Settings, MessageSquare, 
  User, LogOut, Star, AlignJustify, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface InfluencerHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const InfluencerHeader: React.FC<InfluencerHeaderProps> = ({ 
  sidebarOpen, 
  setSidebarOpen 
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  return (
    <header className="sticky top-0 bg-gray-800 border-b border-gray-700 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Gauche */}
          <div className="flex items-center">
            {/* Bouton mobile menu */}
            <button
              className="text-gray-400 hover:text-white lg:hidden mr-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <AlignJustify className="w-6 h-6" />
            </button>
            
            {/* Logo Scrappy Pro */}
            <Link to="/influencer" className="flex items-center">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md p-1.5 mr-2 flex items-center">
                <Zap className="h-5 w-5 text-white" />
                <span className="ml-1 font-bold text-white text-sm hidden xs:inline-block">SCRAPPY</span>
                <span className="font-light text-gray-200 text-sm hidden xs:inline-block">PRO</span>
              </div>
              <span className="text-white font-semibold hidden md:block ml-2">
                Interface Influenceur
              </span>
            </Link>
          </div>
          
          {/* Recherche */}
          <div className="hidden md:flex items-center px-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-64 rounded-md bg-gray-700 border border-gray-600 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-white">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Droite */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                className="relative p-2 text-gray-400 hover:text-white focus:outline-none"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
              </button>
              
              {/* Dropdown notifications */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-white">Notifications</h3>
                      <span className="px-2 py-1 bg-pink-900/30 text-pink-500 rounded-full text-xs">5 nouvelles</span>
                    </div>
                  </div>
                  
                  <div className="max-h-72 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700">
                      <div className="flex">
                        <div className="flex-shrink-0 mr-3">
                          <div className="w-9 h-9 rounded-full bg-blue-900/30 flex items-center justify-center">
                            <MessageSquare className="h-5 w-5 text-blue-500" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-white">
                            <span className="font-medium">Nouveau message</span> de Sephora concernant votre proposition
                          </p>
                          <p className="text-xs text-gray-400 mt-1">Il y a 10 minutes</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-4 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700">
                      <div className="flex">
                        <div className="flex-shrink-0 mr-3">
                          <div className="w-9 h-9 rounded-full bg-emerald-900/30 flex items-center justify-center">
                            <Star className="h-5 w-5 text-emerald-500" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-white">
                            <span className="font-medium">Campagne acceptée!</span> Nike a approuvé votre participation
                          </p>
                          <p className="text-xs text-gray-400 mt-1">Il y a 1 heure</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-4 py-3 hover:bg-gray-700 transition-colors">
                      <div className="flex">
                        <div className="flex-shrink-0 mr-3">
                          <div className="w-9 h-9 rounded-full bg-amber-900/30 flex items-center justify-center">
                            <Bell className="h-5 w-5 text-amber-500" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-white">
                            <span className="font-medium">Rappel:</span> Publication prévue demain pour Adidas
                          </p>
                          <p className="text-xs text-gray-400 mt-1">Il y a 3 heures</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 py-2 border-t border-gray-700">
                    <Link to="/influencer/notifications" className="text-sm text-pink-500 hover:text-pink-400 block text-center">
                      Voir toutes les notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Profil utilisateur */}
            <div className="relative">
              <button
                className="flex items-center text-gray-400 hover:text-white transition-colors focus:outline-none"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 mr-1 flex items-center justify-center text-white text-sm font-medium">
                  SM
                </div>
                <span className="hidden md:inline-block ml-1 text-sm text-white">
                  Sophia
                </span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {/* Dropdown menu utilisateur */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-sm text-white font-medium">Sophia Martinez</p>
                    <p className="text-xs text-gray-400">@sophialifestyle</p>
                  </div>
                  
                  <Link 
                    to="/influencer/profile" 
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Mon profil
                    </div>
                  </Link>
                  
                  <Link 
                    to="/influencer/settings" 
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Paramètres
                    </div>
                  </Link>
                  
                  <div className="border-t border-gray-700 my-1"></div>
                  
                  <Link 
                    to="/login" 
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      Déconnexion
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default InfluencerHeader; 