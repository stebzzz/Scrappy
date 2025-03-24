import React from 'react';
import { 
  Home, Users, Briefcase, Settings, 
  BarChart2, MessageSquare, Database, LogOut,
  HelpCircle, X, Target, FileText, Calendar,
  DollarSign, TrendingUp, Shield, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ManagerSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const ManagerSidebar: React.FC<ManagerSidebarProps> = ({ 
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
          <Link to="/manager" className="flex items-center">
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 mr-3 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Thomas Martin</div>
                <div className="text-xs text-gray-400">Gestionnaire de campagnes</div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="space-y-1">
            <Link 
              to="/manager"
              className="flex items-center px-3 py-2 text-white bg-gray-700 rounded-md"
            >
              <Home className="h-5 w-5 mr-3" />
              <span>Tableau de bord</span>
            </Link>
            <Link 
              to="/manager/campaigns"
              className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            >
              <Briefcase className="h-5 w-5 mr-3" />
              <span>Campagnes</span>
              <span className="ml-auto px-2 py-1 bg-emerald-900/30 text-emerald-500 rounded-full text-xs">
                12
              </span>
            </Link>
            <Link 
              to="/manager/influencers"
              className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            >
              <Users className="h-5 w-5 mr-3" />
              <span>Influenceurs</span>
            </Link>
            <Link 
              to="/manager/analytics"
              className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            >
              <BarChart2 className="h-5 w-5 mr-3" />
              <span>Performances</span>
            </Link>
            <Link 
              to="/manager/budget"
              className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            >
              <DollarSign className="h-5 w-5 mr-3" />
              <span>Budget</span>
            </Link>
            <Link 
              to="/manager/messages"
              className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            >
              <MessageSquare className="h-5 w-5 mr-3" />
              <span>Messages</span>
              <span className="ml-auto px-2 py-1 bg-blue-900/30 text-blue-500 rounded-full text-xs">
                5
              </span>
            </Link>
            <Link 
              to="/manager/calendar"
              className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            >
              <Calendar className="h-5 w-5 mr-3" />
              <span>Calendrier</span>
            </Link>
          </div>
          
          {/* Section rapports */}
          <div className="mt-6">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Rapports
            </div>
            <div className="mt-3 space-y-1">
              <Link 
                to="/manager/reports/performance"
                className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
              >
                <TrendingUp className="h-5 w-5 mr-3" />
                <span>Performance</span>
              </Link>
              <Link 
                to="/manager/reports/goals"
                className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
              >
                <Target className="h-5 w-5 mr-3" />
                <span>Objectifs</span>
              </Link>
              <Link 
                to="/manager/reports/documents"
                className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
              >
                <FileText className="h-5 w-5 mr-3" />
                <span>Documents</span>
              </Link>
            </div>
          </div>
          
          {/* Section admin */}
          <div className="mt-6">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Administration
            </div>
            <div className="mt-3 space-y-1">
              <Link 
                to="/manager/database"
                className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
              >
                <Database className="h-5 w-5 mr-3" />
                <span>Base de données</span>
              </Link>
              <Link 
                to="/manager/security"
                className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
              >
                <Shield className="h-5 w-5 mr-3" />
                <span>Sécurité</span>
              </Link>
            </div>
          </div>
          
          {/* Section quitter */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <Link 
              to="/manager/settings"
              className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            >
              <Settings className="h-5 w-5 mr-3" />
              <span>Paramètres</span>
            </Link>
            <Link 
              to="/manager/help"
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

export default ManagerSidebar; 