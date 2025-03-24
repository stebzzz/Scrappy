import React from 'react';
import { DollarSign, Calendar, Tag, ArrowRight } from 'lucide-react';

interface OpportunitiesListProps {
  isLoading: boolean;
}

const OpportunitiesList: React.FC<OpportunitiesListProps> = ({ isLoading }) => {
  // Données factices pour la démonstration
  const opportunities = [
    {
      id: 1,
      brand: 'Beauty Cosmetics',
      logo: 'https://ui-avatars.com/api/?name=BC&color=fff&background=EC4899',
      title: 'Partenariat beauté',
      payment: 1800,
      category: 'Beauté',
      deadline: '2023-06-30'
    },
    {
      id: 2,
      brand: 'Fit Health',
      logo: 'https://ui-avatars.com/api/?name=FH&color=fff&background=10B981',
      title: 'Promotion produits fitness',
      payment: 1500,
      category: 'Fitness',
      deadline: '2023-07-15'
    },
    {
      id: 3,
      brand: 'Voyage Explorer',
      logo: 'https://ui-avatars.com/api/?name=VE&color=fff&background=3B82F6',
      title: 'Découverte voyage',
      payment: 2200,
      category: 'Voyage',
      deadline: '2023-07-20'
    }
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, { bg: string, text: string }> = {
      'Beauté': { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-800 dark:text-pink-300' },
      'Fitness': { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-800 dark:text-emerald-300' },
      'Voyage': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-300' },
      'Mode': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-800 dark:text-purple-300' },
      'Tech': { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-800 dark:text-gray-300' }
    };

    const color = colors[category] || colors['Tech'];

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${color.bg} ${color.text}`}>
        <Tag className="mr-1 h-3 w-3" />
        {category}
      </span>
    );
  };

  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {isLoading ? (
          // État de chargement
          [...Array(3)].map((_, index) => (
            <li key={index} className="p-4 animate-pulse">
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="ml-3 space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            </li>
          ))
        ) : (
          // Données chargées
          opportunities.map((opportunity) => (
            <li key={opportunity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-9 w-9 rounded-full" style={{ backgroundColor: opportunity.logo.split('background=')[1] }}>
                  <div className="flex items-center justify-center h-full text-white font-medium">
                    {opportunity.brand.substring(0, 2)}
                  </div>
                </div>
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {opportunity.title}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {opportunity.brand}
                    </span>
                    <span className="mx-1 text-gray-300 dark:text-gray-600">•</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <Calendar className="mr-1 h-2.5 w-2.5" />
                      Jusqu'au {formatDate(opportunity.deadline)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-2 flex justify-between items-center">
                <div>
                  {getCategoryBadge(opportunity.category)}
                </div>
                <div className="flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  <DollarSign className="h-3.5 w-3.5 mr-0.5" />
                  {opportunity.payment} €
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default OpportunitiesList; 