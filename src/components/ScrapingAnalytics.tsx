import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { getLatestScrapingResults, getBrandStatistics, analyzeScrapingData } from '../services/database';
import { Zap } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Types pour les données d'analyse
interface AnalyticsData {
  scrapingHistory: any[];
  brandsByIndustry: any[];
  scrapingTrends: any[]; 
  contactStats: {
    withEmail: number;
    withPhone: number;
    withBoth: number;
    withNone: number;
  };
  socialMediaDistribution: any[];
  recentScrapes: any[];
  recommendations: any[];
  insightsCount: number;
  loading: boolean;
  error: string | null;
}

interface Recommendation {
  id: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action: string;
}

interface ScrapingHistoryItem {
  id: string;
  url: string;
  type: string;
  timestamp: Date;
  data?: any;
}

interface IndustryStatItem {
  name: string;
  value: number;
}

interface ContactStats {
  withEmail: number;
  withPhone: number;
  withBoth: number;
  withNone: number;
}

const ScrapingAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    scrapingHistory: [],
    brandsByIndustry: [],
    scrapingTrends: [],
    contactStats: { withEmail: 0, withPhone: 0, withBoth: 0, withNone: 0 },
    socialMediaDistribution: [],
    recentScrapes: [],
    recommendations: [],
    insightsCount: 0,
    loading: true,
    error: null
  });
  
  useEffect(() => {
    const loadAnalyticsData = async () => {
      try {
        setAnalyticsData(prev => ({ ...prev, loading: true }));
        
        // Récupérer l'historique de scraping avec toutes les données
        const history = await getLatestScrapingResults(null, 200);
        
        // Récupérer les statistiques des marques
        const stats = await getBrandStatistics();
        
        // Récupérer l'analyse complète des données
        const analysisResults = await analyzeScrapingData();
        
        // Traiter les données pour les visualisations
        const brandsByIndustry = processIndustryData(stats.brandsByIndustry);
        const scrapingTrends = processScrapingTrends(history);
        const socialMediaDistribution = processSocialMediaData(stats.socialMediaStats);
        
        // Compter les insights générés
        const insightsCount = history.reduce((count, item) => {
          return count + (item.data?.insights?.length || 0);
        }, 0);
        
        setAnalyticsData({
          scrapingHistory: history,
          brandsByIndustry,
          scrapingTrends,
          contactStats: stats.contactStats,
          socialMediaDistribution,
          recentScrapes: history.slice(0, 5),
          recommendations: analysisResults.recommendations || [],
          insightsCount,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error("Erreur lors du chargement des données d'analyse:", error);
        setAnalyticsData(prev => ({ 
          ...prev, 
          loading: false, 
          error: "Erreur lors du chargement des données. Veuillez réessayer." 
        }));
      }
    };
    
    loadAnalyticsData();
  }, []);
  
  // Traitement des données pour les visualisations basé sur les données réelles
  const processIndustryData = (data: Record<string, number>) => {
    if (!data || Object.keys(data).length === 0) return [];
    
    return Object.entries(data).map(([industry, count]) => ({
      name: industry || 'Non défini',
      value: count
    })).sort((a, b) => b.value - a.value);
  };
  
  const processSocialMediaData = (data: Record<string, number>) => {
    if (!data || Object.keys(data).length === 0) return [];
    
    return Object.entries(data).map(([platform, count]) => ({
      name: platform,
      value: count
    })).filter(item => item.value > 0);
  };
  
  const processScrapingTrends = (history: any[]) => {
    if (!history || history.length === 0) return [];
    
    // Grouper par jour avec des données réelles
    const byDay = history.reduce((acc: Record<string, number>, item: any) => {
      if (!item.timestamp) return acc;
      
      const date = new Date(item.timestamp).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(byDay).map(([date, count]) => ({
      date,
      count
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(-14);
  };

  if (analyticsData.loading) {
    return (
      <div className="analytics-container bg-gray-800 p-6 rounded-xl flex justify-center items-center h-96">
        <div className="text-white text-lg">Chargement des données d'analyse...</div>
      </div>
    );
  }

  if (analyticsData.error) {
    return (
      <div className="analytics-container bg-gray-800 p-6 rounded-xl">
        <div className="text-red-400 p-4 bg-gray-700 rounded-lg">
          {analyticsData.error}
          <button 
            className="ml-4 bg-gray-600 px-3 py-1 rounded hover:bg-gray-500"
            onClick={() => window.location.reload()}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-container bg-gray-800 p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-white mb-6">Tableau de bord d'analyse</h2>
      
      {analyticsData.scrapingHistory.length === 0 ? (
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <p className="text-white text-lg">Aucune donnée de scraping n'est disponible. Effectuez quelques scrapings pour voir les analyses.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ChartContainer title="Marques par industrie">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.brandsByIndustry}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analyticsData.brandsByIndustry.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} marques`, '']}
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569' }}
                  itemStyle={{ color: '#f3f4f6' }}
                />
                <Legend 
                  formatter={(value) => <span className="text-gray-300">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          <ChartContainer title="Tendances de scraping">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.scrapingTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#94a3b8' }} 
                  axisLine={{ stroke: '#64748b' }}
                />
                <YAxis 
                  tick={{ fill: '#94a3b8' }} 
                  axisLine={{ stroke: '#64748b' }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} scrapings`, '']}
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569' }}
                  itemStyle={{ color: '#f3f4f6' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: '#1e293b' }}
                  activeDot={{ stroke: '#3b82f6', strokeWidth: 2, r: 6, fill: '#93c5fd' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      )}
    </div>
  );
};

// Fonctions utilitaires pour l'affichage
const getPriorityColor = (priority: 'high' | 'medium' | 'low'): string => {
  switch (priority) {
    case 'high': return 'border-red-500';
    case 'medium': return 'border-yellow-500';
    case 'low': return 'border-blue-500';
    default: return 'border-gray-500';
  }
};

const getRecommendationTitle = (type: string): string => {
  switch (type) {
    case 'contact': return 'Opportunités de contact';
    case 'industry': return 'Diversification industrielle';
    case 'news': return 'Actualisation des informations';
    case 'social': return 'Présence sur les réseaux sociaux';
    case 'quality': return 'Qualité des données';
    default: return 'Recommandation';
  }
};

const truncateUrl = (url: string): string => {
  if (!url) return 'URL inconnue';
  if (url.length <= 40) return url;
  return url.substring(0, 37) + '...';
};

const getScrapingTypeColor = (type: string): string => {
  switch (type) {
    case 'contact': return 'bg-emerald-900 text-emerald-200';
    case 'news': return 'bg-blue-900 text-blue-200';
    case 'profile': return 'bg-purple-900 text-purple-200';
    case 'custom': return 'bg-orange-900 text-orange-200';
    default: return 'bg-gray-700 text-gray-300';
  }
};

const getScrapingResultsSummary = (data) => {
  if (!data) return 'Aucune donnée';
  
  const summaryItems = [];
  
  if (data.contactEmail) summaryItems.push('Email');
  if (data.contactPhone) summaryItems.push('Téléphone');
  if (data.newsItems?.length > 0) summaryItems.push(`${data.newsItems.length} actualités`);
  if (data.insights?.length) summaryItems.push(`${data.insights.length} insights`);
  
  return summaryItems.length > 0 ? summaryItems.join(', ') : 'Données limitées';
};

const RecommendationCard = ({ recommendation }) => {
  const priorityClasses = {
    high: 'border-red-500 bg-red-500/10',
    medium: 'border-yellow-500 bg-yellow-500/10',
    low: 'border-blue-500 bg-blue-500/10'
  };
  
  return (
    <div className={`p-4 rounded-xl border ${priorityClasses[recommendation.priority]}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-white">{recommendation.title}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          recommendation.priority === 'high' 
            ? 'bg-red-900/50 text-red-300' 
            : recommendation.priority === 'medium'
              ? 'bg-yellow-900/50 text-yellow-300'
              : 'bg-blue-900/50 text-blue-300'
        }`}>
          {recommendation.priority === 'high' ? 'Prioritaire' : recommendation.priority === 'medium' ? 'Important' : 'À considérer'}
        </span>
      </div>
      <p className="text-gray-300 text-sm mb-3">{recommendation.description}</p>
      <div className="flex items-center justify-end">
        <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center">
          <Zap className="h-3 w-3 mr-1" />
          {recommendation.action}
        </button>
      </div>
    </div>
  );
};

const ChartContainer = ({ title, children }) => (
  <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
    <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
    <div className="h-56 sm:h-64">
      {children}
    </div>
  </div>
);

export default ScrapingAnalytics; 