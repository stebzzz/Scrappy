import React, { useState, useEffect } from 'react';
import { 
  Users, Briefcase, BarChart, TrendingUp, 
  Target, Calendar, Activity, DollarSign,
  Clock, Zap, ChevronRight, UserCheck,
  MessageSquare, CheckCircle, X, AlertTriangle, FileText
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ManagerHeader from '../components/manager/ManagerHeader';
import ManagerSidebar from '../components/manager/ManagerSidebar';
import CampaignStatusCard from '../components/manager/CampaignStatusCard';
import InfluencerPerformanceTable from '../components/manager/InfluencerPerformanceTable';
import UpcomingCampaigns from '../components/manager/UpcomingCampaigns';

const ManagerDashboard: React.FC = () => {
  const { darkMode } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [campaignStats, setCampaignStats] = useState({
    active: 12,
    pending: 5,
    completed: 28,
    totalBudget: 236500,
    spent: 118240,
    roi: 2.4,
    influencersActive: 54,
    pendingApprovals: 7,
    engagementRate: 4.8,
    leadCount: 1843,
    conversionRate: 3.2
  });
  
  useEffect(() => {
    const loadData = async () => {
      // Simuler le chargement des données
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    
    loadData();
  }, []);
  
  return (
    <div className="flex h-screen bg-gray-900">
      <ManagerSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <ManagerHeader 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-gray-200 mb-2">Tableau de bord</h1>
            <p className="text-gray-400 mb-8">Bienvenue dans votre espace manager, suivez vos campagnes et performances</p>
            
            <div className="mb-8">
              <div className="flex items-center border-b border-gray-700 mb-4">
                <button 
                  className={`mr-6 py-2 ${activeTab === 'overview' 
                    ? 'border-b-2 border-emerald-500 text-emerald-500' 
                    : 'text-gray-400 hover:text-gray-200'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Vue d'ensemble
                </button>
                <button 
                  className={`mr-6 py-2 ${activeTab === 'campaigns' 
                    ? 'border-b-2 border-emerald-500 text-emerald-500' 
                    : 'text-gray-400 hover:text-gray-200'}`}
                  onClick={() => setActiveTab('campaigns')}
                >
                  Campagnes
                </button>
                <button 
                  className={`mr-6 py-2 ${activeTab === 'influencers' 
                    ? 'border-b-2 border-emerald-500 text-emerald-500' 
                    : 'text-gray-400 hover:text-gray-200'}`}
                  onClick={() => setActiveTab('influencers')}
                >
                  Influenceurs
                </button>
                <button 
                  className={`mr-6 py-2 ${activeTab === 'analytics' 
                    ? 'border-b-2 border-emerald-500 text-emerald-500' 
                    : 'text-gray-400 hover:text-gray-200'}`}
                  onClick={() => setActiveTab('analytics')}
                >
                  Analyses
                </button>
              </div>
            </div>
            
            {/* Aperçu rapide des statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800 rounded-lg shadow p-4 border border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-emerald-900/30 text-emerald-500">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-400 text-sm">Campagnes Actives</p>
                    <p className="text-2xl font-semibold text-white">
                      {isLoading ? '-' : campaignStats.active}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <span className="text-xs text-emerald-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    12%
                  </span>
                  <span className="text-xs text-gray-400 ml-2">vs mois précédent</span>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg shadow p-4 border border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-900/30 text-blue-500">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-400 text-sm">Influenceurs Actifs</p>
                    <p className="text-2xl font-semibold text-white">
                      {isLoading ? '-' : campaignStats.influencersActive}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <span className="text-xs text-emerald-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    8%
                  </span>
                  <span className="text-xs text-gray-400 ml-2">vs mois précédent</span>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg shadow p-4 border border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-900/30 text-purple-500">
                    <Target className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-400 text-sm">Taux d'Engagement</p>
                    <p className="text-2xl font-semibold text-white">
                      {isLoading ? '-' : `${campaignStats.engagementRate}%`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <span className="text-xs text-emerald-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    1.2%
                  </span>
                  <span className="text-xs text-gray-400 ml-2">vs mois précédent</span>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg shadow p-4 border border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-amber-900/30 text-amber-500">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-400 text-sm">ROI</p>
                    <p className="text-2xl font-semibold text-white">
                      {isLoading ? '-' : `${campaignStats.roi}x`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <span className="text-xs text-emerald-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    15%
                  </span>
                  <span className="text-xs text-gray-400 ml-2">vs mois précédent</span>
                </div>
              </div>
            </div>
            
            {/* Graphiques des données et performance */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Performance des Campagnes</h3>
                  <div className="flex items-center">
                    <select className="text-sm bg-gray-700 text-gray-300 rounded border-none px-3 py-1 mr-2">
                      <option>7 derniers jours</option>
                      <option>30 derniers jours</option>
                      <option>3 derniers mois</option>
                    </select>
                    <Zap className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="h-72 bg-gray-900/50 flex items-center justify-center rounded">
                  {isLoading ? (
                    <div className="animate-pulse">
                      <p className="text-gray-400">Chargement des données...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <BarChart className="h-10 w-10 mx-auto text-gray-500 mb-3" />
                      <p className="text-gray-400">
                        Graphique des performances (simulé)
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-6">Campagnes à Approuver</h3>
                
                {isLoading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-12 bg-gray-700 rounded"></div>
                    <div className="h-12 bg-gray-700 rounded"></div>
                    <div className="h-12 bg-gray-700 rounded"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">Nike Summer</p>
                        <span className="px-2 py-1 bg-amber-900/30 text-amber-500 rounded text-xs">En attente</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">4 influenceurs</span>
                        <div className="flex space-x-1">
                          <button className="p-1 bg-emerald-900/30 text-emerald-500 rounded hover:bg-emerald-900/50">
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button className="p-1 bg-red-900/30 text-red-500 rounded hover:bg-red-900/50">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">Sephora Beauty</p>
                        <span className="px-2 py-1 bg-amber-900/30 text-amber-500 rounded text-xs">En attente</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">2 influenceurs</span>
                        <div className="flex space-x-1">
                          <button className="p-1 bg-emerald-900/30 text-emerald-500 rounded hover:bg-emerald-900/50">
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button className="p-1 bg-red-900/30 text-red-500 rounded hover:bg-red-900/50">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">Zara Collection</p>
                        <span className="px-2 py-1 bg-amber-900/30 text-amber-500 rounded text-xs">En attente</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">3 influenceurs</span>
                        <div className="flex space-x-1">
                          <button className="p-1 bg-emerald-900/30 text-emerald-500 rounded hover:bg-emerald-900/50">
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button className="p-1 bg-red-900/30 text-red-500 rounded hover:bg-red-900/50">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg flex items-center justify-center mt-2">
                      <span>Voir tout</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Activité Récente */}
            <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-white">Activité Récente</h3>
                <div className="flex items-center">
                  <button className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded px-3 py-1">
                    Nouvelle Campagne
                  </button>
                </div>
              </div>
              
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-16 bg-gray-700 rounded"></div>
                  <div className="h-16 bg-gray-700 rounded"></div>
                  <div className="h-16 bg-gray-700 rounded"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Campagne</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Influenceur</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="p-2 rounded-full bg-emerald-900/30 text-emerald-500">
                              <CheckCircle className="h-4 w-4" />
                            </div>
                            <span className="ml-2 text-white">Publication approuvée</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">Nike Summer Collection</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">@sophiafashion</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-400">Aujourd'hui, 10:30</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-emerald-900/30 text-emerald-500 rounded text-xs">Complété</span>
                        </td>
                      </tr>
                      
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="p-2 rounded-full bg-amber-900/30 text-amber-500">
                              <Clock className="h-4 w-4" />
                            </div>
                            <span className="ml-2 text-white">Publication en attente</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">Adidas Running</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">@michaelfitness</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-400">Aujourd'hui, 09:15</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-amber-900/30 text-amber-500 rounded text-xs">En attente</span>
                        </td>
                      </tr>
                      
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="p-2 rounded-full bg-blue-900/30 text-blue-500">
                              <MessageSquare className="h-4 w-4" />
                            </div>
                            <span className="ml-2 text-white">Nouveau message</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">H&M Collection</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">@fashionista</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-400">Hier, 18:42</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-purple-900/30 text-purple-500 rounded text-xs">Message</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManagerDashboard; 