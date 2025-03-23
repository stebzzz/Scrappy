import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, TrendingUp, Users, Building2, 
  Mail, Search, Zap, Layers, Activity, Calendar, Settings, Bell, Clock, ArrowUpRight, 
  ChevronRight, Plus, ArrowRight, CheckCircle
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { getBrandStatistics, getLatestScrapingResults } from '../services/database';

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
    <div className="dashboard-container p-6">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Tableau de bord</h1>
          <p className="text-gray-400">Vue d'ensemble de votre activité marketing d'influence</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn btn-secondary">
            <Bell size={18} className="mr-2" />
            Notifications
          </button>
          <button className="btn btn-primary">
            <Plus size={18} className="mr-2" />
            Nouvelle campagne
          </button>
        </div>
      </header>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          title="Marques" 
          value={loading ? "..." : stats.brands} 
          icon={<Building2 className="text-white" size={24} />}
          trend="+12% ce mois"
          trendUp={true}
          color="from-blue-600 to-blue-800"
          onClick={() => window.location.href = "/brands"}
        />
        <DashboardCard 
          title="Influenceurs" 
          value={loading ? "..." : stats.influencers} 
          icon={<Users className="text-white" size={24} />}
          trend="+8% ce mois"
          trendUp={true}
          color="from-purple-600 to-purple-800"
          onClick={() => window.location.href = "/influencers"}
        />
        <DashboardCard 
          title="Campagnes" 
          value={loading ? "..." : stats.campaigns} 
          icon={<Calendar className="text-white" size={24} />}
          trend="+5% ce mois"
          trendUp={true}
          color="from-emerald-600 to-emerald-800"
          onClick={() => window.location.href = "/campaigns"}
        />
        <DashboardCard 
          title="Emails générés" 
          value={loading ? "..." : stats.emails} 
          icon={<Mail className="text-white" size={24} />}
          trend="+15% ce mois"
          trendUp={true}
          color="from-amber-600 to-amber-800"
          onClick={() => window.location.href = "/ai-agent"}
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Charts Section - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Campaign Performance Chart */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Performance des campagnes</h2>
              <div className="flex space-x-2">
                <button className="text-sm text-gray-400 hover:text-white transition-colors">Mois</button>
                <button className="text-sm bg-gray-700 text-white px-2 py-1 rounded">Trimestre</button>
                <button className="text-sm text-gray-400 hover:text-white transition-colors">Année</button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={campaignPerformanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563', color: '#F9FAFB' }} 
                    itemStyle={{ color: '#F9FAFB' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="engagement" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#1F2937', stroke: '#3B82F6', strokeWidth: 2, r: 6 }} />
                  <Line type="monotone" dataKey="clicks" stroke="#10B981" strokeWidth={2} dot={{ fill: '#1F2937', stroke: '#10B981', strokeWidth: 2, r: 6 }} />
                  <Line type="monotone" dataKey="reach" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#1F2937', stroke: '#F59E0B', strokeWidth: 2, r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Industries Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-lg font-semibold text-white mb-4">Distribution par industrie</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={industriesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {industriesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} marques`, '']}
                      contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }}
                      itemStyle={{ color: '#F9FAFB' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Activity Feed */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Activité récente</h2>
                <Link to="/history" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
                  Voir tout <ChevronRight size={16} />
                </Link>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                    <Search className="text-blue-400" size={18} />
                  </div>
                  <div>
                    <p className="text-white text-sm">Nouveau scraping <span className="text-blue-400">Adidas</span></p>
                    <p className="text-xs text-gray-400">Il y a 25 minutes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-emerald-500/20 p-2 rounded-lg mr-3">
                    <Mail className="text-emerald-400" size={18} />
                  </div>
                  <div>
                    <p className="text-white text-sm">Email généré pour <span className="text-blue-400">Sephora</span></p>
                    <p className="text-xs text-gray-400">Il y a 1 heure</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-500/20 p-2 rounded-lg mr-3">
                    <Users className="text-purple-400" size={18} />
                  </div>
                  <div>
                    <p className="text-white text-sm">Nouvel influenceur ajouté <span className="text-blue-400">Marie Duval</span></p>
                    <p className="text-xs text-gray-400">Il y a 3 heures</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-500/20 p-2 rounded-lg mr-3">
                    <Calendar className="text-amber-400" size={18} />
                  </div>
                  <div>
                    <p className="text-white text-sm">Campagne créée <span className="text-blue-400">Été 2023</span></p>
                    <p className="text-xs text-gray-400">Il y a 5 heures</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar - 1/3 width */}
        <div className="space-y-6">
          {/* Tasks List */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Tâches à faire</h2>
              <Link to="/tasks" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
                Voir tout <ChevronRight size={16} />
              </Link>
            </div>
            <div className="overflow-y-auto max-h-80">
              {tasks.map((task, index) => (
                <TaskItem 
                  key={index}
                  title={task.title}
                  dueDate={task.dueDate}
                  priority={task.priority}
                  completed={task.completed}
                  onToggle={task.onToggle}
                />
              ))}
            </div>
            <div className="p-4 border-t border-gray-700">
              <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center">
                <Plus size={16} className="mr-1" />
                Ajouter une tâche
              </button>
            </div>
          </div>
          
          {/* Campaigns */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Campagnes actives</h2>
              <Link to="/campaigns" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
                Voir tout <ChevronRight size={16} />
              </Link>
            </div>
            <div className="p-4">
              <CampaignItem 
                title="Campagne d'été 2023"
                status="active"
                progress={65}
                influencers={8}
                startDate="01/06"
                endDate="31/07"
              />
              <CampaignItem 
                title="Lancement produit XYZ"
                status="active"
                progress={25}
                influencers={5}
                startDate="15/06"
                endDate="15/08"
              />
              <CampaignItem 
                title="Promotion rentrée"
                status="planned"
                progress={0}
                influencers={12}
                startDate="01/08"
                endDate="15/09"
              />
            </div>
            <div className="p-4 border-t border-gray-700">
              <Link 
                to="/campaigns/new" 
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center"
              >
                <Plus size={16} className="mr-1" />
                Nouvelle campagne
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Row - Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link 
          to="/scraping"
          className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all group"
        >
          <div className="flex justify-between items-center mb-3">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Search size={24} className="text-blue-400" />
            </div>
            <ArrowUpRight size={20} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Scraping</h3>
          <p className="text-gray-400 text-sm">Analyser de nouvelles marques et collecter des données.</p>
        </Link>
        
        <Link 
          to="/ai-agent"
          className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all group"
        >
          <div className="flex justify-between items-center mb-3">
            <div className="p-3 bg-indigo-500/20 rounded-lg">
              <Zap size={24} className="text-indigo-400" />
            </div>
            <ArrowUpRight size={20} className="text-gray-400 group-hover:text-indigo-400 transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Agent IA</h3>
          <p className="text-gray-400 text-sm">Générer des emails et du contenu avec l'intelligence artificielle.</p>
        </Link>
        
        <Link 
          to="/analytics"
          className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-emerald-500 transition-all group"
        >
          <div className="flex justify-between items-center mb-3">
            <div className="p-3 bg-emerald-500/20 rounded-lg">
              <Activity size={24} className="text-emerald-400" />
            </div>
            <ArrowUpRight size={20} className="text-gray-400 group-hover:text-emerald-400 transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Analytique</h3>
          <p className="text-gray-400 text-sm">Visualiser les performances et obtenir des insights.</p>
        </Link>
        
        <Link 
          to="/settings"
          className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-500 transition-all group"
        >
          <div className="flex justify-between items-center mb-3">
            <div className="p-3 bg-gray-500/20 rounded-lg">
              <Settings size={24} className="text-gray-400" />
            </div>
            <ArrowUpRight size={20} className="text-gray-400 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Paramètres</h3>
          <p className="text-gray-400 text-sm">Configurer votre compte et vos préférences.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;