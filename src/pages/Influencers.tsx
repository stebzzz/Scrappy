import React, { useState, useEffect } from 'react';
import { useInfluencers } from '../hooks/useInfluencers';
import { useAppContext } from '../context/AppContext';
import { Influencer as InfluencerType } from '../services/database';
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  Download, 
  RefreshCw, 
  Trash2, 
  Edit, 
  Eye, 
  Mail,
  Instagram,
  Youtube,
  Music,
  BarChart,
  Heart,
  MessageCircle,
  Share2
} from 'lucide-react';

// Interface pour l'affichage des influenceurs
interface InfluencerDisplay {
  id: string;
  name: string;
  avatar: string;
  handle: string;
  niche: string;
  followers: {
    instagram?: number;
    tiktok?: number;
    youtube?: number;
    twitter?: number;
    other?: number;
  };
  engagement: number;
  email?: string;
  location?: string;
  age?: string;
  gender?: string;
  audience?: {
    ageRange: string;
    genderSplit: string;
    topLocations: string[];
  };
  status?: string;
}

const Influencers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNiche, setFilterNiche] = useState<string | null>(null);
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  // Données fictives pour les influenceurs
  const mockInfluencers: Influencer[] = [
    {
      id: 1,
      name: "Marfitfrance",
      avatar: "https://via.placeholder.com/50",
      handle: "@marfitfrance",
      niche: "Fitness et bien-être",
      followers: {
        instagram: 320000,
        tiktok: 250000,
        youtube: 180000
      },
      engagement: 4.8,
      email: "contact@marfitfrance.com",
      location: "Paris, France",
      age: "28",
      gender: "Femme",
      audience: {
        ageRange: "25-34 ans (78%)",
        genderSplit: "Femmes (75%), Hommes (25%)",
        topLocations: ["Paris", "Lyon", "Marseille"]
      },
      status: "Disponible"
    },
    {
      id: 2,
      name: "Louska",
      avatar: "https://via.placeholder.com/50",
      handle: "@louska",
      niche: "Mode et lifestyle",
      followers: {
        instagram: 245000,
        tiktok: 320000,
        youtube: 150000
      },
      engagement: 5.2,
      email: "louska@influencer.com",
      location: "Lyon, France",
      age: "26",
      gender: "Femme",
      audience: {
        ageRange: "18-30 ans (85%)",
        genderSplit: "Femmes (82%), Hommes (18%)",
        topLocations: ["Paris", "Lyon", "Bordeaux"]
      },
      status: "Disponible"
    },
    {
      id: 3,
      name: "Grandingo",
      avatar: "https://via.placeholder.com/50",
      handle: "@grandingo",
      niche: "Gaming et tech",
      followers: {
        instagram: 180000,
        tiktok: 420000,
        youtube: 350000
      },
      engagement: 4.5,
      email: "contact@grandingo.com",
      location: "Marseille, France",
      age: "30",
      gender: "Homme",
      audience: {
        ageRange: "16-28 ans (90%)",
        genderSplit: "Hommes (70%), Femmes (30%)",
        topLocations: ["Paris", "Marseille", "Lyon"]
      },
      status: "Disponible"
    },
    {
      id: 4,
      name: "TheWingzer",
      avatar: "https://via.placeholder.com/50",
      handle: "@thewingzer",
      niche: "Voyage et aventure",
      followers: {
        instagram: 210000,
        youtube: 180000
      },
      engagement: 3.9,
      email: "thewingzer@influencer.com",
      location: "Nice, France",
      age: "32",
      gender: "Homme",
      audience: {
        ageRange: "25-40 ans (72%)",
        genderSplit: "Hommes (55%), Femmes (45%)",
        topLocations: ["Paris", "Nice", "Cannes"]
      },
      status: "En campagne"
    },
    {
      id: 5,
      name: "SuperBoomJ",
      avatar: "https://via.placeholder.com/50",
      handle: "@superboomj",
      niche: "Musique et divertissement",
      followers: {
        instagram: 290000,
        tiktok: 450000
      },
      engagement: 4.2,
      email: "superboomj@influencer.com",
      location: "Paris, France",
      age: "25",
      gender: "Homme",
      audience: {
        ageRange: "15-25 ans (85%)",
        genderSplit: "Hommes (60%), Femmes (40%)",
        topLocations: ["Paris", "Bordeaux", "Lille"]
      },
      status: "En campagne"
    }
  ];

  // Filtrer les influenceurs en fonction du terme de recherche et de la niche
  const filteredInfluencers = mockInfluencers.filter(influencer =>
    (influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    influencer.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    influencer.niche.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterNiche === null || influencer.niche === filterNiche) &&
    (activeTab === 'all' || (activeTab === 'available' && influencer.status === 'Disponible') || (activeTab === 'campaign' && influencer.status === 'En campagne'))
  );

  // Liste des niches uniques pour le filtre
  const niches = Array.from(new Set(mockInfluencers.map(influencer => influencer.niche)));

  // Formater le nombre de followers
  const formatFollowers = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <Users className="w-6 h-6 mr-2 text-purple-400" />
          Influenceurs
        </h1>
        <div className="flex space-x-2">
          <button className="btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nouvel Influenceur
          </button>
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
            <button className="btn-outline flex items-center">
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
              {filteredInfluencers.length > 0 ? (
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
                      <img 
                        src={influencer.avatar} 
                        alt={influencer.name} 
                        className="w-10 h-10 rounded-full mr-3 bg-gray-600"
                      />
                      <div>
                        <h3 className="font-semibold">{influencer.name}</h3>
                        <span className="text-sm text-gray-400">{influencer.handle}</span>
                      </div>
                      <span className={`ml-auto px-2 py-1 rounded-full text-xs ${
                        influencer.status === 'Disponible' 
                          ? 'bg-emerald-900 text-emerald-300' 
                          : 'bg-amber-900 text-amber-300'
                      }`}>
                        {influencer.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{influencer.niche}</span>
                      <span>{formatFollowers(influencer.followers.instagram)} abonnés</span>
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
                    <img 
                      src={selectedInfluencer.avatar} 
                      alt={selectedInfluencer.name} 
                      className="w-16 h-16 rounded-full mr-4 bg-gray-600"
                    />
                    <div>
                      <h2 className="text-xl font-bold">{selectedInfluencer.name}</h2>
                      <p className="text-gray-400">{selectedInfluencer.handle} • {selectedInfluencer.niche}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn-primary-sm flex items-center">
                      <Plus className="w-4 h-4 mr-1" />
                      Campagne
                    </button>
                    <button className="btn-outline-sm flex items-center">
                      <Edit className="w-4 h-4 mr-1" />
                      Modifier
                    </button>
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
                    <p className="text-2xl font-bold">{formatFollowers(selectedInfluencer.followers.instagram)}</p>
                    <p className="text-xs text-gray-400">Abonnés</p>
                  </div>
                  
                  {selectedInfluencer.followers.tiktok && (
                    <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-400">TikTok</h3>
                        <Music className="w-4 h-4 text-teal-400" />
                      </div>
                      <p className="text-2xl font-bold">{formatFollowers(selectedInfluencer.followers.tiktok)}</p>
                      <p className="text-xs text-gray-400">Abonnés</p>
                    </div>
                  )}
                  
                  {selectedInfluencer.followers.youtube && (
                    <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-400">YouTube</h3>
                        <Youtube className="w-4 h-4 text-red-400" />
                      </div>
                      <p className="text-2xl font-bold">{formatFollowers(selectedInfluencer.followers.youtube)}</p>
                      <p className="text-xs text-gray-400">Abonnés</p>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Informations personnelles</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Email:</span>
                        <span>{selectedInfluencer.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Localisation:</span>
                        <span>{selectedInfluencer.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Âge:</span>
                        <span>{selectedInfluencer.age} ans</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Genre:</span>
                        <span>{selectedInfluencer.gender}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Audience</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tranche d'âge:</span>
                        <span>{selectedInfluencer.audience.ageRange}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Répartition:</span>
                        <span>{selectedInfluencer.audience.genderSplit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Top localisations:</span>
                        <span>{selectedInfluencer.audience.topLocations.join(', ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Taux d'engagement:</span>
                        <span className="text-emerald-400">{selectedInfluencer.engagement}%</span>
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
                        <p className="text-lg font-bold">12.5K</p>
                        <p className="text-xs text-emerald-400">+8%</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg text-center">
                        <div className="flex items-center justify-center mb-1">
                          <MessageCircle className="w-4 h-4 text-blue-400 mr-1" />
                          <span className="text-sm">Commentaires</span>
                        </div>
                        <p className="text-lg font-bold">845</p>
                        <p className="text-xs text-emerald-400">+12%</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Share2 className="w-4 h-4 text-purple-400 mr-1" />
                          <span className="text-sm">Partages</span>
                        </div>
                        <p className="text-lg font-bold">2.3K</p>
                        <p className="text-xs text-emerald-400">+15%</p>
                      </div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium">Évolution de l'engagement</h4>
                        <span className="text-xs text-gray-400">30 derniers jours</span>
                      </div>
                      <div className="h-12 flex items-end space-x-1">
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
                  <button className="btn-primary flex-1 py-2">
                    <BarChart className="w-4 h-4 mr-2" />
                    Rapport complet
                  </button>
                  <button className="btn-outline flex-1 py-2">
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
              <button className="btn-primary flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un nouvel influenceur
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Influencers;