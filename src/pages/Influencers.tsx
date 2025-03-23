import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, Users, Instagram, Youtube, Twitter, 
  BarChart3, TrendingUp, ArrowDown, ArrowUp, Plus, MoreHorizontal,
  Mail, Phone, MapPin, ExternalLink, Heart, MessageSquare, Eye,
  ChevronDown, Star, Zap, Tag, Check, X, Clock, Video,
  ArrowUpRight, RefreshCw, ChevronRight, Calendar, Activity, Globe,
  Download, Edit, Trash2, Share2, Music
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getInfluencerById, getInfluencers, Influencer } from '../services/database';

// Composant TikTok personnalisé
const TikTok: React.FC<{ size?: number, className?: string }> = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// Mini-graphiques pour les statistiques
const MiniChart: React.FC<{ data: number[], positive?: boolean }> = ({ data, positive = true }) => (
  <div className="flex items-end h-10 space-x-px">
    {data.map((value, i) => (
      <div 
        key={i}
        className={`w-1 rounded-sm ${positive ? 'bg-blue-500' : 'bg-red-500'}`}
        style={{ 
          height: `${value}%`, 
          opacity: 0.4 + (i / (data.length * 2))
        }}
      ></div>
    ))}
  </div>
);

// Badge de plateforme sociale
const SocialBadge: React.FC<{ platform: string, username?: string }> = ({ platform, username }) => {
  const getBadgeStyles = () => {
    switch(platform.toLowerCase()) {
      case 'instagram':
        return {
          icon: <Instagram size={14} />,
          bgClass: 'bg-gradient-to-r from-purple-600 to-pink-500',
          hoverClass: 'hover:from-purple-700 hover:to-pink-600'
        };
      case 'twitter':
      case 'x':
        return {
          icon: <Twitter size={14} />,
          bgClass: 'bg-gradient-to-r from-blue-400 to-blue-600',
          hoverClass: 'hover:from-blue-500 hover:to-blue-700'
        };
      case 'youtube':
        return {
          icon: <Youtube size={14} />,
          bgClass: 'bg-gradient-to-r from-red-500 to-red-700',
          hoverClass: 'hover:from-red-600 hover:to-red-800'
        };
      case 'tiktok':
        return {
          icon: <TikTok size={14} />,
          bgClass: 'bg-gradient-to-r from-black to-gray-800',
          hoverClass: 'hover:from-black hover:to-gray-900'
        };
      default:
        return {
          icon: <Instagram size={14} />,
          bgClass: 'bg-gradient-to-r from-gray-700 to-gray-900',
          hoverClass: 'hover:from-gray-800 hover:to-gray-950'
        };
    }
  };
  
  const { icon, bgClass, hoverClass } = getBadgeStyles();
  
  return (
    <div 
      className={`flex items-center justify-center p-1.5 rounded-full ${bgClass} ${hoverClass} transition-all duration-300 transform hover:scale-110`}
      title={username ? `${platform}: ${username}` : platform}
    >
      {icon}
    </div>
  );
};

