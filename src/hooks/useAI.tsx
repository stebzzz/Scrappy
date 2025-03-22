// Custom hook for AI services
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { generateContent, AIProvider } from '../services/ai-service';
import { generateInfluencerEmail } from '../services/ai-service';
import { generateMarketAnalysis } from '../services/ai-service';
import { generateContentStrategy } from '../services/ai-service';

interface UseAIOptions {
  defaultProvider?: AIProvider;
  model?: string;
  temperature?: number;
}

interface UseAIReturn {
  isGenerating: boolean;
  error: string | null;
  generateContent: (prompt: string, provider?: AIProvider) => Promise<string>;
  generateEmail: (
    brandInfo: {
      name: string;
      industry: string;
      news?: string;
    },
    influencerInfo: {
      name: string;
      handle: string;
      followers: string;
      niche: string;
    }
  ) => Promise<string>;
  generateAnalysis: (
    brandInfo: {
      name: string;
      industry: string;
      competitors?: string[];
      targetAudience?: string;
    }
  ) => Promise<string>;
  generateStrategy: (
    campaignInfo: {
      brandName: string;
      industry: string;
      influencerName: string;
      influencerNiche: string;
      campaignGoals: string[];
      targetAudience: string;
      budget?: string;
      timeline?: string;
    }
  ) => Promise<string>;
}

export const useAI = (options: UseAIOptions = {}): UseAIReturn => {
  const { aiProvider } = useAppContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultProvider = options.defaultProvider || aiProvider;
  
  const generate = async (prompt: string, provider?: AIProvider): Promise<string> => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const result = await generateContent(
        prompt, 
        provider || defaultProvider,
        {
          model: options.model,
          temperature: options.temperature,
        }
      );
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };
  
  const generateEmail = async (
    brandInfo: {
      name: string;
      industry: string;
      news?: string;
    },
    influencerInfo: {
      name: string;
      handle: string;
      followers: string;
      niche: string;
    }
  ): Promise<string> => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const result = await generateInfluencerEmail(brandInfo, influencerInfo, defaultProvider);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };
  
  const generateAnalysis = async (
    brandInfo: {
      name: string;
      industry: string;
      competitors?: string[];
      targetAudience?: string;
    }
  ): Promise<string> => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const result = await generateMarketAnalysis(brandInfo, defaultProvider);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };
  
  const generateStrategy = async (
    campaignInfo: {
      brandName: string;
      industry: string;
      influencerName: string;
      influencerNiche: string;
      campaignGoals: string[];
      targetAudience: string;
      budget?: string;
      timeline?: string;
    }
  ): Promise<string> => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const result = await generateContentStrategy(campaignInfo, defaultProvider);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };
  
  return {
    isGenerating,
    error,
    generateContent: generate,
    generateEmail,
    generateAnalysis,
    generateStrategy,
  };
};