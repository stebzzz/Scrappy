import React from 'react';
import { 
  Home, Users, Shield, Settings, 
  BarChart2, Database, Server, LogOut,
  HelpCircle, X
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  sidebarOpen,
  setSidebarOpen
}) => {
  const navItems = [
    { name: 'Dashboard', icon: Home, href: '/admin', section: 'dashboard' },
    { name: 'Utilisateurs', icon: Users, href: '/admin/users', section: 'users' },
    { name: 'Sécurité', icon: Shield, href: '/admin/security', section: 'security' },
    { name: 'Analytiques', icon: BarChart2, href: '/admin/analytics', section: 'analytics' },
    { name: 'Base de données', icon: Database, href: '/admin/database', section: 'database' },
    { name: 'Serveurs', icon: Server, href: '/admin/servers', section: 'servers' },
  ];
  
  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto lg:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <Link to="/admin" className="flex items-center">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-md p-1.5">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">Admin</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="px-4 py-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.section}
                to={item.href}
                className="group flex items-center px-2 py-2.5 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <item.icon
                  className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400"
                />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        
        <div className="absolute bottom-0 w-full">
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/admin/settings"
              className="group flex items-center px-2 py-2.5 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <Settings
                className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
              />
              Paramètres
            </Link>
            
            <Link
              to="/admin/help"
              className="group flex items-center px-2 py-2.5 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <HelpCircle
                className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
              />
              Support
            </Link>
            
            <button
              className="w-full mt-2 group flex items-center px-2 py-2.5 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300"
            >
              <LogOut
                className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400"
              />
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar; 