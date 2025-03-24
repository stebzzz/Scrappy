import React, { useState, useEffect } from 'react';
import { 
  Calendar, Filter, Search, ChevronDown, 
  CheckCircle, AlertTriangle, Clock, X, 
  Camera, MessageSquare, Video, Instagram,
  Play, DollarSign, FileText, Upload,
  ArrowUpRight, TrendingUp, Mail, Phone
} from 'lucide-react';
import InfluencerHeader from '../../components/influencer/InfluencerHeader';
import InfluencerSidebar from '../../components/influencer/InfluencerSidebar';
import { Link } from 'react-router-dom';

interface Campaign {
  id: string;
  brand: {
    name: string;
    logo: string;
  };
  title: string;
  description: string;
  status: 'active' | 'completed' | 'pending' | 'draft';
  timeline: {
    start: string;
    end: string;
    deliveryDate: string;
  };
  payment: {
    amount: number;
    isPaid: boolean;
  };
  contentType: 'post' | 'story' | 'reel' | 'video';
  brief: string;
  assets: {
    id: string;
    name: string;
    type: 'image' | 'document' | 'video';
    url: string;
  }[];
  deliverables: {
    id: string;
    type: string;
    status: 'pending' | 'completed' | 'approved' | 'rejected';
    dueDate: string;
  }[];
  contacts: {
    name: string;
    role: string;
    email: string;
    phone?: string;
  }[];
}

