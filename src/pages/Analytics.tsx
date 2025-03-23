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
  HelpCircle,
  ChevronRight,
  BarChart4
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('30j');
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [expanded, setExpanded] = useState<string[]>(['campaigns', 'influencers']);

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

  const toggleSection = (section: string) => {
    if (expanded.includes(section)) {
      setExpanded(expanded.filter(s => s !== section));
    } else {
      setExpanded([...expanded, section]);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold mb-2 flex items-center text-blue-500">
            <BarChart3 className="mr-2" />
            Analytique
          </h1>
          <p className="text-gray-400">Visualisez et analysez les performances de vos campagnes</p>
        </header>

        {/* Filtres et contrôles */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex space-x-2">
            <button 
              onClick={() => setTimeRange('week')} 
              className={`px-4 py-2 rounded-lg ${timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Semaine
            </button>
            <button 
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 rounded-lg ${timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Mois
            </button>
            <button 
              onClick={() => setTimeRange('quarter')}
              className={`px-4 py-2 rounded-lg ${timeRange === 'quarter' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Trimestre
            </button>
            <button 
              onClick={() => setTimeRange('year')}
              className={`px-4 py-2 rounded-lg ${timeRange === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Année
            </button>
          </div>

          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg flex items-center">
              <Filter size={16} className="mr-2" />
              Filtrer
            </button>
            <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg flex items-center">
              <Download size={16} className="mr-2" />
              Exporter
            </button>
          </div>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Campagnes actives</p>
                <h3 className="text-2xl font-bold mt-1">12</h3>
                <p className="text-green-500 text-xs mt-1 flex items-center">
                  <TrendingUp size={14} className="mr-1" />
                  +23% vs {timeRange === 'week' ? 'la semaine dernière' : 'le mois dernier'}
                </p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Influenceurs engagés</p>
                <h3 className="text-2xl font-bold mt-1">48</h3>
                <p className="text-green-500 text-xs mt-1 flex items-center">
                  <TrendingUp size={14} className="mr-1" />
                  +12% vs {timeRange === 'week' ? 'la semaine dernière' : 'le mois dernier'}
                </p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Budget engagé</p>
                <h3 className="text-2xl font-bold mt-1">63 500 €</h3>
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <TrendingUp size={14} className="mr-1" />
                  -8% vs {timeRange === 'week' ? 'la semaine dernière' : 'le mois dernier'}
                </p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-amber-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">ROI moyen</p>
                <h3 className="text-2xl font-bold mt-1">3.2x</h3>
                <p className="text-green-500 text-xs mt-1 flex items-center">
                  <TrendingUp size={14} className="mr-1" />
                  +15% vs {timeRange === 'week' ? 'la semaine dernière' : 'le mois dernier'}
                </p>
              </div>
              <div className="p-3 bg-amber-500/10 rounded-lg">
                <BarChart4 className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Graphique principal */}
        <section className="mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Performance des campagnes</h2>
              <div className="flex space-x-2">
                <button className="px-2 py-1 text-xs rounded bg-blue-500/20 text-blue-400">Engagement</button>
                <button className="px-2 py-1 text-xs rounded bg-gray-700 text-gray-400">Conversions</button>
                <button className="px-2 py-1 text-xs rounded bg-gray-700 text-gray-400">ROI</button>
              </div>
            </div>
            
            {/* Graphique fictif */}
            <div className="h-64 w-full bg-gray-900/50 rounded flex items-center justify-center">
              <div className="text-gray-500 text-center">
                <BarChart3 size={48} className="mx-auto mb-2 opacity-30" />
                <p>Graphique de performance des campagnes</p>
                <p className="text-sm">(Données simulées pour la démo)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sections de données */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Section Campagnes */}
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div 
              className="p-4 border-b border-gray-700 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('campaigns')}
            >
              <h3 className="font-medium text-white flex items-center">
                <Calendar size={18} className="mr-2 text-blue-500" />
                Performance par campagne
              </h3>
              {expanded.includes('campaigns') ? 
                <ChevronDown size={18} className="text-gray-400" /> : 
                <ChevronRight size={18} className="text-gray-400" />
              }
            </div>
            
            {expanded.includes('campaigns') && (
              <div className="p-4">
                <div className="space-y-4">
                  {['Lancement produit Q3', 'Campagne fêtes', 'Collaboration été'].map((campaign, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                      <div>
                        <p className="font-medium">{campaign}</p>
                        <p className="text-xs text-gray-400">12 influenceurs • Budget: 15K€</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-400">+28%</p>
                        <p className="text-xs text-gray-400">vs objectif</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Section Influenceurs */}
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div 
              className="p-4 border-b border-gray-700 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('influencers')}
            >
              <h3 className="font-medium text-white flex items-center">
                <Users size={18} className="mr-2 text-purple-500" />
                Top Influenceurs
              </h3>
              {expanded.includes('influencers') ? 
                <ChevronDown size={18} className="text-gray-400" /> : 
                <ChevronRight size={18} className="text-gray-400" />
              }
            </div>
            
            {expanded.includes('influencers') && (
              <div className="p-4">
                <div className="space-y-4">
                  {[
                    { name: 'Sophie Martin', followers: '845K', engagement: '5.8%' },
                    { name: 'Thomas Dubois', followers: '1.2M', engagement: '4.3%' },
                    { name: 'Emma Laurent', followers: '623K', engagement: '6.2%' }
                  ].map((influencer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mr-3">
                          <span>{influencer.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{influencer.name}</p>
                          <p className="text-xs text-gray-400">{influencer.followers} followers</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-blue-400">{influencer.engagement}</p>
                        <p className="text-xs text-gray-400">Taux d'engagement</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Résumé des insights */}
        <section className="mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Insights et recommandations</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/10 border-l-4 border-blue-500 rounded-r-lg">
                <h3 className="font-medium text-blue-400">Performance</h3>
                <p className="text-sm text-gray-300 mt-1">
                  Les campagnes avec des micro-influenceurs (10K-50K) montrent un ROI 2x supérieur aux campagnes avec des macro-influenceurs.
                </p>
              </div>
              
              <div className="p-4 bg-purple-500/10 border-l-4 border-purple-500 rounded-r-lg">
                <h3 className="font-medium text-purple-400">Audience</h3>
                <p className="text-sm text-gray-300 mt-1">
                  L'engagement est 30% plus élevé chez les influenceurs spécialisés dans un seul domaine par rapport aux influenceurs généralistes.
                </p>
              </div>
              
              <div className="p-4 bg-green-500/10 border-l-4 border-green-500 rounded-r-lg">
                <h3 className="font-medium text-green-400">Budget</h3>
                <p className="text-sm text-gray-300 mt-1">
                  Recommandation: réallouer 20% du budget des macro-influenceurs vers des micro-influenceurs à fort engagement pour optimiser le ROI.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Analytics; 