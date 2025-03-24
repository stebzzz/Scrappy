import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Terminal, Instagram, Twitter, Youtube, TikTok, MessageSquare, AlertTriangle, Star, ThumbsDown, CheckCircle, RefreshCw, Filter, X, Bot, ArrowRight } from 'lucide-react';
import { useOpportunities } from '../../contexts/OpportunitiesContext';
import ManagerHeader from './ManagerHeader';
import ManagerSidebar from './ManagerSidebar';

const ManagerOpportunities: React.FC = () => {
  const router = useRouter();
  const { opportunities, setOpportunities } = useOpportunities();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [scrapingModalOpen, setScrapingModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    platforms: ['instagram'],
    niches: [],
    minFollowers: 1000,
    maxFollowers: 1000000,
    minRelevance: 0,
    status: 'all'
  });
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);

  useEffect(() => {
    let results = opportunities;
    
    // Filtres divers
    if (searchTerm) {
      results = results.filter(opportunity => 
        opportunity.influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opportunity.influencer.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opportunity.niche.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtres par plateforme
    if (filters.platforms.length > 0) {
      results = results.filter(opportunity => 
        filters.platforms.some(platform => opportunity.influencer.platforms.includes(platform))
      );
    }
    
    // Filtres par niche
    if (filters.niches.length > 0) {
      results = results.filter(opportunity => 
        filters.niches.includes(opportunity.niche)
      );
    }
    
    // Filtres par nombre d'abonnés
    results = results.filter(opportunity => 
      opportunity.influencer.followers >= filters.minFollowers && 
      opportunity.influencer.followers <= filters.maxFollowers
    );
    
    // Filtres par score de pertinence
    results = results.filter(opportunity => 
      opportunity.relevanceScore >= filters.minRelevance
    );
    
    // Filtres par statut
    if (filters.status !== 'all') {
      results = results.filter(opportunity => 
        opportunity.status === filters.status
      );
    }
    
    setFilteredOpportunities(results);
  }, [searchTerm, filters, opportunities]);
  
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };
  
  const getPlatformIcon = (platform: string) => {
    switch(platform) {
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case 'twitter':
        return <Twitter className="h-4 w-4 text-blue-400" />;
      case 'youtube':
        return <Youtube className="h-4 w-4 text-red-500" />;
      case 'tiktok':
        return <TikTok className="h-4 w-4 text-teal-400" />;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'new':
        return (
          <span className="px-2 py-1 text-xs bg-blue-900/30 text-blue-500 rounded-full flex items-center">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Nouveau
          </span>
        );
      case 'contacted':
        return (
          <span className="px-2 py-1 text-xs bg-purple-900/30 text-purple-500 rounded-full flex items-center">
            <MessageSquare className="h-3 w-3 mr-1" />
            Contacté
          </span>
        );
      case 'interested':
        return (
          <span className="px-2 py-1 text-xs bg-amber-900/30 text-amber-500 rounded-full flex items-center">
            <Star className="h-3 w-3 mr-1" />
            Intéressé
          </span>
        );
      case 'declined':
        return (
          <span className="px-2 py-1 text-xs bg-red-900/30 text-red-500 rounded-full flex items-center">
            <ThumbsDown className="h-3 w-3 mr-1" />
            Refusé
          </span>
        );
      case 'converted':
        return (
          <span className="px-2 py-1 text-xs bg-emerald-900/30 text-emerald-500 rounded-full flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            Converti
          </span>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900">
      <ManagerHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <ManagerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <main className="lg:pl-64 pt-16">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Opportunités d'Influenceurs</h1>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button 
                onClick={() => setScrapingModalOpen(true)}
                className="flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm transition-colors"
              >
                <Terminal className="h-4 w-4 mr-2" />
                Lancer scraping
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
                    placeholder="Rechercher une opportunité..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                <div className="mt-4 p-4 bg-gray-700 rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      {/* Autres boutons de plateforme similaires */}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Statut</label>
                    <select 
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={filters.status}
                      onChange={(e) => setFilters({...filters, status: e.target.value})}
                    >
                      <option value="all">Tous</option>
                      <option value="new">Nouveaux</option>
                      <option value="contacted">Contactés</option>
                      <option value="interested">Intéressés</option>
                      <option value="declined">Refusés</option>
                      <option value="converted">Convertis</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Score de pertinence min.</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      className="w-full bg-gray-600"
                      value={filters.minRelevance}
                      onChange={(e) => setFilters({...filters, minRelevance: parseInt(e.target.value)})}
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0%</span>
                      <span>{filters.minRelevance}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {isLoading ? (
              <div className="p-4">
                <div className="animate-pulse space-y-4">
                  <div className="h-16 bg-gray-700 rounded"></div>
                  <div className="h-16 bg-gray-700 rounded"></div>
                  <div className="h-16 bg-gray-700 rounded"></div>
                </div>
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
                        Niche
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Score
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Abonnés
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Statut
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {filteredOpportunities.map((opportunity) => (
                      <tr key={opportunity.id} className="hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full flex-shrink-0 bg-gray-700 overflow-hidden">
                              <img src={opportunity.influencer.avatar} alt="" className="h-full w-full object-cover" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{opportunity.influencer.name}</div>
                              <div className="text-sm text-gray-400">@{opportunity.influencer.handle}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-1">
                            {opportunity.influencer.platforms.map(platform => (
                              <div key={platform} className="p-1.5 bg-gray-700 rounded-full">
                                {getPlatformIcon(platform)}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{opportunity.niche}</div>
                          <div className="text-xs text-gray-400">via {opportunity.source}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-bold ${
                            opportunity.relevanceScore >= 90 ? 'text-emerald-500' : 
                            opportunity.relevanceScore >= 80 ? 'text-blue-500' : 
                            opportunity.relevanceScore >= 70 ? 'text-amber-500' : 'text-gray-400'
                          }`}>
                            {opportunity.relevanceScore}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{formatNumber(opportunity.influencer.followers)}</div>
                          <div className="text-xs text-gray-400">Engagement: {opportunity.influencer.engagement}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(opportunity.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button 
                              onClick={() => setSelectedOpportunity(opportunity)}
                              className="p-1 text-gray-400 hover:text-white"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-white">
                              <MessageSquare className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-white">
                              <ThumbsUp className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-white">
                              <ThumbsDown className="h-4 w-4" />
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
      
      {/* Modal détail opportunité */}
      {selectedOpportunity && (
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
                    onClick={() => setSelectedOpportunity(null)}
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
                        <img src={selectedOpportunity.influencer.avatar} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-medium text-white">{selectedOpportunity.influencer.name}</h3>
                        <p className="text-sm text-gray-400">@{selectedOpportunity.influencer.handle}</p>
                        <div className="flex items-center mt-1">
                          {getStatusBadge(selectedOpportunity.status)}
                          <span className="ml-2 text-sm text-gray-400">Découvert: {selectedOpportunity.discoveredAt}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="bg-gray-700 p-3 rounded-md text-center">
                        <div className="text-sm text-gray-400">Score</div>
                        <div className={`text-lg font-semibold ${
                          selectedOpportunity.relevanceScore >= 90 ? 'text-emerald-500' : 
                          selectedOpportunity.relevanceScore >= 80 ? 'text-blue-500' : 
                          selectedOpportunity.relevanceScore >= 70 ? 'text-amber-500' : 'text-gray-400'
                        }`}>
                          {selectedOpportunity.relevanceScore}%
                        </div>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-md text-center">
                        <div className="text-sm text-gray-400">Abonnés</div>
                        <div className="text-lg font-semibold text-white">
                          {formatNumber(selectedOpportunity.influencer.followers)}
                        </div>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-md text-center">
                        <div className="text-sm text-gray-400">Engagement</div>
                        <div className="text-lg font-semibold text-white">
                          {selectedOpportunity.influencer.engagement}%
                        </div>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-md text-center">
                        <div className="text-sm text-gray-400">Coût estimé</div>
                        <div className="text-lg font-semibold text-white">
                          {selectedOpportunity.estimatedCost}€
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-md font-medium text-white mb-2">Niche</h4>
                      <div className="px-3 py-1.5 rounded-md bg-gray-700 text-white text-sm inline-block">
                        {selectedOpportunity.niche}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-md font-medium text-white mb-2">Plateformes</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedOpportunity.influencer.platforms.map((platform) => (
                          <div key={platform} className="px-3 py-1.5 rounded-md bg-gray-700 text-white text-sm flex items-center">
                            {getPlatformIcon(platform)}
                            <span className="ml-2 capitalize">{platform}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-md font-medium text-white mb-2 flex items-center">
                        <Bot className="h-4 w-4 mr-2 text-indigo-500" />
                        Analyse IA
                      </h4>
                      <div className="bg-gray-700 rounded-md p-3">
                        <ul className="space-y-2">
                          {selectedOpportunity.aiInsights.map((insight, index) => (
                            <li key={index} className="text-sm text-gray-300 flex items-start">
                              <ArrowRight className="h-4 w-4 mr-2 text-indigo-400 flex-shrink-0 mt-0.5" />
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Contacter
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Ajouter à une campagne
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOpportunity(null)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-gray-300 hover:bg-gray-600 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal lancement scraping */}
      {scrapingModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-900 sm:mx-0 sm:h-10 sm:w-10">
                    <Terminal className="h-6 w-6 text-indigo-300" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-white">
                      Lancer une nouvelle opération de scraping
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-400">
                        Configurez les paramètres pour découvrir de nouveaux influenceurs correspondant à vos besoins. Notre IA analysera leurs profils pour vous proposer les meilleures opportunités.
                      </p>
                    </div>
                    
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Plateformes à scraper
                        </label>
                        <div className="flex flex-wrap gap-2">
                          <button className="px-3 py-1.5 bg-pink-900/30 text-pink-500 border border-pink-800/50 rounded-md text-sm flex items-center">
                            <Instagram className="h-4 w-4 mr-2" />
                            Instagram
                          </button>
                          <button className="px-3 py-1.5 bg-teal-900/30 text-teal-500 border border-teal-800/50 rounded-md text-sm flex items-center">
                            <TikTok className="h-4 w-4 mr-2" />
                            TikTok
                          </button>
                          <button className="px-3 py-1.5 bg-blue-900/30 text-blue-500 border border-blue-800/50 rounded-md text-sm flex items-center">
                            <Twitter className="h-4 w-4 mr-2" />
                            Twitter
                          </button>
                          <button className="px-3 py-1.5 bg-red-900/30 text-red-500 border border-red-800/50 rounded-md text-sm flex items-center">
                            <Youtube className="h-4 w-4 mr-2" />
                            YouTube
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Niche cible
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="ex: Mode durable, Fitness, Beauté naturelle"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Abonnés (fourchette)
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Min"
                          />
                          <input
                            type="number"
                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Max"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Mots-clés & Hashtags
                        </label>
                        <textarea
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-20"
                          placeholder="#modedurable #ecoresponsable #slowfashion"
                        ></textarea>
                      </div>
                      
                      <div className="bg-indigo-900/30 border border-indigo-700/50 rounded-md p-3">
                        <div className="flex items-center text-sm font-medium text-indigo-400 mb-2">
                          <Bot className="h-4 w-4 mr-2" />
                          Intelligence Artificielle
                        </div>
                        <p className="text-xs text-gray-300">
                          Notre IA analysera les profils découverts pour déterminer leur pertinence pour votre marque, leur taux d'engagement réel, et estimer leur coût potentiel. Les profils sont aussi analysés pour détecter des faux abonnés et interactions non-authentiques.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Lancer le scraping
                </button>
                <button
                  type="button"
                  onClick={() => setScrapingModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-gray-300 hover:bg-gray-600 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerOpportunities; 