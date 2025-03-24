import React from 'react';

interface CampaignStatusCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  isLoading: boolean;
}

const CampaignStatusCard: React.FC<CampaignStatusCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  bgColor = "bg-indigo-50 dark:bg-indigo-900/20",
  textColor = "text-indigo-700 dark:text-indigo-300",
  isLoading
}) => {
  return (
    <div className={`rounded-lg shadow p-5 transition-all duration-200 hover:shadow-md ${bgColor}`}>
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
          {subtitle && <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
            <div className="p-2 rounded-full">{icon}</div>
          </div>
          <div className="flex flex-col">
            <p className={`text-2xl font-semibold ${textColor}`}>{value}</p>
            {subtitle && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CampaignStatusCard; 