import React, { useState, useEffect } from 'react';
import { 
  Shield, Users, Activity, Database, Settings, 
  Server, Search, Bell, ChevronDown, LogOut, 
  PieChart, TrendingUp, Zap, Briefcase, UserPlus,
  AlertTriangle, CheckCircle, ArrowUpRight, 
  HardDrive, Code, Bot, Terminal, Key
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    totalAgencies: 24,
    totalManagers: 78,
    totalInfluencers: 1450,
    activeCampaigns: 56,
    totalRevenue: 248750,
    monthlyRevenue: 42800,
    apiCalls: 1568920,
    scrapingJobs: 112,
    dbSize: 124.5,
    uptime: 99.98,
    pendingApprovals: 8
  });
  
  const [recentAgencies, setRecentAgencies] = useState([
    { id: 1, name: 'Influence Hub Agency', managers: 4, influencers: 48, revenue: 12400, status: 'active' },
    { id: 2, name: 'CreatorBoost Media', managers: 3, influencers: 35, revenue: 8960, status: 'active' },
    { id: 3, name: 'SocialWave Partners', managers: 2, influencers: 22, revenue: 5340, status: 'pending' },
    { id: 4, name: 'GrowthMakers', managers: 5, influencers: 64, revenue: 18700, status: 'active' },
    { id: 5, name: 'FutureTrend Agency', managers: 1, influencers: 15, revenue: 3200, status: 'active' }
  ]);
  
  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 fixed w-full z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md p-1.5 mr-3 flex items-center">
                <Zap className="h-5 w-5 text-white" />
                <span className="ml-1 font-bold text-white text-sm">SCRAPPY</span>
                <span className="font-light text-gray-200 text-sm">PRO</span>
              </div>
              <span className="text-white font-semibold">Administration Système</span>
            </div>
            
            <div className="flex items-center">
              <div className="relative mr-4">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-64 bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="absolute right-0 top-0 h-full px-3 text-gray-400">
                  <Search className="h-4 w-4" />
                </button>
              </div>
              
              <button className="relative p-2 text-gray-400 hover:text-white">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
              </button>
              
              <div className="ml-4 relative">
                <button className="flex items-center text-gray-300 hover:text-white">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-700 to-purple-800 flex items-center justify-center text-white text-sm font-medium">
                    SA
                  </div>
                  <span className="ml-2 text-sm hidden md:block">System Admin</span>
                  <ChevronDown className="ml-1 h-4 w-4 hidden md:block" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-gray-800 border-r border-gray-700 pt-16 z-0">
        <div className="px-4 py-6">
          <nav className="space-y-1">
            <Link to="/admin" className="flex items-center px-4 py-2.5 text-white bg-indigo-900/50 rounded-md group">
              <Activity className="h-5 w-5 mr-3 text-indigo-400" />
              <span>Tableau de bord</span>
            </Link>
            
            <Link to="/admin/agencies" className="flex items-center px-4 py-2.5 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md group">
              <Briefcase className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white" />
              <span>Agences</span>
            </Link>
            
            <Link to="/admin/managers" className="flex items-center px-4 py-2.5 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md group">
              <Users className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white" />
              <span>Managers</span>
            </Link>
            
            <Link to="/admin/analytics" className="flex items-center px-4 py-2.5 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md group">
              <PieChart className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white" />
              <span>Statistiques</span>
            </Link>
            
            <div className="pt-4 mt-4 border-t border-gray-700">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                SYSTÈME
              </h3>
              
              <div className="mt-2 space-y-1">
                <Link to="/admin/scraping" className="flex items-center px-4 py-2.5 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md group">
                  <Terminal className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white" />
                  <span>Scraping</span>
                </Link>
                
                <Link to="/admin/ai-agents" className="flex items-center px-4 py-2.5 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md group">
                  <Bot className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white" />
                  <span>Agents IA</span>
                </Link>
                
                <Link to="/admin/database" className="flex items-center px-4 py-2.5 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md group">
                  <Database className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white" />
                  <span>Base de données</span>
                </Link>
                
                <Link to="/admin/server" className="flex items-center px-4 py-2.5 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md group">
                  <Server className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white" />
                  <span>Serveurs</span>
                </Link>
                
                <Link to="/admin/api" className="flex items-center px-4 py-2.5 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md group">
                  <Code className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white" />
                  <span>API</span>
                </Link>
              </div>
            </div>
            
            <div className="pt-4 mt-4 border-t border-gray-700">
              <Link to="/admin/settings" className="flex items-center px-4 py-2.5 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md group">
                <Settings className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white" />
                <span>Paramètres</span>
              </Link>
              
              <Link to="/logout" className="flex items-center px-4 py-2.5 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md group">
                <LogOut className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white" />
                <span>Déconnexion</span>
              </Link>
            </div>
          </nav>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="pt-16 pl-64">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-white">Tableau de bord administrateur</h1>
            
            <div className="flex space-x-4">
              <button className="flex items-center px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-md text-sm transition">
                <UserPlus className="h-4 w-4 mr-2" />
                Créer une agence
              </button>
              
              <button className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm transition">
                <Terminal className="h-4 w-4 mr-2" />
                Configurer le scraping
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <>
              {/* Statistiques générales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-gray-400 text-sm">Agences</div>
                    <div className="p-2 bg-indigo-900/30 rounded-md">
                      <Briefcase className="h-5 w-5 text-indigo-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white">{statsData.totalAgencies}</div>
                  <div className="mt-2 text-xs text-emerald-400 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>+12.5% ce mois</span>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-gray-400 text-sm">Managers</div>
                    <div className="p-2 bg-blue-900/30 rounded-md">
                      <Users className="h-5 w-5 text-blue-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white">{statsData.totalManagers}</div>
                  <div className="mt-2 text-xs text-emerald-400 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>+8.3% ce mois</span>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-gray-400 text-sm">Influenceurs</div>
                    <div className="p-2 bg-purple-900/30 rounded-md">
                      <Users className="h-5 w-5 text-purple-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white">{statsData.totalInfluencers}</div>
                  <div className="mt-2 text-xs text-emerald-400 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>+24.6% ce mois</span>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-gray-400 text-sm">Revenu mensuel</div>
                    <div className="p-2 bg-emerald-900/30 rounded-md">
                      <TrendingUp className="h-5 w-5 text-emerald-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white">{statsData.monthlyRevenue.toLocaleString()}€</div>
                  <div className="mt-2 text-xs text-emerald-400 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>+18.2% vs dernier mois</span>
                  </div>
                </div>
              </div>
              
              {/* Section principale */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Liste des agences récentes */}
                <div className="xl:col-span-2 bg-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-white">Agences récentes</h2>
                    <Link to="/admin/agencies" className="text-indigo-400 text-sm hover:text-indigo-300">
                      Voir toutes
                    </Link>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-700/50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Agence
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Managers
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Influenceurs
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Revenu
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Statut
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700 bg-gray-800">
                        {recentAgencies.map((agency) => (
                          <tr key={agency.id} className="hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-white">{agency.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-300">{agency.managers}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-300">{agency.influencers}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-emerald-400">{agency.revenue.toLocaleString()}€</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {agency.status === 'active' ? (
                                <span className="px-2 py-1 text-xs rounded-full bg-emerald-900/30 text-emerald-500">
                                  Actif
                                </span>
                              ) : (
                                <span className="px-2 py-1 text-xs rounded-full bg-amber-900/30 text-amber-500">
                                  En attente
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button className="p-1 text-gray-400 hover:text-white">
                                  <Settings className="h-4 w-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-white">
                                  <Key className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Section droite */}
                <div className="space-y-8">
                  {/* Statut du système */}
                  <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-white">État du système</h3>
                      <span className="flex items-center px-2 py-1 text-xs rounded-full bg-emerald-900/30 text-emerald-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Opérationnel
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                          <Server className="h-4 w-4 inline mr-2 text-indigo-400" />
                          Serveurs
                        </div>
                        <div className="text-sm text-white flex items-center">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                          {statsData.uptime}% uptime
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                          <Database className="h-4 w-4 inline mr-2 text-blue-400" />
                          Base de données
                        </div>
                        <div className="text-sm text-white">
                          {statsData.dbSize} GB
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                          <Terminal className="h-4 w-4 inline mr-2 text-amber-400" />
                          Jobs de scraping
                        </div>
                        <div className="text-sm text-white">
                          {statsData.scrapingJobs} actifs
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                          <Bot className="h-4 w-4 inline mr-2 text-purple-400" />
                          Agents IA
                        </div>
                        <div className="text-sm text-white">
                          12 actifs
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                          <Code className="h-4 w-4 inline mr-2 text-emerald-400" />
                          Appels API
                        </div>
                        <div className="text-sm text-white">
                          {(statsData.apiCalls / 1000).toFixed(1)}K aujourd'hui
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full mt-4 py-2 px-4 bg-gray-700 hover:bg-gray-600 text-sm text-white rounded-md transition">
                      Voir rapport détaillé
                    </button>
                  </div>
                  
                  {/* Approbations en attente */}
                  <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-white">Approbations en attente</h3>
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-900/50 text-amber-500 text-xs font-semibold">
                        {statsData.pendingApprovals}
                      </span>
                    </div>
                    
                    <div className="divide-y divide-gray-700">
                      <div className="py-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-white">Nouvelle agence: TrendForce</span>
                          <span className="text-xs text-gray-400">Il y a 2h</span>
                        </div>
                        <div className="flex justify-end space-x-2 mt-2">
                          <button className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white text-xs rounded">
                            Approuver
                          </button>
                          <button className="px-3 py-1 bg-red-700/50 hover:bg-red-700 text-white text-xs rounded">
                            Refuser
                          </button>
                        </div>
                      </div>
                      
                      <div className="py-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-white">Demande d'accès API: SocialWave</span>
                          <span className="text-xs text-gray-400">Il y a 5h</span>
                        </div>
                        <div className="flex justify-end space-x-2 mt-2">
                          <button className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white text-xs rounded">
                            Approuver
                          </button>
                          <button className="px-3 py-1 bg-red-700/50 hover:bg-red-700 text-white text-xs rounded">
                            Refuser
                          </button>
                        </div>
                      </div>
                      
                      <div className="py-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-white">Augmentation quota scraping: CreatorBoost</span>
                          <span className="text-xs text-gray-400">Il y a 1j</span>
                        </div>
                        <div className="flex justify-end space-x-2 mt-2">
                          <button className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white text-xs rounded">
                            Approuver
                          </button>
                          <button className="px-3 py-1 bg-red-700/50 hover:bg-red-700 text-white text-xs rounded">
                            Refuser
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 