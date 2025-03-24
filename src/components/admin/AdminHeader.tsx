import React, { useState } from 'react';
import { Bell, Search, Sun, Moon, User, ChevronDown, Settings } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const AdminHeader: React.FC = () => {
  const { darkMode, toggleDarkMode } = useAppContext();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10 flex h-16 items-center justify-between px-4 md:px-6 lg:px-8 shadow-sm">
      <div className="flex items-center space-x-4">
        <span className="font-bold text-xl text-indigo-600 dark:text-indigo-400">Scrappy Admin</span>
        
        <div className="relative hidden md:block w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Rechercher..."
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleDarkMode}
          className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
        >
          {darkMode ? (
            <Sun className="h-6 w-6" />
          ) : (
            <Moon className="h-6 w-6" />
          )}
        </button>
        
        <button className="relative p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
        </button>
        
        <div className="relative">
          <button 
            className="flex items-center space-x-2 focus:outline-none"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
              <User className="h-5 w-5" />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Admin Panel
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Super Admin
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </button>
          
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                Votre profil
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                Paramètres
              </a>
              <div className="border-t border-gray-200 dark:border-gray-700"></div>
              <a href="#" className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                Déconnexion
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader; 