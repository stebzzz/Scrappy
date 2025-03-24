import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface SystemStatusCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon: React.ReactNode;
  isLoading: boolean;
}

const SystemStatusCard: React.FC<SystemStatusCardProps> = ({
  title,
  value,
  trend,
  trendUp = true,
  icon,
  isLoading
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
      {isLoading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">{title}</span>
            <div className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
              {icon}
            </div>
          </div>
          <div className="font-semibold text-xl text-gray-900 dark:text-white mb-1">{value}</div>
          {trend && (
            <div className={`flex items-center text-xs ${
              trendUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {trendUp ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
              <span>{trend}</span>
              <span className="ml-1 text-gray-500 dark:text-gray-400">vs mois précédent</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SystemStatusCard; 