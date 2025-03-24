import React, { useState } from 'react';
import { AlertTriangle, XCircle, Plus, Download, Search, Filter, RefreshCw, Eye, Edit, Trash, FileText, Bot, X } from 'lucide-react';

const ManagerInfluencers: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    platforms: ['instagram', 'tiktok', 'youtube', 'twitter'] as Platform[],
    status: 'all',
    minFollowers: 0,
    maxFollowers: 1000000,
    minEngagement: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [filteredInfluencers, setFilteredInfluencers] = useState<Influencer[]>([]);

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-4 w-4 mr-1" />;
      case 'tiktok':
        return <TikTok className="h-4 w-4 mr-1" />;
      case 'youtube':
        return <Youtube className="h-4 w-4 mr-1" />;
      case 'twitter':
        return <Twitter className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: Status) => {
    switch (status) {
      case 'active':
        return (
          <span className="px-2 py-1 text-xs bg-emerald-900/30 text-emerald-500 rounded-full flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            Actif
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-1 text-xs bg-amber-900/30 text-amber-500 rounded-full flex items-center">
            <AlertTriangle className="h-3 w-3 mr-1" />
            En attente
          </span>
        );
      case 'declined':
        return (
          <span className="px-2 py-1 text-xs bg-red-900/30 text-red-500 rounded-full flex items-center">
            <XCircle className="h-3 w-3 mr-1" />
            Refusé
          </span>
        );
      default:
        return null;
    }
  };

  const formatNumber = (number: number) => {
    return number.toLocaleString();
  };

  const handleSearch = () => {
    setIsLoading(true);
    // Implement search logic here
    setIsLoading(false);
  };

  const handleFilter = () => {
    setIsLoading(true);
    // Implement filter logic here
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <ManagerHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <ManagerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <main className="lg:pl-64 pt-16">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Gestion des Influenceurs</h1>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button 
                onClick={() => setUploadModalOpen(true)}
                className="flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-sm transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un influenceur
              </button>
              
              <button className="flex items-center justify-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </button>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg mb-6">
            <div className="p-4 border-b border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="relative flex-grow md:max-w-md">
                  <input
                    type="text"
                    placeholder="Rechercher un influenceur..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setFilterVisible(!filterVisible)} 
                    className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm transition-colors"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filtres
                  </button>
                  <button className="flex items-center px-3 py-2 text-white bg-gray-700 hover:bg-gray-600 rounded-md text-sm transition-colors">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {filterVisible && (
                <div className="mt-4 p-4 bg-gray-700 rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Plateformes</label>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => {
                          setFilters({
                            ...filters, 
                            platforms: filters.platforms.includes('instagram')
                              ? filters.platforms.filter(p => p !== 'instagram')
                              : [...filters.platforms, 'instagram']
                          })
                        }}
                        className={`px-2 py-1 rounded-md text-xs flex items-center ${
                          filters.platforms.includes('instagram') 
                            ? 'bg-pink-900/50 text-pink-400 border border-pink-700' 
                            : 'bg-gray-600 text-gray-300 border border-gray-500'
                        }`}
                      >
                        <Instagram className="h-3 w-3 mr-1" />
                        Instagram
                      </button>
                      <button 
                        onClick={() => {
                          setFilters({
                            ...filters, 
                            platforms: filters.platforms.includes('tiktok')
                              ? filters.platforms.filter(p => p !== 'tiktok')
                              : [...filters.platforms, 'tiktok']
                          })
                        }}
                        className={`px-2 py-1 rounded-md text-xs flex items-center ${
                          filters.platforms.includes('tiktok') 
                            ? 'bg-teal-900/50 text-teal-400 border border-teal-700' 
                            : 'bg-gray-600 text-gray-300 border border-gray-500'
                        }`}
                      >
                        <TikTok className="h-3 w-3 mr-1" />
                        TikTok
                      </button>
                      <button 
                        onClick={() => {
                          setFilters({
                            ...filters, 
                            platforms: filters.platforms.includes('youtube')
                              ? filters.platforms.filter(p => p !== 'youtube')
                              : [...filters.platforms, 'youtube']
                          })
                        }}
                        className={`px-2 py-1 rounded-md text-xs flex items-center ${
                          filters.platforms.includes('youtube') 
                            ? 'bg-red-900/50 text-red-400 border border-red-700' 
                            : 'bg-gray-600 text-gray-300 border border-gray-500'
                        }`}
                      >
                        <Youtube className="h-3 w-3 mr-1" />
                        YouTube
                      </button>
                      <button 
                        onClick={() => {
                          setFilters({
                            ...filters, 
                            platforms: filters.platforms.includes('twitter')
                              ? filters.platforms.filter(p => p !== 'twitter')
                              : [...filters.platforms, 'twitter']
                          })
                        }}
                        className={`px-2 py-1 rounded-md text-xs flex items-center ${
                          filters.platforms.includes('twitter') 
                            ? 'bg-blue-900/50 text-blue-400 border border-blue-700' 
                            : 'bg-gray-600 text-gray-300 border border-gray-500'
                        }`}
                      >
                        <Twitter className="h-3 w-3 mr-1" />
                        Twitter
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Statut</label>
                    <select 
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={filters.status}
                      onChange={(e) => setFilters({...filters, status: e.target.value})}
                    >
                      <option value="all">Tous</option>
                      <option value="active">Actifs</option>
                      <option value="pending">En attente</option>
                      <option value="declined">Refusés</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Abonnés</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="number" 
                        placeholder="Min" 
                        className="px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={filters.minFollowers || ''}
                        onChange={(e) => setFilters({...filters, minFollowers: parseInt(e.target.value) || 0})}
                      />
                      <input 
                        type="number" 
                        placeholder="Max" 
                        className="px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={filters.maxFollowers || ''}
                        onChange={(e) => setFilters({...filters, maxFollowers: parseInt(e.target.value) || 1000000})}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Engagement minimum</label>
                    <div className="flex items-center">
                      <input 
                        type="range" 
                        min="0" 
                        max="10" 
                        step="0.1"
                        className="flex-grow h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        value={filters.minEngagement}
                        onChange={(e) => setFilters({...filters, minEngagement: parseFloat(e.target.value)})}
                      />
                      <span className="ml-2 text-white">{filters.minEngagement}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Influenceur
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Plateformes
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Abonnés
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Engagement
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Niche
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Statut
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Campagnes
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {filteredInfluencers.map((influencer) => (
                      <tr key={influencer.id} className="hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                              <img src={influencer.avatar} alt={influencer.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{influencer.name}</div>
                              <div className="text-sm text-gray-400">@{influencer.handle}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-1">
                            {influencer.platforms.map((platform) => (
                              <div key={platform} className="p-1">
                                {getPlatformIcon(platform)}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{formatNumber(influencer.followers)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{influencer.engagement}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{influencer.niche}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(influencer.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{influencer.campaigns}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button 
                              onClick={() => setSelectedInfluencer(influencer)}
                              className="p-1 text-gray-400 hover:text-white"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-white">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-white">
                              <Trash className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Modal d'upload du kit media */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-white mb-4">
                      Ajouter un nouvel influenceur
                    </h3>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Importer le kit media (PDF)
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md hover:border-gray-500 transition-colors">
                        <div className="space-y-1 text-center">
                          <FileText className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-400">
                            <label className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-emerald-500 hover:text-emerald-400 focus-within:outline-none">
                              <span>Télécharger un fichier</span>
                              <input 
                                type="file" 
                                className="sr-only" 
                                accept=".pdf"
                              />
                            </label>
                            <p className="pl-1">ou glisser-déposer</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PDF jusqu'à 10MB
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-400">
                        Notre IA analysera automatiquement le kit media pour extraire les informations pertinentes.
                      </p>
                    </div>
                    
                    <div className="bg-gray-700 p-4 rounded-md mb-4">
                      <h4 className="text-sm font-medium text-white mb-2 flex items-center">
                        <Bot className="h-4 w-4 mr-2 text-emerald-500" />
                        Assistant IA
                      </h4>
                      <p className="text-xs text-gray-300">
                        Importez le kit media pour que notre assistant IA puisse analyser le profil de l'influenceur et extraire automatiquement les informations suivantes:
                      </p>
                      <ul className="mt-2 text-xs text-gray-400 list-disc pl-5 space-y-1">
                        <li>Identité et coordonnées</li>
                        <li>Plateformes sociales et nombre d'abonnés</li>
                        <li>Taux d'engagement et métriques</li>
                        <li>Niche et thématiques de contenu</li>
                        <li>Précédentes collaborations</li>
                        <li>Tarifs et conditions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Analyser le kit media
                </button>
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-gray-300 hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal détail influenceur */}
      {selectedInfluencer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    onClick={() => setSelectedInfluencer(null)}
                    className="bg-gray-800 rounded-md text-gray-400 hover:text-white focus:outline-none"
                  >
                    <span className="sr-only">Fermer</span>
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex items-center mb-4">
                      <div className="h-16 w-16 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                        <img src={selectedInfluencer.avatar} alt={selectedInfluencer.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-medium text-white">{selectedInfluencer.name}</h3>
                        <p className="text-sm text-gray-400">@{selectedInfluencer.handle}</p>
                        <div className="flex items-center mt-1">
                          {getStatusBadge(selectedInfluencer.status)}
                          <span className="ml-2 text-sm text-gray-400">{selectedInfluencer.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="bg-gray-700 p-3 rounded-md">
                        <div className="text-sm text-gray-400">Abonnés</div>
                        <div className="text-lg font-semibold text-white">{formatNumber(selectedInfluencer.followers)}</div>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-md">
                        <div className="text-sm text-gray-400">Engagement</div>
                        <div className="text-lg font-semibold text-white">{selectedInfluencer.engagement}%</div>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-md">
                        <div className="text-sm text-gray-400">Campagnes</div>
                        <div className="text-lg font-semibold text-white">{selectedInfluencer.campaigns}</div>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-md">
                        <div className="text-sm text-gray-400">Revenus</div>
                        <div className="text-lg font-semibold text-white">{selectedInfluencer.earnings.toLocaleString()}€</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-md font-medium text-white mb-2">Bio</h4>
                      <p className="text-sm text-gray-300">{selectedInfluencer.bio}</p>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-md font-medium text-white mb-2">Plateformes</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedInfluencer.platforms.map((platform) => (
                          <div key={platform} className="px-3 py-1.5 rounded-md bg-gray-700 text-white text-sm flex items-center">
                            {getPlatformIcon(platform)}
                            <span className="ml-2 capitalize">{platform}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-md font-medium text-white mb-2">Niche</h4>
                      <div className="px-3 py-1.5 rounded-md bg-gray-700 text-white text-sm inline-block">
                        {selectedInfluencer.niche}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Assigner à une campagne
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Modifier
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInfluencer(null)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-gray-300 hover:bg-gray-600 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerInfluencers; 