const InfluencerCampaigns: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'pending' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      brand: {
        name: 'Éco Beauté',
        logo: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      title: 'Lancement de la nouvelle gamme de soins bio',
      description: 'Promotion de notre nouvelle gamme de soins du visage 100% bio et éco-responsable. Mise en avant de l\'efficacité et des engagements environnementaux.',
      status: 'active',
      timeline: {
        start: '2023-08-10',
        end: '2023-08-31',
        deliveryDate: '2023-08-28',
      },
      payment: {
        amount: 1200,
        isPaid: false,
      },
      contentType: 'post',
      brief: 'Mettre en avant les ingrédients naturels, montrer l\'application du produit, insister sur les résultats visibles après utilisation. Utiliser une lumière naturelle et un arrière-plan minimaliste.',
      assets: [
        {
          id: 'a1',
          name: 'Photos produits HD',
          type: 'image',
          url: '/assets/eco-beaute/products.zip'
        },
        {
          id: 'a2',
          name: 'Brief complet',
          type: 'document',
          url: '/assets/eco-beaute/brief.pdf'
        }
      ],
      deliverables: [
        {
          id: 'd1',
          type: 'Post Instagram avec carousel',
          status: 'pending',
          dueDate: '2023-08-28'
        },
        {
          id: 'd2',
          type: 'Story Instagram',
          status: 'pending',
          dueDate: '2023-08-29'
        }
      ],
      contacts: [
        {
          name: 'Julie Martin',
          role: 'Chef de projet',
          email: 'julie.martin@fitnesspro.com',
          phone: '+33 6 12 34 56 78'
        }
      ]
    },
    {
      id: '3',
      brand: {
        name: 'Veggie Food',
        logo: 'https://randomuser.me/api/portraits/women/68.jpg',
      },
      title: 'Recettes végétariennes faciles',
      description: 'Série de recettes végétariennes simples et rapides à préparer pour promouvoir l\'alimentation à base de plantes et nos produits.',
      status: 'completed',
      timeline: {
        start: '2023-07-01',
        end: '2023-07-15',
        deliveryDate: '2023-07-12',
      },
      payment: {
        amount: 850,
        isPaid: true,
      },
      contentType: 'story',
      brief: 'Créer une série de stories montrant la préparation de 3 recettes faciles avec nos produits. Mettre l\'accent sur la simplicité, la rapidité et les bienfaits pour la santé.',
      assets: [
        {
          id: 'a1',
          name: 'Produits (photos)',
          type: 'image',
          url: '/assets/veggie-food/products.zip'
        },
        {
          id: 'a2',
          name: 'Idées de recettes',
          type: 'document',
          url: '/assets/veggie-food/recipes.pdf'
        }
      ],
      deliverables: [
        {
          id: 'd1',
          type: 'Story Instagram (série de 5)',
          status: 'approved',
          dueDate: '2023-07-12'
        },
        {
          id: 'd2',
          type: 'Publication Instagram',
          status: 'approved',
          dueDate: '2023-07-14'
        }
      ],
      contacts: [
        {
          name: 'Marc Bernard',
          role: 'Responsable marketing',
          email: 'marc.bernard@veggiefood.com'
        }
      ]
    }
  ]);
  
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>(campaigns);
  
  useEffect(() => {
    // Simulation de chargement
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);
  
  useEffect(() => {
    // Filtre par statut et recherche
    let filtered = campaigns;
    
    if (activeTab !== 'all') {
      filtered = filtered.filter(campaign => campaign.status === activeTab);
    }
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        campaign => 
          campaign.title.toLowerCase().includes(search) ||
          campaign.brand.name.toLowerCase().includes(search) ||
          campaign.description.toLowerCase().includes(search)
      );
    }
    
    setFilteredCampaigns(filtered);
  }, [campaigns, activeTab, searchTerm]);
  
  const getStatusBadge = (status: Campaign['status']) => {
    switch(status) {
      case 'active':
        return (
          <span className="px-2 py-1 bg-blue-900/30 text-blue-500 rounded text-xs flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            En cours
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-1 bg-amber-900/30 text-amber-500 rounded text-xs flex items-center">
            <AlertTriangle className="h-3 w-3 mr-1" />
            En attente
          </span>
        );
      case 'completed':
        return (
          <span className="px-2 py-1 bg-emerald-900/30 text-emerald-500 rounded text-xs flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            Terminée
          </span>
        );
      case 'draft':
        return (
          <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded text-xs flex items-center">
            <FileText className="h-3 w-3 mr-1" />
            Brouillon
          </span>
        );
      default:
        return null;
    }
  };
  
  const getContentTypeIcon = (type: Campaign['contentType']) => {
    switch(type) {
      case 'post':
        return <Camera className="h-4 w-4 text-pink-400" />;
      case 'story':
        return <Instagram className="h-4 w-4 text-purple-400" />;
      case 'reel':
        return <Play className="h-4 w-4 text-blue-400" />;
      case 'video':
        return <Video className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
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
            <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Mes Campagnes</h1>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg mb-6">
            <div className="p-4 border-b border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1.5 rounded-md text-sm ${
                      activeTab === 'all' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Toutes
                  </button>
                  <button 
                    onClick={() => setActiveTab('active')}
                    className={`px-3 py-1.5 rounded-md text-sm ${
                      activeTab === 'active' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    En cours
                  </button>
                  <button 
                    onClick={() => setActiveTab('pending')}
                    className={`px-3 py-1.5 rounded-md text-sm ${
                      activeTab === 'pending' 
                        ? 'bg-amber-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    En attente
                  </button>
                  <button 
                    onClick={() => setActiveTab('completed')}
                    className={`px-3 py-1.5 rounded-md text-sm ${
                      activeTab === 'completed' 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Terminées
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="px-3 py-1.5 rounded-md text-sm bg-gray-700 text-gray-300 hover:bg-gray-600"
                  >
                    Réinitialiser
                  </button>
                  <button 
                    onClick={() => setUploadModalOpen(true)}
                    className="px-3 py-1.5 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Nouvelle campagne
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : filteredCampaigns.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Calendar className="h-12 w-12 text-gray-500 mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Aucune campagne trouvée</h3>
                  <p className="text-gray-400 max-w-md">
                    {searchTerm 
                      ? "Aucune campagne ne correspond à votre recherche. Essayez d'autres termes." 
                      : activeTab !== 'all' 
                        ? `Vous n'avez pas de campagnes ${
                            activeTab === 'active' ? 'en cours' : 
                            activeTab === 'pending' ? 'en attente' : 'terminées'
                          } pour le moment.`
                        : "Vous n'avez pas encore de campagnes. Créez votre première campagne en cliquant sur le bouton ci-dessous."
                    }
                  </p>
                  {!searchTerm && (
                    <button 
                      onClick={() => setUploadModalOpen(true)}
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
                    >
                      Nouvelle campagne
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCampaigns.map(campaign => (
                    <div 
                      key={campaign.id} 
                      className="bg-gray-700 rounded-lg overflow-hidden hover:bg-gray-600 transition-colors cursor-pointer"
                      onClick={() => setSelectedCampaign(campaign)}
                    >
                      <div className="p-4">
                        <div className="flex items-center mb-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-600 mr-3">
                            <img 
                              src={campaign.brand.logo} 
                              alt={campaign.brand.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{campaign.brand.name}</h3>
                            <div className="text-xs text-gray-400">{getStatusBadge(campaign.status)}</div>
                          </div>
                          <div className="ml-auto flex items-center">
                            {getContentTypeIcon(campaign.contentType)}
                          </div>
                        </div>
                        
                        <h4 className="text-white font-medium mb-2">{campaign.title}</h4>
                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                          {campaign.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Échéance: {formatDate(campaign.timeline.deliveryDate)}</span>
                          </div>
                          <div className="flex items-center text-emerald-400">
                            <DollarSign className="h-3 w-3 mr-1" />
                            <span>{campaign.payment.amount}€</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Détails de la campagne */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-start p-4 border-b border-gray-700">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-600 mr-3">
                  <img 
                    src={selectedCampaign.brand.logo} 
                    alt={selectedCampaign.brand.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedCampaign.brand.name}</h2>
                  <div className="flex items-center text-sm text-gray-400">
                    {getStatusBadge(selectedCampaign.status)}
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      {getContentTypeIcon(selectedCampaign.contentType)}
                      <span className="ml-1 capitalize">
                        {selectedCampaign.contentType === 'post' ? 'Publication' : 
                         selectedCampaign.contentType === 'story' ? 'Story' :
                         selectedCampaign.contentType === 'reel' ? 'Reel' : 'Vidéo'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setSelectedCampaign(null)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <h3 className="text-lg font-semibold text-white mb-2">{selectedCampaign.title}</h3>
              <p className="text-gray-300 mb-6">{selectedCampaign.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700 p-3 rounded-md">
                  <div className="text-sm text-gray-400 mb-1">Date de début</div>
                  <div className="text-white">{formatDate(selectedCampaign.timeline.start)}</div>
                </div>
                <div className="bg-gray-700 p-3 rounded-md">
                  <div className="text-sm text-gray-400 mb-1">Date de fin</div>
                  <div className="text-white">{formatDate(selectedCampaign.timeline.end)}</div>
                </div>
                <div className="bg-gray-700 p-3 rounded-md">
                  <div className="text-sm text-gray-400 mb-1">Date de livraison</div>
                  <div className="text-white">{formatDate(selectedCampaign.timeline.deliveryDate)}</div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-md font-medium text-white mb-2">Paiement</h4>
                <div className="bg-gray-700 p-3 rounded-md flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">{selectedCampaign.payment.amount}€</div>
                    <div className="text-sm text-gray-400">
                      {selectedCampaign.payment.isPaid ? "Payé" : "En attente de paiement"}
                    </div>
                  </div>
                  <div>
                    {selectedCampaign.payment.isPaid ? (
                      <span className="px-2 py-1 bg-emerald-900/30 text-emerald-500 rounded text-xs">
                        Payé
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-amber-900/30 text-amber-500 rounded text-xs">
                        En attente
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-md font-medium text-white mb-2">Brief</h4>
                <div className="bg-gray-700 p-3 rounded-md">
                  <p className="text-gray-300 text-sm whitespace-pre-line">{selectedCampaign.brief}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-md font-medium text-white mb-2">Livrables</h4>
                <div className="space-y-2">
                  {selectedCampaign.deliverables.map(deliverable => (
                    <div key={deliverable.id} className="bg-gray-700 p-3 rounded-md flex items-center justify-between">
                      <div>
                        <div className="text-white">{deliverable.type}</div>
                        <div className="text-xs text-gray-400">Échéance: {formatDate(deliverable.dueDate)}</div>
                      </div>
                      <div>
                        {deliverable.status === 'pending' ? (
                          <span className="px-2 py-1 bg-amber-900/30 text-amber-500 rounded text-xs">
                            À livrer
                          </span>
                        ) : deliverable.status === 'completed' ? (
                          <span className="px-2 py-1 bg-blue-900/30 text-blue-500 rounded text-xs">
                            Soumis
                          </span>
                        ) : deliverable.status === 'approved' ? (
                          <span className="px-2 py-1 bg-emerald-900/30 text-emerald-500 rounded text-xs">
                            Approuvé
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-red-900/30 text-red-500 rounded text-xs">
                            Refusé
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-md font-medium text-white mb-2">Ressources</h4>
                <div className="space-y-2">
                  {selectedCampaign.assets.map(asset => (
                    <div key={asset.id} className="bg-gray-700 p-3 rounded-md flex items-center justify-between">
                      <div className="flex items-center">
                        {asset.type === 'image' ? (
                          <Camera className="h-5 w-5 text-pink-400 mr-2" />
                        ) : asset.type === 'document' ? (
                          <FileText className="h-5 w-5 text-blue-400 mr-2" />
                        ) : (
                          <Video className="h-5 w-5 text-purple-400 mr-2" />
                        )}
                        <span className="text-white">{asset.name}</span>
                      </div>
                      <a 
                        href={asset.url} 
                        download
                        className="px-3 py-1.5 bg-gray-600 hover:bg-gray-500 text-white rounded text-xs"
                      >
                        Télécharger
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-white mb-2">Contacts</h4>
                <div className="space-y-2">
                  {selectedCampaign.contacts.map((contact, index) => (
                    <div key={index} className="bg-gray-700 p-3 rounded-md">
                      <div className="text-white font-medium">{contact.name}</div>
                      <div className="text-sm text-gray-400">{contact.role}</div>
                      <div className="flex items-center mt-2">
                        <a href={`mailto:${contact.email}`} className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {contact.email}
                        </a>
                        {contact.phone && (
                          <a href={`tel:${contact.phone}`} className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center ml-4">
                            <Phone className="h-4 w-4 mr-1" />
                            {contact.phone}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700 px-4 py-3 flex justify-end">
              <button
                onClick={() => setSelectedCampaign(null)}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md text-sm hover:bg-gray-600 transition-colors mr-3"
              >
                Fermer
              </button>
              {selectedCampaign.status === 'active' && (
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
                >
                  Livrer le contenu
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Modal d'upload */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-start p-4 border-b border-gray-700">
              <h2 className="text-lg font-bold text-white">Livrer du contenu</h2>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setUploadModalOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Type de contenu
                </label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="post">Publication Instagram</option>
                  <option value="story">Story Instagram</option>
                  <option value="reel">Reel Instagram</option>
                  <option value="video">Vidéo YouTube</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Campagne
                </label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  {campaigns.filter(c => c.status === 'active').map(campaign => (
                    <option key={campaign.id} value={campaign.id}>
                      {campaign.brand.name} - {campaign.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-20"
                  placeholder="Ajoutez une description ou des notes pour le client..."
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Fichiers
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-md px-6 pt-5 pb-6 cursor-pointer hover:border-indigo-500 transition-colors">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-400">
                      <label className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none">
                        <span>Téléverser un fichier</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">ou glisser-déposer</p>
                    </div>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, GIF, MP4 jusqu'à 50MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700 px-4 py-3 flex justify-end">
              <button
                onClick={() => setUploadModalOpen(false)}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md text-sm hover:bg-gray-600 transition-colors mr-3"
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfluencerCampaigns; 