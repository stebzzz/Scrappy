import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { getLatestScrapingResults, getBrandStatistics, analyzeScrapingData } from '../services/database';
import { Zap } from 'lucide-react';
import { fetchCurrentUser } from '../services/authService';
import { AnalyticsChart } from './AnalyticsChart';
import { ScrapingResultCard } from './ScrapingResultCard';

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

const ScrapingAnalytics: React.FC = () => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Vérifier l'authentification
        const authResponse = await fetchCurrentUser();
        if (!authResponse.success) {
          setError('Vous devez être connecté pour accéder à cette page');
          return;
        }
        
        setUser(authResponse.user || null);
        
        // Récupérer l'historique de scraping avec toutes les données
        const history = await getLatestScrapingResults(null, 200);
        setHistory(history);
        
        // Récupérer les statistiques des marques
        const stats = await getBrandStatistics();
        setStatistics(stats);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Une erreur est survenue lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return <div className="p-4 flex justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
    </div>;
  }
  
  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }
  
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-6">Analyse de Scraping</h1>
      
      {/* Ajouter le reste du contenu */}
      
    </div>
  );
};

export default ScrapingAnalytics; 