import React from 'react';
import { 
  Home, Users, Briefcase, Settings, 
  BarChart2, MessageSquare, Award, LogOut,
  HelpCircle, X, Camera, Heart, DollarSign, Star, 
  Clock, Bell, Calendar, ArrowUpRight, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface InfluencerSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const InfluencerSidebar: React.FC<InfluencerSidebarProps> = ({ 
  sidebarOpen,
  setSidebarOpen
}) => {
  return (
    <>
      {/* Sidebar mobile */}
      <div 
        className={`fixed inset-0 z-50 bg-gray-900 bg-opacity-80 transition-opacity lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        aria-hidden="true"
        onClick={() => setSidebarOpen(false)}
      ></div>
      
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700 lg:hidden">
          <Link to="/influencer" className="flex items-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md p-1.5 mr-2 flex items-center">
              <Zap className="h-5 w-5 text-white" />
              <span className="ml-1 font-bold text-white text-sm">SCRAPPY</span>
              <span className="font-light text-gray-200 text-sm">PRO</span>
            </div>
          </Link>
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Sidebar content */}
        <div className="px-4 py-6">
          {/* Profil */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 mr-3 flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Sophia Martinez</div>
                <div className="text-xs text-gray-400">@sophialifestyle</div>
              </div>
            </div>
            <div className="bg-gray-700 rounded-md p-2 flex justify-between text-xs">
              <div className="text-center">
                <div className="text-white font-medium">145.6K</div>
                <div className="text-gray-400">Abonnés</div>
              </div>
              <div className="text-center">
                <div className="text-white font-medium">4.8%</div>
                <div className="text-gray-400">Engagement</div>
              </div>
              <div className="text-center">
                <div className="text-white font-medium">3</div>
                <div className="text-gray-400">Campagnes</div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="space-y-1">
            <Link 
              to="/influencer"
              className="flex items-center px-3 py-2 text-white bg-gray-700 rounded-md"
            >
              <Home className="h-5 w-5 mr-3" />
              <span>Tableau de bord</span>
            </Link>
            <Link 
              to="/influencer/campaigns"
              className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            >
              <Briefcase className="h-5 w-5 mr-3" />
              <span>Mes campagnes</span>
            </Link>
            <Link 
              to="/influencer/opportunities"
              className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            >
              <Star className="h-5 w-5 mr-3" />
              <span>Opportunités</span>
              <span className="ml-auto px-2 py-1 bg-pink-900/30 text-pink-500 rounded-full text-xs">
                6
              </span>
            </Link>
            <Link 
              to="/influencer/content"
              className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            >
              <Camera className="h-5 w-5 mr-3" />
              <span>Contenu</span>
            </Link>
            <Link 
              to="/influencer/analytics"
              className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            >
              <BarChart2 className="h-5 w-5 mr-3" />
              <span>Performances</span>
            </Link>
            <Link 
              to="/influencer/messages"
              className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            >
              <MessageSquare className="h-5 w-5 mr-3" />
              <span>Messages</span>
              <span className="ml-auto px-2 py-1 bg-blue-900/30 text-blue-500 rounded-full text-xs">
                3
              </span>
            </Link>
            <Link 
              to="/influencer/calendar"
              className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            >
              <Calendar className="h-5 w-5 mr-3" />
              <span>Calendrier</span>
            </Link>
          </div>
          
          {/* Section gains */}
          <div className="mt-6">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Finances
            </div>
            <div className="mt-3 bg-gradient-to-r from-purple-900/60 to-pink-900/60 rounded-lg p-4 border border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Revenus du mois</span>
                <DollarSign className="h-4 w-4 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">2,450€</div>
              <div className="flex items-center text-xs text-emerald-400">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+15% vs mois précédent</span>
              </div>
              <button className="w-full mt-4 px-3 py-1.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-md text-white text-sm hover:opacity-90 transition-opacity">
                Voir les détails
              </button>
            </div>
          </div>
          
          {/* Section quitter */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <Link 
              to="/influencer/settings"
              className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            >
              <Settings className="h-5 w-5 mr-3" />
              <span>Paramètres</span>
            </Link>
            <Link 
              to="/influencer/help"
              className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            >
              <HelpCircle className="h-5 w-5 mr-3" />
              <span>Aide et support</span>
            </Link>
            <Link 
              to="/login"
              className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Déconnexion</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfluencerSidebar; 