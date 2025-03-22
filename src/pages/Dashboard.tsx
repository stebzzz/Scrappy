import React, { useState } from 'react';
import { 
  BarChart, 
  Mail, 
  Users, 
  Building2, 
  ArrowUpRight, 
  ArrowDownRight,
  RefreshCw,
  Bot,
  Globe,
  Zap,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  Database,
  Search
} from 'lucide-react';

const Dashboard = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScrapingActive, setIsScrapingActive] = useState(false);

  const handleGenerateEmails = () => {
    setIsGenerating(true);
    // Simuler une génération d'emails
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const handleStartScraping = () => {
    setIsScrapingActive(true);
    // Simuler un scraping
    setTimeout(() => {
      setIsScrapingActive(false);
    }, 3000);
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Agent IA de Prospection</h1>
        <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">
          <RefreshCw className="w-4 h-4" />
          <span>Actualiser</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm mb-1">Emails générés</p>
                <h3 className="text-3xl font-bold">42</h3>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                <Mail className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <ArrowUpRight className="w-4 h-4 text-emerald-500 mr-1" />
              <span className="text-emerald-500">
                +12% depuis hier
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm mb-1">Taux de réponse</p>
                <h3 className="text-3xl font-bold">38%</h3>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
                <BarChart className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <ArrowUpRight className="w-4 h-4 text-emerald-500 mr-1" />
              <span className="text-emerald-500">
                +5% depuis la semaine dernière
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm mb-1">Marques scrapées</p>
                <h3 className="text-3xl font-bold">156</h3>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <ArrowUpRight className="w-4 h-4 text-emerald-500 mr-1" />
              <span className="text-emerald-500">
                +24 nouvelles marques
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm mb-1">Contacts identifiés</p>
                <h3 className="text-3xl font-bold">89</h3>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <ArrowUpRight className="w-4 h-4 text-emerald-500 mr-1" />
              <span className="text-emerald-500">
                +15 nouveaux contacts
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Agent IA et Scraping */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <Bot className="w-5 h-5 mr-2 text-blue-400" />
              Agent IA
            </h2>
            <span className={`px-3 py-1 rounded-full text-xs ${isGenerating ? 'bg-blue-900 text-blue-300 animate-pulse-slow' : 'bg-gray-700 text-gray-300'}`}>
              {isGenerating ? 'En cours de génération' : 'Prêt'}
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-700 bg-opacity-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Génération d'emails personnalisés</p>
                  <p className="text-xs text-gray-400">Basé sur l'actualité des marques et le profil des influenceurs</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-700 bg-opacity-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mr-3">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Envoi automatisé</p>
                  <p className="text-xs text-gray-400">Envoi aux contacts identifiés via proxy sécurisé</p>
                </div>
              </div>
            </div>
          </div>
          <button 
            className={`w-full mt-6 py-2 rounded-lg font-medium transition-all ${
              isGenerating 
                ? 'bg-gray-700 text-gray-300 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
            }`}
            onClick={handleGenerateEmails}
            disabled={isGenerating}
          >
            {isGenerating ? 'Génération en cours...' : 'Générer de nouveaux emails'}
          </button>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <Globe className="w-5 h-5 mr-2 text-emerald-400" />
              Scraping
            </h2>
            <span className={`px-3 py-1 rounded-full text-xs ${isScrapingActive ? 'bg-emerald-900 text-emerald-300 animate-pulse-slow' : 'bg-gray-700 text-gray-300'}`}>
              {isScrapingActive ? 'En cours' : 'Prêt'}
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-700 bg-opacity-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mr-3">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Actualités des marques</p>
                  <p className="text-xs text-gray-400">Collecte des lancements de produits et campagnes marketing</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-700 bg-opacity-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mr-3">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Identification des contacts</p>
                  <p className="text-xs text-gray-400">Recherche des responsables marketing et communication</p>
                </div>
              </div>
            </div>
          </div>
          <button 
            className={`w-full mt-6 py-2 rounded-lg font-medium transition-all ${
              isScrapingActive 
                ? 'bg-gray-700 text-gray-300 cursor-not-allowed' 
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white'
            }`}
            onClick={handleStartScraping}
            disabled={isScrapingActive}
          >
            {isScrapingActive ? 'Scraping en cours...' : 'Lancer un nouveau scraping'}
          </button>
        </div>
      </div>

      {/* Intégration avec Airtable */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <Database className="w-5 h-5 mr-2 text-purple-400" />
            Intégration avec Airtable
          </h2>
          <span className="px-3 py-1 bg-purple-900 text-purple-300 rounded-full text-xs">Connecté</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
            <h3 className="font-medium mb-2">Marques</h3>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">156</span>
              <span className="text-xs text-gray-400">Dernière synchro: il y a 2h</span>
            </div>
          </div>
          <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
            <h3 className="font-medium mb-2">Influenceurs</h3>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">24</span>
              <span className="text-xs text-gray-400">Dernière synchro: il y a 2h</span>
            </div>
          </div>
          <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
            <h3 className="font-medium mb-2">Campagnes</h3>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">42</span>
              <span className="text-xs text-gray-400">Dernière synchro: il y a 2h</span>
            </div>
          </div>
        </div>
        <button className="w-full mt-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-medium transition-all text-white">
          Synchroniser avec Airtable
        </button>
      </div>

      {/* Statistiques */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <BarChart className="w-5 h-5 mr-2 text-amber-400" />
            Statistiques de performance
          </h2>
          <select className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-sm">
            <option>7 derniers jours</option>
            <option>30 derniers jours</option>
            <option>3 derniers mois</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
            <h3 className="font-medium mb-4">Taux d'ouverture des emails</h3>
            <div className="h-8 bg-gray-600 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" style={{ width: '68%' }}></div>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span>68%</span>
              <span className="text-gray-400">Moyenne du secteur: 42%</span>
            </div>
          </div>
          <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
            <h3 className="font-medium mb-4">Taux de réponse</h3>
            <div className="h-8 bg-gray-600 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full" style={{ width: '38%' }}></div>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span>38%</span>
              <span className="text-gray-400">Moyenne du secteur: 22%</span>
            </div>
          </div>
          <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
            <h3 className="font-medium mb-4">Taux de conversion</h3>
            <div className="h-8 bg-gray-600 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full" style={{ width: '24%' }}></div>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span>24%</span>
              <span className="text-gray-400">Moyenne du secteur: 15%</span>
            </div>
          </div>
          <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
            <h3 className="font-medium mb-4">Précision de l'IA</h3>
            <div className="h-8 bg-gray-600 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full" style={{ width: '92%' }}></div>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span>92%</span>
              <span className="text-gray-400">Amélioration continue</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;