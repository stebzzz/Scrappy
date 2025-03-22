import React, { useState } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Download, 
  Filter, 
  RefreshCw, 
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  ThumbsUp,
  ShoppingCart,
  DollarSign,
  Activity,
  PieChart,
  LineChart,
  BarChart,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  HelpCircle
} from 'lucide-react';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30j');
  const [activeTab, setActiveTab] = useState('overview');

  // Données fictives pour les KPIs
  const kpis = {
    reach: {
      value: '4.2M',
      change: '+12.5%',
      trend: 'up'
    },
    impressions: {
      value: '8.7M',
      change: '+8.3%',
      trend: 'up'
    },
    engagement: {
      value: '320K',
      change: '+15.2%',
      trend: 'up'
    },
    conversion: {
      value: '12.4K',
      change: '-3.1%',
      trend: 'down'
    },
    roi: {
      value: '342%',
      change: '+5.7%',
      trend: 'up'
    }
  };

  // Données fictives pour les campagnes
  const topCampaigns = [
    {
      id: 1,
      name: 'Collection Été 2025',
      brand: "L'Oréal Paris",
      reach: '1.2M',
      engagement: '4.7%',
      conversion: '3.2%',
      roi: '285%'
    },
    {
      id: 2,
      name: 'Nouveau Parfum',
      brand: 'Dior',
      reach: '950K',
      engagement: '5.2%',
      conversion: '4.5%',
      roi: '320%'
    },
    {
      id: 3,
      name: 'Essentiels Printemps',
      brand: 'Sephora France',
      reach: '2.1M',
      engagement: '3.8%',
      conversion: '2.9%',
      roi: '245%'
    }
  ];

  // Données fictives pour les influenceurs
  const topInfluencers = [
    {
      id: 1,
      name: 'Marfitfrance',
      category: 'Fitness',
      followers: '245K',
      engagement: '4.2%',
      campaigns: 8,
      performance: '98%'
    },
    {
      id: 2,
      name: 'Louska',
      category: 'Lifestyle',
      followers: '320K',
      engagement: '3.8%',
      campaigns: 6,
      performance: '95%'
    },
    {
      id: 3,
      name: 'SuperBoomJ',
      category: 'Gaming',
      followers: '510K',
      engagement: '5.1%',
      campaigns: 4,
      performance: '97%'
    },
    {
      id: 4,
      name: 'TheWingzer',
      category: 'Tech',
      followers: '180K',
      engagement: '4.5%',
      campaigns: 5,
      performance: '92%'
    },
    {
      id: 5,
      name: 'Grandingo',
      category: 'Voyage',
      followers: '290K',
      engagement: '4.8%',
      campaigns: 7,
      performance: '96%'
    }
  ];

  // Fonction pour obtenir la couleur de tendance
  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-emerald-400' : 'text-red-400';
  };

  // Fonction pour obtenir l'icône de tendance
  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <ArrowUpRight className="w-4 h-4 text-emerald-400" /> : 
      <ArrowDownRight className="w-4 h-4 text-red-400" />;
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-purple-400" />
          Analytique
        </h1>
        <div className="flex space-x-2">
          <div className="relative">
            <select 
              className="appearance-none bg-gray-700 border border-gray-600 text-white rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="7j">7 derniers jours</option>
              <option value="30j">30 derniers jours</option>
              <option value="90j">90 derniers jours</option>
              <option value="1a">12 derniers mois</option>
              <option value="custom">Personnalisé</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
          <button className="btn-secondary flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </button>
          <button className="btn-outline flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
        </div>
      </div>

      {/* Onglets */}
      <div className="mb-6 border-b border-gray-700">
        <div className="flex space-x-1">
          <button 
            className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
              activeTab === 'overview' 
                ? 'bg-gray-800 text-white border-t border-l border-r border-gray-700' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Vue d'ensemble
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
              activeTab === 'campaigns' 
                ? 'bg-gray-800 text-white border-t border-l border-r border-gray-700' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('campaigns')}
          >
            Campagnes
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
              activeTab === 'influencers' 
                ? 'bg-gray-800 text-white border-t border-l border-r border-gray-700' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('influencers')}
          >
            Influenceurs
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
              activeTab === 'audience' 
                ? 'bg-gray-800 text-white border-t border-l border-r border-gray-700' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('audience')}
          >
            Audience
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
              activeTab === 'content' 
                ? 'bg-gray-800 text-white border-t border-l border-r border-gray-700' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('content')}
          >
            Contenu
          </button>
        </div>
      </div>

      {/* Vue d'ensemble */}
      {activeTab === 'overview' && (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="bg-indigo-900/50 p-2 rounded-lg">
                  <Eye className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex items-center">
                  <span className={`text-xs ${getTrendColor(kpis.reach.trend)}`}>{kpis.reach.change}</span>
                  {getTrendIcon(kpis.reach.trend)}
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Portée totale</h3>
              <p className="text-2xl font-bold">{kpis.reach.value}</p>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="bg-blue-900/50 p-2 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex items-center">
                  <span className={`text-xs ${getTrendColor(kpis.impressions.trend)}`}>{kpis.impressions.change}</span>
                  {getTrendIcon(kpis.impressions.trend)}
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Impressions</h3>
              <p className="text-2xl font-bold">{kpis.impressions.value}</p>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="bg-purple-900/50 p-2 rounded-lg">
                  <ThumbsUp className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex items-center">
                  <span className={`text-xs ${getTrendColor(kpis.engagement.trend)}`}>{kpis.engagement.change}</span>
                  {getTrendIcon(kpis.engagement.trend)}
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Engagement</h3>
              <p className="text-2xl font-bold">{kpis.engagement.value}</p>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="bg-green-900/50 p-2 rounded-lg">
                  <ShoppingCart className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex items-center">
                  <span className={`text-xs ${getTrendColor(kpis.conversion.trend)}`}>{kpis.conversion.change}</span>
                  {getTrendIcon(kpis.conversion.trend)}
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Conversions</h3>
              <p className="text-2xl font-bold">{kpis.conversion.value}</p>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="bg-amber-900/50 p-2 rounded-lg">
                  <DollarSign className="w-5 h-5 text-amber-400" />
                </div>
                <div className="flex items-center">
                  <span className={`text-xs ${getTrendColor(kpis.roi.trend)}`}>{kpis.roi.change}</span>
                  {getTrendIcon(kpis.roi.trend)}
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">ROI</h3>
              <p className="text-2xl font-bold">{kpis.roi.value}</p>
            </div>
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Performance des campagnes</h3>
                <div className="flex items-center space-x-2">
                  <button className="text-xs px-2 py-1 rounded bg-gray-700 text-white">Portée</button>
                  <button className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-400 hover:text-white">Engagement</button>
                  <button className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-400 hover:text-white">Conversion</button>
                </div>
              </div>
              <div className="h-64 flex items-center justify-center">
                {/* Ici, vous intégreriez une bibliothèque de graphiques comme Chart.js ou Recharts */}
                <div className="w-full h-full flex items-end justify-between px-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-md" style={{ height: '40%' }}></div>
                    <span className="text-xs mt-2 text-gray-400">Jan</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-md" style={{ height: '65%' }}></div>
                    <span className="text-xs mt-2 text-gray-400">Fév</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-md" style={{ height: '50%' }}></div>
                    <span className="text-xs mt-2 text-gray-400">Mar</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-md" style={{ height: '75%' }}></div>
                    <span className="text-xs mt-2 text-gray-400">Avr</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-md" style={{ height: '85%' }}></div>
                    <span className="text-xs mt-2 text-gray-400">Mai</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-md" style={{ height: '60%' }}></div>
                    <span className="text-xs mt-2 text-gray-400">Juin</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Répartition des plateformes</h3>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </div>
              <div className="h-64 flex items-center justify-center">
                {/* Graphique en camembert */}
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 rounded-full border-8 border-purple-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }}></div>
                  <div className="absolute inset-0 rounded-full border-8 border-blue-500" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%, 0 0)' }}></div>
                  <div className="absolute inset-0 rounded-full border-8 border-green-500" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%, 0 0)' }}></div>
                  <div className="absolute inset-0 rounded-full border-8 border-amber-500" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 100% 0)' }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gray-800"></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-sm">Instagram (45%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm">TikTok (30%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">YouTube (15%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                  <span className="text-sm">Autres (10%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Meilleures performances */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="font-medium">Meilleures campagnes</h3>
                <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center">
                  Voir tout <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-700">
                      <th className="px-4 py-3 text-left">Campagne</th>
                      <th className="px-4 py-3 text-left">Portée</th>
                      <th className="px-4 py-3 text-left">Engagement</th>
                      <th className="px-4 py-3 text-left">Conversion</th>
                      <th className="px-4 py-3 text-left">ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCampaigns.map((campaign) => (
                      <tr key={campaign.id} className="border-t border-gray-700 hover:bg-gray-700">
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium">{campaign.name}</div>
                            <div className="text-sm text-gray-400">{campaign.brand}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">{campaign.reach}</td>
                        <td className="px-4 py-3">{campaign.engagement}</td>
                        <td className="px-4 py-3">{campaign.conversion}</td>
                        <td className="px-4 py-3 font-medium text-emerald-400">{campaign.roi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="font-medium">Meilleurs influenceurs</h3>
                <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center">
                  Voir tout <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-700">
                      <th className="px-4 py-3 text-left">Influenceur</th>
                      <th className="px-4 py-3 text-left">Abonnés</th>
                      <th className="px-4 py-3 text-left">Engagement</th>
                      <th className="px-4 py-3 text-left">Campagnes</th>
                      <th className="px-4 py-3 text-left">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topInfluencers.slice(0, 3).map((influencer) => (
                      <tr key={influencer.id} className="border-t border-gray-700 hover:bg-gray-700">
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium">{influencer.name}</div>
                            <div className="text-sm text-gray-400">{influencer.category}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">{influencer.followers}</td>
                        <td className="px-4 py-3">{influencer.engagement}</td>
                        <td className="px-4 py-3">{influencer.campaigns}</td>
                        <td className="px-4 py-3 font-medium text-emerald-400">{influencer.performance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Campagnes */}
      {activeTab === 'campaigns' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex items-center justify-center h-96">
          <div className="text-center">
            <BarChart className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-medium mb-2">Analytique des campagnes</h3>
            <p className="text-gray-400 mb-6 max-w-md">Visualisez les performances détaillées de vos campagnes, comparez les résultats et identifiez les tendances.</p>
            <button className="btn-primary">Explorer les données</button>
          </div>
        </div>
      )}

      {/* Influenceurs */}
      {activeTab === 'influencers' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex items-center justify-center h-96">
          <div className="text-center">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-medium mb-2">Analytique des influenceurs</h3>
            <p className="text-gray-400 mb-6 max-w-md">Analysez les performances des influenceurs, leur engagement et leur impact sur vos campagnes.</p>
            <button className="btn-primary">Explorer les données</button>
          </div>
        </div>
      )}

      {/* Audience */}
      {activeTab === 'audience' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex items-center justify-center h-96">
          <div className="text-center">
            <PieChart className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-medium mb-2">Analytique d'audience</h3>
            <p className="text-gray-400 mb-6 max-w-md">Découvrez les données démographiques et comportementales de votre audience cible.</p>
            <button className="btn-primary">Explorer les données</button>
          </div>
        </div>
      )}

      {/* Contenu */}
      {activeTab === 'content' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex items-center justify-center h-96">
          <div className="text-center">
            <LineChart className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-medium mb-2">Analytique de contenu</h3>
            <p className="text-gray-400 mb-6 max-w-md">Analysez les performances de vos différents types de contenu et optimisez votre stratégie.</p>
            <button className="btn-primary">Explorer les données</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics; 