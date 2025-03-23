// Custom hook for AI services
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { generateContent, AIProvider } from '../services/ai-service';
import { generateInfluencerEmail } from '../services/ai-service';
import { generateMarketAnalysis } from '../services/ai-service';
import { generateContentStrategy } from '../services/ai-service';
import { API_KEYS } from '../config/api-keys';
import Anthropic from '@anthropic-ai/sdk';

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
    },
    options?: { temperature?: number; model?: string; purpose?: string; }
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
  loading: boolean;
}

interface BrandInfo {
  name: string;
  industry: string;
  news?: string;
  description?: string;
  website?: string;
  contactEmail?: string;
}

interface InfluencerInfo {
  name: string;
  handle: string;
  followers: string | number;
  niche: string;
  platforms?: string[];
  engagementRate?: number;
}

interface CampaignInfo {
  brandName: string;
  influencerName: string;
  campaignDuration: string;
  platform: string;
  goals: string[];
  contentThemes?: string[];
  budget?: string;
}

export const useAI = (options: UseAIOptions = {}): UseAIReturn => {
  const { aiProvider } = useAppContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
    brandInfo: BrandInfo,
    influencerInfo: InfluencerInfo,
    options = { temperature: 0.7, model: 'claude-3-7-sonnet', purpose: 'collaboration' }
  ): Promise<string> => {
    setLoading(true);
    setError(null);
    
    try {
      let result = '';
      
      if (aiProvider === 'anthropic') {
        // Utiliser directement l'API Anthropic en contournant CORS
        try {
          // Utiliser plusieurs méthodes pour résoudre les problèmes CORS
          const url = 'https://api.anthropic.com/v1/messages';
          const apiKey = API_KEYS.claude.apiKey; // Utiliser la clé du config importé
          
          // Méthode 1: Utiliser fetch avec les options no-cors (peut limiter la réponse)
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': apiKey,
              'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
              model: options.model === 'advanced' ? 'claude-3-7-sonnet-20240229' :
                     options.model === 'creative' ? 'claude-3-sonnet-20240229' :
                     options.model === 'precise' ? 'claude-3-opus-20240229' : 'claude-3-5-sonnet-20240620',
              max_tokens: 2000,
              temperature: options.temperature,
              messages: [
                { 
                  role: "user", 
                  content: `
                    Tu es un expert en marketing d'influence qui rédige un email professionnel.
                    
                    Informations sur la marque:
                    - Nom: ${brandInfo.name}
                    - Industrie: ${brandInfo.industry}
                    - Site web: ${brandInfo.website || 'Non spécifié'}
                    - Description: ${brandInfo.description || 'Non spécifiée'}
                    
                    Informations sur l'influenceur:
                    - Nom: ${influencerInfo.name}
                    - Pseudo: ${influencerInfo.handle}
                    - Niche: ${influencerInfo.niche}
                    - Nombre d'abonnés: ${influencerInfo.followers}
                    
                    Objectif de l'email: ${options.purpose === 'collaboration' ? 'Proposer une collaboration' : 
                                      options.purpose === 'followup' ? 'Faire un suivi de campagne' :
                                      options.purpose === 'negotiation' ? 'Négocier les termes d\'un partenariat' :
                                      'Première prise de contact'}
                    
                    Écris un email professionnel en français pour proposer une collaboration entre cette marque et cet influenceur.
                    L'email doit être personnalisé, professionnel tout en étant chaleureux, et inclure:
                    - Une introduction personnalisée
                    - Une présentation concise de la marque
                    - Pourquoi l'influenceur a été choisi spécifiquement
                    - Les bénéfices de la collaboration pour l'influenceur
                    - Une invitation à discuter plus en détail
                    - Une signature professionnelle
                    
                    Format: email complet avec objet. L'email doit être prêt à être copié-collé.
                  `
                }
              ]
            })
          });
          
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Détails de l'erreur:", errorData);
            throw new Error(`Erreur API Anthropic: ${response.status}`);
          }
          
          const data = await response.json();
          result = data.content[0].text;
        } catch (error) {
          console.error("Erreur complète:", error);
          throw error;
        }
      } else {
        // OpenAI via proxy Vite
        const modelToUse = options.model === 'advanced' ? 'gpt-4o' :
                          options.model === 'creative' ? 'gpt-4-turbo' :
                          options.model === 'precise' ? 'gpt-4' : 'gpt-3.5-turbo';
        
        const response = await fetch('/api/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEYS.openai}`
          },
          body: JSON.stringify({
            model: modelToUse,
            messages: [
              {
                role: 'system',
                content: 'Tu es un expert en marketing d\'influence qui rédige des emails professionnels pour les marques.'
              },
              {
                role: 'user',
                content: `
                  Rédige un email professionnel pour proposer une collaboration entre cette marque:
                  ${brandInfo.name} (${brandInfo.industry}) - ${brandInfo.description || ''}
                  
                  Et cet influenceur:
                  ${influencerInfo.name} (@${influencerInfo.handle}) - ${influencerInfo.niche} - ${typeof influencerInfo.followers === 'number' ? influencerInfo.followers.toLocaleString() : influencerInfo.followers} abonnés
                  
                  Objectif: ${options.purpose}
                  
                  L'email doit être en français, personnalisé et professionnel.
                `
              }
            ],
            temperature: options.temperature
          })
        });
        
        if (!response.ok) {
          throw new Error(`Erreur API OpenAI: ${response.status}`);
        }
        
        const data = await response.json();
        result = data.choices[0].message.content;
      }
      
      return result;
    } catch (error) {
      console.error('Erreur lors de la génération de l\'email:', error);
      setError(error instanceof Error ? error : new Error('Erreur inconnue'));
      throw error;
    } finally {
      setLoading(false);
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
    loading
  };
};