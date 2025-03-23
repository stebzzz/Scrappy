import React, { useState, useEffect } from 'react';
import { useScraping } from '../hooks/useScraping';
import { getLatestScrapingResults, saveBrandData, getBrandStatistics } from '../services/database';
import ScrapingAnalytics from '../components/ScrapingAnalytics';
import { 
  Globe, Search, RefreshCw, Building2, Mail, Phone, Share2, 
  Newspaper, Calendar, Download, AlertTriangle, CheckCircle, 
  Info, Facebook, Twitter, Instagram, Linkedin, ArrowRight, 
  Plus, Filter, User, Copy, ExternalLink, Briefcase, Clock,
  Save, Lightbulb
} from 'lucide-react';
import '../styles/scraping.css';

interface ScrapingResult {
  error?: string;
  url?: string;
  scrapedAt?: Date;
  socialLinks?: any[];
  newsItems?: any[];
  insights?: any[];
}

const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-gray-800 p-4 rounded-xl border-l-4 ${color}`}>
    <div className="flex items-center">
      <div className={`p-3 rounded-lg ${color.replace('border-', 'bg-')}/10 mr-3`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-400 text-xs uppercase font-medium">{title}</p>
        <p className="text-white text-xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

const Scraping = () => {
  // États pour gérer les données et l'UI
  const [newBrandUrl, setNewBrandUrl] = useState('');
  const [isScrapingActive, setIsScrapingActive] = useState(false);
  const [scrapingResults, setScrapingResults] = useState<ScrapingResult | null>(null);
  const [historyItems, setHistoryItems] = useState([]);
  const [activeTab, setActiveTab] = useState('scraping');
  const [contactsFound, setContactsFound] = useState([]);
  const [showBrandForm, setShowBrandForm] = useState(false);
  const [brandStats, setBrandStats] = useState(null);
  const [brandFormData, setBrandFormData] = useState({
    name: '',
    industry: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    status: 'active',
    notes: ''
  });
  
  const { 
    isLoading,
    scrapeBrandContact,
    scrapeBrandNews
  } = useScraping({ saveResults: true });
  
  // Charger l'historique et les statistiques au montage
  useEffect(() => {
    loadScrapingHistory();
    loadBrandStatistics();
  }, []);
  
  const loadBrandStatistics = async () => {
    try {
      const stats = await getBrandStatistics();
      setBrandStats(stats);
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error);
    }
  };
  
  const loadScrapingHistory = async () => {
    try {
      const history = await getLatestScrapingResults();
      setHistoryItems(history);
    } catch (error) {
      console.error("Erreur lors du chargement de l'historique:", error);
    }
  };
  
  // Fonction principale de scraping
  const handleStartScraping = async () => {
    if (!newBrandUrl) {
      alert('Veuillez entrer une URL de marque');
      return;
    }
    
    setIsScrapingActive(true);
    setScrapingResults(null);
    setContactsFound([]);
    
    try {
      console.log("🔍 DÉMARRAGE DU SCRAPING AVEC SCRAPINGBEE:", newBrandUrl);
      
      // Scraper les informations de contact
      const contactInfo = await scrapeBrandContact(newBrandUrl);
      console.log("📞 Résultats du scraping contact:", contactInfo);
      
      // Extraire les contacts trouvés
      const emails = contactInfo.allEmails || [];
      if (contactInfo.contactEmail && !emails.includes(contactInfo.contactEmail)) {
        emails.unshift(contactInfo.contactEmail);
      }
      
      setContactsFound(emails.map((email: string) => ({
        email,
        type: identifyContactType(email),
        name: extractNameFromEmail(email),
        selected: email === contactInfo.contactEmail
      })));
      
      // Scraper les actualités
      let newsInfo;
      try {
        newsInfo = await scrapeBrandNews(newBrandUrl);
        console.log("📰 Résultats du scraping actualités:", newsInfo);
      } catch (error) {
        console.warn('Impossible de récupérer les actualités:', error);
        newsInfo = { newsItems: [] };
      }
      
      // Fusionner les résultats
      const combinedResults = {
        ...contactInfo,
        newsItems: newsInfo.newsItems || [],
        keywords: newsInfo.keywords || [],
        insights: [
          ...(contactInfo.insights || []),
          ...(newsInfo.insights || [])
        ],
        scrapedAt: new Date()
      };
      
      // Mettre à jour l'état
      setScrapingResults(combinedResults);
      
      // Préremplir le formulaire avec les données scrapées
      setBrandFormData({
        name: combinedResults.name || '',
        industry: combinedResults.industry || '',
        description: combinedResults.description || '',
        contactEmail: combinedResults.contactEmail || '',
        contactPhone: combinedResults.contactPhone || '',
        website: newBrandUrl,
        status: 'active',
        notes: `Scraped on ${new Date().toLocaleString()}`
      });
      
      // Rafraîchir les statistiques
      loadBrandStatistics();
      
    } catch (error) {
      console.error("Erreur lors du scraping:", error);
      setScrapingResults({
        error: error.message,
        url: newBrandUrl,
        scrapedAt: new Date()
      });
    } finally {
      setIsScrapingActive(false);
    }
  };
  
  // Sauvegarder les données de marque
  const handleSaveBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!brandFormData.name || !brandFormData.website) {
      alert("Le nom et le site web sont obligatoires");
      return;
    }
    
    try {
      // Préparer les données à sauvegarder
      const brandToSave = {
        ...brandFormData,
        socialLinks: scrapingResults?.socialLinks || [],
        newsItems: scrapingResults?.newsItems || [],
        lastUpdated: new Date(),
        scrapingData: {
          url: newBrandUrl,
          scrapedAt: scrapingResults?.scrapedAt || new Date(),
          insights: scrapingResults?.insights || []
        }
      };
      
      // Sauvegarder dans la base de données
      const savedBrandId = await saveBrandData(brandToSave);
      
      alert(`Marque ${brandFormData.name} sauvegardée avec succès!`);
      
      // Rafraîchir l'historique et les statistiques
      loadScrapingHistory();
      loadBrandStatistics();
      
      // Fermer le formulaire
      setShowBrandForm(false);
      
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert(`Erreur: ${error.message}`);
    }
  };
  
  // Gérer les changements dans le formulaire
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBrandFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Sélectionner un contact pour l'email principal
  const handleSelectContact = (email) => {
    // Mettre à jour le formulaire avec l'email sélectionné
    setBrandFormData(prev => ({
      ...prev,
      contactEmail: email
    }));
    
    // Mettre à jour la sélection visuelle
    setContactsFound(prev => 
      prev.map(contact => ({
        ...contact,
        selected: contact.email === email
      }))
    );
  };
  
  // Fonctions utilitaires
  const identifyContactType = (email) => {
    const lowerEmail = email.toLowerCase();
    
    if (lowerEmail.includes('press') || lowerEmail.includes('media') || lowerEmail.includes('pr@')) {
      return 'PR';
    } else if (lowerEmail.includes('market')) {
      return 'Marketing';
    } else if (lowerEmail.includes('partner') || lowerEmail.includes('collab')) {
      return 'Partnerships';
    } else if (lowerEmail.includes('info') || lowerEmail.includes('contact')) {
      return 'Info';
    } else if (lowerEmail.includes('social') || lowerEmail.includes('influence')) {
      return 'Social Media';
    }
    
    return 'Contact';
  };
  
  const extractNameFromEmail = (email) => {
    // Extraire le nom de l'email (avant le @)
    const localPart = email.split('@')[0];
    
    // Remplacer les points, tirets, underscores par des espaces
    const nameParts = localPart.replace(/[._-]/g, ' ');
    
    // Mettre en majuscule la première lettre de chaque mot
    return nameParts
      .split(' ')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  };
  
  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Prospection de Marques</h1>
      
      {/* Navigation par onglets */}
      <div className="tabs-header mb-6">
        <div 
          className={`tab ${activeTab === 'scraping' ? 'active' : ''}`}
          onClick={() => setActiveTab('scraping')}
        >
          <Search className="h-4 w-4 mr-2" />
          Scraping
        </div>
        <div 
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <Clock className="h-4 w-4 mr-2" />
          Historique
        </div>
        <div 
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <Briefcase className="h-4 w-4 mr-2" />
          Analyse
        </div>
      </div>
      
      {/* Contenu de l'onglet Scraping */}
      {activeTab === 'scraping' && (
        <div className="tab-content">
          {/* Section d'entrée URL */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
            <h2 className="text-xl font-bold mb-4">Nouvelle analyse</h2>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="url" 
                  value={newBrandUrl} 
                  onChange={(e) => setNewBrandUrl(e.target.value)} 
                  placeholder="https://www.exemple.com" 
                  className="pl-10 pr-4 py-3 w-full bg-gray-700 border border-gray-600 focus:border-blue-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              <button 
                className={`px-6 py-3 rounded-lg font-medium flex items-center ${
                  isScrapingActive 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl shadow-blue-600/20'
                }`}
                onClick={handleStartScraping}
                disabled={isScrapingActive || !newBrandUrl}
              >
                {isScrapingActive ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    En cours...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Analyser
                  </>
                )}
              </button>
            </div>
            
            {/* Statistiques */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard 
                title="Marques" 
                value={brandStats?.totalBrands || 0} 
                icon={<Building2 className="h-5 w-5 text-blue-400" />} 
                color="border-blue-500" 
              />
              <StatCard 
                title="Emails collectés" 
                value={brandStats?.contactStats?.withEmail || 0} 
                icon={<Mail className="h-5 w-5 text-emerald-400" />} 
                color="border-emerald-500" 
              />
              <StatCard 
                title="Industries" 
                value={Object.keys(brandStats?.brandsByIndustry || {}).length} 
                icon={<Briefcase className="h-5 w-5 text-purple-400" />} 
                color="border-purple-500" 
              />
              <StatCard 
                title="Actualisées récemment" 
                value={brandStats?.updatedInLastMonth || 0} 
                icon={<Clock className="h-5 w-5 text-amber-400" />} 
                color="border-amber-500" 
              />
            </div>
          </div>
          
          {/* Résultats du scraping */}
          {scrapingResults && (
            <div className="mt-6 bg-gray-800 rounded-lg p-6 shadow-lg animate__animated animate__fadeIn">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">
                  <CheckCircle className="h-6 w-6 text-green-500 inline mr-2" />
                  Résultats du scraping
                </h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowBrandForm(true)}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 flex items-center"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Sauvegarder
                  </button>
                </div>
              </div>
              
              {/* Informations générales */}
              <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {scrapingResults.name || 'Site internet'}
                </h3>
                <div className="text-sm text-gray-300 mb-2 flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  <a href={scrapingResults.website} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-400 hover:underline truncate">
                    {scrapingResults.website}
                  </a>
                </div>
                <div className="text-sm text-gray-300 mb-2">
                  <span className="font-medium text-gray-200">Industrie:</span> {scrapingResults.industry || 'Non spécifiée'}
                </div>
                {scrapingResults.description && (
                  <div className="mt-3 text-sm text-gray-300">
                    <p className="italic">{scrapingResults.description}</p>
                  </div>
                )}
              </div>
              
              {/* Grille des infos détaillées */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Contacts trouvés */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Mail className="h-5 w-5 text-blue-400 mr-2" />
                    Contacts identifiés
                  </h3>
                  
                  {contactsFound.length > 0 ? (
                    <div className="space-y-3">
                      {contactsFound.map((contact, index) => (
                        <div key={index} className={`p-2 rounded ${contact.selected ? 'bg-blue-900/40' : 'bg-gray-600/40'} flex justify-between items-center`}>
                          <div>
                            <div className="font-medium text-sm text-white">{contact.name}</div>
                            <div className="text-xs text-gray-300 flex items-center">
                              <span className="px-1.5 py-0.5 bg-gray-700 rounded text-xs mr-2">{contact.type}</span>
                              {contact.email}
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <button 
                              className="p-1 text-gray-400 hover:text-white"
                              title="Copier l'email"
                              onClick={() => navigator.clipboard.writeText(contact.email)}
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                            <button 
                              className="p-1 text-gray-400 hover:text-white"
                              title="Sélectionner comme contact principal"
                              onClick={() => handleSelectContact(contact.email)}
                            >
                              {contact.selected ? (
                                <CheckCircle className="h-4 w-4 text-blue-500" />
                              ) : (
                                <User className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-400">
                      <Mail className="h-12 w-12 mx-auto mb-2 opacity-30" />
                      <p>Aucun contact email trouvé</p>
                    </div>
                  )}
                </div>
                
                {/* Réseaux sociaux */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Share2 className="h-5 w-5 text-purple-400 mr-2" />
                    Réseaux sociaux
                  </h3>
                  
                  {scrapingResults.socialLinks && scrapingResults.socialLinks.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {scrapingResults.socialLinks.map((social, index) => (
                        <a 
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-600/40 rounded flex items-center hover:bg-gray-600"
                        >
                          {social.platform === 'Facebook' && <Facebook className="h-4 w-4 text-blue-400 mr-2" />}
                          {social.platform === 'Twitter' && <Twitter className="h-4 w-4 text-blue-400 mr-2" />}
                          {social.platform === 'Instagram' && <Instagram className="h-4 w-4 text-pink-400 mr-2" />}
                          {social.platform === 'LinkedIn' && <Linkedin className="h-4 w-4 text-blue-400 mr-2" />}
                          {!['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].includes(social.platform) && 
                            <Globe className="h-4 w-4 text-gray-400 mr-2" />
                          }
                          <span className="text-sm text-gray-300 truncate">{social.platform}</span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-400">
                      <Share2 className="h-12 w-12 mx-auto mb-2 opacity-30" />
                      <p>Aucun réseau social trouvé</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Actualités */}
              <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Newspaper className="h-5 w-5 text-yellow-400 mr-2" />
                  Actualités récentes
                </h3>
                
                {scrapingResults.newsItems && scrapingResults.newsItems.length > 0 ? (
                  <div className="space-y-3">
                    {scrapingResults.newsItems.map((item, index) => (
                      <div key={index} className="p-3 bg-gray-800 rounded border-l-4 border-yellow-500">
                        <h4 className="font-medium text-white text-sm">{item.newsTitle}</h4>
                        {item.newsDate && (
                          <div className="text-xs text-gray-400 mt-1 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {item.newsDate}
                          </div>
                        )}
                        {item.newsContent && (
                          <p className="mt-2 text-xs text-gray-300 line-clamp-2">{item.newsContent}</p>
                        )}
                        {item.newsUrl && (
                          <a 
                            href={item.newsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 text-xs text-blue-400 hover:underline flex items-center"
                          >
                            Lire la suite
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-400">
                    <Newspaper className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p>Aucune actualité trouvée</p>
                  </div>
                )}
              </div>
              
              {/* Insights */}
              {scrapingResults.insights && scrapingResults.insights.length > 0 && (
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Lightbulb className="h-5 w-5 text-amber-400 mr-2" />
                    Insights
                  </h3>
                  <div className="space-y-2">
                    {scrapingResults.insights.map((insight, index) => (
                      <div 
                        key={index} 
                        className={`p-2 rounded text-sm flex items-start
                          ${insight.priority === 'high' ? 'bg-red-900/40 text-red-200' : 
                            insight.priority === 'medium' ? 'bg-amber-900/40 text-amber-200' : 
                            'bg-blue-900/40 text-blue-200'}`
                        }
                      >
                        <div className="mt-0.5 mr-2">
                          {insight.priority === 'high' ? (
                            <AlertTriangle className="h-4 w-4" />
                          ) : insight.priority === 'medium' ? (
                            <Info className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <span className="font-medium">{insight.type}: </span>
                          {insight.message}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Date de scraping */}
              <div className="mt-4 text-xs text-gray-400 flex items-center">
                <RefreshCw className="h-3 w-3 mr-1" />
                Scrapé le {new Date(scrapingResults.scrapedAt || new Date()).toLocaleString()}
              </div>
            </div>
          )}
          
          {/* Formulaire de sauvegarde */}
          {showBrandForm && (
            <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Sauvegarder la marque</h3>
                
                <form onSubmit={handleSaveBrand}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">Nom</label>
                      <input
                        type="text"
                        name="name"
                        value={brandFormData.name}
                        onChange={handleFormChange}
                        className="w-full p-2 bg-gray-700 rounded text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">Industrie</label>
                      <input
                        type="text"
                        name="industry"
                        value={brandFormData.industry}
                        onChange={handleFormChange}
                        className="w-full p-2 bg-gray-700 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">Email de contact</label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={brandFormData.contactEmail}
                        onChange={handleFormChange}
                        className="w-full p-2 bg-gray-700 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">Téléphone</label>
                      <input
                        type="text"
                        name="contactPhone"
                        value={brandFormData.contactPhone}
                        onChange={handleFormChange}
                        className="w-full p-2 bg-gray-700 rounded text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 text-sm font-medium mb-1">Site web</label>
                      <input
                        type="url"
                        name="website"
                        value={brandFormData.website}
                        onChange={handleFormChange}
                        className="w-full p-2 bg-gray-700 rounded text-white"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 text-sm font-medium mb-1">Description</label>
                      <textarea
                        name="description"
                        value={brandFormData.description}
                        onChange={handleFormChange}
                        rows="3"
                        className="w-full p-2 bg-gray-700 rounded text-white"
                      ></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 text-sm font-medium mb-1">Notes</label>
                      <textarea
                        name="notes"
                        value={brandFormData.notes}
                        onChange={handleFormChange}
                        rows="2"
                        className="w-full p-2 bg-gray-700 rounded text-white"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowBrandForm(false)}
                      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                    >
                      Enregistrer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Contenu de l'onglet Historique */}
      {activeTab === 'history' && (
        <div className="tab-content">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Historique de scraping</h3>
              <div className="flex space-x-2">
                <button 
                  className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 flex items-center text-sm"
                  onClick={loadScrapingHistory}
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Actualiser
                </button>
                <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 flex items-center text-sm">
                  <Filter className="h-3 w-3 mr-1" />
                  Filtrer
                </button>
              </div>
            </div>
            
            {historyItems.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-300">
                  <thead className="text-xs uppercase bg-gray-700">
                    <tr>
                      <th className="px-4 py-3">URL</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Informations</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyItems.map((item, index) => (
                      <tr 
                        key={item.id || index} 
                        className="border-b border-gray-700 hover:bg-gray-700/50"
                      >
                        <td className="px-4 py-3 url-cell">
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline flex items-center"
                          >
                            {item.url.length > 40 ? item.url.substring(0, 37) + '...' : item.url}
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            item.type === 'contact' ? 'bg-emerald-900 text-emerald-200' :
                            item.type === 'news' ? 'bg-blue-900 text-blue-200' :
                            'bg-gray-600 text-gray-300'
                          }`}>
                            {item.type || 'scraping'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </td>
                        <td className="px-4 py-3">
                          {item.data?.name || 'Sans nom'}
                          {item.data?.newsItems?.length > 0 && (
                            <span className="ml-2 px-1.5 py-0.5 bg-yellow-900/60 text-yellow-200 rounded-full text-xs">
                              {item.data.newsItems.length} actualités
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <button 
                            className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                            onClick={() => {
                              setScrapingResults(item.data);
                              setActiveTab('scraping');
                            }}
                          >
                            Voir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400">
                <div className="text-5xl mb-3">📊</div>
                <p>Aucun historique de scraping trouvé</p>
                <p className="text-sm mt-1">Lancez une analyse pour voir les résultats ici</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Contenu de l'onglet Analyse */}
      {activeTab === 'analytics' && (
        <div className="tab-content">
          <ScrapingAnalytics />
        </div>
      )}
    </div>
  );
};

export default Scraping;
