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
  Database,
  ExternalLink
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useScraping } from '../hooks/useScraping';
import { Brand, addBrand, updateBrand, ScrapingSettings, getScrapingSettings, saveScrapingSettings } from '../services/database';
import { SCRAPING_SETTINGS } from '../config/app-settings';

const Scraping = () => {
  const [activeTab, setActiveTab] = useState('brands');
  const [isScrapingActive, setIsScrapingActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  // Utiliser les données du contexte de l'application
  const { brands, setBrands, refreshData } = useAppContext();
  const { 
    scrapeBrandContact, 
    scrapeBrandNews, 
    createCustomScrapingJob, 
    isLoading: isScrapingLoading, 
    error: scrapingError 
  } = useScraping();
  
  // État pour les nouvelles marques à scraper
  const [newBrandUrl, setNewBrandUrl] = useState('');
  const [newBrandIndustry, setNewBrandIndustry] = useState('');
  const [scrapingResults, setScrapingResults] = useState<any>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  
  // État pour les contacts
  const [contacts, setContacts] = useState<Array<{
    id: string;
    name: string;
    position: string;
    company: string;
    email: string;
    source: string;
    lastUpdated: Date | string;
  }>>([]);
  
  // État pour les paramètres de scraping
  const [scrapingSettings, setScrapingSettings] = useState<ScrapingSettings>({
    waitTime: SCRAPING_SETTINGS.defaultSettings.waitTime,
    maxRetries: SCRAPING_SETTINGS.defaultSettings.maxRetries,
    javascript: SCRAPING_SETTINGS.defaultSettings.javascript,
    useProxy: false,
    proxyUrl: '',
    frequency: 'daily',
    sources: {
      firecrawl: true,
      mediaWatch: true,
      apollo: true,
      linkedin: true
    },
    airtableSync: true
  });
  const [settingsId, setSettingsId] = useState<string | null>(null);
  
  // Effet pour charger les paramètres de scraping
  useEffect(() => {
    const loadScrapingSettings = async () => {
      try {
        const settings = await getScrapingSettings();
        if (settings) {
          setScrapingSettings(settings);
          setSettingsId(settings.id || null);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des paramètres de scraping:', error);
      }
    };
    
    loadScrapingSettings();
  }, []);
  
  // Fonction pour sauvegarder les paramètres de scraping
  const handleSaveSettings = async () => {
    try {
      // Récupérer les valeurs des champs du formulaire
      const waitTime = parseInt((document.getElementById('waitTime') as HTMLInputElement).value);
      const maxRetries = parseInt((document.getElementById('maxRetries') as HTMLInputElement).value);
      const javascript = (document.querySelector('#javascript') as HTMLInputElement).checked;
      const useProxy = (document.querySelector('#useProxy') as HTMLInputElement).checked;
      const proxyUrl = (document.getElementById('proxyUrl') as HTMLInputElement).value;
      
      // Récupérer la fréquence sélectionnée
      const frequencyInputs = document.querySelectorAll('input[name="frequency"]');
      let frequency: 'daily' | 'weekly' | 'manual' = 'daily';
      frequencyInputs.forEach((input: Element) => {
        if ((input as HTMLInputElement).checked) {
          frequency = (input as HTMLInputElement).value as 'daily' | 'weekly' | 'manual';
        }
      });
      
      // Récupérer les sources activées
      const sourceFirecrawl = (document.querySelector('#sourceFirecrawl') as HTMLInputElement).checked;
      const sourceMediaWatch = (document.querySelector('#sourceMediaWatch') as HTMLInputElement).checked;
      const sourceApollo = (document.querySelector('#sourceApollo') as HTMLInputElement).checked;
      const sourceLinkedin = (document.querySelector('#sourceLinkedin') as HTMLInputElement).checked;
      
      // Récupérer l'état de la synchronisation Airtable
      const airtableSync = (document.querySelector('#airtableSync') as HTMLInputElement).checked;
      
      // Créer l'objet de paramètres
      const settings: ScrapingSettings = {
        id: settingsId || undefined,
        waitTime,
        maxRetries,
        javascript,
        useProxy,
        proxyUrl: useProxy ? proxyUrl : undefined,
        frequency,
        sources: {
          firecrawl: sourceFirecrawl,
          mediaWatch: sourceMediaWatch,
          apollo: sourceApollo,
          linkedin: sourceLinkedin
        },
        airtableSync
      };
      
      // Sauvegarder dans Firebase
      const savedId = await saveScrapingSettings(settings);
      setSettingsId(savedId);
      
      // Mettre à jour l'état local
      setScrapingSettings(settings);
      
      alert('Paramètres de scraping sauvegardés avec succès!');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des paramètres:', error);
      alert(`Erreur lors de la sauvegarde: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  };
  
  // Effet pour extraire les contacts des marques
  useEffect(() => {
    // Extraire les contacts des marques
    const extractedContacts = brands
      .filter(brand => brand.contactEmail || (brand.socialLinks && Object.keys(brand.socialLinks).length > 0))
      .flatMap(brand => {
        const brandContacts = [];
        
        if (brand.contactEmail) {
          brandContacts.push({
            id: `${brand.id}-email`,
            name: brand.contactEmail.split('@')[0].replace('.', ' ').replace('-', ' '),
            position: 'Contact principal',
            company: brand.name,
            email: brand.contactEmail,
            source: 'Site web',
            lastUpdated: brand.lastUpdated || new Date()
          });
        }
        
        if (brand.socialLinks) {
          Object.entries(brand.socialLinks).forEach(([platform, url], index) => {
            brandContacts.push({
              id: `${brand.id}-${platform}-${index}`,
              name: `Contact ${platform}`,
              position: `Présence sur ${platform}`,
              company: brand.name,
              email: '-',
              source: platform,
              lastUpdated: brand.lastUpdated || new Date()
            });
          });
        }
        
        return brandContacts;
      });
    
    setContacts(extractedContacts);
  }, [brands]);

  const handleStartScraping = async () => {
    if (!newBrandUrl) {
      alert('Veuillez entrer une URL de marque');
      return;
    }
    
    setIsScrapingActive(true);
    setScrapingResults(null);
    
    try {
      // Scraper les informations de contact
      const contactInfo = await scrapeBrandContact(newBrandUrl);
      
      // Scraper les actualités
      let newsInfo;
      try {
        newsInfo = await scrapeBrandNews(newBrandUrl);
      } catch (error) {
        console.warn('Impossible de récupérer les actualités:', error);
        newsInfo = { newsItems: [] };
      }
      
      // Extraire le nom de domaine pour le nom de la marque
      const urlObj = new URL(newBrandUrl);
      const domain = urlObj.hostname.replace('www.', '').split('.')[0];
      const brandName = domain.charAt(0).toUpperCase() + domain.slice(1);
      
      // Créer un nouvel objet marque
      const newBrand: Omit<Brand, 'id'> = {
        name: brandName,
        industry: newBrandIndustry || 'Non spécifié',
        website: newBrandUrl,
        contactEmail: contactInfo?.contactEmail?.[0] || null,
        contactPhone: contactInfo?.contactPhone?.[0] || null,
        socialLinks: contactInfo?.socialLinks?.reduce((acc: Record<string, string>, link: string) => {
          const platform = link.includes('facebook') ? 'facebook' :
                         link.includes('instagram') ? 'instagram' :
                         link.includes('twitter') ? 'twitter' :
                         link.includes('linkedin') ? 'linkedin' :
                         'other';
          acc[platform] = link;
          return acc;
        }, {}),
        news: newsInfo?.newsItems?.[0]?.newsTitle || newsInfo?.newsTitle || '',
        lastUpdated: new Date(),
        status: 'active',
        notes: `Scrapé automatiquement le ${new Date().toLocaleDateString()}`
      };
      
      // Ajouter la marque à Firebase
      const brandId = await addBrand(newBrand);
      
      // Mettre à jour l'état local
      const brandWithId = { ...newBrand, id: brandId };
      setBrands([...brands, brandWithId]);
      
      // Afficher les résultats
      setScrapingResults({
        brand: brandWithId,
        contactInfo,
        newsInfo
      });
      
      // Réinitialiser le formulaire
      setNewBrandUrl('');
      setNewBrandIndustry('');
      
      // Rafraîchir les données
      refreshData();
      
    } catch (error) {
      console.error('Erreur lors du scraping:', error);
      alert(`Erreur lors du scraping: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsScrapingActive(false);
    }
  };
  
  // Fonction pour mettre à jour les informations d'une marque
  const handleUpdateBrand = async (brandId: string) => {
    setSelectedBrandId(brandId);
    const brand = brands.find(b => b.id === brandId);
    
    if (!brand || !brand.website) {
      alert('Impossible de mettre à jour: URL manquante');
      return;
    }
    
    setIsScrapingActive(true);
    
    try {
      // Scraper les nouvelles informations
      const [contactInfo, newsInfo] = await Promise.all([
        scrapeBrandContact(brand.website),
        scrapeBrandNews(brand.website).catch(() => ({ newsItems: [] }))
      ]);
      
      // Préparer les mises à jour
      const updates: Partial<Brand> = {
        contactEmail: contactInfo?.contactEmail?.[0] || brand.contactEmail,
        contactPhone: contactInfo?.contactPhone?.[0] || brand.contactPhone,
        news: newsInfo?.newsItems?.[0]?.newsTitle || newsInfo?.newsTitle || brand.news,
        lastUpdated: new Date(),
      };
      
      // Mettre à jour les liens sociaux s'ils existent
      if (contactInfo?.socialLinks?.length > 0) {
        updates.socialLinks = contactInfo.socialLinks.reduce((acc: Record<string, string>, link: string) => {
          const platform = link.includes('facebook') ? 'facebook' :
                         link.includes('instagram') ? 'instagram' :
                         link.includes('twitter') ? 'twitter' :
                         link.includes('linkedin') ? 'linkedin' :
                         'other';
          acc[platform] = link;
          return acc;
        }, {});
      }
      
      // Mettre à jour dans Firebase
      await updateBrand(brandId, updates);
      
      // Mettre à jour l'état local
      const updatedBrands = brands.map(b => 
        b.id === brandId ? { ...b, ...updates } : b
      );
      setBrands(updatedBrands);
      
      // Afficher les résultats
      setScrapingResults({
        brand: { ...brand, ...updates },
        contactInfo,
        newsInfo
      });
      
      alert('Marque mise à jour avec succès!');
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      alert(`Erreur lors de la mise à jour: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsScrapingActive(false);
      setSelectedBrandId(null);
    }
  };

  // Filtrer les marques en fonction du terme de recherche et du statut
  const filteredBrands = brands.filter(brand =>
    (brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.news?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === null || brand.status === filterStatus)
  );

  // Filtrer les contacts en fonction du terme de recherche
  const filteredContacts = contacts.filter(contact =>
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

      {/* Formulaire de scraping */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Ajouter une nouvelle marque à scraper</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="brandUrl" className="block text-sm font-medium text-gray-400 mb-1">URL du site web</label>
              <input
                id="brandUrl"
                type="url"
                placeholder="https://example.com"
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newBrandUrl}
                onChange={(e) => setNewBrandUrl(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="brandIndustry" className="block text-sm font-medium text-gray-400 mb-1">Industrie (optionnel)</label>
              <input
                id="brandIndustry"
                type="text"
                placeholder="Ex: Mode, Technologie, Alimentation..."
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newBrandIndustry}
                onChange={(e) => setNewBrandIndustry(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button 
              className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center ${isScrapingActive ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
              onClick={handleStartScraping}
              disabled={isScrapingActive || !newBrandUrl}
            >
              {isScrapingActive ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Scraping en cours...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Scraper et ajouter
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Résultats du scraping */}
      {scrapingResults && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-emerald-400" />
              Résultats du scraping
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-medium mb-2 text-emerald-400">Informations de la marque</h3>
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="mb-2"><span className="text-gray-400">Nom:</span> {scrapingResults.brand.name}</p>
                  <p className="mb-2"><span className="text-gray-400">Industrie:</span> {scrapingResults.brand.industry}</p>
                  <p className="mb-2"><span className="text-gray-400">Site web:</span> <a href={scrapingResults.brand.website} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline flex items-center">{scrapingResults.brand.website} <ExternalLink className="w-3 h-3 ml-1" /></a></p>
                  <p className="mb-2"><span className="text-gray-400">Email:</span> {scrapingResults.brand.contactEmail || 'Non trouvé'}</p>
                  <p className="mb-2"><span className="text-gray-400">Téléphone:</span> {scrapingResults.brand.contactPhone || 'Non trouvé'}</p>
                </div>
              </div>
              <div>
                <h3 className="text-md font-medium mb-2 text-emerald-400">Réseaux sociaux</h3>
                <div className="bg-gray-700 rounded-lg p-4">
                  {scrapingResults.brand.socialLinks && Object.keys(scrapingResults.brand.socialLinks).length > 0 ? (
                    <ul>
                      {Object.entries(scrapingResults.brand.socialLinks).map(([platform, url]) => (
                        <li key={platform} className="mb-2">
                          <span className="text-gray-400 capitalize">{platform}:</span>{' '}
                          <a href={url as string} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline flex items-center inline-flex">
                            {url as string} <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Aucun réseau social trouvé</p>
                  )}
                </div>
              </div>
            </div>
            {scrapingResults.newsInfo && (
              <div className="mt-4">
                <h3 className="text-md font-medium mb-2 text-emerald-400">Actualités récentes</h3>
                <div className="bg-gray-700 rounded-lg p-4">
                  {scrapingResults.newsInfo.newsItems && scrapingResults.newsInfo.newsItems.length > 0 ? (
                    <ul>
                      {scrapingResults.newsInfo.newsItems.slice(0, 3).map((item: any, index: number) => (
                        <li key={index} className="mb-3 pb-3 border-b border-gray-600 last:border-0">
                          <p className="font-medium">{item.newsTitle || 'Titre non disponible'}</p>
                          <p className="text-sm text-gray-400">{item.newsDate || 'Date non disponible'}</p>
                          <p className="text-sm mt-1">{item.newsContent?.substring(0, 150)}...</p>
                        </li>
                      ))}
                    </ul>
                  ) : scrapingResults.newsInfo.newsTitle ? (
                    <div>
                      <p className="font-medium">{scrapingResults.newsInfo.newsTitle}</p>
                      <p className="text-sm mt-1">{scrapingResults.newsInfo.newsContent?.substring(0, 150)}...</p>
                    </div>
                  ) : (
                    <p>Aucune actualité trouvée</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Formulaire de scraping */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Ajouter une nouvelle marque à scraper</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="brandUrl" className="block text-sm font-medium text-gray-400 mb-1">URL du site web</label>
              <input
                id="brandUrl"
                type="url"
                placeholder="https://example.com"
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newBrandUrl}
                onChange={(e) => setNewBrandUrl(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="brandIndustry" className="block text-sm font-medium text-gray-400 mb-1">Industrie (optionnel)</label>
              <input
                id="brandIndustry"
                type="text"
                placeholder="Ex: Mode, Technologie, Alimentation..."
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newBrandIndustry}
                onChange={(e) => setNewBrandIndustry(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button 
              className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center ${isScrapingActive ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
              onClick={handleStartScraping}
              disabled={isScrapingActive || !newBrandUrl}
            >
              {isScrapingActive ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Scraping en cours...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Scraper et ajouter
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Résultats du scraping */}
      {scrapingResults && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-emerald-400" />
              Résultats du scraping
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-medium mb-2 text-emerald-400">Informations de la marque</h3>
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="mb-2"><span className="text-gray-400">Nom:</span> {scrapingResults.brand.name}</p>
                  <p className="mb-2"><span className="text-gray-400">Industrie:</span> {scrapingResults.brand.industry}</p>
                  <p className="mb-2"><span className="text-gray-400">Site web:</span> <a href={scrapingResults.brand.website} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline flex items-center">{scrapingResults.brand.website} <ExternalLink className="w-3 h-3 ml-1" /></a></p>
                  <p className="mb-2"><span className="text-gray-400">Email:</span> {scrapingResults.brand.contactEmail || 'Non trouvé'}</p>
                  <p className="mb-2"><span className="text-gray-400">Téléphone:</span> {scrapingResults.brand.contactPhone || 'Non trouvé'}</p>
                </div>
              </div>
              <div>
                <h3 className="text-md font-medium mb-2 text-emerald-400">Réseaux sociaux</h3>
                <div className="bg-gray-700 rounded-lg p-4">
                  {scrapingResults.brand.socialLinks && Object.keys(scrapingResults.brand.socialLinks).length > 0 ? (
                    <ul>
                      {Object.entries(scrapingResults.brand.socialLinks).map(([platform, url]) => (
                        <li key={platform} className="mb-2">
                          <span className="text-gray-400 capitalize">{platform}:</span>{' '}
                          <a href={url as string} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline flex items-center inline-flex">
                            {url as string} <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Aucun réseau social trouvé</p>
                  )}
                </div>
              </div>
            </div>
            {scrapingResults.newsInfo && (
              <div className="mt-4">
                <h3 className="text-md font-medium mb-2 text-emerald-400">Actualités récentes</h3>
                <div className="bg-gray-700 rounded-lg p-4">
                  {scrapingResults.newsInfo.newsItems && scrapingResults.newsInfo.newsItems.length > 0 ? (
                    <ul>
                      {scrapingResults.newsInfo.newsItems.slice(0, 3).map((item: any, index: number) => (
                        <li key={index} className="mb-3 pb-3 border-b border-gray-600 last:border-0">
                          <p className="font-medium">{item.newsTitle || 'Titre non disponible'}</p>
                          <p className="text-sm text-gray-400">{item.newsDate || 'Date non disponible'}</p>
                          <p className="text-sm mt-1">{item.newsContent?.substring(0, 150)}...</p>
                        </li>
                      ))}
                    </ul>
                  ) : scrapingResults.newsInfo.newsTitle ? (
                    <div>
                      <p className="font-medium">{scrapingResults.newsInfo.newsTitle}</p>
                      <p className="text-sm mt-1">{scrapingResults.newsInfo.newsContent?.substring(0, 150)}...</p>
                    </div>
                  ) : (
                    <p>Aucune actualité trouvée</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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

      {/* Liste des marques */}
      {activeTab === 'brands' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Marque</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Industrie</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Dernière actualité</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Dernière mise à jour</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredBrands.length > 0 ? (
                  filteredBrands.map(brand => (
                    <tr key={brand.id} className="hover:bg-gray-750">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <Building2 className="w-5 h-5 mr-2 text-emerald-400" />
                          <div>
                            <div className="font-medium">{brand.name}</div>
                            {brand.website && (
                              <a href={brand.website} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-400 hover:underline flex items-center">
                                {brand.website} <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            )}
                          </div>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactEmail && (
                              <div className="text-sm">{brand.contactEmail}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.contactPhone}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {brand.contactPhone && (
                              <div className="text-sm">{brand.