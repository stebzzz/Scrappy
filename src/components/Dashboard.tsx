import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3, PieChart, LineChart, TrendingUp, Users, Building2, 
  Mail, Search, Zap, Layers, Activity, Calendar, Settings
} from 'lucide-react';
import { fetchCurrentUser } from '../services/authService';
import { Card } from './Card';
import { DashboardStats } from './DashboardStats';
import { RecentActivity } from './RecentActivity';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color: string;
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
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

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await fetchCurrentUser();
        if (response.success) {
          setUserData(response.user || null);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données utilisateur:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, []);
  
  if (loading) {
    return <div className="p-4 flex justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
    </div>;
  }
  
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-6">Tableau de bord</h1>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card title="Activité récente">
          <RecentActivity />
        </Card>
        
        <Card title="Profil">
          {userData ? (
            <div className="p-4">
              <div className="flex items-center mb-4">
                {userData.avatar && (
                  <img 
                    src={userData.avatar} 
                    alt={userData.name} 
                    className="h-16 w-16 rounded-full mr-4"
                  />
                )}
                <div>
                  <h3 className="text-lg font-medium">{userData.name}</h3>
                  <p className="text-gray-400">{userData.email}</p>
                  <span className="px-2 py-1 text-xs bg-indigo-900/30 text-indigo-400 rounded-full mt-2 inline-block">
                    {userData.role === 'admin' ? 'Administrateur' : 
                     userData.role === 'manager' ? 'Manager' : 'Influenceur'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="p-4 text-gray-400">Aucune donnée utilisateur disponible</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 