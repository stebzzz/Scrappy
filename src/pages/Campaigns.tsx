import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Search, 
  Plus, 
  Filter, 
  Download, 
  RefreshCw, 
  Trash2, 
  Edit, 
  Eye, 
  Calendar,
  Clock,
  Users,
  Building2,
  BarChart,
  CheckCircle2,
  AlertCircle,
  Clock3,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  MoreHorizontal
} from 'lucide-react';

interface Campaign {
  id: number;
  name: string;
  brand: string;
  brandLogo: string;
  startDate: string;
  endDate: string;
  budget: string;
  status: 'En cours' | 'Planifiée' | 'Complétée' | 'En pause';
  influencers: {
    count: number;
    list: string[];
  };
  platforms: string[];
  kpis: {
    reach: string;
    engagement: number;
    conversion: string;
  };
  progress: number;
}

const Campaigns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [sortField, setSortField] = useState<string>('startDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

// Données fictives pour les campagnes
  const mockCampaigns: Campaign[] = [
  {
    id: 1,
      name: "Collection Été 2025",
    brand: "L'Oréal Paris",
      brandLogo: "https://via.placeholder.com/50",
      startDate: "15/05/2025",
      endDate: "15/07/2025",
      budget: "€45,000",
      status: "En cours",
      influencers: {
        count: 8,
        list: ["Marfitfrance", "Louska", "TheWingzer"]
      },
      platforms: ["Instagram", "TikTok"],
      kpis: {
        reach: "1.2M",
        engagement: 4.7,
        conversion: "3.2%"
      },
      progress: 45
  },
  {
    id: 2,
      name: "Nouveau Parfum",
      brand: "Dior",
      brandLogo: "https://via.placeholder.com/50",
      startDate: "01/04/2025",
      endDate: "30/04/2025",
      budget: "€60,000",
      status: "Complétée",
      influencers: {
        count: 5,
        list: ["Louska", "SuperBoomJ"]
      },
      platforms: ["Instagram", "YouTube"],
      kpis: {
        reach: "950K",
        engagement: 5.2,
        conversion: "4.5%"
      },
      progress: 100
  },
  {
    id: 3,
      name: "Essentiels Printemps",
      brand: "Sephora France",
      brandLogo: "https://via.placeholder.com/50",
      startDate: "01/03/2025",
      endDate: "15/05/2025",
      budget: "€35,000",
      status: "En cours",
      influencers: {
        count: 12,
        list: ["Marfitfrance", "Louska", "SuperBoomJ", "TheWingzer"]
      },
      platforms: ["Instagram", "TikTok", "YouTube"],
      kpis: {
        reach: "2.1M",
        engagement: 3.8,
        conversion: "2.9%"
      },
      progress: 75
    },
    {
      id: 4,
      name: "Collection Sportswear",
      brand: "Nike France",
      brandLogo: "https://via.placeholder.com/50",
      startDate: "01/06/2025",
      endDate: "31/07/2025",
      budget: "€55,000",
      status: "Planifiée",
      influencers: {
        count: 7,
        list: ["Marfitfrance", "Grandingo", "TheWingzer"]
      },
      platforms: ["Instagram", "TikTok", "YouTube"],
      kpis: {
        reach: "1.5M",
        engagement: 4.5,
        conversion: "3.8%"
      },
      progress: 0
    },
    {
      id: 5,
      name: "Lancement Smartphone",
      brand: "Samsung France",
      brandLogo: "https://via.placeholder.com/50",
      startDate: "15/04/2025",
      endDate: "15/05/2025",
      budget: "€70,000",
      status: "En cours",
      influencers: {
        count: 10,
        list: ["Grandingo", "SuperBoomJ", "TheWingzer"]
      },
      platforms: ["Instagram", "YouTube", "TikTok"],
      kpis: {
        reach: "3.2M",
        engagement: 4.2,
        conversion: "3.5%"
      },
      progress: 30
    },
    {
      id: 6,
      name: "Gamme Écologique",
      brand: "Garnier",
      brandLogo: "https://via.placeholder.com/50",
      startDate: "01/02/2025",
      endDate: "28/02/2025",
      budget: "€25,000",
      status: "Complétée",
      influencers: {
        count: 6,
        list: ["Marfitfrance", "Louska"]
      },
      platforms: ["Instagram"],
      kpis: {
        reach: "850K",
        engagement: 4.9,
        conversion: "4.1%"
      },
      progress: 100
    },
    {
      id: 7,
      name: "Promotion Été",
      brand: "Sephora France",
      brandLogo: "https://via.placeholder.com/50",
      startDate: "01/07/2025",
      endDate: "31/07/2025",
      budget: "€30,000",
      status: "Planifiée",
      influencers: {
        count: 8,
        list: ["Louska", "SuperBoomJ", "TheWingzer"]
      },
      platforms: ["Instagram", "TikTok"],
      kpis: {
        reach: "1.8M",
        engagement: 0,
        conversion: "0%"
      },
      progress: 0
    },
    {
      id: 8,
      name: "Campagne Automne",
    brand: "Chanel",
      brandLogo: "https://via.placeholder.com/50",
      startDate: "15/08/2025",
      endDate: "15/10/2025",
      budget: "€80,000",
      status: "Planifiée",
      influencers: {
        count: 4,
        list: ["Louska", "SuperBoomJ"]
      },
      platforms: ["Instagram", "YouTube"],
      kpis: {
        reach: "1.2M",
        engagement: 0,
        conversion: "0%"
      },
      progress: 0
    }
  ];

  // Filtrer les campagnes en fonction du terme de recherche et du statut
  const filteredCampaigns = mockCampaigns.filter(campaign =>
    (campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.brand.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === null || campaign.status === filterStatus) &&
    (activeTab === 'all' || 
     (activeTab === 'active' && campaign.status === 'En cours') || 
     (activeTab === 'planned' && campaign.status === 'Planifiée') || 
     (activeTab === 'completed' && campaign.status === 'Complétée'))
  );

  // Trier les campagnes
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    const fieldA = a[sortField as keyof Campaign];
    const fieldB = b[sortField as keyof Campaign];
    
    if (sortDirection === 'asc') {
      return fieldA > fieldB ? 1 : -1;
    } else {
      return fieldA < fieldB ? 1 : -1;
    }
  });

  // Gérer le tri
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Obtenir la couleur de statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours':
        return 'bg-blue-900 text-blue-300';
      case 'Planifiée':
        return 'bg-amber-900 text-amber-300';
      case 'Complétée':
        return 'bg-emerald-900 text-emerald-300';
      case 'En pause':
        return 'bg-gray-700 text-gray-300';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  // Obtenir l'icône de statut
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'En cours':
        return <Clock3 className="w-4 h-4 mr-1" />;
      case 'Planifiée':
        return <Calendar className="w-4 h-4 mr-1" />;
      case 'Complétée':
        return <CheckCircle2 className="w-4 h-4 mr-1" />;
      case 'En pause':
        return <AlertCircle className="w-4 h-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <LayoutGrid className="w-6 h-6 mr-2 text-orange-400" />
          Campagnes
        </h1>
        <div className="flex space-x-2">
          <button className="btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Campagne
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
              placeholder="Rechercher une campagne..."
              className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium ${activeTab === 'all' ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setActiveTab('all')}
            >
              Toutes
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium ${activeTab === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setActiveTab('active')}
            >
              En cours
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium ${activeTab === 'planned' ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setActiveTab('planned')}
            >
              Planifiées
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium ${activeTab === 'completed' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setActiveTab('completed')}
            >
              Complétées
            </button>
          </div>
          
          <div className="flex gap-2">
            <button 
              className={`btn-icon ${viewMode === 'list' ? 'bg-gray-600' : 'bg-gray-700'}`}
              onClick={() => setViewMode('list')}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              className={`btn-icon ${viewMode === 'grid' ? 'bg-gray-600' : 'bg-gray-700'}`}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th 
                    className="px-4 py-3 text-left cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      <span>Nom</span>
                      {sortField === 'name' ? (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                      ) : (
                        <ArrowUpDown className="w-4 h-4 ml-1 text-gray-500" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left cursor-pointer"
                    onClick={() => handleSort('brand')}
                  >
                    <div className="flex items-center">
                      <span>Marque</span>
                      {sortField === 'brand' ? (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                      ) : (
                        <ArrowUpDown className="w-4 h-4 ml-1 text-gray-500" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left cursor-pointer"
                    onClick={() => handleSort('startDate')}
                  >
                    <div className="flex items-center">
                      <span>Dates</span>
                      {sortField === 'startDate' ? (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                      ) : (
                        <ArrowUpDown className="w-4 h-4 ml-1 text-gray-500" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">Influenceurs</th>
                  <th className="px-4 py-3 text-left">Plateformes</th>
                  <th 
                    className="px-4 py-3 text-left cursor-pointer"
                    onClick={() => handleSort('budget')}
                  >
                    <div className="flex items-center">
                      <span>Budget</span>
                      {sortField === 'budget' ? (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                      ) : (
                        <ArrowUpDown className="w-4 h-4 ml-1 text-gray-500" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">Statut</th>
                  <th className="px-4 py-3 text-left">Progression</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedCampaigns.length > 0 ? (
                  sortedCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-t border-gray-700 hover:bg-gray-700">
                      <td className="px-4 py-3 font-medium">{campaign.name}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <img 
                            src={campaign.brandLogo} 
                            alt={campaign.brand} 
                            className="w-6 h-6 rounded-full mr-2 bg-gray-600"
                          />
                          {campaign.brand}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                          <span>{campaign.startDate} - {campaign.endDate}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-purple-400" />
                          <span>{campaign.influencers.count}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {campaign.platforms.map((platform, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-700 rounded text-xs">
                              {platform}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium">{campaign.budget}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs flex items-center w-fit ${getStatusColor(campaign.status)}`}>
                          {getStatusIcon(campaign.status)}
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              campaign.status === 'Complétée' 
                                ? 'bg-emerald-500' 
                                : campaign.status === 'En cours'
                                  ? 'bg-blue-500'
                                  : 'bg-amber-500'
                            }`}
                            style={{ width: `${campaign.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400 mt-1">{campaign.progress}%</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end space-x-2">
                          <button className="text-gray-400 hover:text-white">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-white">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-white">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-gray-400">
                      <LayoutGrid className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p>Aucune campagne trouvée</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedCampaigns.length > 0 ? (
            sortedCampaigns.map((campaign) => (
              <div key={campaign.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-500 transition-colors">
                <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                  <div className="flex items-center">
                    <img 
                      src={campaign.brandLogo} 
                      alt={campaign.brand} 
                      className="w-10 h-10 rounded-full mr-3 bg-gray-600"
                    />
                    <div>
                      <h3 className="font-medium">{campaign.name}</h3>
                      <span className="text-xs text-gray-400">{campaign.brand}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs flex items-center ${getStatusColor(campaign.status)}`}>
                    {getStatusIcon(campaign.status)}
                    {campaign.status}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-400">{campaign.startDate} - {campaign.endDate}</span>
                    </div>
                    <span className="font-medium">{campaign.budget}</span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Progression</span>
                      <span className="text-sm">{campaign.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          campaign.status === 'Complétée' 
                            ? 'bg-emerald-500' 
                            : campaign.status === 'En cours'
                              ? 'bg-blue-500'
                              : 'bg-amber-500'
                        }`}
                        style={{ width: `${campaign.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-gray-700 p-2 rounded-lg text-center">
                      <p className="text-xs text-gray-400 mb-1">Portée</p>
                      <p className="font-medium">{campaign.kpis.reach}</p>
                    </div>
                    <div className="bg-gray-700 p-2 rounded-lg text-center">
                      <p className="text-xs text-gray-400 mb-1">Engagement</p>
                      <p className="font-medium">{campaign.kpis.engagement}%</p>
                    </div>
                    <div className="bg-gray-700 p-2 rounded-lg text-center">
                      <p className="text-xs text-gray-400 mb-1">Conversion</p>
                      <p className="font-medium">{campaign.kpis.conversion}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-2">Influenceurs ({campaign.influencers.count})</p>
                    <div className="flex flex-wrap gap-1">
                      {campaign.influencers.list.map((influencer, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                          {influencer}
                        </span>
                      ))}
                      {campaign.influencers.count > campaign.influencers.list.length && (
                        <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                          +{campaign.influencers.count - campaign.influencers.list.length}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Plateformes</p>
                      <div className="flex gap-1">
                        {campaign.platforms.map((platform, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-700 rounded text-xs">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-1 self-end">
                      <button className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-gray-800 rounded-xl border border-gray-700 p-8 text-center">
              <LayoutGrid className="w-12 h-12 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-medium mb-2">Aucune campagne trouvée</h3>
              <p className="text-gray-400 mb-6">Essayez de modifier vos filtres ou d'ajouter une nouvelle campagne</p>
              <button className="btn-primary flex items-center mx-auto">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une campagne
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex justify-between items-center text-sm text-gray-400">
        <div>Affichage de {sortedCampaigns.length} sur {mockCampaigns.length} campagnes</div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50" disabled>Précédent</button>
          <button className="px-3 py-1 bg-gray-600 rounded-md text-white">1</button>
          <button className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600">2</button>
          <button className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600">Suivant</button>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;