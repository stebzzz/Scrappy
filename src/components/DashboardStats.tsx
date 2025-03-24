import React from 'react';
import { TrendingUp, Building2, Users, Calendar, Mail } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color: string;
  onClick?: () => void;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title, value, icon, trend, trendUp, color, onClick
}) => (
  <div 
    className={`bg-gradient-to-br ${color} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer`}
    onClick={onClick}
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-white text-lg font-bold mb-1">{value}</h3>
        <p className="text-white/80 text-sm">{title}</p>
        {trend && (
          <div className={`flex items-center mt-3 text-xs ${trendUp ? 'text-green-300' : 'text-red-300'}`}>
            {trendUp ? <TrendingUp size={14} className="mr-1" /> : <TrendingUp size={14} className="mr-1 transform rotate-180" />}
            {trend}
          </div>
        )}
      </div>
      <div className="bg-white/20 p-3 rounded-lg">
        {icon}
      </div>
    </div>
  </div>
);

export const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard 
        title="Marques" 
        value="156" 
        icon={<Building2 className="text-white" size={24} />}
        trend="+12% ce mois"
        trendUp={true}
        color="from-blue-600 to-blue-800"
        onClick={() => window.location.href = "/brands"}
      />
      <StatsCard 
        title="Influenceurs" 
        value="243" 
        icon={<Users className="text-white" size={24} />}
        trend="+8% ce mois"
        trendUp={true}
        color="from-purple-600 to-purple-800"
        onClick={() => window.location.href = "/influencers"}
      />
      <StatsCard 
        title="Campagnes" 
        value="28" 
        icon={<Calendar className="text-white" size={24} />}
        trend="+5% ce mois"
        trendUp={true}
        color="from-emerald-600 to-emerald-800"
        onClick={() => window.location.href = "/campaigns"}
      />
      <StatsCard 
        title="Emails générés" 
        value="78" 
        icon={<Mail className="text-white" size={24} />}
        trend="+15% ce mois"
        trendUp={true}
        color="from-amber-600 to-amber-800"
        onClick={() => window.location.href = "/ai-agent"}
      />
    </div>
  );
}; 