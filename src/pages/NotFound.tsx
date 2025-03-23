import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-white h-[80vh]">
      <AlertTriangle className="w-16 h-16 text-amber-500 mb-6" />
      <h1 className="text-3xl font-bold mb-2">Page non trouvée</h1>
      <p className="text-gray-400 mb-8">La page que vous recherchez n'existe pas ou a été déplacée</p>
      <Link 
        to="/" 
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
      >
        <Home className="w-4 h-4 mr-2" />
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound; 