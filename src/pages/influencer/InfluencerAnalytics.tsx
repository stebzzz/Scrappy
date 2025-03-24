import React, { useState, useEffect } from 'react';
import { 
  BarChart2, TrendingUp, TrendingDown, Users, 
  Eye, Heart, Clock, Calendar, Filter, 
  Download, ChevronDown, Instagram, Twitter, 
  Youtube, TikTok, RefreshCw, ArrowUpRight, Zap
} from 'lucide-react';
import InfluencerHeader from '../../components/influencer/InfluencerHeader';
import InfluencerSidebar from '../../components/influencer/InfluencerSidebar';
import { Link } from 'react-router-dom';

const InfluencerAnalytics: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '12m'>('30d');
  const [platform, setPlatform] = useState<'all' | 'instagram' | 'tiktok' | 'youtube'>('all');
  
  const [analyticsData, setAnalyticsData] = useState({
    followers: {
      total: 170100,
      growth: 3.2,
      platforms: {
        instagram: {
          count: 87600,
          growth: 2.8,
          history: [84300, 85100, 85800, 86200, 86700, 87100, 87600]
        },
        tiktok: {
          count: 58000,
          growth: 4.5,
          history: [55200, 55900, 56400, 56800, 57200, 57600, 58000]
        },
        youtube: {
          count: 24500,
          growth: 1.2,
          history: [24100, 24200, 24250, 24300, 24350, 24400, 24500]
        }
      }
    },
    engagement: {
      rate: 4.8,
      trend: -0.6,
      platforms: {
        instagram: {
          rate: 5.2,
          trend: 0.8,
          history: [4.8, 4.9, 5.0, 5.1, 5.1, 5.2, 5.2]
        },
        tiktok: {
          rate: 7.8,
          trend: 2.2,
          history: [7.1, 7.2, 7.4, 7.5, 7.6, 7.7, 7.8]
        },
        youtube: {
          rate: 3.6,
          trend: -0.4,
          history: [3.8, 3.8, 3.7, 3.7, 3.6, 3.6, 3.6]
        }
      }
    },
    reach: {
      total: 1245000,
      trend: 6.8,
      platforms: {
        instagram: {
          count: 645000,
          trend: 5.4,
          history: [610000, 615000, 620000, 625000, 630000, 638000, 645000]
        },
        tiktok: {
          count: 520000,
          trend: 8.6,
          history: [470000, 480000, 490000, 500000, 505000, 510000, 520000]
        },
        youtube: {
          count: 80000,
          trend: 2.5,
          history: [77000, 77500, 78000, 78500, 79000, 79500, 80000]
        }
      }
    },
    impressions: {
      total: 1850000,
      trend: 5.2,
      platforms: {
        instagram: {
          count: 980000,
          trend: 4.7,
          history: [935000, 945000, 955000, 960000, 965000, 972000, 980000]
        },
        tiktok: {
          count: 780000,
          trend: 7.4,
          history: [720000, 730000, 745000, 755000, 765000, 772000, 780000]
        },
        youtube: {
          count: 90000,
          trend: 1.1,
          history: [88000, 88500, 89000, 89200, 89500, 89700, 90000]
        }
      }
    },
    topPosts: [
      {
        id: '1',
        platform: 'instagram',
        image: 'https://placeimg.com/300/300/nature/1',
        likes: 5840,
        comments: 342,
        impressions: 48700,
        engagement: 12.7,
        date: '2023-07-25'
      },
      {
        id: '2',
        platform: 'tiktok',
        image: 'https://placeimg.com/300/300/nature/2',
        likes: 12460,
        comments: 856,
        impressions: 136500,
        engagement: 9.8,
        date: '2023-07-18'
      },
      {
        id: '3',
        platform: 'instagram',
        image: 'https://placeimg.com/300/300/nature/3',
        likes: 4950,
        comments: 278,
        impressions: 42300,
        engagement: 12.4,
        date: '2023-07-12'
      }
    ],
    demographics: {
      age: [
        { group: '13-17', percentage: 8 },
        { group: '18-24', percentage: 32 },
        { group: '25-34', percentage: 41 },
        { group: '35-44', percentage: 14 },
        { group: '45+', percentage: 5 }
      ],
      gender: [
        { type: 'Femmes', percentage: 68 },
        { type: 'Hommes', percentage: 31 },
        { type: 'Autre', percentage: 1 }
      ],
      locations: [
        { country: 'France', percentage: 72 },
        { country: 'Belgique', percentage: 12 },
        { country: 'Suisse', percentage: 8 },
        { country: 'Canada', percentage: 5 },
        { country: 'Autre', percentage: 3 }
      ]
    }
  });
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1400);
  }, []);
  
  const getPlatformIcon = (platform: string) => {
    switch(platform) {
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-500" />;
      case 'tiktok':
        return <TikTok className="h-5 w-5 text-teal-500" />;
      case 'youtube':
        return <Youtube className="h-5 w-5 text-red-500" />;
      case 'twitter':
        return <Twitter className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };
  
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  return (
    <div className="min-h-screen bg-gray-900">
      <InfluencerHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <InfluencerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <main className="lg:pl-64 pt-16">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Analyse des Performances</h1>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="relative">
                <select 
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value as any)}
                  className="appearance-none pl-3 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                >
                  <option value="7d">7 derniers jours</option>
                  <option value="30d">30 derniers jours</option>
                  <option value="90d">90 derniers jours</option>
                  <option value="12m">12 derniers mois</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="relative">
                <select 
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as any)}
                  className="appearance-none pl-3 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                >
                  <option value="all">Toutes plateformes</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              
              <button className="flex items-center justify-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <>
              {/* KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-gray-800 rounded-lg border border-gray-700 shadow p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-400">Abonnés totaux</h3>
                    <Users className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {formatNumber(analyticsData.followers.total)}
                      </div>
                      <div className="flex items-center text-xs mt-1">
                        {analyticsData.followers.growth > 0 ? (
                          <span className="text-emerald-400 flex items-center">
                            <ArrowUpRight className="h-3 w-3 mr-0.5" />
                            +{analyticsData.followers.growth}%
                          </span>
                        ) : (
                          <span className="text-red-400 flex items-center">
                            <TrendingDown className="h-3 w-3 mr-0.5" />
                            {analyticsData.followers.growth}%
                          </span>
                        )}
                        <span className="text-gray-500 ml-1">vs période précédente</span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-16 bg-pink-900 rounded-t-full" style={{ height: `${analyticsData.followers.platforms.instagram.count / analyticsData.followers.total * 100 * 0.6}px` }}></div>
                      <div className="w-2 h-16 bg-teal-900 rounded-t-full" style={{ height: `${analyticsData.followers.platforms.tiktok.count / analyticsData.followers.total * 100 * 0.6}px` }}></div>
                      <div className="w-2 h-16 bg-red-900 rounded-t-full" style={{ height: `${analyticsData.followers.platforms.youtube.count / analyticsData.followers.total * 100 * 0.6}px` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg border border-gray-700 shadow p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-400">Taux d'engagement</h3>
                    <Heart className="h-5 w-5 text-pink-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {analyticsData.engagement.rate}%
                      </div>
                      <div className="flex items-center text-xs mt-1">
                        {analyticsData.engagement.trend > 0 ? (
                          <span className="text-emerald-400 flex items-center">
                            <ArrowUpRight className="h-3 w-3 mr-0.5" />
                            +{analyticsData.engagement.trend}%
                          </span>
                        ) : (
                          <span className="text-red-400 flex items-center">
                            <TrendingDown className="h-3 w-3 mr-0.5" />
                            {analyticsData.engagement.trend}%
                          </span>
                        )}
                        <span className="text-gray-500 ml-1">vs période précédente</span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-16 bg-pink-900 rounded-t-full" style={{ height: `${analyticsData.engagement.platforms.instagram.rate / 10 * 100 * 0.6}px` }}></div>
                      <div className="w-2 h-16 bg-teal-900 rounded-t-full" style={{ height: `${analyticsData.engagement.platforms.tiktok.rate / 10 * 100 * 0.6}px` }}></div>
                      <div className="w-2 h-16 bg-red-900 rounded-t-full" style={{ height: `${analyticsData.engagement.platforms.youtube.rate / 10 * 100 * 0.6}px` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg border border-gray-700 shadow p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-400">Portée totale</h3>
                    <Eye className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {formatNumber(analyticsData.reach.total)}
                      </div>
                      <div className="flex items-center text-xs mt-1">
                        {analyticsData.reach.trend > 0 ? (
                          <span className="text-emerald-400 flex items-center">
                            <ArrowUpRight className="h-3 w-3 mr-0.5" />
                            +{analyticsData.reach.trend}%
                          </span>
                        ) : (
                          <span className="text-red-400 flex items-center">
                            <TrendingDown className="h-3 w-3 mr-0.5" />
                            {analyticsData.reach.trend}%
                          </span>
                        )}
                        <span className="text-gray-500 ml-1">vs période précédente</span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-16 bg-pink-900 rounded-t-full" style={{ height: `${analyticsData.reach.platforms.instagram.count / analyticsData.reach.total * 100 * 0.6}px` }}></div>
                      <div className="w-2 h-16 bg-teal-900 rounded-t-full" style={{ height: `${analyticsData.reach.platforms.tiktok.count / analyticsData.reach.total * 100 * 0.6}px` }}></div>
                      <div className="w-2 h-16 bg-red-900 rounded-t-full" style={{ height: `${analyticsData.reach.platforms.youtube.count / analyticsData.reach.total * 100 * 0.6}px` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg border border-gray-700 shadow p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-400">Impressions</h3>
                    <BarChart2 className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {formatNumber(analyticsData.impressions.total)}
                      </div>
                      <div className="flex items-center text-xs mt-1">
                        {analyticsData.impressions.trend > 0 ? (
                          <span className="text-emerald-400 flex items-center">
                            <ArrowUpRight className="h-3 w-3 mr-0.5" />
                            +{analyticsData.impressions.trend}%
                          </span>
                        ) : (
                          <span className="text-red-400 flex items-center">
                            <TrendingDown className="h-3 w-3 mr-0.5" />
                            {analyticsData.impressions.trend}%
                          </span>
                        )}
                        <span className="text-gray-500 ml-1">vs période précédente</span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-16 bg-pink-900 rounded-t-full" style={{ height: `${analyticsData.impressions.platforms.instagram.count / analyticsData.impressions.total * 100 * 0.6}px` }}></div>
                      <div className="w-2 h-16 bg-teal-900 rounded-t-full" style={{ height: `${analyticsData.impressions.platforms.tiktok.count / analyticsData.impressions.total * 100 * 0.6}px` }}></div>
                      <div className="w-2 h-16 bg-red-900 rounded-t-full" style={{ height: `${analyticsData.impressions.platforms.youtube.count / analyticsData.impressions.total * 100 * 0.6}px` }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Graphiques et informations détaillées */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Graphiques d'évolution */}
                  <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
                    <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                      <h2 className="text-lg font-medium text-white">Évolution des abonnés</h2>
                      <div className="flex space-x-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-pink-500 mr-1"></div>
                          <span className="text-xs text-gray-400">Instagram</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-teal-500 mr-1"></div>
                          <span className="text-xs text-gray-400">TikTok</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                          <span className="text-xs text-gray-400">YouTube</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 h-64 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <BarChart2 className="h-12 w-12 mx-auto mb-3" />
                        <p className="text-sm">Graphique d'évolution des abonnés</p>
                        <p className="text-xs mt-1">Visualisé avec Chart.js ou autre librairie</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Top publications */}
                  <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
                    <div className="p-4 border-b border-gray-700">
                      <h2 className="text-lg font-medium text-white">Meilleures publications</h2>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        {analyticsData.topPosts.map(post => (
                          <div key={post.id} className="flex bg-gray-700 rounded-lg overflow-hidden">
                            <div className="w-24 h-24">
                              <img 
                                src={post.image} 
                                alt="Post" 
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="flex-1 p-3">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                  {getPlatformIcon(post.platform)}
                                  <span className="text-xs text-gray-400 ml-1">
                                    {formatDate(post.date)}
                                  </span>
                                </div>
                                <div className="text-xs bg-indigo-900/30 text-indigo-400 px-2 py-0.5 rounded">
                                  {post.engagement}% engagement
                                </div>
                              </div>
                              <div className="flex space-x-4 text-sm">
                                <div className="flex items-center">
                                  <Heart className="h-3 w-3 text-pink-400 mr-1" />
                                  <span className="text-white">{formatNumber(post.likes)}</span>
                                </div>
                                <div className="flex items-center">
                                  <MessageSquare className="h-3 w-3 text-indigo-400 mr-1" />
                                  <span className="text-white">{formatNumber(post.comments)}</span>
                                </div>
                                <div className="flex items-center">
                                  <Eye className="h-3 w-3 text-purple-400 mr-1" />
                                  <span className="text-white">{formatNumber(post.impressions)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Sidebar droit - Démographie */}
                <div className="space-y-6">
                  {/* Données démographiques */}
                  <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
                    <div className="p-4 border-b border-gray-700">
                      <h2 className="text-lg font-medium text-white">Démographie</h2>
                    </div>
                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Âge</h3>
                        <div className="space-y-2">
                          {analyticsData.demographics.age.map(age => (
                            <div key={age.group} className="flex items-center">
                              <div className="w-16 text-xs text-gray-400">{age.group}</div>
                              <div className="flex-1 h-5 bg-gray-700 rounded overflow-hidden">
                                <div 
                                  className="h-full bg-indigo-600 rounded" 
                                  style={{ width: `${age.percentage}%` }}
                                ></div>
                              </div>
                              <div className="w-8 text-xs text-gray-400 text-right">{age.percentage}%</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Genre</h3>
                        <div className="space-y-2">
                          {analyticsData.demographics.gender.map(gender => (
                            <div key={gender.type} className="flex items-center">
                              <div className="w-16 text-xs text-gray-400">{gender.type}</div>
                              <div className="flex-1 h-5 bg-gray-700 rounded overflow-hidden">
                                <div 
                                  className={`h-full rounded ${
                                    gender.type === 'Femmes' 
                                      ? 'bg-pink-600' 
                                      : gender.type === 'Hommes'
                                        ? 'bg-blue-600'
                                        : 'bg-purple-600'
                                  }`} 
                                  style={{ width: `${gender.percentage}%` }}
                                ></div>
                              </div>
                              <div className="w-8 text-xs text-gray-400 text-right">{gender.percentage}%</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Pays</h3>
                        <div className="space-y-2">
                          {analyticsData.demographics.locations.map(location => (
                            <div key={location.country} className="flex items-center">
                              <div className="w-16 text-xs text-gray-400">{location.country}</div>
                              <div className="flex-1 h-5 bg-gray-700 rounded overflow-hidden">
                                <div 
                                  className="h-full bg-emerald-600 rounded" 
                                  style={{ width: `${location.percentage}%` }}
                                ></div>
                              </div>
                              <div className="w-8 text-xs text-gray-400 text-right">{location.percentage}%</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Suggestions IA */}
                  <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
                    <div className="p-4 border-b border-gray-700">
                      <h2 className="text-lg font-medium text-white flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-indigo-400" />
                        Insights IA
                      </h2>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        <div className="p-3 bg-indigo-900/30 border border-indigo-700/50 rounded-md">
                          <div className="flex items-start">
                            <TrendingUp className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-200">
                              Vos publications sur TikTok génèrent un engagement supérieur de 28% à la moyenne de votre niche.
                            </p>
                          </div>
                        </div>
                        <div className="p-3 bg-indigo-900/30 border border-indigo-700/50 rounded-md">
                          <div className="flex items-start">
                            <TrendingUp className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-200">
                              Les vidéos de moins de 15 secondes ont en moyenne 2.3x plus de vues que les vidéos plus longues.
                            </p>
                          </div>
                        </div>
                        <div className="p-3 bg-indigo-900/30 border border-indigo-700/50 rounded-md">
                          <div className="flex items-start">
                            <TrendingUp className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-200">
                              Le contenu publié entre 18h et 20h reçoit en moyenne 18% plus d'engagement.
                            </p>
                          </div>
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

export default InfluencerAnalytics; 