const Influencers: React.FC = () => {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterNiche, setFilterNiche] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'micro' | 'macro' | 'mega'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [imageError, setImageError] = useState<boolean>(false);
  
  // Charger les influenceurs
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const data = await getInfluencers();
        setInfluencers(data);
        // Sélectionner automatiquement le premier influenceur s'il existe
        if (data.length > 0) {
          setSelectedInfluencer(data[0]);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des influenceurs:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInfluencers();
  }, []);
  
  // Filtrer les influenceurs selon les critères
  const filteredInfluencers = influencers.filter(influencer => {
    // Filtrage par recherche
    const matchesSearch = 
      searchTerm === '' || 
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (influencer.niche && influencer.niche.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (influencer.bio && influencer.bio.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filtrage par taille d'audience
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'micro' && influencer.followers < 50000) ||
      (filter === 'macro' && influencer.followers >= 50000 && influencer.followers <= 500000) ||
      (filter === 'mega' && influencer.followers > 500000);
    
    // Filtrage par niche
    const matchesNiche = 
      filterNiche === null || 
      (influencer.niche && influencer.niche === filterNiche);
    
    // Filtrage par statut (activeTab)
    const matchesStatus =
      activeTab === 'all' || 
      (activeTab === 'available' && influencer.status === 'active') ||
      (activeTab === 'campaign' && influencer.status === 'inactive');
    
    return matchesSearch && matchesFilter && matchesNiche && matchesStatus;
  });
  
  // Récupérer les niches uniques pour le filtre
  const niches = Array.from(new Set(influencers.filter(i => i.niche).map(i => i.niche)));
  
  // Formater le nombre de followers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  // Générer des données aléatoires pour les graphiques
  const getRandomData = () => {
    return Array(10).fill(0).map(() => Math.floor(Math.random() * 80) + 20);
  };
  
  const engagementData = getRandomData();
  const reachData = getRandomData();
  const growthData = getRandomData();
  
  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <Users className="w-6 h-6 mr-2 text-purple-400" />
          Influenceurs
        </h1>
        <div className="flex space-x-2">
          <Link to="/influencer/new" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nouvel Influenceur
          </Link>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </button>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Rechercher un influenceur..."
              className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium ${activeTab === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setActiveTab('all')}
            >
              Tous
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium ${activeTab === 'available' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setActiveTab('available')}
            >
              Disponibles
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium ${activeTab === 'campaign' ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setActiveTab('campaign')}
            >
              En campagne
            </button>
          </div>
          
          <div className="flex gap-2">
            <select 
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
              onChange={(e) => setFilterNiche(e.target.value === '' ? null : e.target.value)}
              value={filterNiche || ''}
            >
              <option value="">Toutes les niches</option>
              {niches.map((niche, index) => (
                <option key={index} value={niche}>{niche}</option>
              ))}
            </select>
            <button 
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm flex items-center"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Plus de filtres
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-auto max-h-[calc(100vh-220px)]">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : filteredInfluencers.length > 0 ? (
                filteredInfluencers.map((influencer) => (
                  <div
                    key={influencer.id}
                    className={`p-4 border-b border-gray-700 cursor-pointer transition-all hover:bg-gray-700 ${
                      selectedInfluencer?.id === influencer.id
                        ? 'bg-gray-700'
                        : ''
                    }`}
                    onClick={() => setSelectedInfluencer(influencer)}
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full mr-3 overflow-hidden bg-gray-600">
                        {!imageError && influencer.avatar ? (
                          <img 
                            src={influencer.avatar} 
                            alt={influencer.name} 
                            className="w-full h-full object-cover"
                            onError={handleImageError}
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
                            <span className="text-white text-xl font-bold">
                              {influencer.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{influencer.name}</h3>
                        <span className="text-sm text-gray-400">
                          @{influencer.handle || influencer.name.toLowerCase().replace(/\s+/g, '')}
                        </span>
                      </div>
                      <span className={`ml-auto px-2 py-1 rounded-full text-xs ${
                        influencer.status === 'active' 
                          ? 'bg-emerald-900 text-emerald-300' 
                          : 'bg-amber-900 text-amber-300'
                      }`}>
                        {influencer.status || 'Disponible'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{influencer.niche || 'Non spécifié'}</span>
                      <span>{formatNumber(influencer.followers)} abonnés</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-400">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>Aucun influenceur trouvé</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedInfluencer ? (
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full mr-4 overflow-hidden bg-gray-600">
                      {!imageError && selectedInfluencer.avatar ? (
                        <img 
                          src={selectedInfluencer.avatar} 
                          alt={selectedInfluencer.name} 
                          className="w-full h-full object-cover"
                          onError={handleImageError}
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
                          <span className="text-white text-2xl font-bold">
                            {selectedInfluencer.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{selectedInfluencer.name}</h2>
                      <p className="text-gray-400">
                        @{selectedInfluencer.handle || selectedInfluencer.name.toLowerCase().replace(/\s+/g, '')} • {selectedInfluencer.niche || 'Non spécifié'}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm flex items-center">
                      <Plus className="w-4 h-4 mr-1" />
                      Campagne
                    </button>
                    <Link to={`/influencer/edit/${selectedInfluencer.id}`} className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm flex items-center">
                      <Edit className="w-4 h-4 mr-1" />
                      Modifier
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-400">Instagram</h3>
                      <Instagram className="w-4 h-4 text-pink-400" />
                    </div>
                    <p className="text-2xl font-bold">{formatNumber(selectedInfluencer.followers)}</p>
                    <p className="text-xs text-gray-400">Abonnés</p>
                  </div>
                  
                  <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-400">TikTok</h3>
                      <TikTok className="w-4 h-4 text-teal-400" />
                    </div>
                    <p className="text-2xl font-bold">{formatNumber(Math.floor(selectedInfluencer.followers * 0.8))}</p>
                    <p className="text-xs text-gray-400">Abonnés</p>
                  </div>
                  
                  <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-400">YouTube</h3>
                      <Youtube className="w-4 h-4 text-red-400" />
                    </div>
                    <p className="text-2xl font-bold">{formatNumber(Math.floor(selectedInfluencer.followers * 0.6))}</p>
                    <p className="text-xs text-gray-400">Abonnés</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Informations personnelles</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Email:</span>
                        <span>{selectedInfluencer.email || 'Non spécifié'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Localisation:</span>
                        <span>{selectedInfluencer.location || 'Non spécifié'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Niche:</span>
                        <span>{selectedInfluencer.niche || 'Non spécifié'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Statut:</span>
                        <span className={selectedInfluencer.status === 'active' ? 'text-emerald-400' : 'text-amber-400'}>
                          {selectedInfluencer.status === 'active' ? 'Disponible' : 'En campagne'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Audience</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tranche d'âge:</span>
                        <span>25-34 ans (68%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Répartition:</span>
                        <span>Femmes (65%), Hommes (35%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Top localisations:</span>
                        <span>Paris, Lyon, Marseille</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Taux d'engagement:</span>
                        <span className="text-emerald-400">4.2%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg mb-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Performances récentes</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gray-800 p-3 rounded-lg text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Heart className="w-4 h-4 text-red-400 mr-1" />
                          <span className="text-sm">Likes</span>
                        </div>
                        <p className="text-lg font-bold">{formatNumber(Math.floor(selectedInfluencer.followers * 0.05))}</p>
                        <p className="text-xs text-emerald-400">+8%</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg text-center">
                        <div className="flex items-center justify-center mb-1">
                          <MessageSquare className="w-4 h-4 text-blue-400 mr-1" />
                          <span className="text-sm">Commentaires</span>
                        </div>
                        <p className="text-lg font-bold">{formatNumber(Math.floor(selectedInfluencer.followers * 0.01))}</p>
                        <p className="text-xs text-emerald-400">+12%</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Share2 className="w-4 h-4 text-purple-400 mr-1" />
                          <span className="text-sm">Partages</span>
                        </div>
                        <p className="text-lg font-bold">{formatNumber(Math.floor(selectedInfluencer.followers * 0.008))}</p>
                        <p className="text-xs text-emerald-400">+15%</p>
                      </div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium">Évolution de l'engagement</h4>
                        <span className="text-xs text-gray-400">30 derniers jours</span>
                      </div>
                      <div className="h-12 flex items-end space-x-px">
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div 
                            key={i} 
                            className="bg-gradient-to-t from-purple-600 to-pink-500 rounded-sm w-full"
                            style={{ 
                              height: `${Math.max(15, Math.floor(Math.random() * 100))}%`,
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Link to={`/influencer/${selectedInfluencer.id}`} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm flex items-center justify-center flex-1">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Profil complet
                  </Link>
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm flex items-center justify-center flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Contacter
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-xl border border-gray-700 h-full flex flex-col items-center justify-center text-center p-10">
              <Users className="w-16 h-16 mb-4 text-gray-600" />
              <h3 className="text-xl font-medium mb-2">Aucun influenceur sélectionné</h3>
              <p className="text-gray-400 mb-6">Sélectionnez un influenceur dans la liste pour voir les détails</p>
              <Link to="/influencer/new" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un nouvel influenceur
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Influencers;