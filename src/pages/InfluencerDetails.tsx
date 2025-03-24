import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Edit, Trash2, ExternalLink, Mail, Share2, 
  Instagram, Twitter, Youtube, Heart, Eye, MessageCircle, 
  BarChart2, TrendingUp, Calendar, MapPin, Zap, 
  Activity, DollarSign, Users, ChevronDown, ChevronRight, 
  Flag, Star, Award, Clock, CheckCircle, AlertTriangle,
  Phone, Globe, Briefcase, Hash, BarChart, Clipboard, Play
} from 'lucide-react';
import { getInfluencerById, Influencer } from '../services/database';

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
const MiniChart: React.FC<{ data: number[], positive?: boolean, height?: number }> = ({ 
  data, 
  positive = true,
  height = 40
}) => (
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

// Composant de carte de métrique
const MetricCard: React.FC<{ 
  title: string, 
  value: string | number, 
  icon: React.ReactNode,
  color: string,
  change?: { value: string, positive: boolean },
  chart?: number[]
}> = ({ title, value, icon, color, change, chart }) => (
  <div className={`bg-gray-800 rounded-xl p-5 border-l-4 ${color}`}>
    <div className="flex items-center justify-between mb-3">
      <div className={`p-3 rounded-lg ${color.replace('border-', 'bg-')}/10`}>
        {icon}
      </div>
      {change && (
        <div className={`flex items-center text-xs ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
          {change.positive ? <TrendingUp size={14} className="mr-1" /> : <TrendingUp size={14} className="mr-1 transform rotate-180" />}
          {change.value}
        </div>
      )}
    </div>
    <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
    
    {chart && (
      <div className="mt-3">
        <MiniChart data={chart} positive={change?.positive !== false} />
      </div>
    )}
  </div>
);

// Composant de card de campagne pour l'influenceur
const CampaignCard: React.FC<{ 
  title: string, 
  date: string, 
  platform: string, 
  status: 'active' | 'completed' | 'planned' | 'cancelled'
}> = ({ title, date, platform, status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'completed': return 'bg-blue-500/20 text-blue-400';
      case 'planned': return 'bg-amber-500/20 text-amber-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  const getPlatformIcon = () => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram size={16} />;
      case 'twitter': return <Twitter size={16} />;
      case 'youtube': return <Youtube size={16} />;
      case 'tiktok': return <TikTok size={16} />;
      default: return <Globe size={16} />;
    }
  };
  
  return (
    <div className="bg-gray-750 rounded-lg p-4 hover:bg-gray-700 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-white">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusStyle()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <div className="flex items-center text-gray-400">
          <Calendar size={14} className="mr-1" />
          {date}
        </div>
        <div className="flex items-center text-gray-400">
          {getPlatformIcon()}
          <span className="ml-1">{platform}</span>
        </div>
      </div>
    </div>
  );
};

// En haut du fichier, après les imports
interface ExtendedInfluencer extends Influencer {
  avatar?: string;
  verified?: boolean;
  tier?: string;
  handle?: string;
  bio?: string;
  joinedAt?: string;
  country?: string;
  rate?: number;
  website?: string;
}

const InfluencerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [influencer, setInfluencer] = useState<ExtendedInfluencer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showContacts, setShowContacts] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  
  // Données de performance fictives pour le charting
  const reachData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 80) + 20);
  const engagementData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 80) + 20);
  const conversionData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 80) + 20);
  
  // Données de campagne fictives
  const campaigns = [
    { id: '1', title: 'Lancement Collection Été', date: '05 juin 2023', platform: 'Instagram', status: 'completed' as const },
    { id: '2', title: 'Promotion Black Friday', date: '20 nov. 2023', platform: 'TikTok', status: 'active' as const },
    { id: '3', title: 'Teaser Nouveaux Produits', date: '15 jan. 2024', platform: 'Youtube', status: 'planned' as const }
  ];
  
  useEffect(() => {
    const fetchInfluencer = async () => {
      if (!id) return;
      
      try {
        const data = await getInfluencerById(id);
        setInfluencer(data);
      } catch (error) {
        console.error("Erreur lors du chargement de l'influenceur:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInfluencer();
  }, [id]);
  
  const renderSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="text-pink-500" />;
      case 'twitter': return <Twitter className="text-blue-400" />;
      case 'youtube': return <Youtube className="text-red-500" />;
      case 'tiktok': return <TikTok className="text-gray-300" />;
      default: return <Globe className="text-gray-400" />;
    }
  };
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!influencer) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <AlertTriangle size={48} className="text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Influenceur non trouvé</h2>
        <p className="text-gray-400 mb-4">Les données demandées ne sont pas disponibles.</p>
        <button 
          onClick={() => navigate(-1)} 
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
        >
          Retour
        </button>
      </div>
    );
  }
  
  // Format des grands nombres (k, M)
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 relative">
      {/* Éléments décoratifs de fond */}
      <div className="absolute top-40 right-20 w-72 h-72 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        {/* En-tête avec navigation et actions */}
        <header className="mb-6">
          <div className="flex items-center mb-4">
            <button 
              onClick={() => navigate('/influencers')}
              className="mr-3 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">Profil d'influenceur</h1>
          </div>
          
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="relative">
                <div className="h-32 w-32 rounded-xl border-4 border-gray-900 overflow-hidden bg-gray-800 shadow-lg mb-4">
                  {!imageError && influencer.avatar ? (
                    <img 
                      src={influencer.avatar} 
                      alt={influencer.name}
                      className="h-full w-full object-cover"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
                      <span className="text-white text-3xl font-bold">
                        {influencer.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                
                {influencer.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                )}
              </div>
              
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  {influencer.name}
                  {influencer.tier === 'premium' && (
                    <Star size={16} className="ml-2 text-amber-400 fill-amber-400" />
                  )}
                </h2>
                <div className="flex items-center text-gray-400">
                  <p className="text-gray-400">@{influencer.handle || influencer.name.toLowerCase().replace(/\s+/g, '')}</p>
                  {influencer.location && (
                    <div className="flex items-center ml-4">
                      <MapPin size={14} className="mr-1" />
                      {influencer.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Link
                to={`/influencer/edit/${influencer.id}`}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                <Edit size={16} className="mr-2" />
                Modifier
              </Link>
              <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
                <Share2 size={20} />
              </button>
              <button className="p-2 bg-gray-800 hover:bg-red-900/30 text-gray-400 hover:text-red-400 rounded-lg">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </header>
        
        {/* Navigation par onglets */}
        <div className="mb-6 border-b border-gray-800">
          <nav className="flex overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 font-medium whitespace-nowrap ${
                activeTab === 'overview' 
                  ? 'text-blue-400 border-b-2 border-blue-400' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-3 font-medium whitespace-nowrap ${
                activeTab === 'stats' 
                  ? 'text-blue-400 border-b-2 border-blue-400' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Statistiques
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`px-4 py-3 font-medium whitespace-nowrap ${
                activeTab === 'campaigns' 
                  ? 'text-blue-400 border-b-2 border-blue-400' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Campagnes
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`px-4 py-3 font-medium whitespace-nowrap ${
                activeTab === 'content' 
                  ? 'text-blue-400 border-b-2 border-blue-400' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Contenu
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-4 py-3 font-medium whitespace-nowrap ${
                activeTab === 'notes' 
                  ? 'text-blue-400 border-b-2 border-blue-400' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Notes
            </button>
          </nav>
        </div>
        
        {/* Contenu principal - Vue d'ensemble */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne de gauche: Profil et infos */}
            <div className="lg:col-span-2 space-y-6">
              {/* Carte de profil */}
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">Profil</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    influencer.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    influencer.status === 'inactive' ? 'bg-red-500/20 text-red-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {influencer.status === 'active' ? 'Actif' : 
                     influencer.status === 'inactive' ? 'Inactif' : 'En attente'}
                  </span>
                </div>
                
                {/* Bio */}
                {influencer.bio && (
                  <div className="mb-6">
                    <p className="text-gray-300 leading-relaxed">{influencer.bio}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Informations personnelles */}
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-400">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span className="text-gray-300 font-medium">Niche:</span>
                      <span className="ml-2">{influencer.niche || 'Non spécifié'}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-gray-300 font-medium">Membre depuis:</span>
                      <span className="ml-2">{
                        influencer.joinedAt 
                          ? new Date(influencer.joinedAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })
                          : 'Non spécifié'
                      }</span>
                    </div>
                    
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-gray-300 font-medium">Dernière activité:</span>
                      <span className="ml-2">{
                        influencer.lastActive 
                          ? `Il y a ${Math.floor(Math.random() * 30) + 1} jours` // Simulé
                          : 'Non spécifié'
                      }</span>
                    </div>
                  </div>
                  
                  {/* Informations secondaires */}
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-400">
                      <Flag className="w-4 h-4 mr-2" />
                      <span className="text-gray-300 font-medium">Pays:</span>
                      <span className="ml-2">{influencer.country || 'France'}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-400">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-gray-300 font-medium">Audience:</span>
                      <span className="ml-2">{
                        influencer.followers 
                          ? `${formatNumber(influencer.followers)} abonnés`
                          : 'Non spécifié'
                      }</span>
                    </div>
                    
                    <div className="flex items-center text-gray-400">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span className="text-gray-300 font-medium">Tarif:</span>
                      <span className="ml-2">{
                        influencer.rate 
                          ? `${influencer.rate}€ par post`
                          : 'Sur devis'
                      }</span>
                    </div>
                  </div>
                </div>
                
                {/* Contacts */}
                <div>
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setShowContacts(!showContacts)}
                  >
                    <h4 className="font-medium text-blue-400">Informations de contact</h4>
                    <button className="text-gray-400 p-1 hover:text-white">
                      {showContacts ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                  </div>
                  
                  {showContacts && (
                    <div className="mt-3 p-3 bg-gray-750 rounded-lg space-y-3">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-gray-400 mr-3" />
                        <a href={`mailto:${influencer.email || 'contact@example.com'}`} className="text-blue-400 hover:underline">
                          {influencer.email || 'contact@example.com'}
                        </a>
                      </div>
                      
                      {influencer.phone && (
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 text-gray-400 mr-3" />
                          <a href={`tel:${influencer.phone}`} className="text-gray-300 hover:text-white">
                            {influencer.phone}
                          </a>
                        </div>
                      )}
                      
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 text-gray-400 mr-3" />
                        <a 
                          href={influencer.website || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-blue-400 flex items-center"
                        >
                          {influencer.website?.replace(/^https?:\/\//, '') || 'Site web non spécifié'}
                          {influencer.website && <ExternalLink size={12} className="ml-1" />}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Carte des KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard 
                  title="Engagement"
                  value={`${(Math.random() * 5 + 2).toFixed(1)}%`}
                  icon={<Heart className="h-5 w-5 text-pink-400" />}
                  color="border-pink-500"
                  change={{ value: "+12%", positive: true }}
                  chart={engagementData}
                />
                
                <MetricCard 
                  title="Portée"
                  value={formatNumber(influencer.followers || 10000)}
                  icon={<Eye className="h-5 w-5 text-blue-400" />}
                  color="border-blue-500"
                  change={{ value: "+8%", positive: true }}
                  chart={reachData}
                />
                
                <MetricCard 
                  title="Conversion"
                  value={`${(Math.random() * 3 + 1).toFixed(1)}%`}
                  icon={<Activity className="h-5 w-5 text-green-400" />}
                  color="border-green-500"
                  change={{ value: "-2%", positive: false }}
                  chart={conversionData}
                />
              </div>
              
              {/* Dernières campagnes */}
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Dernières campagnes</h3>
                  <button 
                    onClick={() => setActiveTab('campaigns')}
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                  >
                    Voir tout
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {campaigns.map(campaign => (
                    <CampaignCard 
                      key={campaign.id}
                      title={campaign.title}
                      date={campaign.date}
                      platform={campaign.platform}
                      status={campaign.status}
                    />
                  ))}
                  
                  {campaigns.length === 0 && (
                    <div className="text-center py-6 text-gray-400">
                      <BarChart size={24} className="mx-auto mb-2 opacity-50" />
                      <p>Aucune campagne pour le moment</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Colonne de droite: Réseaux sociaux et informations complémentaires */}
            <div className="space-y-6">
              {/* Réseaux sociaux */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Réseaux sociaux</h3>
                
                <div className="space-y-4">
                  {/* Simuler des réseaux sociaux si absents */}
                  {['Instagram', 'TikTok', 'Youtube'].map(platform => (
                    <div key={platform} className="flex items-center justify-between bg-gray-750 p-3 rounded-lg">
                      <div className="flex items-center">
                        {renderSocialIcon(platform)}
                        <div className="ml-3">
                          <div className="font-medium">{platform}</div>
                          <div className="text-sm text-gray-400">
                            @{influencer.handle || influencer.name.toLowerCase().replace(/\s+/g, '')}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white">
                          {formatNumber(
                            platform === 'Instagram' 
                              ? influencer.followers || 15000
                              : platform === 'TikTok'
                              ? Math.floor((influencer.followers || 15000) * 0.8)
                              : Math.floor((influencer.followers || 15000) * 0.4)
                          )}
                        </div>
                        <div className="text-xs text-gray-400">abonnés</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Informations sur l'audience */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Audience</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="text-gray-400 text-sm mb-2">Âge</h4>
                    <p className="text-sm text-gray-400">13-35 ans</p>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-1 mb-3">
                    {/* Distribution d'âge */}
                    {[
                      {label: '13-17', value: 15},
                      {label: '18-24', value: 45},
                      {label: '25-34', value: 25},
                      {label: '35-44', value: 10},
                      {label: '45+', value: 5}
                    ].map(range => (
                      <div key={range.label} className="flex flex-col items-center">
                        <div className="h-24 w-full relative mb-1">
                          <div 
                            className="absolute bottom-0 w-full bg-blue-500/50 rounded-t"
                            style={{height: `${range.value}%`}}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">{range.label}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <h4 className="text-gray-400 text-sm mb-2">Genre</h4>
                  </div>
                  
                  <div className="flex items-center">
                    <div 
                      className="h-6 bg-pink-500/70 rounded-l"
                      style={{width: '65%'}}
                    >
                      <div className="ml-2 text-xs text-white font-medium leading-6">Femmes (65%)</div>
                    </div>
                    <div 
                      className="h-6 bg-blue-500/70 rounded-r"
                      style={{width: '35%'}}
                    >
                      <div className="ml-2 text-xs text-white font-medium leading-6">Hommes (35%)</div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <h4 className="text-gray-400 text-sm mb-3">Localisation</h4>
                    
                    <div className="space-y-2">
                      {[
                        {country: 'France', percentage: 75},
                        {country: 'Belgique', percentage: 12},
                        {country: 'Suisse', percentage: 8},
                        {country: 'Canada', percentage: 5}
                      ].map(loc => (
                        <div key={loc.country} className="flex items-center">
                          <div className="w-24 text-sm">{loc.country}</div>
                          <div className="flex-1">
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 rounded-full"
                                style={{width: `${loc.percentage}%`}}
                              ></div>
                            </div>
                          </div>
                          <div className="w-12 text-right text-sm text-gray-400">{loc.percentage}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Intérêts */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Intérêts</h3>
                
                <div className="flex flex-wrap gap-2">
                  {['Mode', 'Beauté', 'Lifestyle', 'Voyage', 'Fitness', 'Food', 'Tech', 'Musique'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Contenu de l'onglet Statistiques */}
        {activeTab === 'stats' && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6">Statistiques détaillées</h3>
            
            <div className="text-center text-gray-400 py-8">
              <BarChart size={48} className="mx-auto mb-4 opacity-50" />
              <p className="mb-2">Données de statistiques détaillées</p>
              <p className="text-sm">Des graphiques et analyses plus détaillés seront affichés ici</p>
            </div>
          </div>
        )}
        
        {/* Contenu de l'onglet Campagnes */}
        {activeTab === 'campaigns' && (
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Historique des campagnes</h3>
              <Link 
                to="/campaign/new" 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
              >
                Nouvelle campagne
              </Link>
            </div>
            
            <div className="space-y-4">
              {campaigns.map(campaign => (
                <CampaignCard 
                  key={campaign.id}
                  title={campaign.title}
                  date={campaign.date}
                  platform={campaign.platform}
                  status={campaign.status}
                />
              ))}
              
              {campaigns.length === 0 && (
                <div className="text-center py-6 text-gray-400">
                  <Clipboard size={24} className="mx-auto mb-2 opacity-50" />
                  <p>Aucune campagne pour le moment</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Contenu de l'onglet Contenu */}
        {activeTab === 'content' && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6">Contenu récent</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-gray-750 rounded-lg overflow-hidden group">
                  <div className="aspect-video bg-gray-900 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play size={36} className="text-white opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-sm truncate">Publication #{i}</p>
                    <div className="flex justify-between items-center mt-1 text-xs text-gray-400">
                      <div className="flex items-center">
                        <Calendar size={12} className="mr-1" />
                        Il y a {Math.floor(Math.random() * 30) + 1} jours
                      </div>
                      <div className="flex items-center">
                        <Heart size={12} className="mr-1" />
                        {Math.floor(Math.random() * 10000)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Contenu de l'onglet Notes */}
        {activeTab === 'notes' && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Notes</h3>
            
            <div className="bg-gray-750 rounded-lg p-4">
              <textarea 
                className="w-full bg-gray-750 text-white border-0 focus:ring-0 resize-none"
                rows={8}
                placeholder="Ajoutez vos notes sur cet influenceur ici..."
                defaultValue={influencer.notes || ''}
              ></textarea>
            </div>
            
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                Enregistrer les notes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfluencerDetails; 