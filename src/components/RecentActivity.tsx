import React from 'react';
import { Search, Users, Mail, FileText, Calendar } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'search' | 'contact' | 'email' | 'campaign' | 'document';
  description: string;
  timestamp: string;
  user?: string;
}

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'search':
      return <Search className="h-4 w-4 text-blue-400" />;
    case 'contact':
      return <Users className="h-4 w-4 text-purple-400" />;
    case 'email':
      return <Mail className="h-4 w-4 text-green-400" />;
    case 'campaign':
      return <Calendar className="h-4 w-4 text-amber-400" />;
    case 'document':
      return <FileText className="h-4 w-4 text-red-400" />;
    default:
      return <Search className="h-4 w-4 text-gray-400" />;
  }
};

// Données fictives d'activités récentes
const recentActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'search',
    description: 'Scraping effectué sur "Eco-Beauty.fr"',
    timestamp: 'Il y a 5 minutes',
    user: 'Thomas M.'
  },
  {
    id: '2',
    type: 'email',
    description: 'Email généré pour "NutriGlow"',
    timestamp: 'Il y a 1 heure',
    user: 'Sophie D.'
  },
  {
    id: '3',
    type: 'campaign',
    description: 'Campagne "Summer Vibes" mise à jour',
    timestamp: 'Il y a 3 heures'
  },
  {
    id: '4',
    type: 'contact',
    description: 'Nouveau contact ajouté "FitActive"',
    timestamp: 'Hier, 14:23'
  },
  {
    id: '5',
    type: 'document',
    description: 'Rapport de performance généré',
    timestamp: 'Hier, 09:45',
    user: 'Admin'
  }
];

export const RecentActivity: React.FC = () => {
  return (
    <div className="divide-y divide-gray-700">
      {recentActivities.map((activity) => (
        <div key={activity.id} className="py-3 px-4 hover:bg-gray-750">
          <div className="flex items-start">
            <div className="p-2 bg-gray-700 rounded-lg mr-3">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-200">{activity.description}</p>
              <div className="flex justify-between mt-1">
                <p className="text-xs text-gray-400">{activity.timestamp}</p>
                {activity.user && (
                  <p className="text-xs text-indigo-400">{activity.user}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="p-3 text-center">
        <button className="text-sm text-indigo-400 hover:text-indigo-300">
          Voir toutes les activités
        </button>
      </div>
    </div>
  );
}; 