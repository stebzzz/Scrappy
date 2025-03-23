// OpenAI API Service
import axios from 'axios';

// Nouvelle clé API valide
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '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'; 
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Generate content using OpenAI's GPT model
 * @param prompt The prompt to send to OpenAI
 * @param model The model to use (default: gpt-3.5-turbo)
 * @param temperature The temperature parameter (default: 0.7)
 * @returns The generated content
 */
export const generateContent = async (
  prompt: string,
  model: string = 'gpt-3.5-turbo',
  temperature: number = 0.7
): Promise<string> => {
  try {
    console.log(`Envoi d'une requête à OpenAI avec le modèle ${model}`);
    
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error('Erreur OpenAI:', error.response?.status, error.response?.data);
    
    // Si c'est une erreur d'authentification
    if (error.response?.status === 401) {
      console.error('⚠️ ERREUR D\'AUTHENTIFICATION OpenAI: Votre clé API est invalide ou a expiré');
      // Renvoyer un message simulé pour continuer le développement
      return JSON.stringify({
        contactEmail: ["contact@example.com"],
        contactPhone: ["+33 1 23 45 67 89"],
        socialLinks: ["https://facebook.com/example"],
        newsItems: [
          {
            newsTitle: "Simulation - Nouvelle API disponible",
            newsDate: "01/05/2023",
            newsContent: "Ceci est une simulation car la clé API OpenAI n'est pas valide."
          }
        ]
      });
    }
    
    throw new Error('Failed to generate content with OpenAI');
  }
};

/**
 * Generate an email for influencer outreach
 * @param brandInfo Information about the brand
 * @param influencerInfo Information about the influencer
 * @returns The generated email
 */
export const generateInfluencerEmail = async (
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
  const prompt = `
    Generate a professional and personalized email to contact a brand for an influencer collaboration.
    
    Brand information:
    - Name: ${brandInfo.name}
    - Industry: ${brandInfo.industry}
    ${brandInfo.news ? `- Recent news: ${brandInfo.news}` : ''}
    
    Influencer information:
    - Name: ${influencerInfo.name}
    - Social media handle: ${influencerInfo.handle}
    - Followers: ${influencerInfo.followers}
    - Niche: ${influencerInfo.niche}
    
    The email should be professional, concise, and highlight the potential value of the collaboration.
    Include a clear call to action at the end.
  `;

  return generateContent(prompt, 'gpt-3.5-turbo', 0.7);
};

/**
 * Generate a campaign idea based on brand and influencer information
 * @param brandInfo Information about the brand
 * @param influencerInfo Information about the influencer
 * @returns The generated campaign idea
 */
export const generateCampaignIdea = async (
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
  const prompt = `
    Generate a creative campaign idea for a collaboration between a brand and an influencer.
    
    Brand information:
    - Name: ${brandInfo.name}
    - Industry: ${brandInfo.industry}
    ${brandInfo.news ? `- Recent news: ${brandInfo.news}` : ''}
    
    Influencer information:
    - Name: ${influencerInfo.name}
    - Social media handle: ${influencerInfo.handle}
    - Followers: ${influencerInfo.followers}
    - Niche: ${influencerInfo.niche}
    
    The campaign idea should be innovative, align with both the brand's values and the influencer's content style,
    and have potential for high engagement. Include specific content ideas and potential KPIs.
  `;

  return generateContent(prompt, 'gpt-3.5-turbo', 0.8);
};