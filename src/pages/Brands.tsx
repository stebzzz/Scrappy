import React, { useState, useEffect, useRef } from 'react';
import { useBrands } from '../hooks/useBrands';
import { useAppContext } from '../context/AppContext';
import { Brand as BrandType } from '../services/database';
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
  Twitter,
  Linkedin,
  Phone,
  MoreHorizontal,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Interface pour l'affichage des marques
interface BrandDisplay {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    other?: string;
  };
  contactPerson?: string;
  email?: string;
  lastCampaign?: string;
  status?: string;
  contactPhone?: string;
}

const Brands = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<BrandDisplay | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [displayBrands, setDisplayBrands] = useState<BrandDisplay[]>([]);
  
  // Utiliser le hook pour récupérer les marques depuis Firebase
  const { brands, isLoading, error, refreshBrands, createBrand, updateBrandById, deleteBrandById } = useBrands();
  const { campaigns } = useAppContext();
  
  // Référence pour déboguer les dépendances useEffect
  const prevBrandsRef = useRef(brands);
  const prevCampaignsRef = useRef(campaigns);
  
  // Convertir les marques de la base de données en format d'affichage
  useEffect(() => {
    if (brands.length > 0) {
      // Déboguer les changements
      if (prevBrandsRef.current !== brands) {
        console.log('Les marques ont changé');
        prevBrandsRef.current = brands;
      }
      
      if (prevCampaignsRef.current !== campaigns) {
        console.log('Les campagnes ont changé');
        prevCampaignsRef.current = campaigns;
      }
      
      const formattedBrands: BrandDisplay[] = brands.map(brand => {
        // Trouver la dernière campagne associée à cette marque
        const brandCampaigns = campaigns.filter(c => c.brandId === brand.id);
        const lastCampaign = brandCampaigns.length > 0 
          ? brandCampaigns.sort((a, b) => {
              const dateA = a.startDate instanceof Date ? a.startDate : new Date(a.startDate as any);
              const dateB = b.startDate instanceof Date ? b.startDate : new Date(b.startDate as any);
              return dateB.getTime() - dateA.getTime();
            })[0].name
          : 'Aucune campagne';
        
        // Convertir les liens sociaux en format d'affichage
        const socialMedia: {instagram?: string, facebook?: string, twitter?: string, linkedin?: string, other?: string} = {};
        if (brand.socialLinks) {
          Object.entries(brand.socialLinks).forEach(([platform, link]) => {
            if (link) {
              socialMedia[platform as keyof typeof socialMedia] = link;
            }
          });
        }
        
        return {
          id: brand.id || '',
          name: brand.name || 'Sans nom',
          logo: brand.logo || 'https://via.placeholder.com/50',
          industry: brand.industry || 'Non spécifiée',
          website: brand.website,
          socialMedia,
          contactPerson: brand.contactPerson || 'Contact non spécifié',
          email: brand.contactEmail || '',
          lastCampaign,
          status: brand.status || 'active',
          contactPhone: brand.contactPhone || ''
        };
      });
      
      setDisplayBrands(formattedBrands);
    }
  }, [brands, campaigns]);
  
  // Filtrer les marques en fonction du terme de recherche et de l'industrie
  const filteredBrands = displayBrands.filter(brand =>
    (brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (brand.contactPerson && brand.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (filterIndustry === null || brand.industry === filterIndustry) &&
    (activeTab === 'all' || (activeTab === 'active' && brand.status === 'active') || (activeTab === 'paused' && brand.status === 'inactive'))
  );

  // Liste des industries uniques pour le filtre
  const industries = Array.from(new Set(displayBrands.map(brand => brand.industry)));

  // Fonction pour créer une nouvelle marque
  const handleCreateBrand = () => {
    const newBrand = {
      name: 'Nouvelle Marque',
      industry: 'Non spécifiée',
      status: 'active',
      contactEmail: '',
      website: '',
      socialLinks: {}
    };
    
    createBrand(newBrand)
      .then((createdBrand) => {
        console.log('Marque créée avec succès', createdBrand);
        refreshBrands();
      })
      .catch(err => {
        console.error('Erreur lors de la création de la marque:', err);
      });
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <Building2 className="w-6 h-6 mr-2 text-blue-400" />
          Marques
        </h1>
        <div className="flex space-x-2">
          <Link to="/brands/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Marque
          </Link>
          <button 
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center"
            onClick={() => refreshBrands()}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Chargement...' : 'Actualiser'}
          </button>
          <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center">
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

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center">
            <RefreshCw className="w-12 h-12 text-blue-400 animate-spin mb-4" />
            <p className="text-gray-400">Chargement des marques...</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center">
            <p className="text-red-400 mb-2">Erreur lors du chargement des marques</p>
            <p className="text-gray-400">{error}</p>
            <button 
              className="btn-secondary mt-4" 
              onClick={() => refreshBrands()}
            >
              Réessayer
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                <span className="text-sm font-medium">
                  {filteredBrands.length} marque{filteredBrands.length !== 1 ? 's' : ''}
                </span>
                <button className="text-gray-400 hover:text-white">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <div className="overflow-auto max-h-[calc(100vh-220px)]">
                {filteredBrands.length > 0 ? (
                  filteredBrands.map((brandItem) => (
                    <div
                      key={brandItem.id}
                      className={`p-4 border-b border-gray-700 cursor-pointer transition-all hover:bg-gray-700 ${
                        selectedBrand?.id === brandItem.id
                          ? 'bg-gray-700'
                          : ''
                      }`}
                      onClick={() => setSelectedBrand(brandItem)}
                    >
                      <div className="flex items-center mb-2">
                        <img 
                          src={brandItem.logo} 
                          alt={`Logo ${brandItem.name}`} 
                          className="w-10 h-10 rounded-full mr-3 bg-gray-600"
                        />
                        <div>
                          <h3 className="font-semibold">{brandItem.name}</h3>
                          <span className="text-sm text-gray-400">{brandItem.industry}</span>
                        </div>
                        <span className={`ml-auto px-2 py-1 rounded-full text-xs ${
                          brandItem.status === 'active' 
                            ? 'bg-emerald-900 text-emerald-300' 
                            : 'bg-amber-900 text-amber-300'
                        }`}>
                          {brandItem.status === 'active' ? 'Actif' : brandItem.status === 'inactive' ? 'En pause' : 'En attente'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        <p>Contact: {brandItem.contactPerson}</p>
                        <p>Dernière campagne: {brandItem.lastCampaign}</p>
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
                        alt={`Logo ${selectedBrand.name}`} 
                        className="w-16 h-16 rounded-lg mr-4 bg-gray-600"
                      />
                      <div>
                        <h2 className="text-xl font-bold">{selectedBrand.name}</h2>
                        <p className="text-gray-400">{selectedBrand.industry}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link 
                        to={`/brands/edit/${selectedBrand.id}`}
                        className="px-3 py-1.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Modifier
                      </Link>
                      <button 
                        className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                        onClick={() => {
                          if (window.confirm(`Êtes-vous sûr de vouloir supprimer la marque ${selectedBrand.name} ?`)) {
                            deleteBrandById(selectedBrand.id)
                              .then(() => {
                                setSelectedBrand(null);
                                console.log('Marque supprimée avec succès');
                              })
                              .catch(err => {
                                console.error('Erreur lors de la suppression de la marque:', err);
                              });
                          }
                        }}
                      >
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
                        {selectedBrand.email && (
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 text-gray-400 mr-2" />
                            <a 
                              href={`mailto:${selectedBrand.email}`}
                              className="text-blue-400 hover:underline"
                            >
                              {selectedBrand.email}
                            </a>
                          </div>
                        )}
                        {selectedBrand.website && (
                          <div className="flex items-center">
                            <Globe className="w-4 h-4 text-gray-400 mr-2" />
                            <a 
                              href={selectedBrand.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline"
                            >
                              {selectedBrand.website}
                            </a>
                          </div>
                        )}
                        {selectedBrand.contactPhone && (
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 text-gray-400 mr-2" />
                            <a 
                              href={`tel:${selectedBrand.contactPhone}`}
                              className="text-blue-400 hover:underline"
                            >
                              {selectedBrand.contactPhone}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-400 mb-3">Réseaux sociaux</h3>
                      <div className="space-y-3">
                        {selectedBrand.socialMedia?.instagram && (
                          <div className="flex items-center">
                            <Instagram className="w-4 h-4 text-pink-400 mr-2" />
                            <span>{selectedBrand.socialMedia.instagram}</span>
                          </div>
                        )}
                        {selectedBrand.socialMedia?.facebook && (
                          <div className="flex items-center">
                            <Facebook className="w-4 h-4 text-blue-400 mr-2" />
                            <span>{selectedBrand.socialMedia.facebook}</span>
                          </div>
                        )}
                        {selectedBrand.socialMedia?.twitter && (
                          <div className="flex items-center">
                            <Twitter className="w-4 h-4 text-blue-500 mr-2" />
                            <span>{selectedBrand.socialMedia.twitter}</span>
                          </div>
                        )}
                        {selectedBrand.socialMedia?.linkedin && (
                          <div className="flex items-center">
                            <Linkedin className="w-4 h-4 text-blue-600 mr-2" />
                            <span>{selectedBrand.socialMedia.linkedin}</span>
                          </div>
                        )}
                        {!selectedBrand.socialMedia?.instagram && 
                         !selectedBrand.socialMedia?.facebook && 
                         !selectedBrand.socialMedia?.twitter && 
                         !selectedBrand.socialMedia?.linkedin && (
                          <div className="text-gray-400">Aucun réseau social renseigné</div>
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
                    <Link 
                      to={`/brands/${selectedBrand.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center flex-1"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Voir la fiche complète
                    </Link>
                    <Link 
                      to={`/scraping?url=${selectedBrand.website}`}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center flex-1"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Scanner le site
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-xl border border-gray-700 h-full flex flex-col items-center justify-center text-center p-10">
                <Building2 className="w-16 h-16 mb-4 text-gray-600" />
                <h3 className="text-xl font-medium mb-2">Aucune marque sélectionnée</h3>
                <p className="text-gray-400 mb-6">Sélectionnez une marque dans la liste pour voir les détails</p>
                <Link to="/brands/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une nouvelle marque
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Brands;
