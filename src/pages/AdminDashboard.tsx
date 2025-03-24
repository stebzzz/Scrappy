import React from 'react';
import { Shield, Users, Activity, Server } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-800 rounded-full p-3 mr-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Interface Administrateur</h1>
        </div>
        
        <p className="text-gray-300 mb-8">
          Bienvenue dans l'interface administrateur. Cette page est actuellement en cours de développement.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-700 border border-gray-600 rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-white">Utilisateurs</h3>
              <div className="p-2 bg-indigo-900/30 rounded-full">
                <Users className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-indigo-400">1,248</p>
            <p className="text-sm text-gray-400 mt-1">+12% depuis le dernier mois</p>
          </div>
          
          <div className="bg-gray-700 border border-gray-600 rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-white">CPU</h3>
              <div className="p-2 bg-emerald-900/30 rounded-full">
                <Server className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-emerald-400">24%</p>
            <p className="text-sm text-gray-400 mt-1">-3% depuis hier</p>
          </div>
          
          <div className="bg-gray-700 border border-gray-600 rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-white">Mémoire</h3>
              <div className="p-2 bg-amber-900/30 rounded-full">
                <Activity className="h-5 w-5 text-amber-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-amber-400">6.2 GB</p>
            <p className="text-sm text-gray-400 mt-1">+8% depuis hier</p>
          </div>
          
          <div className="bg-gray-700 border border-gray-600 rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-white">Sécurité</h3>
              <div className="p-2 bg-purple-900/30 rounded-full">
                <Shield className="h-5 w-5 text-purple-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-purple-400">Élevée</p>
            <p className="text-sm text-gray-400 mt-1">Dernière mise à jour: aujourd'hui</p>
          </div>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-6 text-center border border-gray-600">
          <p className="text-gray-300">
            Les autres fonctionnalités sont en cours de développement. Revenez bientôt!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 