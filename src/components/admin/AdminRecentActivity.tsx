import React from 'react';
import { UserPlus, MessageSquare, Settings, ShieldAlert, FileCheck, Database } from 'lucide-react';

interface AdminRecentActivityProps {
  isLoading: boolean;
}

const AdminRecentActivity: React.FC<AdminRecentActivityProps> = ({ isLoading }) => {
  // Données factices pour la démonstration
  const activities = [
    {
      id: 1,
      action: 'Nouvel utilisateur créé',
      description: 'Marc Dupont a été ajouté comme Manager',
      time: 'Il y a 10 minutes',
      icon: UserPlus,
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      id: 2,
      action: 'Nouvelle campagne lancée',
      description: 'Campagne "Summer Collection 2023" démarrée',
      time: 'Il y a 1 heure',
      icon: FileCheck,
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 3,
      action: 'Alerte de sécurité',
      description: 'Tentative de connexion inhabituelle détectée',
      time: 'Il y a 2 heures',
      icon: ShieldAlert,
      iconBg: 'bg-red-100 dark:bg-red-900/30',
      iconColor: 'text-red-600 dark:text-red-400'
    },
    {
      id: 4,
      action: 'Mise à jour du système',
      description: 'Le système a été mis à jour vers la version 2.4.0',
      time: 'Il y a 3 heures',
      icon: Settings,
      iconBg: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400'
    },
    {
      id: 5,
      action: 'Sauvegarde base de données',
      description: 'Sauvegarde automatique complétée avec succès',
      time: 'Il y a 5 heures',
      icon: Database,
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Activité récente
        </h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          Aujourd'hui
        </span>
      </div>
      
      <div className="px-4 py-5 sm:p-6">
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flow-root">
            <ul className="-mb-8">
              {activities.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== activities.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800 ${activity.iconBg}`}>
                          <activity.icon className={`h-4 w-4 ${activity.iconColor}`} aria-hidden="true" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 flex justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.action}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                            {activity.description}
                          </p>
                        </div>
                        <div className="text-right text-xs whitespace-nowrap text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 sm:px-6 text-right">
        <button type="button" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
          Voir toutes les activités
        </button>
      </div>
    </div>
  );
};

export default AdminRecentActivity; 