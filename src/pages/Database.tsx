import React, { useState, useEffect } from 'react';
import { getBrands, getInfluencers, getCampaigns, Brand, Influencer, Campaign } from '../services/database';
import { Database, Search, Filter, RefreshCw, Download, Trash2, Edit, Eye, Plus } from 'lucide-react';

const DatabasePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'brands' | 'influencers' | 'campaigns'>('brands');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      switch (activeTab) {
        case 'brands':
          const brandsData = await getBrands();
          setBrands(brandsData);
          break;
        case 'influencers':
          const influencersData = await getInfluencers();
          setInfluencers(influencersData);
          break;
        case 'campaigns':
          const campaignsData = await getCampaigns();
          setCampaigns(campaignsData);
          break;
      }
    } catch (error) {
      console.error(`Erreur lors du chargement des données: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredData = () => {
    const term = searchTerm.toLowerCase();
    switch (activeTab) {
      case 'brands':
        return brands.filter(brand => 
          brand.name.toLowerCase().includes(term) || 
          brand.industry.toLowerCase().includes(term)
        );
      case 'influencers':
        return influencers.filter(influencer => 
          influencer.name.toLowerCase().includes(term) || 
          (influencer.niche && influencer.niche.toLowerCase().includes(term))
        );
      case 'campaigns':
        return campaigns.filter(campaign => 
          campaign.name.toLowerCase().includes(term)
        );
      default:
        return [];
    }
  };

  const handleExportData = () => {
    let dataToExport;
    let filename;

    switch (activeTab) {
      case 'brands':
        dataToExport = brands;
        filename = 'brands.json';
        break;
      case 'influencers':
        dataToExport = influencers;
        filename = 'influencers.json';
        break;
      case 'campaigns':
        dataToExport = campaigns;
        filename = 'campaigns.json';
        break;
      default:
        return;
    }

    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold mb-2 flex items-center text-blue-500">
            <Database className="mr-2" />
          Base de données
        </h1>
          <p className="text-gray-400">Accédez et gérez toutes vos données</p>
        </header>

        <div className="bg-gray-800 rounded-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            <button 
              className={`px-6 py-4 font-medium flex items-center text-sm ${activeTab === 'brands' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('brands')}
            >
              Marques
            </button>
            <button 
              className={`px-6 py-4 font-medium flex items-center text-sm ${activeTab === 'influencers' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('influencers')}
            >
              Influenceurs
            </button>
            <button 
              className={`px-6 py-4 font-medium flex items-center text-sm ${activeTab === 'campaigns' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('campaigns')}
            >
              Campagnes
            </button>
          </div>
          
          {/* Search and actions bar */}
          <div className="p-4 border-b border-gray-700 flex flex-wrap gap-3 justify-between">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
            
            <div className="flex space-x-2">
            <button 
                onClick={fetchData}
                className="px-4 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded flex items-center"
            >
                <RefreshCw size={16} className="mr-2" />
                Actualiser
            </button>
            <button 
                onClick={handleExportData}
                className="px-4 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded flex items-center"
              >
                <Download size={16} className="mr-2" />
                Exporter
            </button>
        </div>
      </div>

          {/* Data table */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-20 flex items-center justify-center">
                <RefreshCw size={30} className="animate-spin text-blue-500" />
                    </div>
            ) : (
              <>
                {activeTab === 'brands' && (
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nom</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Industrie</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contact</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Statut</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {filteredData().map((brand: Brand) => (
                        <tr key={brand.id} className="hover:bg-gray-750">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-white">{brand.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{brand.industry}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{brand.contactEmail || '-'}</div>
                      </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              brand.status === 'active' ? 'bg-green-100 text-green-800' : 
                              brand.status === 'inactive' ? 'bg-red-100 text-red-800' : 
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {brand.status || 'pending'}
                        </span>
                      </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            <div className="flex space-x-2">
                              <button className="text-gray-400 hover:text-blue-500">
                                <Eye size={16} />
                          </button>
                              <button className="text-gray-400 hover:text-yellow-500">
                                <Edit size={16} />
                          </button>
                              <button className="text-gray-400 hover:text-red-500">
                                <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTab === 'influencers' && (
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nom</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Niche</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Followers</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Statut</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {filteredData().map((influencer: Influencer) => (
                        <tr key={influencer.id} className="hover:bg-gray-750">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-white">{influencer.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{influencer.niche || '-'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{influencer.followers.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              influencer.status === 'active' ? 'bg-green-100 text-green-800' : 
                              influencer.status === 'inactive' ? 'bg-red-100 text-red-800' : 
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {influencer.status}
              </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
            <div className="flex space-x-2">
                              <button className="text-gray-400 hover:text-blue-500">
                                <Eye size={16} />
              </button>
                              <button className="text-gray-400 hover:text-yellow-500">
                                <Edit size={16} />
              </button>
                              <button className="text-gray-400 hover:text-red-500">
                                <Trash2 size={16} />
              </button>
            </div>
                          </td>
                  </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTab === 'campaigns' && (
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nom</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Marque</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Influenceurs</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {filteredData().map((campaign: Campaign) => (
                        <tr key={campaign.id} className="hover:bg-gray-750">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-white">{campaign.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{campaign.brandId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{campaign.influencerIds?.length || 0}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              campaign.status === 'active' ? 'bg-green-100 text-green-800' : 
                              campaign.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                              campaign.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {campaign.status || 'draft'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            <div className="flex space-x-2">
                              <button className="text-gray-400 hover:text-blue-500">
                                <Eye size={16} />
                          </button>
                              <button className="text-gray-400 hover:text-yellow-500">
                                <Edit size={16} />
                          </button>
                              <button className="text-gray-400 hover:text-red-500">
                                <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                )}
              </>
            )}
          </div>

          {/* Pagination or "No data" */}
          <div className="p-4 border-t border-gray-700 flex justify-between items-center">
            {!isLoading && filteredData().length === 0 && (
              <div className="text-center w-full py-8 text-gray-400">
                Aucun résultat trouvé
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabasePage; 