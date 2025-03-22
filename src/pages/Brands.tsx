import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Plus, 
  Filter, 
  Download, 
  RefreshCw, 
  Trash2, 
  Edit, 
  Eye, 
  Globe,
  Mail,
  ExternalLink,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';

interface Brand {
  id: number;
  name: string;
  logo: string;
  industry: string;
  website: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  contactPerson: string;
  email: string;
  lastCampaign: string;
  status: string;
}

const Brands = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  // Données fictives pour les marques
  const mockBrands: Brand[] = [
    {
      id: 1,
      name: "L'Oréal Paris",
      logo: "https://via.placeholder.com/50",
      industry: "Beauté",
      website: "www.loreal-paris.fr",
      socialMedia: {
        instagram: "@lorealparis",
        facebook: "lorealparis",
        twitter: "@lorealparis"
      },
      contactPerson: "Marie Dupont",
      email: "marie.dupont@loreal.com",
      lastCampaign: "Collection Été 2025",
      status: "Actif"
    },
    {
      id: 2,
      name: "Sephora France",
      logo: "https://via.placeholder.com/50",
      industry: "Beauté",
      website: "www.sephora.fr",
      socialMedia: {
        instagram: "@sephorafrance",
        facebook: "sephorafrance"
      },
      contactPerson: "Julie Moreau",
      email: "julie.moreau@sephora.com",
      lastCampaign: "Essentiels Printemps",
      status: "Actif"
    },
    {
      id: 3,
      name: "Chanel",
      logo: "https://via.placeholder.com/50",
      industry: "Luxe",
      website: "www.chanel.com",
      socialMedia: {
        instagram: "@chanelofficial",
        facebook: "chanel",
        twitter: "@chanel"
      },
      contactPerson: "Philippe Martin",
      email: "philippe.martin@chanel.com",
      lastCampaign: "Anniversaire du N°5",
      status: "Actif"
    },
    {
      id: 4,
      name: "Nike France",
      logo: "https://via.placeholder.com/50",
      industry: "Sport",
      website: "www.nike.com/fr",
      socialMedia: {
        instagram: "@nikefrance",
        facebook: "nikefrance",
        twitter: "@nikefrance"
      },
      contactPerson: "Thomas Dubois",
      email: "thomas.dubois@nike.com",
      lastCampaign: "Collection Sportswear",
      status: "En pause"
    },
    {
      id: 5,
      name: "Dior",
      logo: "https://via.placeholder.com/50",
      industry: "Luxe",
      website: "www.dior.com",
      socialMedia: {
        instagram: "@dior",
        facebook: "dior",
        twitter: "@dior"
      },
      contactPerson: "Sophie Leclerc",
      email: "sophie.leclerc@dior.com",
      lastCampaign: "Nouveau Parfum",
      status: "Actif"
    }
  ];

  // Filtrer les marques en fonction du terme de recherche et de l'industrie
  const filteredBrands = mockBrands.filter(brand =>
    (brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterIndustry === null || brand.industry === filterIndustry) &&
    (activeTab === 'all' || (activeTab === 'active' && brand.status === 'Actif') || (activeTab === 'paused' && brand.status === 'En pause'))
  );

  // Liste des industries uniques pour le filtre
  const industries = Array.from(new Set(mockBrands.map(brand => brand.industry)));

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <Building2 className="w-6 h-6 mr-2 text-blue-400" />
          Marques
        </h1>
        <div className="flex space-x-2">
          <button className="btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Marque
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
              placeholder="Rechercher une marque..."
              className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setActiveTab('all')}
            >
              Toutes
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium ${activeTab === 'active' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setActiveTab('active')}
            >
              Actives
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium ${activeTab === 'paused' ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setActiveTab('paused')}
            >
              En pause
            </button>
          </div>
          
          <div className="flex gap-2">
            <select 
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
              onChange={(e) => setFilterIndustry(e.target.value === '' ? null : e.target.value)}
              value={filterIndustry || ''}
            >
              <option value="">Toutes les industries</option>
              {industries.map((industry, index) => (
                <option key={index} value={industry}>{industry}</option>
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
              {filteredBrands.length > 0 ? (
                filteredBrands.map((brand) => (
                  <div
                    key={brand.id}
                    className={`p-4 border-b border-gray-700 cursor-pointer transition-all hover:bg-gray-700 ${
                      selectedBrand?.id === brand.id
                        ? 'bg-gray-700'
                        : ''
                    }`}
                    onClick={() => setSelectedBrand(brand)}
                  >
                    <div className="flex items-center mb-2">
                      <img 
                        src={brand.logo} 
                        alt={brand.name} 
                        className="w-10 h-10 rounded-full mr-3 bg-gray-600"
                      />
                      <div>
                        <h3 className="font-semibold">{brand.name}</h3>
                        <span className="text-sm text-gray-400">{brand.industry}</span>
                      </div>
                      <span className={`ml-auto px-2 py-1 rounded-full text-xs ${
                        brand.status === 'Actif' 
                          ? 'bg-emerald-900 text-emerald-300' 
                          : 'bg-amber-900 text-amber-300'
                      }`}>
                        {brand.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      <p>Contact: {brand.contactPerson}</p>
                      <p>Dernière campagne: {brand.lastCampaign}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-400">
                  <Building2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>Aucune marque trouvée</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedBrand ? (
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img 
                      src={selectedBrand.logo} 
                      alt={selectedBrand.name} 
                      className="w-16 h-16 rounded-lg mr-4 bg-gray-600"
                    />
                    <div>
                      <h2 className="text-xl font-bold">{selectedBrand.name}</h2>
                      <p className="text-gray-400">{selectedBrand.industry}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn-outline-sm flex items-center">
                      <Edit className="w-4 h-4 mr-1" />
                      Modifier
                    </button>
                    <button className="btn-outline-sm flex items-center text-red-500 hover:text-red-400">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Informations de contact</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 text-gray-400 mr-2" />
                        <span>{selectedBrand.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        <span>{selectedBrand.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 text-gray-400 mr-2" />
                        <a href={`https://${selectedBrand.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center">
                          {selectedBrand.website}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Réseaux sociaux</h3>
                    <div className="space-y-3">
                      {selectedBrand.socialMedia.instagram && (
                        <div className="flex items-center">
                          <Instagram className="w-4 h-4 text-pink-400 mr-2" />
                          <span>{selectedBrand.socialMedia.instagram}</span>
                        </div>
                      )}
                      {selectedBrand.socialMedia.facebook && (
                        <div className="flex items-center">
                          <Facebook className="w-4 h-4 text-blue-400 mr-2" />
                          <span>{selectedBrand.socialMedia.facebook}</span>
                        </div>
                      )}
                      {selectedBrand.socialMedia.twitter && (
                        <div className="flex items-center">
                          <Twitter className="w-4 h-4 text-blue-500 mr-2" />
                          <span>{selectedBrand.socialMedia.twitter}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg mb-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Dernières campagnes</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium">{selectedBrand.lastCampaign}</p>
                        <p className="text-xs text-gray-400">Influenceur: Sophie Dubois</p>
                      </div>
                      <span className="text-xs bg-emerald-900 text-emerald-300 px-2 py-1 rounded-full">Complétée</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium">Campagne Automne 2024</p>
                        <p className="text-xs text-gray-400">Influenceur: Thomas Martin</p>
                      </div>
                      <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded-full">En cours</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="btn-primary flex-1 py-2">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle campagne
                  </button>
                  <button className="btn-outline flex-1 py-2">
                    <Eye className="w-4 h-4 mr-2" />
                    Voir toutes les campagnes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-xl border border-gray-700 h-full flex flex-col items-center justify-center text-center p-10">
              <Building2 className="w-16 h-16 mb-4 text-gray-600" />
              <h3 className="text-xl font-medium mb-2">Aucune marque sélectionnée</h3>
              <p className="text-gray-400 mb-6">Sélectionnez une marque dans la liste pour voir les détails</p>
              <button className="btn-primary flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une nouvelle marque
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Brands;