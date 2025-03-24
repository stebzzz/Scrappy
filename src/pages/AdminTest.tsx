import React from 'react';
import { Shield } from 'lucide-react';

const AdminTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-800 rounded-full p-3 mr-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Page de Test Admin</h1>
        </div>
        
        <p className="text-gray-300 mb-8">
          Cette page de test contourne le système d'authentification.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <h3 className="text-lg font-medium text-white mb-2">Statistiques</h3>
            <p className="text-indigo-400">Utilisateurs: 1,248</p>
            <p className="text-emerald-400">Taux de conversion: 5.4%</p>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <h3 className="text-lg font-medium text-white mb-2">Activité</h3>
            <p className="text-gray-300">Dernière connexion: Aujourd'hui</p>
            <p className="text-gray-300">Statut du système: Opérationnel</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTest; 