import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, TrendingUp, Users, Building2, 
  Mail, Search, Zap, Layers, Activity, Calendar, Settings, Bell, Clock, ArrowUpRight, 
  ChevronRight, Plus, ArrowRight, CheckCircle, Shield, UserIcon, Star
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { getBrandStatistics, getLatestScrapingResults } from '../services/database';
import { useAppContext } from '../context/AppContext';

// Données factices pour les graphiques
const campaignPerformanceData = [
  { name: 'Jan', engagement: 3800, clicks: 2500, reach: 7000 },
  { name: 'Fév', engagement: 4200, clicks: 2700, reach: 8000 },
  { name: 'Mar', engagement: 3900, clicks: 2400, reach: 7500 },
  { name: 'Avr', engagement: 4500, clicks: 3100, reach: 9000 },
  { name: 'Mai', engagement: 5000, clicks: 3400, reach: 10000 },
  { name: 'Juin', engagement: 4800, clicks: 3300, reach: 9700 },
];

const industriesData = [
  { name: 'Mode', value: 42 },
  { name: 'Beauté', value: 28 },
  { name: 'Tech', value: 18 },
  { name: 'Alimentation', value: 15 },
  { name: 'Sport', value: 12 },
  { name: 'Voyage', value: 8 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

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
    className={`bg-gradient-to-br ${color} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer animate-fadein`}
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

interface TaskItemProps {
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  onToggle: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, dueDate, priority, completed, onToggle }) => {
  const priorityClasses = {
    high: 'bg-red-400/20 text-red-300',
    medium: 'bg-amber-400/20 text-amber-300',
    low: 'bg-blue-400/20 text-blue-300'
  };
  
  return (
    <div className={`p-3 border-b border-gray-700 ${completed ? 'opacity-50' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div 
            className={`w-5 h-5 rounded-full mr-3 border flex items-center justify-center cursor-pointer ${
              completed ? 'bg-green-500 border-green-600' : 'border-gray-500 hover:border-blue-400'
            }`}
            onClick={onToggle}
          >
            {completed && <CheckCircle size={14} className="text-white" />}
          </div>
          <div>
            <p className={`font-medium ${completed ? 'line-through text-gray-400' : 'text-white'}`}>{title}</p>
            <div className="flex items-center mt-1">
              <Clock size={12} className="text-gray-400 mr-1" />
              <span className="text-xs text-gray-400">{dueDate}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ml-2 ${priorityClasses[priority]}`}>
                {priority === 'high' ? 'Urgent' : priority === 'medium' ? 'Moyen' : 'Faible'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CampaignItemProps {
  title: string;
  status: 'active' | 'planned' | 'completed';
  progress: number;
  influencers: number;
  startDate: string;
  endDate: string;
}

const CampaignItem: React.FC<CampaignItemProps> = ({ 
  title, status, progress, influencers, startDate, endDate 
}) => {
  const statusClasses = {
    active: 'bg-green-400/20 text-green-300',
    planned: 'bg-blue-400/20 text-blue-300',
    completed: 'bg-gray-400/20 text-gray-300'
  };
  
  return (
    <div className="p-4 border border-gray-700 rounded-xl mb-3 hover:bg-gray-800/50 transition-all">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-white">{title}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full ${statusClasses[status]}`}>
          {status === 'active' ? 'En cours' : status === 'planned' ? 'Planifiée' : 'Terminée'}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-3">
        <div>
          <p>Date</p>
          <p className="text-white">{startDate} - {endDate}</p>
        </div>
        <div>
          <p>Influenceurs</p>
          <p className="text-white">{influencers}</p>
        </div>
        <div>
          <p>Avancement</p>
          <p className="text-white">{progress}%</p>
        </div>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-1.5">
        <div 
          className="bg-blue-600 h-1.5 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// Composant principal du dashboard
const Dashboard = () => {
  const { darkMode } = useAppContext();
  const [stats, setStats] = useState({
    brands: 0,
    influencers: 0,
    campaigns: 0,
    emails: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskItemProps[]>([
    { title: 'Contacter 3 nouveaux influenceurs', dueDate: 'Aujourd\'hui', priority: 'high', completed: false, onToggle: () => {} },
    { title: 'Finaliser la campagne été 2023', dueDate: 'Demain', priority: 'medium', completed: false, onToggle: () => {} },
    { title: 'Analyser les résultats de mai', dueDate: '28/06/2023', priority: 'low', completed: true, onToggle: () => {} },
    { title: 'Réunion équipe marketing', dueDate: '30/06/2023', priority: 'medium', completed: false, onToggle: () => {} },
  ]);
  
  // Fetch des données réelles
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les statistiques des marques
        const brandStats = await getBrandStatistics();
        
        // Récupérer l'historique récent de scraping
        const scrapingHistory = await getLatestScrapingResults(undefined, 5);
        
        // Mise à jour des statistiques
        setStats({
          brands: brandStats.totalBrands || 0,
          influencers: 243, // Données factices - à remplacer par de vraies données
          campaigns: 28,    // Données factices - à remplacer par de vraies données
          emails: 78        // Données factices - à remplacer par de vraies données
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des données du dashboard:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Gestion des tâches
  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed
    };
    setTasks(updatedTasks);
  };
  
  // Mise à jour des gestionnaires d'événements pour les tâches
  useEffect(() => {
    const tasksWithHandlers = tasks.map((task, index) => ({
      ...task,
      onToggle: () => toggleTaskCompletion(index)
    }));
    setTasks(tasksWithHandlers);
  }, []);
  
  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-100 ${darkMode ? "dark bg-gray-900 text-white" : ""}`}>
      <div className="max-w-4xl w-full p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Scrappy - Tableau de Bord</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/admin" 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all flex flex-col items-center"
          >
            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full mb-4">
              <Shield className="h-10 w-10 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Interface Admin</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mt-2">
              Gestion du système, utilisateurs et statistiques
            </p>
          </Link>
          
          <Link 
            to="/manager" 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all flex flex-col items-center"
          >
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-full mb-4">
              <UserIcon className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Interface Manager</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mt-2">
              Gestion des campagnes et influenceurs
            </p>
          </Link>
          
          <Link 
            to="/influencer" 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all flex flex-col items-center"
          >
            <div className="bg-pink-100 dark:bg-pink-900/30 p-4 rounded-full mb-4">
              <Star className="h-10 w-10 text-pink-600 dark:text-pink-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Interface Influenceur</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mt-2">
              Gestion des partenariats et statistiques
            </p>
          </Link>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Retour à l'interface principale
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;