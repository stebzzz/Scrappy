import React from 'react';
import { MoreHorizontal, CheckCircle, Clock, X } from 'lucide-react';

interface AdminUsersListProps {
  isLoading: boolean;
}

const AdminUsersList: React.FC<AdminUsersListProps> = ({ isLoading }) => {
  // Données factices pour la démonstration
  const users = [
    {
      id: 1,
      name: 'Sophie Dubois',
      email: 'sophie.dubois@example.com',
      role: 'Manager',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      status: 'online',
      lastActive: 'Maintenant'
    },
    {
      id: 2,
      name: 'Thomas Martin',
      email: 'thomas.martin@example.com',
      role: 'Influenceur',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      status: 'online',
      lastActive: 'Il y a 5 min'
    },
    {
      id: 3,
      name: 'Emma Laurent',
      email: 'emma.laurent@example.com',
      role: 'Agent',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      status: 'offline',
      lastActive: 'Il y a 25 min'
    },
    {
      id: 4,
      name: 'Lucas Bernard',
      email: 'lucas.bernard@example.com',
      role: 'Influenceur',
      avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
      status: 'offline',
      lastActive: 'Il y a 1h'
    },
    {
      id: 5,
      name: 'Léa Moreau',
      email: 'lea.moreau@example.com',
      role: 'Manager',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      status: 'online',
      lastActive: 'Il y a 10 min'
    }
  ];

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {isLoading ? (
        // État de chargement
        [...Array(5)].map((_, index) => (
          <div key={index} className="p-4 sm:px-6 animate-pulse flex items-center space-x-4">
            <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-10 w-10"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </div>
        ))
      ) : (
        // Données chargées
        users.map(user => (
          <div key={user.id} className="p-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center min-w-0">
                <div className="relative flex-shrink-0">
                  <img 
                    className="h-10 w-10 rounded-full"
                    src={user.avatar}
                    alt={user.name}
                  />
                  <span className={`absolute -bottom-0.5 -right-0.5 block h-3 w-3 rounded-full ring-2 ring-white dark:ring-gray-800 ${
                    user.status === 'online' ? 'bg-emerald-500' : 'bg-gray-400'
                  }`}></span>
                </div>
                <div className="ml-4 truncate">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {user.name}
                    </p>
                    <p className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'Manager' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                        : user.role === 'Influenceur'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                    }`}>
                      {user.role}
                    </span>
                    <span className="ml-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3 mr-1" /> {user.lastActive}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminUsersList; 