import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  RefreshCw, 
  Building2, 
  Users, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Filter,
  Download,
  Plus,
  Trash2,
  Eye,
  Edit,
  Database
} from 'lucide-react';

const Scraping = () => {
  const [activeTab, setActiveTab] = useState('brands');
  const [isScrapingActive, setIsScrapingActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  // Données fictives pour les marques scrapées
  const scrapedBrands = [
    { 
      id: 1, 
      name: "L'Oréal Paris", 
      industry: "Beauté", 
      news: "Lancement Collection Été 2025 (produits durables)", 
      lastUpdated: "Il y a 2 jours",
      status: "Actif",
      contacts: 3
    },
    { 
      id: 2, 
      name: "Sephora France", 
      industry: "Beauté", 
      news: "Campagne Essentiels Printemps", 
      lastUpdated: "Il y a 5 jours",
      status: "Actif",
      contacts: 2
    },
    { 
      id: 3, 
      name: "Chanel", 
      industry: "Luxe", 
      news: "Anniversaire du parfum N°5", 
      lastUpdated: "Il y a 1 semaine",
      status: "Actif",
      contacts: 4
    },
    { 
      id: 4, 
      name: "Nike France", 
      industry: "Sport", 
      news: "Nouvelle collection sportswear", 
      lastUpdated: "Il y a 3 jours",
      status: "En pause",
      contacts: 1
    },
    { 
      id: 5, 
      name: "Dior", 
      industry: "Luxe", 
      news: "Lancement nouveau parfum", 
      lastUpdated: "Il y a 4 jours",
      status: "Actif",
      contacts: 2
    }
  ];

  // Données fictives pour les contacts identifiés
  const scrapedContacts = [
    {
      id: 1,
      name: "Marie Dupont",
      position: "Responsable Marketing",
      company: "L'Oréal Paris",
      email: "marie.dupont@loreal.com",
      source: "LinkedIn",
      lastUpdated: "Il y a 2 jours"
    },
    {
      id: 2,
      name: "Thomas Martin",
      position: "Directeur Communication",
      company: "L'Oréal Paris",
      email: "thomas.martin@loreal.com",
      source: "Site web",
      lastUpdated: "Il y a 2 jours"
    },
    {
      id: 3,
      name: "Sophie Leclerc",
      position: "Responsable Influence",
      company: "L'Oréal Paris",
      email: "sophie.leclerc@loreal.com",
      source: "Apollo",
      lastUpdated: "Il y a 3 jours"
    },
    {
      id: 4,
      name: "Julie Moreau",
      position: "Responsable Marketing",
      company: "Sephora France",
      email: "julie.moreau@sephora.com",
      source: "LinkedIn",
      lastUpdated: "Il y a 5 jours"
    },
    {
      id: 5,
      name: "Alexandre Petit",
      position: "Directeur Communication",
      company: "Sephora France",
      email: "alexandre.petit@sephora.com",
      source: "Site web",
      lastUpdated: "Il y a 6 jours"
    }
  ];

  const handleStartScraping = () => {
    setIsScrapingActive(true);
    // Simuler un scraping
    setTimeout(() => {
      setIsScrapingActive(false);
    }, 3000);
  };

  // Filtrer les marques en fonction du terme de recherche et du statut
  const filteredBrands = scrapedBrands.filter(brand =>
    (brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.news.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === null || brand.status === filterStatus)
  );

  // Filtrer les contacts en fonction du terme de recherche
  const filteredContacts = scrapedContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <Globe className="w-6 h-6 mr-2 text-emerald-400" />
          Scraping des Informations
        </h1>
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'brands' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            onClick={() => setActiveTab('brands')}
          >
            Marques
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'contacts' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            onClick={() => setActiveTab('contacts')}
          >
            Contacts
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            onClick={() => setActiveTab('settings')}
          >
            Paramètres
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden mb-6">
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">Scraping automatisé</h2>
            <p className="text-gray-400 text-sm">
              Collecte automatique des actualités des marques et identification des contacts pertinents.
            </p>
          </div>
          <button 
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center ${
              isScrapingActive 
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white'
            }`}
            onClick={handleStartScraping}
            disabled={isScrapingActive}
          >
            {isScrapingActive ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Scraping en cours...
              </>
            ) : (
              <>
                <Globe className="w-5 h-5 mr-2" />
                Lancer un nouveau scraping
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={`Rechercher des ${activeTab === 'brands' ? 'marques' : 'contacts'}...`}
              className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          
          {activeTab === 'brands' && (
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-3 py-1 rounded-full text-xs font-medium ${filterStatus === null ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                onClick={() => setFilterStatus(null)}
              >
                Tous
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-xs font-medium ${filterStatus === 'Actif' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                onClick={() => setFilterStatus('Actif')}
              >
                Actif
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-xs font-medium ${filterStatus === 'En pause' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                onClick={() => setFilterStatus('En pause')}
              >
                En pause
              </button>
            </div>
          )}
          
          <div className="flex gap-2">
            <button className="btn-secondary flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </button>
            <button className="btn-outline flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'brands' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                  <th className="p-4 font-medium">Marque</th>
                  <th className="p-4 font-medium">Industrie</th>
                  <th className="p-4 font-medium">Actualité récente</th>
                  <th className="p-4 font-medium">Contacts</th>
                  <th className="p-4 font-medium">Dernière mise à jour</th>
                  <th className="p-4 font-medium">Statut</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBrands.map((brand) => (
                  <tr key={brand.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                    <td className="p-4 font-medium">{brand.name}</td>
                    <td className="p-4">{brand.industry}</td>
                    <td className="p-4 max-w-xs truncate">{brand.news}</td>
                    <td className="p-4">{brand.contacts}</td>
                    <td className="p-4 text-gray-400">{brand.lastUpdated}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        brand.status === 'Actif' 
                          ? 'bg-emerald-900 text-emerald-300' 
                          : 'bg-gray-700 text-gray-300'
                      }`}>
                        {brand.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredBrands.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              <Building2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>Aucune marque trouvée</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'contacts' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                  <th className="p-4 font-medium">Nom</th>
                  <th className="p-4 font-medium">Poste</th>
                  <th className="p-4 font-medium">Entreprise</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Source</th>
                  <th className="p-4 font-medium">Dernière mise à jour</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                    <td className="p-4 font-medium">{contact.name}</td>
                    <td className="p-4">{contact.position}</td>
                    <td className="p-4">{contact.company}</td>
                    <td className="p-4">{contact.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        contact.source === 'LinkedIn' 
                          ? 'bg-blue-900 text-blue-300' 
                          : contact.source === 'Apollo'
                            ? 'bg-purple-900 text-purple-300'
                            : 'bg-gray-700 text-gray-300'
                      }`}>
                        {contact.source}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">{contact.lastUpdated}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredContacts.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>Aucun contact trouvé</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h2 className="font-semibold">Paramètres de Scraping</h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Sources de données</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium">Firecrawl</h4>
                    <p className="text-sm text-gray-400">Scraping avancé des sites web et réseaux sociaux</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium">API de veille média</h4>
                    <p className="text-sm text-gray-400">Actualités et communiqués de presse</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium">Apollo</h4>
                    <p className="text-sm text-gray-400">Identification des contacts professionnels</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium">LinkedIn</h4>
                    <p className="text-sm text-gray-400">Recherche de contacts et d'actualités</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Fréquence de scraping</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-700 rounded-lg border border-emerald-600">
                  <div className="flex items-center mb-2">
                    <input type="radio" id="daily" name="frequency" className="mr-2" checked />
                    <label htmlFor="daily" className="font-medium">Quotidien</label>
                  </div>
                  <p className="text-sm text-gray-400">Mise à jour quotidienne des données</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
                  <div className="flex items-center mb-2">
                    <input type="radio" id="weekly" name="frequency" className="mr-2" />
                    <label htmlFor="weekly" className="font-medium">Hebdomadaire</label>
                  </div>
                  <p className="text-sm text-gray-400">Mise à jour chaque semaine</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
                  <div className="flex items-center mb-2">
                    <input type="radio" id="manual" name="frequency" className="mr-2" />
                    <label htmlFor="manual" className="font-medium">Manuel</label>
                  </div>
                  <p className="text-sm text-gray-400">Uniquement sur demande</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Intégration avec Airtable</h3>
              <div className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Synchronisation automatique</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <div className="flex items-center">
                  <Database className="w-5 h-5 mr-2 text-purple-400" />
                  <span className="text-sm text-gray-300">Connecté à Airtable</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
              <button className="btn-outline py-2 px-4">
                Annuler
              </button>
              <button className="btn-primary py-2 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                Enregistrer les paramètres
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scraping; 