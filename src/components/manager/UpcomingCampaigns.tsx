import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

interface UpcomingCampaignsProps {
  isLoading: boolean;
}

const UpcomingCampaigns: React.FC<UpcomingCampaignsProps> = ({ isLoading }) => {
  // Données factices pour la démonstration
  const campaigns = [
    {
      id: 1,
      name: 'Collection Été 2023',
      startDate: '2023-06-15',
      budget: 48000,
      status: 'preparing',
      influencers: 8
    },
    {
      id: 2,
      name: 'Lancement Sneakers Ultra',
      startDate: '2023-06-22',
      budget: 35000,
      status: 'pending',
      influencers: 5
    },
    {
      id: 3,
      name: 'Promo Vacances',
      startDate: '2023-07-01',
      budget: 25000,
      status: 'pending',
      influencers: 6
    },
    {
      id: 4,
      name: 'Back to School',
      startDate: '2023-08-15',
      budget: 42000,
      status: 'planned',
      influencers: 10
    }
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'preparing':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            En préparation
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            En attente
          </span>
        );
      case 'planned':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
            Planifiée
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {isLoading ? (
          // État de chargement
          [...Array(4)].map((_, index) => (
            <li key={index} className="p-4 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </li>
          ))
        ) : (
          // Données chargées
          campaigns.map((campaign) => (
            <li key={campaign.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {campaign.name}
                  </h4>
                  <div className="mt-1 flex items-center">
                    <Calendar className="h-3 w-3 text-gray-500 dark:text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(campaign.startDate)}
                    </span>
                    <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {campaign.influencers} influenceurs
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  {getStatusBadge(campaign.status)}
                  <span className="mt-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                    {campaign.budget.toLocaleString()} €
                  </span>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 flex justify-center">
        <button type="button" className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
          Toutes les campagnes
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default UpcomingCampaigns; 