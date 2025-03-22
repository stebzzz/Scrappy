import React, { useState } from 'react';
import { 
  Bot, 
  Zap, 
  Send, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Copy, 
  Download, 
  Edit, 
  Trash2,
  Building2,
  Users,
  Mail
} from 'lucide-react';

const AIAgent = () => {
  const [selectedInfluencer, setSelectedInfluencer] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [emailVariants, setEmailVariants] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('generation');

  // Données fictives pour les influenceurs et les marques
  const influencers = [
    { id: '1', name: 'Sophie Dubois', handle: '@sophiebeauty', followers: '245K', niche: 'Beauté écologique' },
    { id: '2', name: 'Camille Moreau', handle: '@camillemode', followers: '320K', niche: 'Mode et lifestyle' },
    { id: '3', name: 'Léa Bernard', handle: '@leatravel', followers: '210K', niche: 'Voyage de luxe' }
  ];

  const brands = [
    { id: '1', name: "L'Oréal Paris", industry: 'Beauté', news: 'Lancement Collection Été 2025 (produits durables)' },
    { id: '2', name: 'Sephora France', industry: 'Beauté', news: 'Campagne Essentiels Printemps' },
    { id: '3', name: 'Chanel', industry: 'Luxe', news: 'Anniversaire du parfum N°5' }
  ];

  const handleGenerateEmail = () => {
    if (!selectedInfluencer || !selectedBrand) return;
    
    setIsGenerating(true);
    
    // Simuler la génération d'email par l'IA
    setTimeout(() => {
      const selectedInf = influencers.find(inf => inf.id === selectedInfluencer);
      const selectedBr = brands.find(br => br.id === selectedBrand);
      
      const emailTemplate = `
Cher Service Marketing de ${selectedBr?.name},

J'espère que ce message vous trouve bien. Je vous contacte de la part de Scrappy concernant ${selectedInf?.name} (${selectedInf?.handle}).

Nous avons remarqué votre récente actualité concernant ${selectedBr?.news} et pensons que ${selectedInf?.name} serait un(e) excellent(e) partenaire pour cette initiative.

${selectedInf?.name} est spécialisé(e) dans le domaine ${selectedInf?.niche} avec une audience engagée de ${selectedInf?.followers} abonnés. Son contenu authentique et sa capacité à créer des narratifs engageants autour des marques qu'il/elle représente en font un(e) partenaire idéal(e) pour votre campagne.

Nous serions ravis de discuter d'une potentielle collaboration. Seriez-vous disponible pour un appel la semaine prochaine?

Cordialement,
L'équipe Scrappy
      `;
      
      setGeneratedEmail(emailTemplate);
      
      // Générer des variantes
      setEmailVariants([
        emailTemplate.replace("J'espère que ce message vous trouve bien.", "J'espère que vous allez bien."),
        emailTemplate.replace("un(e) excellent(e) partenaire", "un(e) collaborateur(trice) idéal(e)"),
        emailTemplate.replace("Nous serions ravis de discuter", "Nous aimerions échanger")
      ]);
      
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <Bot className="w-6 h-6 mr-2 text-blue-400" />
          Agent IA de Prospection
        </h1>
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'generation' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            onClick={() => setActiveTab('generation')}
          >
            Génération
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'history' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            onClick={() => setActiveTab('history')}
          >
            Historique
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            onClick={() => setActiveTab('settings')}
          >
            Paramètres
          </button>
        </div>
      </div>

      {activeTab === 'generation' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-400" />
                Sélectionner un influenceur
              </h2>
              <div className="space-y-3">
                {influencers.map(influencer => (
                  <div 
                    key={influencer.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedInfluencer === influencer.id 
                        ? 'bg-blue-900 border border-blue-700' 
                        : 'bg-gray-700 hover:bg-gray-600 border border-gray-700'
                    }`}
                    onClick={() => setSelectedInfluencer(influencer.id)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium">{influencer.name}</h3>
                      <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full">{influencer.followers}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">{influencer.handle}</span>
                      <span className="text-gray-400">{influencer.niche}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-emerald-400" />
                Sélectionner une marque
              </h2>
              <div className="space-y-3">
                {brands.map(brand => (
                  <div 
                    key={brand.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedBrand === brand.id 
                        ? 'bg-emerald-900 border border-emerald-700' 
                        : 'bg-gray-700 hover:bg-gray-600 border border-gray-700'
                    }`}
                    onClick={() => setSelectedBrand(brand.id)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium">{brand.name}</h3>
                      <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full">{brand.industry}</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      <p>Actualité: {brand.news}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center ${
                isGenerating || !selectedInfluencer || !selectedBrand
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
              }`}
              onClick={handleGenerateEmail}
              disabled={isGenerating || !selectedInfluencer || !selectedBrand}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Générer un email
                </>
              )}
            </button>
          </div>

          <div className="lg:col-span-2">
            {generatedEmail ? (
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                  <h2 className="font-semibold flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-blue-400" />
                    Email généré par l'IA
                  </h2>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="bg-gray-700 bg-opacity-50 p-6 rounded-xl whitespace-pre-line text-gray-300 mb-6">
                    {generatedEmail}
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Variantes proposées:</h3>
                    <div className="space-y-2">
                      {emailVariants.map((variant, index) => (
                        <div key={index} className="flex items-center">
                          <input 
                            type="radio" 
                            id={`variant-${index}`} 
                            name="emailVariant" 
                            className="mr-2"
                          />
                          <label htmlFor={`variant-${index}`} className="text-sm text-gray-300 truncate">
                            Variante {index + 1}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="btn-primary flex-1 py-2">
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer l'email
                    </button>
                    <button className="btn-outline flex-1 py-2">
                      <Edit className="w-4 h-4 mr-2" />
                      Modifier
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-xl border border-gray-700 h-full flex flex-col items-center justify-center text-center p-10">
                <Bot className="w-16 h-16 mb-4 text-gray-600" />
                <h3 className="text-xl font-medium mb-2">Agent IA prêt</h3>
                <p className="text-gray-400 mb-6 max-w-md">
                  Sélectionnez un influenceur et une marque, puis cliquez sur "Générer un email" pour créer un email personnalisé basé sur l'actualité de la marque.
                </p>
                <div className="flex flex-col space-y-4 w-full max-w-md">
                  <div className="flex items-center p-3 bg-gray-700 bg-opacity-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                    <span className="text-sm">Emails personnalisés basés sur l'actualité des marques</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-700 bg-opacity-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                    <span className="text-sm">Identification des contacts pertinents</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-700 bg-opacity-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                    <span className="text-sm">Plusieurs variantes pour éviter les répétitions</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h2 className="font-semibold">Historique des emails générés</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Marque</th>
                    <th className="pb-3 font-medium">Influenceur</th>
                    <th className="pb-3 font-medium">Statut</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                    <td className="py-4 pr-4">15/05/2025</td>
                    <td className="py-4 pr-4">L'Oréal Paris</td>
                    <td className="py-4 pr-4">Sophie Dubois</td>
                    <td className="py-4 pr-4">
                      <span className="px-2 py-1 bg-emerald-900 text-emerald-300 rounded-full text-xs">Envoyé</span>
                    </td>
                    <td className="py-4 flex space-x-2">
                      <button className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                    <td className="py-4 pr-4">22/04/2025</td>
                    <td className="py-4 pr-4">Sephora France</td>
                    <td className="py-4 pr-4">Camille Moreau</td>
                    <td className="py-4 pr-4">
                      <span className="px-2 py-1 bg-blue-900 text-blue-300 rounded-full text-xs">Brouillon</span>
                    </td>
                    <td className="py-4 flex space-x-2">
                      <button className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h2 className="font-semibold">Paramètres de l'Agent IA</h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Modèle d'IA</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-700 rounded-lg border border-blue-600">
                  <div className="flex items-center mb-2">
                    <input type="radio" id="gpt4" name="model" className="mr-2" checked />
                    <label htmlFor="gpt4" className="font-medium">OpenAI GPT-4</label>
                  </div>
                  <p className="text-sm text-gray-400">Modèle avancé avec fine-tuning sur des emails existants</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
                  <div className="flex items-center mb-2">
                    <input type="radio" id="gpt3" name="model" className="mr-2" />
                    <label htmlFor="gpt3" className="font-medium">OpenAI GPT-3.5</label>
                  </div>
                  <p className="text-sm text-gray-400">Plus rapide, moins coûteux, précision légèrement inférieure</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Paramètres d'envoi</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium">Utiliser un proxy pour l'envoi</h4>
                    <p className="text-sm text-gray-400">Évite d'être blacklisté lors des envois en masse</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium">Intégration avec Apollo</h4>
                    <p className="text-sm text-gray-400">Pour le suivi des contacts et des interactions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium">Synchronisation Airtable</h4>
                    <p className="text-sm text-gray-400">Stockage et suivi des interactions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Personnalisation des emails</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre de variantes à générer</label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2">
                    <option>1 variante</option>
                    <option selected>3 variantes</option>
                    <option>5 variantes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ton des emails</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Formel</button>
                    <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg">Neutre</button>
                    <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg">Informel</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
              <button className="btn-outline py-2 px-4">
                Annuler
              </button>
              <button className="btn-primary py-2 px-4">
                Enregistrer les paramètres
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAgent; 