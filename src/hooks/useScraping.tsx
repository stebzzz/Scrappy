// Custom hook for scraping services
import { useState } from 'react';
import { 
  createScrapingJob, 
  getScrapingJobResult, 
  scrapeBrandContactInfo, 
  scrapeBrandNews, 
  scrapeInfluencerProfile 
} from '../services/firecrawl';
import { SCRAPING_SETTINGS } from '../config/app-settings';

interface UseScrapingOptions {
  waitTime?: number;
  maxRetries?: number;
}

interface UseScrapingReturn {
  isLoading: boolean;
  error: string | null;
  scrapeBrandContact: (brandUrl: string) => Promise<any>;
  scrapeBrandNews: (brandUrl: string) => Promise<any>;
  scrapeInfluencer: (profileUrl: string) => Promise<any>;
  createCustomScrapingJob: (url: string, selectors: Record<string, string>, javascript?: boolean) => Promise<any>;
}

export const useScraping = (options: UseScrapingOptions = {}): UseScrapingReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const waitTime = options.waitTime || SCRAPING_SETTINGS.defaultSettings.waitTime;
  const maxRetries = options.maxRetries || SCRAPING_SETTINGS.defaultSettings.maxRetries;

  const scrapeBrandContact = async (brandUrl: string): Promise<any> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await scrapeBrandContactInfo(brandUrl);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const scrapeBrandNewsInfo = async (brandUrl: string): Promise<any> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await scrapeBrandNews(brandUrl);
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
      const result = await scrapeInfluencerProfile(profileUrl);
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
      // Create the scraping job
      const job = await createScrapingJob({
        url,
        selectors,
        javascript,
      });

      // Poll for results with retry logic
      let result = { jobId: job.jobId, status: 'pending' };
      let retries = 0;
      
      while ((result.status === 'pending' || result.status === 'processing') && retries < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, waitTime));
        result = await getScrapingJobResult(job.jobId);
        retries++;
      }

      if (result.status === 'completed') {
        return result.data;
      } else if (result.status === 'failed') {
        throw new Error(`Scraping job failed: ${result.error || 'Unknown error'}`);
      } else {
        throw new Error(`Scraping job timed out after ${maxRetries} retries`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
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