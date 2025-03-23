import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Construction, 
  Calendar, 
  Tool, 
  Hammer, 
  ArrowRight, 
  Clock,
  Coffee,
  Laptop,
  Zap
} from 'lucide-react';

const Campaigns: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-3xl mx-auto">
        <div className="bg-yellow-500/20 p-4 rounded-full inline-flex mb-6">
          <Construction size={48} className="text-yellow-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Module de Campagnes en Construction
        </h1>
        
        <p className="text-gray-300 text-lg mb-8">
          Nous travaillons actuellement sur le développement de cette fonctionnalité. 
          Elle sera bientôt disponible avec toutes les options de gestion de campagnes d'influence.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="bg-blue-500/20 p-3 rounded-lg inline-flex mb-3">
              <Calendar size={24} className="text-blue-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Planification</h3>
            <p className="text-gray-400 text-sm">
              Créez et gérez facilement votre calendrier de campagnes d'influence.
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="bg-purple-500/20 p-3 rounded-lg inline-flex mb-3">
              <Zap size={24} className="text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Performances</h3>
            <p className="text-gray-400 text-sm">
              Suivez les métriques clés et les KPIs de vos campagnes en temps réel.
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="bg-green-500/20 p-3 rounded-lg inline-flex mb-3">
              <Laptop size={24} className="text-green-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Collaboratif</h3>
            <p className="text-gray-400 text-sm">
              Gérez les collaborations avec les marques et les influenceurs en un seul endroit.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
          <div className="flex items-center mb-4">
            <Clock size={20} className="text-amber-400 mr-2" />
            <h3 className="text-white font-semibold">Date de lancement prévue</h3>
          </div>
          <div className="flex items-center justify-center bg-gray-900 rounded-lg py-3">
            <div className="text-center px-4 border-r border-gray-700">
              <div className="text-2xl font-bold text-white">00</div>
              <div className="text-xs text-gray-400">JOURS</div>
            </div>
            <div className="text-center px-4 border-r border-gray-700">
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-xs text-gray-400">HEURES</div>
            </div>
            <div className="text-center px-4 border-r border-gray-700">
              <div className="text-2xl font-bold text-white">45</div>
              <div className="text-xs text-gray-400">MINUTES</div>
            </div>
            <div className="text-center px-4">
              <div className="text-2xl font-bold text-white">33</div>
              <div className="text-xs text-gray-400">SECONDES</div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Link 
            to="/" 
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Retour au Dashboard
          </Link>
          <Link
            to="/campaign/new"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
          >
            Essayer le prototype
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
        
        <div className="mt-12 flex items-center justify-center text-gray-400">
          <Coffee size={16} className="mr-2" />
          <p className="text-sm">Nos développeurs travaillent jour et nuit sur cette fonctionnalité</p>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;