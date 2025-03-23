import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Globe, 
  Moon, 
  Sun, 
  Save, 
  RotateCcw,
  Key,
  MessageSquare
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>('fr');
  
  // Utiliser des placeholders au lieu de process.env qui n'est pas disponible
  const [apiKeys, setApiKeys] = useState({
    openai: '••••••••••••••••••••••••••',
    firebase: '••••••••••••••••••••••••••',
    algolia: '••••••••••••••••••••••••••'
  });
  
  // Gérer les mises à jour des clés API
  const handleApiKeyChange = (keyName: string, value: string) => {
    setApiKeys({
      ...apiKeys,
      [keyName]: value
    });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold mb-2 flex items-center text-blue-500">
            <SettingsIcon className="mr-2" />
            Paramètres
          </h1>
          <p className="text-gray-400">Configurez votre expérience utilisateur et vos préférences</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="col-span-1">
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-medium text-white">Catégories</h3>
              </div>

              <nav className="p-2">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center p-3 rounded-lg text-left ${
                    activeTab === 'profile' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <User size={18} className="mr-3" />
                  Profil utilisateur
                </button>

                <button 
                  onClick={() => setActiveTab('interface')}
                  className={`w-full flex items-center p-3 rounded-lg text-left ${
                    activeTab === 'interface' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <Globe size={18} className="mr-3" />
                  Interface
                </button>

                <button 
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center p-3 rounded-lg text-left ${
                    activeTab === 'notifications' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <Bell size={18} className="mr-3" />
                  Notifications
                </button>

                <button 
                  onClick={() => setActiveTab('api')}
                  className={`w-full flex items-center p-3 rounded-lg text-left ${
                    activeTab === 'api' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <Key size={18} className="mr-3" />
                  Clés API
                </button>

                <button 
                  onClick={() => setActiveTab('data')}
                  className={`w-full flex items-center p-3 rounded-lg text-left ${
                    activeTab === 'data' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <Database size={18} className="mr-3" />
                  Données
                </button>

                <button 
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center p-3 rounded-lg text-left ${
                    activeTab === 'security' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <Shield size={18} className="mr-3" />
                  Sécurité
                </button>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="col-span-1 lg:col-span-3">
            <div className="bg-gray-800 rounded-xl p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Profil utilisateur</h2>
                  
                  <div className="mb-6 flex items-start">
                    <div className="mr-4">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">SZ</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Stéphane Zayat</h3>
                      <p className="text-gray-400">Administrateur</p>
                      <button className="mt-2 text-sm text-blue-400 hover:text-blue-300">
                        Modifier la photo de profil
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Nom complet
                      </label>
                      <input 
                        type="text"
                        defaultValue="Stéphane Zayat"
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Email
                      </label>
                      <input 
                        type="email"
                        defaultValue="stephane@scrappy.fr"
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Rôle
                      </label>
                      <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white">
                        <option>Administrateur</option>
                        <option>Manager</option>
                        <option>Utilisateur</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Bio
                      </label>
                      <textarea 
                        rows={4}
                        defaultValue="Responsable marketing digital chez Scrappy."
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'interface' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Préférences d'interface</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Mode sombre</h3>
                        <p className="text-sm text-gray-400">Activer le thème sombre pour l'interface</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={darkMode}
                          onChange={() => setDarkMode(!darkMode)}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        <span className="ms-3 text-sm font-medium text-gray-300 flex">
                          {darkMode ? <Moon size={16} className="mr-1" /> : <Sun size={16} className="mr-1" />}
                          {darkMode ? 'Activé' : 'Désactivé'}
                        </span>
                      </label>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Langue</h3>
                      <select 
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="de">Deutsch</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Taille de la police</h3>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">Petite</button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Normale</button>
                        <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">Grande</button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Disposition du tableau de bord</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="border border-blue-500 bg-gray-700 rounded-lg p-2 flex items-center justify-center">
                          <div className="bg-gray-800 w-full h-24 rounded-lg"></div>
                        </div>
                        <div className="border border-gray-600 bg-gray-700 rounded-lg p-2 flex items-center justify-center">
                          <div className="bg-gray-800 w-full h-24 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Paramètres de notifications</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notifications</h3>
                        <p className="text-sm text-gray-400">Activer les notifications dans l'application</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notificationsEnabled}
                          onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                      </label>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <h3 className="font-medium mb-3">Recevoir des notifications pour :</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input type="checkbox" checked className="w-4 h-4 text-blue-500 border-gray-600 rounded bg-gray-700" />
                          <label className="ml-2 text-sm text-gray-300">Nouvelles campagnes</label>
                        </div>
                        
                        <div className="flex items-center">
                          <input type="checkbox" checked className="w-4 h-4 text-blue-500 border-gray-600 rounded bg-gray-700" />
                          <label className="ml-2 text-sm text-gray-300">Mises à jour des influenceurs</label>
                        </div>
                        
                        <div className="flex items-center">
                          <input type="checkbox" className="w-4 h-4 text-blue-500 border-gray-600 rounded bg-gray-700" />
                          <label className="ml-2 text-sm text-gray-300">Rapports de performance</label>
                        </div>
                        
                        <div className="flex items-center">
                          <input type="checkbox" checked className="w-4 h-4 text-blue-500 border-gray-600 rounded bg-gray-700" />
                          <label className="ml-2 text-sm text-gray-300">Messages des utilisateurs</label>
                        </div>
                        
                        <div className="flex items-center">
                          <input type="checkbox" checked className="w-4 h-4 text-blue-500 border-gray-600 rounded bg-gray-700" />
                          <label className="ml-2 text-sm text-gray-300">Alertes système</label>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <h3 className="font-medium mb-3">Méthodes de notification</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input type="checkbox" checked className="w-4 h-4 text-blue-500 border-gray-600 rounded bg-gray-700" />
                          <label className="ml-2 text-sm text-gray-300">Notifications par email</label>
                        </div>
                        
                        <div className="flex items-center">
                          <input type="checkbox" checked className="w-4 h-4 text-blue-500 border-gray-600 rounded bg-gray-700" />
                          <label className="ml-2 text-sm text-gray-300">Notifications dans l'application</label>
                        </div>
                        
                        <div className="flex items-center">
                          <input type="checkbox" className="w-4 h-4 text-blue-500 border-gray-600 rounded bg-gray-700" />
                          <label className="ml-2 text-sm text-gray-300">Notifications push</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'api' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Clés API</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Clé API OpenAI
                      </label>
                      <div className="flex">
                        <input 
                          type="password"
                          value={apiKeys.openai}
                          onChange={(e) => handleApiKeyChange('openai', e.target.value)}
                          className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-l text-white"
                        />
                        <button 
                          className="bg-gray-600 px-3 rounded-r border border-gray-600 border-l-0"
                          onClick={() => handleApiKeyChange('openai', '')}
                        >
                          Effacer
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Utilisée pour les fonctionnalités d'IA et la génération d'emails
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Clé API Firebase
                      </label>
                      <div className="flex">
                        <input 
                          type="password"
                          value={apiKeys.firebase}
                          onChange={(e) => handleApiKeyChange('firebase', e.target.value)}
                          className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-l text-white"
                        />
                        <button 
                          className="bg-gray-600 px-3 rounded-r border border-gray-600 border-l-0"
                          onClick={() => handleApiKeyChange('firebase', '')}
                        >
                          Effacer
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Utilisée pour la base de données et l'authentification
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Clé API Algolia
                      </label>
                      <div className="flex">
                        <input 
                          type="password"
                          value={apiKeys.algolia}
                          onChange={(e) => handleApiKeyChange('algolia', e.target.value)}
                          className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-l text-white"
                        />
                        <button 
                          className="bg-gray-600 px-3 rounded-r border border-gray-600 border-l-0"
                          onClick={() => handleApiKeyChange('algolia', '')}
                        >
                          Effacer
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Utilisée pour la recherche rapide
                      </p>
                    </div>

                    <div className="border-t border-gray-700 pt-4 mt-4">
                      <h3 className="font-medium mb-2">Connexion avec d'autres services</h3>
                      <div className="space-y-3">
                        <button className="px-4 py-3 bg-blue-500/20 text-blue-400 rounded-lg w-full text-left hover:bg-blue-500/30 flex items-center">
                          <MessageSquare size={18} className="mr-3" />
                          Connecter à Slack
                        </button>
                        <button className="px-4 py-3 bg-gray-700 text-gray-400 rounded-lg w-full text-left hover:bg-gray-600 flex items-center">
                          <Database size={18} className="mr-3" />
                          Connecter à Airtable
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'data' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Gestion des données</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Exportation des données</h3>
                      <p className="text-sm text-gray-400 mb-2">
                        Téléchargez vos données sous forme de fichier JSON ou CSV
                      </p>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                          Exporter en JSON
                        </button>
                        <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">
                          Exporter en CSV
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <h3 className="font-medium mb-2">Importation des données</h3>
                      <p className="text-sm text-gray-400 mb-2">
                        Importez des données à partir de fichiers externes
                      </p>
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                        <p className="text-gray-400 mb-2">Glissez-déposez un fichier ici ou</p>
                        <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">
                          Parcourir
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <h3 className="font-medium mb-2 text-red-400">Zone de danger</h3>
                      <p className="text-sm text-gray-400 mb-4">
                        Ces actions peuvent entraîner une perte de données. Soyez prudent.
                      </p>
                      <div className="space-y-3">
                        <button className="px-4 py-2 bg-yellow-600/30 text-yellow-400 rounded-lg w-full text-left hover:bg-yellow-600/40">
                          Effacer le cache de l'application
                        </button>
                        <button className="px-4 py-2 bg-red-600/30 text-red-400 rounded-lg w-full text-left hover:bg-red-600/40">
                          Supprimer toutes les données
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Sécurité</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Changement de mot de passe</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">
                            Mot de passe actuel
                          </label>
                          <input 
                            type="password"
                            placeholder="••••••••••••"
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">
                            Nouveau mot de passe
                          </label>
                          <input 
                            type="password"
                            placeholder="••••••••••••"
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">
                            Confirmer le mot de passe
                          </label>
                          <input 
                            type="password"
                            placeholder="••••••••••••"
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                          />
                        </div>

                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                          Mettre à jour le mot de passe
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <h3 className="font-medium mb-3">Authentification à deux facteurs</h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-300">Authentification à deux facteurs (2FA)</p>
                          <p className="text-sm text-gray-400">Sécurisez votre compte avec 2FA</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>

                      <div className="mt-4">
                        <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">
                          Configurer la 2FA
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <h3 className="font-medium mb-3">Sessions</h3>
                      
                      <div className="bg-gray-700 rounded-lg p-3 mb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-white font-medium">Chrome sur MacOS</p>
                            <p className="text-xs text-gray-400">Paris, France • Actif maintenant</p>
                          </div>
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Actuelle</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-700 rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-white font-medium">iPhone 13</p>
                            <p className="text-xs text-gray-400">Lyon, France • Il y a 2 jours</p>
                          </div>
                          <button className="text-red-400 text-xs hover:underline">
                            Déconnecter
                          </button>
                        </div>
                      </div>
                      
                      <button className="mt-3 text-blue-400 hover:underline text-sm">
                        Déconnecter toutes les autres sessions
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Boutons d'action */}
              <div className="mt-8 pt-6 border-t border-gray-700 flex justify-between">
                <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg flex items-center hover:bg-gray-600">
                  <RotateCcw size={16} className="mr-2" />
                  Réinitialiser
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600">
                  <Save size={16} className="mr-2" />
                  Enregistrer les modifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;