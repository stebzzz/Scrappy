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

// Simulation des réponses d'IA pour le développement
const generateSimulatedEmail = (
  brandInfo: BrandInfo,
  influencerInfo: InfluencerInfo,
  purpose: string
): string => {
  // Créer des variations pour éviter la monotonie
  const greetings = [
    `Bonjour ${influencerInfo.name},`,
    `Cher ${influencerInfo.name},`,
    `Salut ${influencerInfo.name},`,
    `Bonjour l'équipe de ${influencerInfo.handle},`
  ];
  
  const intros = [
    `Je représente ${brandInfo.name}, ${brandInfo.description || `une marque innovante dans le secteur ${brandInfo.industry}`}, et nous sommes impressionnés par votre contenu.`,
    `Au nom de ${brandInfo.name}, je vous contacte car nous admirons votre travail dans le domaine de ${influencerInfo.niche}.`,
    `${brandInfo.name}, leader dans ${brandInfo.industry}, souhaite vous proposer une collaboration unique.`,
    `Suite à notre intérêt pour votre contenu ${influencerInfo.niche}, nous chez ${brandInfo.name} aimerions vous proposer un partenariat.`
  ];
  
  const concepts = [
    `* Vidéo/Post sponsorisé mettant en avant nos produits/services\n* Story Instagram (2-3 slides)\n* Possibilité de code promo exclusif pour votre communauté`,
    `* Intégration de nos produits dans votre contenu habituel\n* Partage d'expérience avec notre marque\n* Participation à notre campagne #${brandInfo.name.replace(/\s+/g, '')}Challenge`,
    `* Un contenu authentique présentant nos produits\n* Partage dans vos stories des coulisses\n* Mention de notre marque dans votre bio pendant un mois`,
    `* Création d'une série de contenu en partenariat\n* Posts sur vos réseaux avec notre identité visuelle\n* Possibilité d'invitation à nos événements exclusifs`
  ];
  
  const whys = [
    `Votre style unique et votre audience engagée de ${typeof influencerInfo.followers === 'number' ? influencerInfo.followers.toLocaleString() : influencerInfo.followers} abonnés correspondent parfaitement à notre image de marque.`,
    `Avec vos ${typeof influencerInfo.followers === 'number' ? influencerInfo.followers.toLocaleString() : influencerInfo.followers} abonnés passionnés par ${influencerInfo.niche}, vous êtes le partenaire idéal pour notre prochaine campagne.`,
    `Nous apprécions particulièrement votre approche authentique qui résonne avec les valeurs de ${brandInfo.name}.`,
    `Votre créativité et votre influence dans le domaine de ${influencerInfo.niche} s'alignent parfaitement avec notre stratégie marketing.`
  ];
  
  const benefits = [
    `* Rémunération compétitive\n* Produits/services gratuits\n* Visibilité sur nos plateformes\n* Relation à long terme possible`,
    `* Compensation financière attractive\n* Accès à nos produits en avant-première\n* Promotion sur nos réseaux sociaux\n* Invitation à nos événements VIP`,
    `* Rémunération adaptée à votre audience\n* Échantillons exclusifs de nos produits\n* Co-création de contenu\n* Possibilité de devenir ambassadeur officiel`,
    `* Package financier personnalisé\n* Kit complet de nos produits/services\n* Partage à notre communauté de plus de 50 000 personnes\n* Opportunités futures de collaboration`
  ];
  
  const closings = [
    `Seriez-vous intéressé(e) par cette proposition? Je serais ravi d'organiser un appel pour discuter des détails.`,
    `Cette opportunité vous intéresse-t-elle? N'hésitez pas à me faire part de vos questions ou suggestions.`,
    `Si ce partenariat vous intéresse, nous pourrions organiser un appel cette semaine pour approfondir les détails.`,
    `Que pensez-vous de cette proposition? Je reste à votre disposition pour en discuter plus amplement.`
  ];
  
  const signatures = [
    `Cordialement,\n\nJean Dupont\nResponsable Partenariats | ${brandInfo.name}\n${brandInfo.website || 'www.exemple.com'}\njean.dupont@exemple.com`,
    `Bien à vous,\n\nMarie Martin\nDirectrice Marketing | ${brandInfo.name}\n${brandInfo.website || 'www.exemple.com'}\nmarie.martin@exemple.com`,
    `Sincères salutations,\n\nAlexandre Legrand\nChargé des Relations Influenceurs | ${brandInfo.name}\n${brandInfo.website || 'www.exemple.com'}\nalexandre.legrand@exemple.com`,
    `À bientôt,\n\nSophie Dubois\nManager Influence Marketing | ${brandInfo.name}\n${brandInfo.website || 'www.exemple.com'}\nsophie.dubois@exemple.com`
  ];
  
  // Sélectionner aléatoirement les composants de l'email
  const randomPick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  
  // Déterminer l'objet en fonction du type de collaboration
  let subject = '';
  if (purpose === 'collaboration') {
    subject = `Proposition de collaboration entre ${brandInfo.name} et ${influencerInfo.handle}`;
  } else if (purpose === 'followup') {
    subject = `Suivi de notre conversation - ${brandInfo.name} × ${influencerInfo.handle}`;
  } else if (purpose === 'negotiation') {
    subject = `Précisions sur notre partenariat - ${brandInfo.name} × ${influencerInfo.handle}`;
  } else {
    subject = `${brandInfo.name} souhaite collaborer avec vous`;
  }
  
  // Construire l'email
  return `Objet : ${subject}

${randomPick(greetings)}

${randomPick(intros)}

Concept de collaboration
${randomPick(concepts)}

Pourquoi vous ?
${randomPick(whys)}

Ce que nous offrons
${randomPick(benefits)}

${randomPick(closings)}

${randomPick(signatures)}`;
};

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
    options = { temperature: 0.7, model: 'advanced', purpose: 'collaboration' }
  ): Promise<string> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simuler un délai pour rendre l'expérience plus réaliste
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Retourner toujours le même email pour la démo
      return `Objet : Collaboration TheWingzer × Quick - Intégration du Giant'N Spicy et Giant'N Cheese

Bonjour Quick,

Je représente TheWingzer, créateur de contenu visionnaire suivi par des millions d'abonnés, connu pour sa série "Comment Faire" qui explore les relations humaines avec humour et effets spéciaux de haute qualité.

Nous proposons d'intégrer naturellement vos nouveaux burgers Giant'N Spicy et Giant'N Cheese dans un prochain épisode de "Comment Faire", centré sur les relations comme à son habitude. L'idée est d'incorporer subtilement vos produits sans compromettre l'authenticité du contenu.

Concept de collaboration
* Vidéo "Comment Faire" (Instagram Reels/TikTok/YouTube)
    * Thème : "Comment Faire…? »
    * Durée : 1-2 minutes
    * Intégration : Le personnage principal utilisera les nouveaux burgers Giant comme métaphore des relations, jouant sur les concepts de "piquant" et de "fondant"
* Story Instagram (2-3 slides)
    * Behind-the-scenes montrant la dégustation des burgers Giant'N Spicy et Giant'N Cheese
    * Mention subtile de l'offre anniversaire des 45 ans du Giant

Pourquoi cette synergie ?
* Intégration organique : Vos produits s'insèrent naturellement dans le scénario, préservant l'authenticité du contenu
* Audience engagée : Millions d'abonnés, principalement 18-34 ans, cible idéale pour Quick
* Créativité visuelle : Effets spéciaux de qualité pour une expérience mémorable

Statistiques clés de TheWingzer
* Vues moyennes par épisode "Comment Faire" : 350k vues
* Taux d'engagement : 8,7% sur les contenus liés aux relations et au lifestyle
* Collaborations notables : Netflix, Prime Video, Warner Bros., Lacoste, Celio

Cette collaboration permettra de présenter les nouveaux burgers Giant de manière subtile et impactante, tout en restant fidèle à l'univers de TheWingzer.

Disponible pour discuter des détails.

Cordialement,
[Votre nom]
Agent de TheWingzer`;
      
    } catch (error) {
      console.error('Erreur lors de la génération de l\'email:', error);
      setError(error);
      setLoading(false);
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
      // Simulation similaire pour l'analyse
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return `Analyse de marché pour ${brandInfo.name || 'la marque'} dans le secteur ${brandInfo.industry || 'concerné'}:\n\n` +
             `1. Tendances actuelles du marché: Le secteur ${brandInfo.industry || 'concerné'} connaît une croissance de 12% cette année.\n` +
             `2. Opportunités de croissance: L'expansion vers les marchés internationaux présente un potentiel élevé.\n` +
             `3. Risques et défis: La concurrence s'intensifie avec l'entrée de nouveaux acteurs.\n` +
             `4. Recommandations: Renforcer la présence digitale et développer des partenariats influenceurs ciblés.\n`;
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
      // Simulation de génération de stratégie
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      return `Stratégie de collaboration entre ${campaignInfo.brandName} et ${campaignInfo.influencerName}:\n\n` +
             `1. Phase 1: Teasing (2 semaines)\n   - Posts cryptiques sur les réseaux sociaux\n   - Stories avec countdown\n` +
             `2. Phase 2: Lancement (1 semaine)\n   - Vidéo principale\n   - Posts sponsorisés\n   - Concours\n` +
             `3. Phase 3: Engagement (3 semaines)\n   - Q&A live\n   - Partage d'expériences clients\n   - Contenu généré par les utilisateurs\n` +
             `4. Résultats attendus:\n   - +15% engagement\n   - +20% conversion\n   - +500 nouveaux followers`;
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