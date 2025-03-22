import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Moon, 
  Sun, 
  Globe, 
  Shield, 
  LogOut, 
  Save,
  ChevronRight,
  Check
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('fr');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  // Données fictives pour l'utilisateur
  const user = {
    name: "Thomas Dubois",
    email: "thomas.dubois@example.com",
    role: "Administrateur",
    avatar: "https://via.placeholder.com/100",
    createdAt: "15/03/2023"
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <SettingsIcon className="w-6 h-6 mr-2 text-gray-400" />
          Paramètres
        </h1>
        <button className="btn-primary flex items-center">
          <Save className="w-4 h-4 mr-2" />
          Enregistrer les modifications
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar de navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full mr-3 bg-gray-600"
                />
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <span className="text-sm text-gray-400">{user.role}</span>
                </div>
              </div>
            </div>
            <div className="p-2">
              <button 
                className={`w-full text-left p-3 rounded-lg flex items-center mb-1 ${activeTab === 'profile' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                onClick={() => setActiveTab('profile')}
              >
                <User className="w-5 h-5 mr-3 text-blue-400" />
                Profil
              </button>
              <button 
                className={`w-full text-left p-3 rounded-lg flex items-center mb-1 ${activeTab === 'interface' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                onClick={() => setActiveTab('interface')}
              >
                <Moon className="w-5 h-5 mr-3 text-purple-400" />
                Interface
              </button>
              <button 
                className={`w-full text-left p-3 rounded-lg flex items-center mb-1 ${activeTab === 'notifications' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell className="w-5 h-5 mr-3 text-amber-400" />
                Notifications
              </button>
              <button 
                className={`w-full text-left p-3 rounded-lg flex items-center mb-1 ${activeTab === 'security' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                onClick={() => setActiveTab('security')}
              >
                <Shield className="w-5 h-5 mr-3 text-emerald-400" />
                Sécurité
              </button>
              <div className="border-t border-gray-700 my-2 pt-2">
                <button className="w-full text-left p-3 rounded-lg flex items-center text-red-400 hover:bg-gray-700">
                  <LogOut className="w-5 h-5 mr-3" />
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            {/* Onglet Profil */}
            {activeTab === 'profile' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Informations du profil</h2>
                
                <div className="mb-8 flex items-center">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-24 h-24 rounded-full mr-6 bg-gray-600"
                  />
                  <div>
                    <button className="btn-outline-sm mb-2">Changer l'avatar</button>
                    <p className="text-sm text-gray-400">JPG, GIF ou PNG. 1MB maximum.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Nom complet</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue={user.name}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Adresse email</label>
                    <input 
                      type="email" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue={user.email}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Rôle</label>
                    <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Administrateur</option>
                      <option>Gestionnaire</option>
                      <option>Utilisateur</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Date d'inscription</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue={user.createdAt}
                      disabled
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
                  <textarea 
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                    placeholder="Écrivez quelques mots à propos de vous..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button className="btn-primary">Mettre à jour le profil</button>
                </div>
              </div>
            )}
            
            {/* Onglet Interface */}
            {activeTab === 'interface' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Préférences d'interface</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-gray-600 p-2 rounded-lg mr-4">
                        {darkMode ? <Moon className="w-6 h-6 text-purple-400" /> : <Sun className="w-6 h-6 text-amber-400" />}
                      </div>
                      <div>
                        <h3 className="font-medium">Mode sombre</h3>
                        <p className="text-sm text-gray-400">Basculer entre le mode clair et sombre</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-gray-600 p-2 rounded-lg mr-4">
                        <Globe className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">Langue</h3>
                        <p className="text-sm text-gray-400">Choisir la langue de l'interface</p>
                      </div>
                    </div>
                    <select 
                      className="bg-gray-600 border border-gray-500 rounded-lg px-3 py-2"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>
                  
                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h3 className="font-medium mb-3">Disposition du tableau de bord</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="border-2 border-blue-500 p-2 rounded-lg bg-gray-600 flex items-center justify-center">
                        <div className="w-full">
                          <div className="h-2 bg-gray-500 rounded mb-1"></div>
                          <div className="grid grid-cols-2 gap-1">
                            <div className="h-10 bg-gray-500 rounded"></div>
                            <div className="h-10 bg-gray-500 rounded"></div>
                          </div>
                          <div className="mt-1 h-6 bg-gray-500 rounded"></div>
                        </div>
                        <div className="absolute">
                          <Check className="w-6 h-6 text-blue-500" />
                        </div>
                      </div>
                      <div className="border-2 border-gray-600 p-2 rounded-lg bg-gray-600 hover:border-blue-500 cursor-pointer">
                        <div className="h-2 bg-gray-500 rounded mb-1"></div>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="h-10 bg-gray-500 rounded"></div>
                          <div className="h-10 bg-gray-500 rounded"></div>
                          <div className="h-10 bg-gray-500 rounded"></div>
                        </div>
                        <div className="mt-1 h-6 bg-gray-500 rounded"></div>
                      </div>
                      <div className="border-2 border-gray-600 p-2 rounded-lg bg-gray-600 hover:border-blue-500 cursor-pointer">
                        <div className="h-2 bg-gray-500 rounded mb-1"></div>
                        <div className="h-10 bg-gray-500 rounded mb-1"></div>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="h-6 bg-gray-500 rounded"></div>
                          <div className="h-6 bg-gray-500 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Onglet Notifications */}
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Préférences de notifications</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium">Notifications par email</h3>
                      <p className="text-sm text-gray-400">Recevoir des notifications par email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={emailNotifications}
                        onChange={() => setEmailNotifications(!emailNotifications)}
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium">Notifications dans l'application</h3>
                      <p className="text-sm text-gray-400">Recevoir des notifications dans l'application</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={appNotifications}
                        onChange={() => setAppNotifications(!appNotifications)}
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium">Emails marketing</h3>
                      <p className="text-sm text-gray-400">Recevoir des emails sur les nouvelles fonctionnalités et offres</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={marketingEmails}
                        onChange={() => setMarketingEmails(!marketingEmails)}
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-4">Types de notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <span>Nouvelles campagnes</span>
                      <div className="flex space-x-2">
                        <label className="inline-flex items-center">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500 bg-gray-600 border-gray-500 rounded" checked />
                          <span className="ml-2 text-sm text-gray-400">Email</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500 bg-gray-600 border-gray-500 rounded" checked />
                          <span className="ml-2 text-sm text-gray-400">App</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <span>Nouveaux messages</span>
                      <div className="flex space-x-2">
                        <label className="inline-flex items-center">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500 bg-gray-600 border-gray-500 rounded" checked />
                          <span className="ml-2 text-sm text-gray-400">Email</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500 bg-gray-600 border-gray-500 rounded" checked />
                          <span className="ml-2 text-sm text-gray-400">App</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <span>Rapports hebdomadaires</span>
                      <div className="flex space-x-2">
                        <label className="inline-flex items-center">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500 bg-gray-600 border-gray-500 rounded" checked />
                          <span className="ml-2 text-sm text-gray-400">Email</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500 bg-gray-600 border-gray-500 rounded" />
                          <span className="ml-2 text-sm text-gray-400">App</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Onglet Sécurité */}
            {activeTab === 'security' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Paramètres de sécurité</h2>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-4">Changer le mot de passe</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Mot de passe actuel</label>
                      <input 
                        type="password" 
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Nouveau mot de passe</label>
                      <input 
                        type="password" 
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Confirmer le nouveau mot de passe</label>
                      <input 
                        type="password" 
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button className="btn-primary">Mettre à jour le mot de passe</button>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-6 mb-6">
                  <h3 className="font-medium mb-4">Authentification à deux facteurs</h3>
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg mb-4">
                    <div>
                      <h4 className="font-medium">Activer l'authentification à deux facteurs</h4>
                      <p className="text-sm text-gray-400">Ajouter une couche de sécurité supplémentaire à votre compte</p>
                    </div>
                    <button className="btn-outline-sm">Configurer</button>
                  </div>
                  <p className="text-sm text-gray-400">
                    L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire à votre compte en exigeant plus qu'un simple mot de passe pour vous connecter.
                  </p>
                </div>
                
                <div className="border-t border-gray-700 pt-6">
                  <h3 className="font-medium mb-4">Sessions actives</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">MacBook Pro - Chrome</h4>
                          <p className="text-sm text-gray-400">Paris, France • Actif maintenant</p>
                        </div>
                        <span className="px-2 py-1 bg-emerald-900 text-emerald-300 text-xs rounded-full">Actuel</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">iPhone 13 - Application mobile</h4>
                          <p className="text-sm text-gray-400">Paris, France • Dernière activité il y a 2 heures</p>
                        </div>
                        <button className="text-sm text-red-400 hover:text-red-300">Déconnecter</button>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">iPad - Safari</h4>
                          <p className="text-sm text-gray-400">Lyon, France • Dernière activité il y a 5 jours</p>
                        </div>
                        <button className="text-sm text-red-400 hover:text-red-300">Déconnecter</button>
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 text-red-400 hover:text-red-300 text-sm font-medium">Déconnecter toutes les autres sessions</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;