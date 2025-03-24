import React from 'react';
import { BarChart3, ArrowUpRight } from 'lucide-react';

interface AdminStatsOverviewProps {
  isLoading: boolean;
}

const AdminStatsOverview: React.FC<AdminStatsOverviewProps> = ({ isLoading }) => {
  // Données factices pour la démonstration
  const monthlyData = [
    { month: 'Jan', users: 1250, revenue: 75000 },
    { month: 'Fév', users: 1380, revenue: 82000 },
    { month: 'Mar', users: 1510, revenue: 91000 },
    { month: 'Avr', users: 1680, revenue: 108000 },
    { month: 'Mai', users: 1790, revenue: 115000 },
    { month: 'Juin', users: 1950, revenue: 125000 },
    { month: 'Juil', users: 2120, revenue: 138000 },
    { month: 'Août', users: 2280, revenue: 145000 },
    { month: 'Sep', users: 2370, revenue: 156000 },
    { month: 'Oct', users: 2410, revenue: 163000 },
    { month: 'Nov', users: 2460, revenue: 175000 },
    { month: 'Déc', users: 2490, revenue: 185000 },
  ];

  const maxValue = Math.max(...monthlyData.map(item => item.users));
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Statistiques globales
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Évolution des utilisateurs et revenus
          </p>
        </div>
        <div className="flex items-center bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-1 rounded-full">
          <BarChart3 className="h-4 w-4 text-indigo-500 dark:text-indigo-400 mr-1" />
          <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">Annuel</span>
        </div>
      </div>
      
      <div className="p-4 sm:p-6">
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                  2,487 utilisateurs
                </h4>
                <div className="flex items-center mt-1">
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center text-sm font-medium">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    18.2% croissance
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                    vs année précédente
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-md">
                  Utilisateurs
                </button>
                <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-md">
                  Revenus
                </button>
                <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-md">
                  Campagnes
                </button>
              </div>
            </div>
            
            {/* Graphique simplifié */}
            <div className="relative h-64">
              <div className="absolute bottom-0 left-0 right-0 grid grid-cols-12 gap-x-0.5 h-48">
                {monthlyData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-full h-full flex items-end">
                      <div
                        className="w-full bg-indigo-500/90 dark:bg-indigo-600/90 rounded-t-sm hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all"
                        style={{ height: `${(item.users / maxValue) * 100}%` }}
                      ></div>
                    </div>
                    <span className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Lignes horizontales */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[...Array(5)].map((_, index) => (
                  <div 
                    key={index} 
                    className="border-b border-gray-200 dark:border-gray-700 w-full"
                    style={{ top: `${index * 25}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminStatsOverview; 