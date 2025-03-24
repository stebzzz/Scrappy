import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Filter, Calendar, Plus, ChevronDown, 
  CheckCircle2, Clock, AlertTriangle, BarChart3, 
  Users, Building2, ArrowUp, ArrowDown, Activity,
  Eye, Edit, Trash2, ArrowRight
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Campaign, Brand, Influencer, getCampaigns, deleteCampaign } from '../services/database';

const Campaigns: React.FC = () => {
  const navigate = useNavigate();
  const { campaigns, brands, influencers, refreshData } = useAppContext();
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(null);
  
  // Charger les campagnes
  useEffect(() => {
    setFilteredCampaigns(campaigns);
    // Sélectionner automatiquement la première campagne si aucune n'est sélectionnée
    if (campaigns.length > 0 && !selectedCampaign) {
      setSelectedCampaign(campaigns[0]);
    }
  }, [campaigns]);
  
  // Appliquer les filtres et la recherche
  useEffect(() => {
    let result = [...campaigns];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(campaign => 
        campaign.name.toLowerCase().includes(term) || 
        campaign.description?.toLowerCase().includes(term)
      );
    }
    
    if (filterStatus !== 'all') {
      result = result.filter(campaign => campaign.status === filterStatus);
    }
    
    result.sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
        const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return 0;
    });
    
    setFilteredCampaigns(result);
  }, [campaigns, searchTerm, filterStatus, sortBy, sortOrder]);
  
  // Utilitaires
  const getBrandInfo = (brandId: string) => brands.find(brand => brand.id === brandId);
  
  const getCampaignInfluencers = (influencerIds: string[]) => 
    influencers.filter(influencer => influencerIds?.includes(influencer.id));
  
  const formatDate = (dateValue) => {
    if (!dateValue) return 'Non définie';
    
    try {
      // Gérer les Timestamps Firebase
      if (dateValue && typeof dateValue === 'object' && 'seconds' in dateValue) {
        return new Date(dateValue.seconds * 1000).toLocaleDateString('fr-FR');
      }
      
      return new Date(dateValue).toLocaleDateString('fr-FR');
    } catch (error) {
      return 'Date invalide';
    }
  };
  
  const formatBudget = (budget) => {
    if (!budget) return 'Non défini';
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(budget);
  };
  
  const getCampaignStatusInfo = (status) => {
    switch(status) {
      case 'active': return { 
        label: 'Active', 
        class: 'bg-green-500/20 text-green-400', 
        icon: <CheckCircle2 className="w-4 h-4 mr-1" />
      };
      case 'pending': return { 
        label: 'En attente', 
        class: 'bg-amber-500/20 text-amber-400', 
        icon: <Clock className="w-4 h-4 mr-1" />
      };
      case 'completed': return { 
        label: 'Terminée', 
        class: 'bg-blue-500/20 text-blue-400', 
        icon: <CheckCircle2 className="w-4 h-4 mr-1" />
      };
      case 'cancelled': return { 
        label: 'Annulée', 
        class: 'bg-red-500/20 text-red-400', 
        icon: <AlertTriangle className="w-4 h-4 mr-1" />
      };
      default: return { 
        label: 'Inconnue', 
        class: 'bg-gray-500/20 text-gray-400', 
        icon: <AlertTriangle className="w-4 h-4 mr-1" />
      };
    }
  };
  
  const handleDeleteCampaign = async () => {
    if (!campaignToDelete) return;
    
    try {
      setIsLoading(true);
      await deleteCampaign(campaignToDelete.id);
      await refreshData();
      
      if (selectedCampaign?.id === campaignToDelete.id) {
        setSelectedCampaign(null);
      }
      
      setIsDeleteModalOpen(false);
      setCampaignToDelete(null);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Campagnes</h1>
        <Link
          to="/campaigns/new"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle campagne
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Liste des campagnes */}
        <div className="w-full md:w-2/5 lg:w-1/3">
          <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Rechercher une campagne..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
              <Filter className="h-5 w-5 text-gray-300" />
            </button>
          </div>
          
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            {filteredCampaigns.length > 0 ? (
              <div className="divide-y divide-gray-700">
                {filteredCampaigns.map(campaign => {
                  const statusInfo = getCampaignStatusInfo(campaign.status || 'pending');
                  const brandInfo = getBrandInfo(campaign.brandId);
                  
                  return (
                    <div
                      key={campaign.id}
                      className={`p-4 cursor-pointer transition-colors hover:bg-gray-700 ${
                        selectedCampaign?.id === campaign.id ? 'bg-blue-900/30 border-l-4 border-blue-500' : ''
                      }`}
                      onClick={() => setSelectedCampaign(campaign)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-white">{campaign.name}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs flex items-center ${statusInfo.class}`}>
                          {statusInfo.icon}
                          {statusInfo.label}
        </div>
      </div>

                      <div className="flex items-center text-sm text-gray-400 mb-2">
                        <Building2 className="w-3.5 h-3.5 mr-1" />
                        <span>{brandInfo?.name || 'Marque inconnue'}</span>
                    </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 text-gray-500 mr-1" />
                          <span className="text-gray-400">{formatDate(campaign.startDate)}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3.5 h-3.5 text-gray-500 mr-1" />
                          <span className="text-gray-400">
                            {campaign.influencerIds?.length || 0}
                          </span>
                        </div>
                        </div>
                        </div>
                  );
                })}
                        </div>
            ) : (
              <div className="py-6 text-center">
                <p className="text-gray-400">Aucune campagne trouvée</p>
                        </div>
            )}
          </div>
        </div>
        
        {/* Détails de la campagne */}
        <div className="w-full md:w-3/5 lg:w-2/3">
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            {selectedCampaign ? (
              <div className="h-full">
                <div className="relative bg-gradient-to-r from-blue-900/30 to-purple-900/30 h-32">
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-xs flex items-center ${
                      getCampaignStatusInfo(selectedCampaign.status || 'pending').class
                    }`}>
                      {getCampaignStatusInfo(selectedCampaign.status || 'pending').icon}
                      {getCampaignStatusInfo(selectedCampaign.status || 'pending').label}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-6 transform translate-y-1/2">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {selectedCampaign.name.charAt(0).toUpperCase()}
                  </span>
                    </div>
                  </div>
                  </div>
                  
                <div className="mt-12 p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-1">
                        {selectedCampaign.name}
                      </h2>
                      <div className="flex items-center text-gray-400">
                        <Building2 className="w-4 h-4 mr-1" />
                        <span>{getBrandInfo(selectedCampaign.brandId)?.name || "Marque inconnue"}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link 
                        to={`/campaigns/edit/${selectedCampaign.id}`}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                      >
                        <Edit className="h-4 w-4 text-white" />
                      </Link>
                      <button 
                        onClick={() => {
                          setCampaignToDelete(selectedCampaign);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6">
                    {selectedCampaign.description || "Aucune description disponible."}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-700/30 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-white mb-3">Détails</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Date de début:</span>
                          <span className="text-white">{formatDate(selectedCampaign.startDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Date de fin:</span>
                          <span className="text-white">{formatDate(selectedCampaign.endDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Budget:</span>
                          <span className="text-white">{formatBudget(selectedCampaign.budget)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Influenceurs:</span>
                          <span className="text-white">{selectedCampaign.influencerIds?.length || 0}</span>
                    </div>
                    </div>
                  </div>
                  
                    <div className="bg-gray-700/30 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-white mb-3">Objectifs</h3>
                      {selectedCampaign.goals?.length ? (
                        <ul className="space-y-2 text-sm">
                          {selectedCampaign.goals.map((goal, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle2 className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{goal}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-400 text-sm">Aucun objectif défini.</p>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-white font-medium mb-3">Influenceurs</h3>
                  {selectedCampaign.influencerIds?.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {getCampaignInfluencers(selectedCampaign.influencerIds).map(influencer => (
                        <div
                          key={influencer.id}
                          className="flex items-center p-3 bg-gray-700/30 rounded-lg"
                        >
                          <div className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0 mr-3 overflow-hidden">
                            {influencer.avatar ? (
                              <img 
                                src={influencer.avatar} 
                                alt={influencer.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = '/assets/default-profile.png';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                {influencer.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                    <div>
                            <p className="text-white text-sm">{influencer.name}</p>
                            <p className="text-gray-400 text-xs">{influencer.followers?.toLocaleString('fr-FR') || 0} abonnés</p>
                      </div>
                    </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">Aucun influenceur assigné à cette campagne.</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Calendar className="w-16 h-16 text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  Aucune campagne sélectionnée
                </h3>
                <p className="text-gray-400 mb-6 max-w-md">
                  Sélectionnez une campagne dans la liste ou créez-en une nouvelle.
                </p>
            </div>
          )}
        </div>
        </div>
      </div>
      
      {/* Modal de suppression */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Confirmer la suppression</h3>
            <p className="text-gray-300 mb-6">
              Êtes-vous sûr de vouloir supprimer la campagne "{campaignToDelete?.name}" ? 
              Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setCampaignToDelete(null);
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                disabled={isLoading}
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteCampaign}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Suppression...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;