import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface PerformanceCardProps {
  title: string;
  value: string;
  trend: number;
  icon: React.ReactNode;
  borderColor: string;
  bgColor: string;
  textColor: string;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({
  title,
  value,
  trend,
  icon,
  borderColor,
  bgColor,
  textColor
}) => {
  const isPositiveTrend = trend >= 0;
  
  return (
    <div className={`bg-gray-800 rounded-lg shadow p-4 border ${borderColor}`}>
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${bgColor} ${textColor}`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-semibold text-white">{value}</p>
        </div>
      </div>
      <div className="flex items-center mt-3">
        {isPositiveTrend ? (
          <div className="flex items-center text-emerald-400 text-sm">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span>+{trend}%</span>
          </div>
        ) : (
          <div className="flex items-center text-red-400 text-sm">
            <ArrowDownRight className="h-4 w-4 mr-1" />
            <span>{trend}%</span>
          </div>
        )}
        <span className="text-gray-400 text-sm ml-2">vs mois précédent</span>
      </div>
    </div>
  );
};

export default PerformanceCard; 