import React, { useState } from 'react';
import { LogOut, Moon, Sun } from 'lucide-react';
import { signOut } from '../services/auth';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, darkMode, toggleDarkMode } = useAppContext();
  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Paramètres du compte</h1>
        <p className="text-gray-400">Gérez vos informations personnelles et préférences</p>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Profil</h2>
              <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </button>
        </div>

        <div className="mb-6">
          <label className="block text-gray-400 mb-2">Email</label>
          <div className="text-white bg-gray-700 p-3 rounded-lg">
            {currentUser?.email || 'Non défini'}
                  </div>
                </div>
                
                <div className="mb-6">
          <h3 className="text-lg font-medium text-white mb-4">Thème</h3>
                    <div className="flex items-center">
            <button
              className={`flex items-center px-4 py-2 rounded-lg mr-3 ${
                darkMode ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
              onClick={toggleDarkMode}
            >
              <Moon className="w-5 h-5 mr-2" />
              Sombre
            </button>
            
            <button
              className={`flex items-center px-4 py-2 rounded-lg ${
                !darkMode ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
              onClick={toggleDarkMode}
            >
              <Sun className="w-5 h-5 mr-2" />
              Clair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;