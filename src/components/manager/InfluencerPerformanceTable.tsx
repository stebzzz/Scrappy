import React from 'react';
import { ChevronRight, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';

interface InfluencerPerformanceTableProps {
  isLoading: boolean;
}

const InfluencerPerformanceTable: React.FC<InfluencerPerformanceTableProps> = ({ isLoading }) => {
  // Données factices pour la démonstration
  const influencers = [
    {
      id: 1,
      name: 'Sophie Martin',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      platform: 'Instagram',
      engagement: 5.2,
      engagementTrend: 0.8,
      followers: 142000,
      followersTrend: 2.1,
      convRate: 3.8,
      status: 'active'
    },
    {
      id: 2,
      name: 'Thomas Dubois',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      platform: 'TikTok',
      engagement: 7.9,
      engagementTrend: 1.4,
      followers: 320000,
      followersTrend: 5.3,
      convRate: 2.7,
      status: 'active'
    },
    {
      id: 3,
      name: 'Emma Bernard',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      platform: 'YouTube',
      engagement: 4.5,
      engagementTrend: -0.3,
      followers: 89000,
      followersTrend: 1.2,
      convRate: 4.2,
      status: 'active'
    },
    {
      id: 4,
      name: 'Lucas Moreau',
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
      platform: 'Instagram',
      engagement: 3.8,
      engagementTrend: 0.2,
      followers: 76000,
      followersTrend: -0.5,
      convRate: 3.1,
      status: 'pending'
    },
    {
      id: 5,
      name: 'Léa Petit',
      avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
      platform: 'TikTok',
      engagement: 6.7,
      engagementTrend: 2.1,
      followers: 215000,
      followersTrend: 8.4,
      convRate: 3.9,
      status: 'active'
    }
  ];

  const formatFollowers = (followers: number) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`;
    } else if (followers >= 1000) {
      return `${(followers / 1000).toFixed(0)}K`;
    }
    return followers;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Influenceur
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Plateforme
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Engagement
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Followers
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Conv. Rate
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {isLoading ? (
            // État de chargement
            [...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                    <div className="ml-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-14 animate-pulse"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10 animate-pulse"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-6 ml-auto animate-pulse"></div>
                </td>
              </tr>
            ))
          ) : (
            // Données chargées
            influencers.map((influencer) => (
              <tr key={influencer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full">
                      <img className="h-10 w-10 rounded-full" src={influencer.avatar} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {influencer.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {influencer.status === 'active' ? 
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            Actif
                          </span> :
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                            En attente
                          </span>
                        }
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{influencer.platform}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{influencer.engagement}%</div>
                  <div className="text-xs flex items-center">
                    {influencer.engagementTrend > 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-0.5" />
                        {influencer.engagementTrend}%
                      </span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 flex items-center">
                        <ArrowDownRight className="h-3 w-3 mr-0.5" />
                        {Math.abs(influencer.engagementTrend)}%
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{formatFollowers(influencer.followers)}</div>
                  <div className="text-xs flex items-center">
                    {influencer.followersTrend > 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-0.5" />
                        {influencer.followersTrend}%
                      </span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 flex items-center">
                        <ArrowDownRight className="h-3 w-3 mr-0.5" />
                        {Math.abs(influencer.followersTrend)}%
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{influencer.convRate}%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InfluencerPerformanceTable; 