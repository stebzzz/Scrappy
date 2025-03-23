// Custom hook for scraping services
import { useState } from 'react';
import { 
  createScrapingJob, 
  scrapeBrandContactInfo, 
  scrapeBrandNews, 
  scrapeInfluencerProfile 
} from '../services/firecrawl';
import { saveScrapingResult, getScrapingResultsByUrl } from '../services/database';
import { SCRAPING_SETTINGS } from '../config/app-settings';

interface UseScrapingOptions {
  waitTime?: number;
  maxRetries?: number;
  saveResults?: boolean;
}

interface UseScrapingReturn {
  isLoading: boolean;
  error: string | null;
  scrapeBrandContact: (brandUrl: string) => Promise<any>;
  scrapeBrandNews: (brandUrl: string) => Promise<any>;
  scrapeInfluencer: (profileUrl: string) => Promise<any>;
  createCustomScrapingJob: (url: string, selectors: Record<string, string>, javascript?: boolean) => Promise<any>;
}

interface SavedResult {
  timestamp: any;
  id: string;
  type?: string;
  data?: any;
}

interface ScrapingResult {
  status: string;
  data?: any;
  error?: string;
  jobId?: string;
}

export const useScraping = (options: UseScrapingOptions = {}): UseScrapingReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const waitTime = options.waitTime || SCRAPING_SETTINGS?.defaultSettings?.waitTime || 3000;
  const maxRetries = options.maxRetries || SCRAPING_SETTINGS?.defaultSettings?.maxRetries || 3;
  const saveResults = options.saveResults !== false; // Par défaut, on sauvegarde les résultats

  const scrapeBrandContact = async (url: string, options = { useScrapingBee: true }): Promise<any> => {
    console.log(`Scraping des informations de contact pour ${url} avec ScrapingBee:`, options.useScrapingBee);
    
    try {
      // Utiliser directement la fonction de firecrawl
      const contactInfo = await scrapeBrandContactInfo(url);
      return contactInfo;
    } catch (error) {
      console.error("Erreur lors du scraping des contacts:", error);
      throw error;
    }
  };

  const scrapeBrandNewsInfo = async (brandUrl: string): Promise<any> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Vérifier d'abord si on a des résultats récents en base
      const savedResults = await getScrapingResultsByUrl(brandUrl);
      
      // Si on a des résultats récents (moins de 24h)
      if (savedResults && isRecent(savedResults.timestamp) && (savedResults as SavedResult).type === 'news') {
        console.log('Utilisation des résultats d\'actualités sauvegardés pour:', brandUrl);
        return (savedResults as SavedResult).data;
      }
      
      const result = await scrapeBrandNews(brandUrl);
      
      // Sauvegarder les résultats si l'option est activée
      if (saveResults && result) {
        await saveScrapingResult('news', brandUrl, result);
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const scrapeInfluencer = async (profileUrl: string): Promise<any> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Vérifier d'abord si on a des résultats récents en base
      const savedResults = await getScrapingResultsByUrl(profileUrl);
      
      // Si on a des résultats récents (moins de 24h)
      if (savedResults && isRecent(savedResults.timestamp) && (savedResults as SavedResult).type === 'profile') {
        console.log('Utilisation des résultats de profil sauvegardés pour:', profileUrl);
        return (savedResults as SavedResult).data;
      }
      
      const result = await scrapeInfluencerProfile(profileUrl);
      
      // Sauvegarder les résultats si l'option est activée
      if (saveResults && result) {
        await saveScrapingResult('profile', profileUrl, result);
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createCustomScrapingJob = async (
    url: string, 
    selectors: Record<string, string>, 
    javascript: boolean = true
  ): Promise<any> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await createScrapingJob(url, {
        selectors,
        javascript,
        type: 'custom' as any
      });

      if (result.status === 'completed') {
        // Sauvegarder les résultats si l'option est activée
        if (saveResults && (result as ScrapingResult).data) {
          await saveScrapingResult('custom' as any, url, (result as ScrapingResult).data);
        }
        
        return (result as ScrapingResult).data;
      } else {
        throw new Error(`Échec du scraping: ${(result as ScrapingResult).error || 'Erreur inconnue'}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fonction utilitaire pour vérifier si un timestamp est récent (moins de 24h)
  const isRecent = (timestamp: Date): boolean => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = diff / (1000 * 60 * 60);
    return hours < 24; // Considérer comme récent si moins de 24h
  };

  return {
    isLoading,
    error,
    scrapeBrandContact,
    scrapeBrandNews: scrapeBrandNewsInfo,
    scrapeInfluencer,
    createCustomScrapingJob,
  };
};