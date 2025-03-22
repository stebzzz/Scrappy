// OpenAI API Service
import axios from 'axios';

const OPENAI_API_KEY = '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';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Generate content using OpenAI's GPT model
 * @param prompt The prompt to send to OpenAI
 * @param model The model to use (default: gpt-4)
 * @param temperature The temperature parameter (default: 0.7)
 * @returns The generated content
 */
export const generateContent = async (
  prompt: string,
  model: string = 'gpt-4',
  temperature: number = 0.7
): Promise<string> => {
  try {
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
  } catch (error) {
    console.error('Error generating content with OpenAI:', error);
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

  return generateContent(prompt, 'gpt-4', 0.7);
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

  return generateContent(prompt, 'gpt-4', 0.8);
};