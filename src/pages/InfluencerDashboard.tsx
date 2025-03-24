import React, { useState, useEffect } from 'react';
import { 
  BarChart, Users, Briefcase, Settings, 
  TrendingUp, Eye, DollarSign, MessageSquare,
  Bell, Search, Menu, User, ChevronDown, Heart,
  ShoppingBag, ArrowUpRight, ArrowDownRight,
  Calendar, CheckCircle, X, Clock, Star, Camera, Award
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import InfluencerHeader from '../components/influencer/InfluencerHeader';
import InfluencerSidebar from '../components/influencer/InfluencerSidebar';
import PerformanceCard from '../components/influencer/PerformanceCard';
import CampaignsList from '../components/influencer/CampaignsList';
import OpportunitiesList from '../components/influencer/OpportunitiesList';

const InfluencerDashboard: React.FC = () => {
  const { darkMode } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Stats de l'influenceur
  const [stats, setStats] = useState({
    followers: 145600,
    followersTrend: 2.4,
    engagement: 4.8,
    engagementTrend: 0.7,
    earnings: 8450,
    earningsTrend: 12.5,
    impressions: 256000,
    impressionsTrend: 5.2,
    completedCampaigns: 12,
    activeCampaigns: 3,
    pendingCampaigns: 2
  });
  
  useEffect(() => {
    // Simuler le chargement des données
    const loadData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    
    loadData();
  }, []);

  // Fonction pour formater les nombres
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };
  
  // Fonction pour obtenir l'icône de tendance
  const getTrendIcon = (isPositive: boolean) => {
    return isPositive ? 
      <ArrowUpRight className="w-4 h-4 text-emerald-400" /> : 
      <ArrowDownRight className="w-4 h-4 text-red-400" />;
  };
  
  return (
    <div className="flex h-screen bg-gray-900">
      <InfluencerSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <InfluencerHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-gray-200 mb-2">Mon tableau de bord</h1>
            <p className="text-gray-400 mb-8">Suivez vos performances et gérez vos campagnes</p>
            
            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800 rounded-lg shadow p-4 border border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-pink-900/30 text-pink-500">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-400 text-sm">Abonnés</p>
                    <p className="text-2xl font-semibold text-white">
                      {isLoading ? '-' : formatNumber(stats.followers)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <span className="text-xs text-emerald-500 flex items-center">
                    {getTrendIcon(stats.followersTrend > 0)}
                    {Math.abs(stats.followersTrend)}%
                  </span>
                  <span className="text-xs text-gray-400 ml-2">vs mois précédent</span>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg shadow p-4 border border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-900/30 text-purple-500">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-400 text-sm">Taux d'engagement</p>
                    <p className="text-2xl font-semibold text-white">
                      {isLoading ? '-' : `${stats.engagement}%`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <span className="text-xs text-emerald-500 flex items-center">
                    {getTrendIcon(stats.engagementTrend > 0)}
                    {Math.abs(stats.engagementTrend)}%
                  </span>
                  <span className="text-xs text-gray-400 ml-2">vs mois précédent</span>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg shadow p-4 border border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-900/30 text-green-500">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-400 text-sm">Revenus du mois</p>
                    <p className="text-2xl font-semibold text-white">
                      {isLoading ? '-' : `${stats.earnings}€`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <span className="text-xs text-emerald-500 flex items-center">
                    {getTrendIcon(stats.earningsTrend > 0)}
                    {Math.abs(stats.earningsTrend)}%
                  </span>
                  <span className="text-xs text-gray-400 ml-2">vs mois précédent</span>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg shadow p-4 border border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-900/30 text-blue-500">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-400 text-sm">Impressions</p>
                    <p className="text-2xl font-semibold text-white">
                      {isLoading ? '-' : formatNumber(stats.impressions)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <span className="text-xs text-emerald-500 flex items-center">
                    {getTrendIcon(stats.impressionsTrend > 0)}
                    {Math.abs(stats.impressionsTrend)}%
                  </span>
                  <span className="text-xs text-gray-400 ml-2">vs mois précédent</span>
                </div>
              </div>
            </div>
            
            {/* Campagnes et Opportunités */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Campagnes */}
              <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Mes Campagnes</h3>
                  <div className="flex items-center">
                    <span className="px-2 py-1 bg-emerald-900/30 text-emerald-500 rounded text-xs mr-2">
                      {stats.activeCampaigns} actives
                    </span>
                    <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-1">
                      Voir tout
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
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">Nike Summer Collection</p>
                        <span className="px-2 py-1 bg-emerald-900/30 text-emerald-500 rounded text-xs">Active</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Échéance: 12 août 2023</span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center text-sm">
                          <Eye className="h-4 w-4 mr-1 text-blue-400" />
                          <span className="text-gray-300">45.2K vues</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Heart className="h-4 w-4 mr-1 text-pink-400" />
                          <span className="text-gray-300">2.8K j'aime</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MessageSquare className="h-4 w-4 mr-1 text-purple-400" />
                          <span className="text-gray-300">342 commentaires</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">Adidas Running</p>
                        <span className="px-2 py-1 bg-amber-900/30 text-amber-500 rounded text-xs">En attente</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Début prévu: 25 août 2023</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-1.5 mt-3 mb-1">
                        <div className="bg-amber-500 h-1.5 rounded-full w-[45%]"></div>
                      </div>
                      <div className="text-xs text-amber-400">
                        Contenu en cours de revue (45%)
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">H&M Collection</p>
                        <span className="px-2 py-1 bg-emerald-900/30 text-emerald-500 rounded text-xs">Active</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Échéance: 5 septembre 2023</span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center text-sm">
                          <Eye className="h-4 w-4 mr-1 text-blue-400" />
                          <span className="text-gray-300">18.3K vues</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Heart className="h-4 w-4 mr-1 text-pink-400" />
                          <span className="text-gray-300">1.2K j'aime</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MessageSquare className="h-4 w-4 mr-1 text-purple-400" />
                          <span className="text-gray-300">156 commentaires</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Opportunités */}
              <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Opportunités</h3>
                  <div className="flex items-center">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-500 rounded text-xs mr-2">
                      6 nouvelles
                    </span>
                    <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-1">
                      Voir tout
                    </button>
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-24 bg-gray-700 rounded"></div>
                    <div className="h-24 bg-gray-700 rounded"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center mb-3">
                        <div className="rounded-full bg-blue-900/30 p-2">
                          <ShoppingBag className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-white">Sephora</p>
                          <p className="text-xs text-gray-400">Produits de beauté - Marque vérifiée</p>
                        </div>
                        <div className="ml-auto">
                          <span className="px-2 py-1 bg-green-900/30 text-green-500 rounded text-xs">3500€</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">
                        Promotion de nouveaux produits de soin du visage pour l'été
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Date limite: 18 août 2023</span>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs">
                            Voir détails
                          </button>
                          <button className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs">
                            Postuler
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center mb-3">
                        <div className="rounded-full bg-purple-900/30 p-2">
                          <ShoppingBag className="h-5 w-5 text-purple-500" />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-white">Puma</p>
                          <p className="text-xs text-gray-400">Vêtements sportifs - Marque vérifiée</p>
                        </div>
                        <div className="ml-auto">
                          <span className="px-2 py-1 bg-green-900/30 text-green-500 rounded text-xs">2800€</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">
                        Campagne pour nouvelle collection fitness automne-hiver
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Date limite: 25 août 2023</span>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs">
                            Voir détails
                          </button>
                          <button className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs">
                            Postuler
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Section Niveau Influenceur */}
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-6 text-center border border-gray-600">
              <div className="flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-yellow-400 mr-2" />
                <h3 className="text-xl font-medium text-white">Niveau Influenceur: Premium</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Vous avez atteint le niveau Premium! Débloquez des campagnes exclusives et des rémunérations plus élevées.
              </p>
              <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full w-[75%]"></div>
              </div>
              <p className="text-sm text-gray-400">
                75% pour atteindre le niveau Elite - Complétez 2 campagnes de plus
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InfluencerDashboard; 