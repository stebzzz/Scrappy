import React, { useState, useEffect } from 'react';
import { useAI } from '../hooks/useAI';
import { AIProvider } from '../services/ai-service';
import { useAppContext } from '../context/AppContext';
import { 
  Brain, 
  Mail, 
  Copy, 
  CheckCircle, 
  ExternalLink, 
  Settings, 
  Bot,
  Sparkles,
  Zap
} from 'lucide-react';
import { Brand, Influencer } from '../services/database';

interface GenerationOptions {
  temperature?: number;
  model?: string;
  purpose?: string;
}

const AIAgent: React.FC = () => {
  const { generateEmail, generateContent, loading } = useAI();
  const { aiProvider, setAiProvider, brands, influencers } = useAppContext();
  
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [generatedEmail, setGeneratedEmail] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [genOptions, setGenOptions] = useState<GenerationOptions>({
    temperature: 0.7,
    model: 'advanced',
    purpose: 'collaboration'
  });
  
  // Meilleure gestion du chargement des données
  useEffect(() => {
    console.log("Marques disponibles:", brands.length);
    console.log("Influenceurs disponibles:", influencers.length);
    
    if (brands.length > 0 && !selectedBrand) {
      setSelectedBrand(brands[0]);
    }
    
    if (influencers.length > 0 && !selectedInfluencer) {
      setSelectedInfluencer(influencers[0]);
    }
  }, [brands, influencers]);
  
  // Fonction pour générer un email
  const handleGenerateEmail = async () => {
    if (!selectedBrand || !selectedInfluencer) {
      alert('Veuillez sélectionner une marque et un influenceur');
      return;
    }
    
    try {
      const brandInfo = {
        name: selectedBrand.name,
        industry: selectedBrand.industry,
        website: selectedBrand.website || '',
        description: selectedBrand.description || ''
      };
      
      const influencerInfo = {
        name: selectedInfluencer.name,
        handle: selectedInfluencer.handle || selectedInfluencer.name.toLowerCase().replace(/\s/g, ''),
        niche: selectedInfluencer.niche || 'Lifestyle',
        followers: selectedInfluencer.followers.toString()
      };
      
      const emailBody = await generateEmail(brandInfo, influencerInfo, genOptions);
      setGeneratedEmail(emailBody);
    } catch (error) {
      console.error("Erreur lors de la génération de l'email:", error);
      alert(`Erreur: ${error instanceof Error ? error.message : 'Problème de connexion à l\'IA'}`);
    }
  };
  
  // Fonction pour copier l'email
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <Brain className="w-6 h-6 mr-2 text-purple-400" />
          Assistant IA
        </h1>
        <button 
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
          onClick={() => setAiProvider(aiProvider === 'openai' ? 'anthropic' : 'openai')}
        >
          <Settings className="w-4 h-4 mr-2" />
          {aiProvider === 'anthropic' ? 'Mode Avancé' : 'Mode Standard'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          {/* Sélection des données */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
            <h2 className="text-lg font-semibold mb-4">Sélection</h2>
            
            {/* Marque */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Marque
              </label>
              <select 
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={selectedBrand?.id || ''}
                onChange={(e) => {
                  const brand = brands.find(b => b.id === e.target.value) || null;
                  setSelectedBrand(brand);
                }}
              >
                <option value="">Sélectionner une marque</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name} ({brand.industry})
                  </option>
                ))}
              </select>
              {brands.length === 0 && (
                <p className="text-amber-400 text-xs mt-1">
                  Aucune marque disponible. Ajoutez-en une dans la section Marques.
                </p>
              )}
            </div>
            
            {/* Influenceur */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Influenceur
              </label>
              <select 
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={selectedInfluencer?.id || ''}
                onChange={(e) => {
                  const influencer = influencers.find(i => i.id === e.target.value) || null;
                  setSelectedInfluencer(influencer);
                }}
              >
                <option value="">Sélectionner un influenceur</option>
                {influencers.map(influencer => (
                  <option key={influencer.id} value={influencer.id}>
                    {influencer.name} ({influencer.niche || 'Non spécifié'} - {influencer.followers.toLocaleString()} abonnés)
                  </option>
                ))}
              </select>
              {influencers.length === 0 && (
                <p className="text-amber-400 text-xs mt-1">
                  Aucun influenceur disponible. Ajoutez-en un dans la section Influenceurs.
                </p>
              )}
            </div>
          </div>
          
          {/* Paramètres de génération */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
            <h2 className="text-lg font-semibold mb-4">Paramètres</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Modèle
                </label>
                <select 
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={genOptions.model}
                  onChange={(e) => setGenOptions({...genOptions, model: e.target.value})}
                >
                  <option value="advanced">Modèle Avancé</option>
                  <option value="standard">Modèle Standard</option>
                  <option value="creative">Modèle Créatif</option>
                  <option value="precise">Modèle Précis</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Objectif
                </label>
                <select 
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={genOptions.purpose}
                  onChange={(e) => setGenOptions({...genOptions, purpose: e.target.value})}
                >
                  <option value="collaboration">Proposition de collaboration</option>
                  <option value="followup">Suivi de campagne</option>
                  <option value="negotiation">Négociation</option>
                  <option value="introduction">Première prise de contact</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Créativité ({genOptions.temperature})
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.1"
                  value={genOptions.temperature}
                  onChange={(e) => setGenOptions({...genOptions, temperature: parseFloat(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Formel</span>
                  <span>Équilibré</span>
                  <span>Créatif</span>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
            onClick={handleGenerateEmail}
            disabled={loading || !selectedBrand || !selectedInfluencer}
          >
            {loading ? (
              <>
                <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                Génération en cours...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Générer un email
              </>
            )}
          </button>
          
          {/* Exemples d'emails */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
            <h2 className="text-lg font-semibold mb-3">Exemples</h2>
            <div className="space-y-2">
              <button 
                className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition"
                onClick={() => {
                  setGenOptions({
                    ...genOptions,
                    purpose: 'collaboration',
                    temperature: 0.7
                  });
                }}
              >
                Proposition de partenariat
              </button>
              <button 
                className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition"
                onClick={() => {
                  setGenOptions({
                    ...genOptions,
                    purpose: 'followup',
                    temperature: 0.5
                  });
                }}
              >
                Suivi après une campagne
              </button>
              <button 
                className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition"
                onClick={() => {
                  setGenOptions({
                    ...genOptions,
                    purpose: 'negotiation',
                    temperature: 0.3
                  });
                }}
              >
                Négociation de tarifs
              </button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-400" />
                Email généré
              </h2>
              {generatedEmail && (
                <div className="flex space-x-2">
                  <button 
                    className="text-gray-400 hover:text-white p-1"
                    onClick={copyToClipboard}
                    title="Copier l'email"
                  >
                    {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              )}
            </div>
            
            {generatedEmail ? (
              <div className="bg-gray-700 rounded-lg p-4 flex-1 overflow-auto whitespace-pre-wrap">
                {generatedEmail}
              </div>
            ) : (
              <div className="bg-gray-700 bg-opacity-50 rounded-lg p-8 flex-1 flex flex-col items-center justify-center text-center">
                <Bot className="w-16 h-16 text-gray-600 mb-4" />
                <h3 className="text-lg font-medium mb-2">L'IA est prête</h3>
                <p className="text-gray-400 mb-6 max-w-md">
                  Sélectionnez une marque et un influenceur, puis cliquez sur "Générer un email" pour créer un message personnalisé
                </p>
                <p className="text-xs text-gray-500">
                  Propulsé par IA avancée
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgent;